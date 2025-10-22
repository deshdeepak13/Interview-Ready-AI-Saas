import { useState } from "react";
import {
  LuCpu,
  LuCode,
  LuZap,
  LuSparkles,
  LuClipboard,
  LuLogOut,
} from "react-icons/lu";
import { useNavigate, useLocation } from "react-router-dom";
import { FaLaptopCode } from "react-icons/fa6";

const services = [
  { id: 1, name: "Interview Prep", icon: LuCpu, path: "/interview" },
  { id: 2, name: "Component Generator", icon: LuCode, path: "/generator" },
  { id: 3, name: "Code Reviewer", icon: LuZap, path: "/reviewer" },
  { id: 4, name: "Resume Analyzer", icon: LuSparkles, path: "/resume" },
  { id: 5, name: "Pastes / Clipboard", icon: LuClipboard, path: "/pastes" },
];

export default function Sidebar() {
  const [hovered, setHovered] = useState(false);
  const navigate = useNavigate();
  const location = useLocation(); // to detect active route

  const handleLogout = () => {
    // Optional: clear auth/localStorage
    // localStorage.clear();
    navigate("/login");
  };
  

  return (
    
    <div
      className={`fixed top-0 left-0 h-screen bg-gray-900 shadow-lg transition-all duration-300 ${
        hovered ? "w-60" : "w-16"
      } flex flex-col justify-between items-start z-50`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Top Section */}
      <div className="w-full">
        {/* Logo / Brand */}
        <div className="w-full flex items-center justify-center py-6">
  <div className="flex items-center gap-2">
    {/* Icon stays visible always */}
    <FaLaptopCode className="text-white text-2xl flex-shrink-0" />

    {/* Text fades, icon never does */}
    <span
      className={`text-white font-bold text-lg whitespace-nowrap transition-all duration-300 origin-left ${
        hovered ? "opacity-100 scale-100 ml-2" : "opacity-0 scale-95 ml-0"
      }`}
    >
      Interview Ready AI
    </span>
  </div>
</div>


        {/* Navigation Items */}
        <nav className="flex flex-col w-full mt-4">
          {services.map((service) => {
            const Icon = service.icon;
            const isActive = location.pathname === service.path;

            return (
              <div
                key={service.id}
                className={`flex items-center gap-4 w-full cursor-pointer px-4 py-3 transition-colors duration-200 ${"hover:bg-gray-700"}`}
                onClick={() => navigate(service.path)}
              >
                <Icon
                  className={`text-xl transition-colors duration-200 ${
                    isActive
                      ? hovered
                        ? "text-orange-500" // active link color in expanded state
                        : "text-orange-400" // active icon color in collapsed state
                      : "text-white"
                  }`}
                />
                <span
                  className={` font-medium transition-all duration-300 ${
                    hovered ? "opacity-100" : "opacity-0 w-0 overflow-hidden"
                  }
                  ${isActive ? "text-orange-500" : ""}`}
                >
                  {service.name}
                </span>
              </div>
            );
          })}
        </nav>
      </div>

      {/* Bottom Section - Logout */}
      <div
        className="w-full px-4 py-4 border-t border-gray-800 cursor-pointer hover:bg-gray-800 transition-colors duration-200 flex items-center gap-4"
        onClick={handleLogout}
      >
        <LuLogOut className="text-red-400 text-xl" />
        <span
          className={`text-red-400 font-medium transition-all duration-300 ${
            hovered ? "opacity-100" : "opacity-0 w-0 overflow-hidden"
          }`}
        >
          Logout
        </span>
      </div>
    </div>
  );
}
