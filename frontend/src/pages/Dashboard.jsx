import { useState } from "react";

import DashboardLayout from "../components/DashboardLayout";
import EventForm from "../components/EventForm";
import PredictionCard from "../components/PredictionCard";
import HistoryTable from "../components/HistoryTable";
import MapPanel from "../components/MapPanel";
import StatCard from "../components/StatCard";

export default function Dashboard() {

    const [prediction, setPrediction] = useState(null);

    const [history, setHistory] = useState([]);

    const [location, setLocation] = useState(null);

    return (

        <DashboardLayout>
            <div id="dashboard-top"></div>
            {/* KPI STRIP */}
            <div className="mb-5"></div>
            <div
                id="dashboard-top"
                className="grid grid-cols-4 gap-4 mb-5"
            >
                <StatCard
                    title="Assessments"
                    value={history.length}
                    subtitle="Today"
                />

                <StatCard
                    title="Critical Events"
                    value={history.filter(x => x.prob > 0.6).length}
                    subtitle="High Risk"
                />

                <StatCard
                    title="Average Risk"
                    value={
                        history.length
                            ? (
                                  history.reduce((a, b) => a + b.prob, 0) /
                                  history.length *
                                  100
                              ).toFixed(1) + "%"
                            : "0%"
                    }
                    subtitle="AI Score"
                />

                <StatCard
                    title="System Status"
                    value="ONLINE"
                    subtitle="Operational"
                />

            </div>

            {/* MAP + AI */}

            <div className="grid grid-cols-12 gap-5 mb-5">

                <div className="col-span-9">

                    <MapPanel
                        setLocation={setLocation}
                    />

                </div>

                <div className="col-span-3">

                    <PredictionCard
                        prediction={prediction}
                    />

                </div>

            </div>

            {/* FORM */}

            <div className="mb-5">
    
                <EventForm

                    location={location}

                    setPrediction={setPrediction}

                    setHistory={setHistory}

                />

            </div>

            {/* HISTORY */}
            <div id="history-section">
                <HistoryTable history={history} />
            </div>

        </DashboardLayout>

    );

}