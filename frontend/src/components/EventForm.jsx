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

    setFormData((prev) => ({
    ...prev,
    latitude: location.latitude,
    longitude: location.longitude,
    address: location.address,
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

    const submit = async () => {

        const res = await predictEvent(form);

        setPrediction(res.data);

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

                <h2 className="text-2xl font-bold text-[#0B3C5D]">

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
                            className={field}
                            placeholder="Police Station"
                            name="police_station"
                            onChange={update}
                        />

                        <input
                            className={field}
                            placeholder="Corridor"
                            name="corridor"
                            onChange={update}
                        />

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
                    className="w-full bg-[#005BAC] hover:bg-[#00498c] text-white font-bold py-4 rounded-md transition"
                >

                    RUN AI IMPACT ASSESSMENT

                </button>

            </div>

        </div>

    );

}