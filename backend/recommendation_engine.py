def generate_recommendations(probability, event_cause):
    """
    Generate operational recommendations based on
    road closure probability and event cause.
    """

    # ----------------------------
    # Base Recommendation
    # ----------------------------

    if probability < 0.30:

        recommendation = {
            "Road Closure": "No",
            "Police Deployment": "2–4 Officers",
            "Barricades":  "0–2 Units",
            "Diversion":  "Not Required"
        }

    elif probability < 0.60:

        recommendation = {
            "Road Closure": "Consider Partial Closure",
            "Police Deployment": "5–8 Officers",
            "Barricades":  "3–5 Units",
            "Diversion": "Local Diversion"
        }

    else:

        recommendation = {
            "Road Closure": "Yes",
            "Police Deployment": "8–12 Officers",
            "Barricades": "6–10 Units",
            "Diversion": "Major Diversion"
        }

    # ----------------------------
    # Event Overrides
    # ----------------------------

    if event_cause == "vip_movement":

        if recommendation["Police Deployment"] == "Low":
            recommendation["Police Deployment"] = "Medium"

        elif recommendation["Police Deployment"] == "Medium":
            recommendation["Police Deployment"] = "High"

    if event_cause in ["procession", "protest"] and probability >= 0.30:
        recommendation["Barricades"] = "Required"

    if event_cause == "construction" and probability >= 0.60:
        recommendation["Diversion"] = "Required"

    recommendation["Closure Probability"] = round(float(probability), 3)

    return recommendation