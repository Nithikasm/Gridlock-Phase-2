from fastapi import FastAPI
from pydantic import BaseModel
import joblib

from backend.recommendation_engine import generate_recommendations
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent


# ------------------------
# Load model once
# ------------------------

model = joblib.load(BASE_DIR / "road_closure_model.pkl")

app = FastAPI(
    title="Bengaluru Police AI Traffic Command Center",
    version="1.0"
)

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