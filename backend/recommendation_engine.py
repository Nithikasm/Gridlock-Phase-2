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
            "Police Deployment": "Low",
            "Barricades": "No",
            "Diversion": "No"
        }

    elif probability < 0.60:

        recommendation = {
            "Road Closure": "Consider Partial Closure",
            "Police Deployment": "Medium",
            "Barricades": "Key Junctions",
            "Diversion": "Local Diversion"
        }

    else:

        recommendation = {
            "Road Closure": "Yes",
            "Police Deployment": "High",
            "Barricades": "Required",
            "Diversion": "Required"
        }

    # ----------------------------
    # Event Overrides
    # ----------------------------

    if event_cause == "vip_movement":

        if recommendation["Police Deployment"] == "Low":
            recommendation["Police Deployment"] = "Medium"

        elif recommendation["Police Deployment"] == "Medium":
            recommendation["Police Deployment"] = "High"

    if event_cause == "procession":
        recommendation["Barricades"] = "Required"

    if event_cause == "protest":
        recommendation["Barricades"] = "Required"

    if event_cause == "construction" and probability >= 0.60:
        recommendation["Diversion"] = "Required"

    recommendation["Closure Probability"] = round(float(probability), 3)

    return recommendation