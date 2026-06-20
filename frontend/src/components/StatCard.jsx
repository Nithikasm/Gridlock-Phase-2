import React from "react";

export default function StatCard({

    title,

    value,

    subtitle

}) {

    return (

        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 hover:shadow-md transition">

            <p className="text-gray-500 uppercase tracking-wide text-xs">

                {title}

            </p>

            <h2 className="text-4xl font-bold mt-4 text-[#0B3C5D]">

                {value}

            </h2>

            <p className="text-gray-400 mt-3 text-sm">

                {subtitle}

            </p>

        </div>

    );

}