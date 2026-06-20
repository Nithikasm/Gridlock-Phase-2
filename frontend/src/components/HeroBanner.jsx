import { ShieldCheck, BrainCircuit, TrafficCone } from "lucide-react";

export default function HeroBanner() {

    return (

        <div className="bg-[#0B3C5D] rounded-xl p-8 text-white shadow-lg mb-6">

            <div className="flex justify-between items-center">

                <div>

                    <p className="uppercase tracking-widest text-blue-200 text-sm">

                        Bengaluru Police

                    </p>

                    <h1 className="text-4xl font-bold mt-2">

                        AI Event Impact Assessment System

                    </h1>

                    <p className="mt-4 text-blue-100 max-w-3xl leading-7">

                        Predict road closure requirements from planned and
                        unplanned events using historical event intelligence
                        and recommend operational deployment strategies for
                        traffic police, barricading and diversions.

                    </p>

                </div>

                <div className="flex gap-6">

                    <div className="bg-white/10 p-5 rounded-lg text-center w-40">

                        <ShieldCheck size={40} className="mx-auto mb-3"/>

                        <p className="text-sm">

                            Police Operations

                        </p>

                    </div>

                    <div className="bg-white/10 p-5 rounded-lg text-center w-40">

                        <BrainCircuit size={40} className="mx-auto mb-3"/>

                        <p className="text-sm">

                            AI Decision Engine

                        </p>

                    </div>

                    <div className="bg-white/10 p-5 rounded-lg text-center w-40">

                        <TrafficCone size={40} className="mx-auto mb-3"/>

                        <p className="text-sm">

                            Resource Planning

                        </p>

                    </div>

                </div>

            </div>

        </div>

    );

}