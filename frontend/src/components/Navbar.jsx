import React, { useEffect, useState } from "react";

const Navbar = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <header className="bg-[#0B3C5D] text-white h-20 shadow-md flex items-center justify-between px-8 border-b border-blue-900">

      <div>
        <h1 className="text-2xl font-bold tracking-wide">
          Bengaluru Police
        </h1>

        <p className="text-sm opacity-90">
          Traffic Operations Command Center
        </p>

        <p className="text-xs opacity-70">
          AI Event Impact Assessment System
        </p>
      </div>

      <div className="flex gap-10 items-center">

        <div className="text-right">
          <p className="text-xs text-blue-200">
            Officer
          </p>

          <p className="font-semibold">
            Control Room
          </p>
        </div>

        <div className="text-right">
          <p className="text-xs text-blue-200">
            System Status
          </p>

          <div className="flex items-center justify-end gap-2">

            <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>

            <span className="font-semibold">
              Operational
            </span>

          </div>
        </div>

        <div className="text-right">
          <p className="text-xs text-blue-200">
            Date & Time
          </p>

          <p className="font-semibold">
            {time.toLocaleString()}
          </p>
        </div>

      </div>

    </header>
  );
};

export default Navbar;