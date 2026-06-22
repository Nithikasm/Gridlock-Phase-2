export default function Footer() {
  return (
    <footer className="bg-[#0B426A] text-white rounded-lg mt-5">
      <div className="px-8 py-8">

        <div className="grid grid-cols-2 gap-8">

          <div>
            <p className="text-lg font-semibold">
              AI Traffic Operations
            </p>
            <p className="text-lg font-semibold">
              Command Center
            </p>
            <p className="text-gray-300 mt-2">
              Bengaluru Traffic Managment
            </p>
          </div>

          <div>
            <p className="text-lg font-semibold">
              Gridlock Hackathon 2.0
            </p>
            
            <p className="text-gray-300 mt-2">
              Official Hackathon Challenge
            </p>
          </div>

        </div>

        <div className="border-t-2 border-white/25 my-6"></div>

        <p className="text-gray-200" font-medium>
          Devolped by Team StackZen
        </p>

        <p className="text-gray-400 text-sm mt-4">
          © 2026 Traffic Operations Decision Support Platform
        </p>

      </div>
    </footer>
  );
}