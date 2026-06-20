import React from "react";

const HistoryTable = ({ history }) => {

    return (

        <div className="bg-white rounded-xl border border-[#D6DCE5] shadow-sm p-6 min-h-[260px]">

            <h2 className="text-xl font-bold text-[#0B3C5D] mb-5">

                Recent Assessments

            </h2>

            <table className="w-full">

                <thead className="bg-slate-50">

                    <tr>

                    <th className="text-left p-4">

                    Timestamp

                    </th>

                    <th className="text-left">

                    Event

                    </th>

                    <th className="text-left">

                    Zone

                    </th>

                    <th className="text-left">

                    Risk Score

                    </th>

                    </tr>

                </thead>

                <tbody>

                {history.length === 0 ? (

                    <tr>

                        <td
                            colSpan={4}
                            className="text-center py-10 text-gray-500"
                        >

                            No assessments have been generated yet.

                        </td>

                    </tr>

                ) : (

                    history.map((item, index) => (

                        <tr
                            key={index}
                            className="hover:bg-slate-50 transition border-b"
                        >

                            <td className="p-4">
                                {item.time}
                            </td>

                            <td>
                                {item.event}
                            </td>

                            <td>
                                {item.zone}
                            </td>

                            <td>

                                <span
                                    className={`px-3 py-1 rounded-full text-white text-sm ${
                                        item.prob > 0.6
                                            ? "bg-red-600"
                                            : item.prob > 0.3
                                            ? "bg-orange-500"
                                            : "bg-green-600"
                                    }`}
                                >

                                    {(item.prob * 100).toFixed(1)}%

                                </span>

                            </td>

                        </tr>

                    ))

                )}

            </tbody>

            </table>

        </div>

    );

};

export default HistoryTable;