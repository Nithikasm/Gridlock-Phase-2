import { useEffect, useState } from "react";

export default function PredictionCard({ prediction }) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!prediction) {
      setDisplayValue(0);
      return;
    }

    const target = Math.round(
      prediction.road_closure_probability * 100
    );

    let current = 0;

    const interval = setInterval(() => {
      current += 1;

      if (current >= target) {
        current = target;
        clearInterval(interval);
      }

      setDisplayValue(current);
    }, 15);

    return () => clearInterval(interval);
  }, [prediction]);

  const probability =
    prediction?.road_closure_probability || 0;

  const percentage = Math.round(probability * 100);

  const recommendation =
    prediction?.recommendation || null;

  const radius = 85;
  const stroke = 12;

  const normalizedRadius = radius - stroke * 0.5;

  const circumference =
    normalizedRadius * 2 * Math.PI;

  const strokeDashoffset =
    circumference -
    (displayValue / 100) * circumference;

  const getRiskLevel = () => {
    if (percentage >= 60)
      return {
        label: "HIGH RISK",
        color: "#C62828",
      };

    if (percentage >= 30)
      return {
        label: "MEDIUM RISK",
        color: "#F9A825",
      };

    return {
      label: "LOW RISK",
      color: "#2E7D32",
    };
  };

  const risk = getRiskLevel();

  return (
    <div className="bg-white border border-[#D8DEE6] rounded-lg p-6 h-full">

      <div className="border-b border-[#D8DEE6] pb-3 mb-5">
        <h3 className="text-sm font-semibold tracking-wide text-gray-700 uppercase">
          AI Risk Engine
        </h3>
      </div>

      {!prediction ? (
        <div className="h-[420px] flex items-center justify-center text-center text-gray-500">
          Run an assessment to view risk analysis
        </div>
      ) : (
        <>
          <div className="flex justify-center">
            <div className="relative w-[220px] h-[220px]">

              <svg
                height="220"
                width="220"
                className="rotate-[-90deg]"
              >
                <circle
                  stroke="#E5E7EB"
                  fill="transparent"
                  strokeWidth={stroke}
                  r={normalizedRadius}
                  cx="110"
                  cy="110"
                />

                <circle
                  stroke={risk.color}
                  fill="transparent"
                  strokeWidth={stroke}
                  strokeLinecap="round"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  r={normalizedRadius}
                  cx="110"
                  cy="110"
                  style={{
                    transition:
                      "stroke-dashoffset 1.2s ease-in-out",
                  }}
                />
              </svg>

              <div className="absolute inset-0 flex flex-col items-center justify-center">

                <span className="text-4xl font-bold text-gray-900">
                  {displayValue}%
                </span>

                <span
                  className="mt-2 text-sm font-semibold tracking-wide"
                  style={{ color: risk.color }}
                >
                  {risk.label}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-6 space-y-3">

            <InfoRow
              label="Road Closure"
              value={recommendation?.["Road Closure"]}
            />

            <InfoRow
              label="Police Deployment"
              value={
                recommendation?.["Police Deployment"]
              }
            />

            <InfoRow
              label="Barricades"
              value={recommendation?.["Barricades"]}
            />

            <InfoRow
              label="Diversion"
              value={recommendation?.["Diversion"]}
            />
          </div>
          

        </>
      )}
      
    </div>
  );
}

function InfoRow({ label, value }) {
  return (
    <div className="flex justify-between items-center py-2 border-b border-gray-100">

      <span className="text-sm text-gray-600">
        {label}
      </span>

      <span className="text-sm font-semibold text-gray-900 text-right">
        {value}
      </span>
    </div>
  );
}