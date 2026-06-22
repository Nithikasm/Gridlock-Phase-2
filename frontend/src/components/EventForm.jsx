import React, { useEffect, useState } from "react";
import {
    Calendar,
    MapPin,
    Flag,
    Shield,
    Building2,
    FileText
} from "lucide-react";

import { getMetadata, predictEvent } from "../services/api";

export default function EventForm({location,setPrediction,setHistory}) {

    const [meta, setMeta] = useState({});

    const [form, setForm] = useState({
        event_type: "",
        event_cause: "",
        priority: "",
        zone: "",
        police_station: "",
        corridor: "",
        Day_of_Week: "",
        description: "",
        latitude: "",
        longitude: "",
        address: ""
    });

 useEffect(() => {
  if (!location) return;

  console.log("Form updated from map:", location);

  setForm((prev) => ({
    ...prev,
    latitude: location.latitude,
    longitude: location.longitude,
    address: location.address || "",
    police_station: location.police_station || "",
  }));
}, [location]);

    useEffect(() => {

        getMetadata().then(res => {

            setMeta(res.data);

        });

    }, []);

    const update = (e) => {

        setForm({

            ...form,

            [e.target.name]: e.target.value

        });

    };

    const isFormComplete =
    form.event_type &&
    form.event_type !== "Event Type" &&

    form.event_cause &&
    form.event_cause !== "Event Cause" &&

    form.priority &&
    form.priority !== "Priority" &&

    form.Day_of_Week &&
    form.Day_of_Week !== "Day of Week" &&

    form.zone &&
    form.zone !== "Zone" &&

    form.corridor &&
    form.latitude &&
    form.longitude &&
    form.address &&
    form.police_station;

    const submit = async () => {

    const payload = {
        ...form,
        description_missing:
            form.description.trim() === "" ? 1 : 0
    };

    console.log(payload);

    const res = await predictEvent(payload);

    setPrediction(res.data);

    setTimeout(() => {
        console.log("SCROLL TRIGGERED");
        document
            .getElementById("dashboard-top")
            ?.scrollIntoView({
            behavior: "smooth",
            block: "start",
            });
        }, 100);

    setHistory(prev => [
        {
            time: new Date().toLocaleTimeString(),
            event: form.event_type,
            zone: form.zone,
            prob: res.data.road_closure_probability
        },
        ...prev
    ]);
};

    const field =
        "w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-blue-600 focus:outline-none";

    return (

        <div className="bg-white rounded-lg shadow-sm border border-gray-200">

            <div className="border-b p-5">

                <h2
                    id="assessment-section"
                    className="text-xl font-semibold text-gray-900"
                >
                    Event Assessment Form
                </h2>

                <p className="text-sm text-gray-500 mt-1">

                    Operational Event Information

                </p>

            </div>

            <div className="p-5 space-y-6">

                <div>

                    <div className="flex items-center gap-2 mb-3">

                        <Flag size={18}/>

                        <h3 className="font-semibold">

                            Event Details

                        </h3>

                    </div>

                    <div className="grid grid-cols-2 gap-4">

                        <select
                            className={field}
                            name="event_type"
                            onChange={update}
                        >

                            <option>Event Type</option>

                            {meta.event_type?.map(x =>
                                <option key={x}>{x}</option>
                            )}

                        </select>

                        <select
                            className={field}
                            name="event_cause"
                            onChange={update}
                        >

                            <option>Event Cause</option>

                            {meta.event_cause?.map(x =>
                                <option key={x}>{x}</option>
                            )}

                        </select>

                    </div>

                </div>

                <div>

                    <div className="flex items-center gap-2 mb-3">

                        <Shield size={18}/>

                        <h3 className="font-semibold">

                            Operational Priority

                        </h3>

                    </div>

                    <div className="grid grid-cols-2 gap-4">

                        <select
                            className={field}
                            name="priority"
                            onChange={update}
                        >

                            <option>Priority</option>

                            {meta.priority?.map(x =>
                                <option key={x}>{x}</option>
                            )}

                        </select>

                        <select
                            className={field}
                            name="Day_of_Week"
                            onChange={update}
                        >

                            <option>Day of Week</option>

                            {meta.day_of_week?.map(x =>
                                <option key={x}>{x}</option>
                            )}

                        </select>

                    </div>

                </div>

                <div>

                    <div className="flex items-center gap-2 mb-3">

                        <Building2 size={18}/>

                        <h3 className="font-semibold">

                            Jurisdiction

                        </h3>

                    </div>

                    <div className="grid grid-cols-3 gap-4">

                        <select
                            className={field}
                            name="zone"
                            onChange={update}
                        >

                            <option>Zone</option>

                            {meta.zone?.map(x =>
                                <option key={x}>{x}</option>
                            )}

                        </select>    

                            <input
                                className={`${field} bg-slate-50`}
                                name="police_station"
                                placeholder="Police Station"
                                value={form.police_station || ""}
                                readOnly
                            />


                        <select
                            className={field}
                            name="corridor"
                            value={form.corridor}
                            onChange={update}
                        >
                            <option value="">Select Corridor</option>

                            <option value="Non-corridor">Non-corridor</option>
                            <option value="ORR East 2">ORR East 2</option>
                            <option value="ORR North 1">ORR North 1</option>
                            <option value="Mysore Road">Mysore Road</option>
                            <option value="Bellary Road 2">Bellary Road 2</option>
                            <option value="Airport New South Road">Airport New South Road</option>
                            <option value="ORR East 1">ORR East 1</option>
                            <option value="Bellary Road 1">Bellary Road 1</option>
                            <option value="Magadi Road">Magadi Road</option>
                            <option value="Old Madras Road">Old Madras Road</option>
                        </select>
                    </div>

                </div>

                <div>

                    <div className="flex items-center gap-2 mb-3">

                        <MapPin size={18}/>

                        <h3 className="font-semibold">

                            Location Information

                        </h3>

                    </div>

                    <input
                        disabled
                        value={location?.latitude || ""}
                        className={`${field} bg-gray-100 mb-3`}
                        placeholder="Latitude"
                    />

                    <input
                        disabled
                        value={location?.longitude || ""}
                        className={`${field} bg-gray-100 mb-3`}
                        placeholder="Longitude"
                    />

                    <textarea
                        disabled
                        value={location?.address || ""}
                        className={`${field} bg-gray-100`}
                        rows="2"
                        placeholder="Address"
                    />

                </div>

                <div>

                    <div className="flex items-center gap-2 mb-3">

                        <FileText size={18}/>

                        <h3 className="font-semibold">

                            Event Description

                        </h3>

                    </div>

                    <textarea
                        rows="5"
                        name="description"
                        onChange={update}
                        className={field}
                        placeholder="Provide operational details..."
                    />

                </div>

                <button
    onClick={submit}
    disabled={!isFormComplete}
    className={`w-full font-bold py-4 rounded-md transition ${
        isFormComplete
            ? "bg-[#005BAC] hover:bg-[#00498c] text-white"
            : "bg-gray-300 text-gray-500 cursor-not-allowed"
    }`}
>

    RUN AI IMPACT ASSESSMENT

</button>

            </div>

        </div>

    );

}