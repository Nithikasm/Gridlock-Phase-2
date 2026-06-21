import React from "react";
import {
    LayoutDashboard,
    ClipboardList,
    History,
    BarChart3,
    Settings,
    Info
} from "lucide-react";

const menu = [
    {
        name: "Dashboard",
        target: "dashboard-top",
        icon: LayoutDashboard,
    },
    {
        name: "Assessment",
        target: "assessment-section",
        icon: ClipboardList,
    },
    {
        name: "History",
        target: "history-section",
        icon: History,
    },
];

const Sidebar = ({ activeSection, setActiveSection }) => {
    return (
        <aside className="w-64 bg-white border-r border-[#D6DCE5] h-full">

            <div className="py-6">

                {menu.map((item) => {

                    const Icon = item.icon;

                    return (

                        <button
                            key={item.name}
                            onClick={() => {
                                document
                                    .getElementById(item.target)
                                    ?.scrollIntoView({
                                        behavior: "smooth",
                                        block: "start",
                                    });
                            }}
                            className="w-full px-6 py-4 flex items-center gap-4 hover:bg-blue-50 transition text-gray-700 font-medium"
                        >

                            <Icon size={20} />

                            {item.name}

                        </button>

                    );
                })}

            </div>

        </aside>
    );
};

export default Sidebar;