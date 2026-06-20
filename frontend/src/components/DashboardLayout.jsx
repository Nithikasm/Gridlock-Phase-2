import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

export default function DashboardLayout({ children }) {
    return (
        <div className="h-screen bg-[#F3F5F7] flex flex-col">

            <Navbar />

            <div className="flex flex-1 overflow-hidden">

                <Sidebar />

                <main className="flex-1 overflow-y-auto p-6">

                    {children}

                </main>

            </div>

        </div>
    );
}