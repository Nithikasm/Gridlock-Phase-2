# GridLock: Event-Driven Traffic Congestion Prediction and Resource Optimization

## Overview

GridLock is an AI-powered traffic intelligence platform developed for the **Flipkart GridLock Hackathon 2.0**. The system addresses the challenge of **event-driven congestion** by forecasting the traffic impact of planned and unplanned events and recommending operational strategies for traffic authorities.

The platform leverages historical event data and machine learning to predict congestion severity, estimate required resources, and support data-driven traffic management decisions.

---

## Problem Statement

Large-scale events such as political rallies, festivals, sports matches, construction activities, and sudden public gatherings often cause severe localized traffic disruptions.

Current traffic management practices face several limitations:

- Event impact is rarely quantified in advance.
- Resource deployment is largely experience-driven.
- There is no systematic post-event learning mechanism.

GridLock aims to overcome these challenges by providing predictive insights and operational recommendations before congestion occurs.

---

## Key Features

### Event Impact Prediction
Predicts the expected traffic impact level based on event characteristics such as:

- Event type
- Location
- Event duration
- Time and date
- Security sensitivity

### Resource Recommendation Engine
Automatically recommends:

- Required traffic personnel
- Barricade requirements
- Diversion planning strategies

### Historical Learning System
Stores previous event information and predictions to enable continuous improvement and future analysis.

### Interactive Dashboard
Provides an intuitive user interface for entering event details and visualizing predictions.

### Geospatial Visualization
Integrates mapping capabilities to visualize event locations and support operational planning.

---

## Technology Stack

### Frontend

- React.js
- JavaScript
- CSS

### Backend

- Python
- Flask

### Machine Learning

- Scikit-learn
- Pandas
- NumPy

### Mapping and Location Services

- Leaflet with OpenStreetMap API
  
### Dataset

- CSV-based historical dataset : Astram event data_anonymized - Astram event data_anonymizedb40ac87.csv

---

## System Workflow

1. User selects location in Map which autofills basic address details.
2. User enters event details through the web interface.
3. Event data is sent to the backend API.
4. The trained machine learning model analyzes the event characteristics.
5. The system predicts traffic impact severity.
6. Resource recommendations are generated.
7. Results are displayed on an interactive dashboard.

---

## Project Structure

```text
GridLock/
│
├── frontend/           # React frontend
├── backend/            # Flask backend
├── models/             # Trained ML models
├── datasets/           # Historical event datasets
├── services/           # API services
├── static/             # Static assets
├── templates/          # HTML templates (if applicable)
├── app.py              # Backend entry point
└── README.md

# Installation

## Clone the Repository

```bash
git clone <repository-url>
cd GridLock
```

## Backend Setup

```bash
cd backend

python -m venv venv

# Windows
venv\Scripts\activate

# Linux/Mac
source venv/bin/activate

pip install -r requirements.txt
```

### Run the Backend Server

```bash
python app.py
```

## Frontend Setup

```bash
cd frontend

npm install
npm start
```

# Future Enhancements

* Integration of real-time traffic feeds.
* Dynamic congestion hotspot visualization.
* Automated diversion route generation.
* Continuous model retraining using post-event data.
* Live operational monitoring dashboard.
* Advanced analytics for traffic authorities.
* Integration of Database.
* Dealing with specific public events.
* Extra Features like analytics,settings and about.
* Integrating Route path.
* Increased accuracy of estimation of Manpower and number of Barricade required using Historical Data. 

# Impact

GridLock enables traffic authorities to move from reactive traffic management to proactive decision-making by:

* Forecasting congestion before it occurs.
* Optimizing manpower deployment.
* Improving road safety and commuter experience.
* Establishing a data-driven post-event learning ecosystem.
* Visual Analytics.

# Developed For

**Flipkart GridLock Hackathon 2.0**

**Theme:** *Event-Driven Congestion (Planned & Unplanned)*

# License

This project is developed for educational and hackathon purposes.
