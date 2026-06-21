from fastapi import FastAPI
from pydantic import BaseModel
import joblib

from backend.recommendation_engine import generate_recommendations
from pathlib import Path

import pandas as pd
from math import radians, sin, cos, sqrt, atan2

BASE_DIR = Path(__file__).resolve().parent


# ------------------------
# Load model once
# ------------------------

model = joblib.load(BASE_DIR / "road_closure_model.pkl")

events_df = pd.read_csv(BASE_DIR / "cleaned_astram_event_data_final.csv")
def haversine(lat1, lon1, lat2, lon2):
    R = 6371

    dlat = radians(lat2 - lat1)
    dlon = radians(lon2 - lon1)

    a = (
        sin(dlat / 2) ** 2
        + cos(radians(lat1))
        * cos(radians(lat2))
        * sin(dlon / 2) ** 2
    )

    c = 2 * atan2(sqrt(a), sqrt(1 - a))

    return R * c

events_df = events_df[
    ["latitude", "longitude", "police_station"]
].dropna()

events_df = events_df.drop_duplicates()

app = FastAPI(
    title="Bengaluru Police AI Traffic Command Center",
    version="1.0"
)
@app.get("/nearest-police-station")
def nearest_police_station(lat: float, lon: float):

    df = events_df.copy()

    df["distance"] = df.apply(
        lambda row: haversine(
            lat,
            lon,
            row["latitude"],
            row["longitude"]
        ),
        axis=1,
    )

    nearest = df.loc[df["distance"].idxmin()]

    return {
        "police_station": nearest["police_station"],
        "distance_km": round(float(nearest["distance"]), 2)
    }

from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ------------------------
# Input Schema
# ------------------------

class EventInput(BaseModel):

    event_type: str
    event_cause: str
    description: str
    priority: str

    latitude: float
    longitude: float

    address: str
    corridor: str
    zone: str
    police_station: str

    description_missing: int

    Day_of_Week: str


# ------------------------
# Health Check
# ------------------------

@app.get("/health")
def health():

    return {
        "status": "healthy",
        "model": "loaded"
    }


# ------------------------
# Prediction Endpoint
# ------------------------

@app.post("/predict")
def predict(data: EventInput):

    df = [{
        "event_type": data.event_type,
        "event_cause": data.event_cause,
        "description": data.description,
        "priority": data.priority,
        "latitude": data.latitude,
        "longitude": data.longitude,
        "address": data.address,
        "corridor": data.corridor,
        "zone": data.zone,
        "police_station": data.police_station,
        "description_missing": data.description_missing,
        "Day_of_Week": data.Day_of_Week
    }]    

    import pandas as pd

    df = pd.DataFrame(df)

    probability = model.predict_proba(df)[0][1]

    recommendation = generate_recommendations(
        probability,
        data.event_cause
    )

    return {
    "road_closure_probability": round(float(probability), 3),
    "recommendation": recommendation
    }

# ------------------------
# Metadata Endpoints
# ------------------------

@app.get("/metadata")
def metadata():

    return {

        "event_type": [
            "planned",
            "unplanned"
        ],

        "event_cause": [
            "construction",
            "public_event",
            "procession",
            "protest",
            "vip_movement"
        ],

        "priority": [
            "High",
            "Low"
        ],

        "day_of_week": [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday"
        ],

        "zone": [
            "East",
            "West",
            "North",
            "South",
            "Central",
            "Unknown"
        ]
    }