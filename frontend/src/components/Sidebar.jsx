import { useState } from "react";
import { LuCpu, LuCode, LuZap, LuSparkles, LuClipboard } from "react-icons/lu";
import { useNavigate } from "react-router-dom";

const services = [
  { id: 1, name: "Interview Prep", icon: LuCpu, path: "/interview" },
  { id: 2, name: "React Generator", icon: LuCode, path: "/generator" },
  { id: 3, name: "Code Reviewer", icon: LuZap, path: "/reviewer" },
  { id: 4, name: "Resume Analyzer", icon: LuSparkles, path: "/resume" },
  { id: 5, name: "Pastes / Clipboard", icon: LuClipboard, path: "/pastes" },
];

export default function Sidebar() {
  const [hovered, setHovered] = useState(false);
  const navigate = useNavigate();

  return (
    <div
      className={`fixed top-0 left-0 h-screen bg-gray-900 shadow-lg transition-all duration-300 ${
        hovered ? "w-48" : "w-16"
      } flex flex-col justify-start items-start z-50`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Logo / Brand */}
      <div className="w-full flex items-center justify-center py-6">
        <div
          className={`text-white font-bold text-lg transition-all duration-300 ${
            hovered ? "opacity-100" : "opacity-0"
          }`}
        >
          AI SaaS
        </div>
      </div>

      {/* Navigation Items */}
      <nav className="flex flex-col w-full mt-4">
        {services.map((service) => {
          const Icon = service.icon;
          return (
            <div
              key={service.id}
              className="flex items-center gap-4 w-full cursor-pointer px-4 py-3 hover:bg-gray-700 transition-colors duration-200"
              onClick={() => navigate(service.path)}
            >
              <Icon className="text-white text-xl" />
              <span
                className={`text-white font-medium transition-all duration-300 ${
                  hovered ? "opacity-100" : "opacity-0 w-0 overflow-hidden"
                }`}
              >
                {service.name}
              </span>
            </div>
          );
        })}
      </nav>
    </div>
  );
}
