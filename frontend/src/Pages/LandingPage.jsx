import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  LuSparkles,
  LuCode,
  LuCpu,
  LuZap,
  LuUsers,
  LuBookOpen,
  LuGraduationCap,
  LuArrowRight,
} from "react-icons/lu";
import HERO_IMG from "../assets/Hero.png";
import { UserContext } from "../Context/userContext";
import Modal from "../components/Modal";
import Login from "../Pages/Auth/Login";
import SignUp from "../Pages/Auth/SignUp";
import ProfileInfoCard from "../components/Cards/ProfileInfoCard";
import { FaLaptopCode } from "react-icons/fa6";


const PLATFORM_FEATURES = [
  {
    id: 1,
    title: "AI Interview Prep",
    description:
      "Practice with dynamic questions and get instant AI feedback on your coding, system design, and behavioral answers.",
    icon: LuCpu,
    gradient: "from-blue-500 to-cyan-500",
    benefits: [
      "Personalized questions",
      "Real-time feedback",
      "Progress tracking",
    ],
  },
  {
    id: 2,
    title: "React Component Generator",
    description:
      "Learn React faster by generating components and understanding best practices through AI examples.",
    icon: LuCode,
    gradient: "from-purple-500 to-pink-500",
    benefits: ["Learning templates", "Best practices", "Code examples"],
  },
  {
    id: 3,
    title: "AI Code Reviewer",
    description:
      "Improve your coding skills with detailed feedback on your solutions and algorithms.",
    icon: LuZap,
    gradient: "from-amber-500 to-orange-500",
    benefits: ["Bug detection", "Optimization tips", "Learning feedback"],
  },
  {
    id: 4,
    title: "Resume Analyzer",
    description:
      "Get constructive feedback on your resume to better showcase your skills and projects.",
    icon: LuSparkles,
    gradient: "from-emerald-500 to-teal-500",
    benefits: ["Skill highlighting", "Project presentation", "Format guidance"],
  },
  {
    id: 5,
    title: "Study Clipboard",
    description:
      "Save and organize your learning materials, code snippets, and study notes in one place.",
    icon: LuBookOpen,
    gradient: "from-indigo-500 to-blue-500",
    benefits: ["Organization", "Quick reference", "Study materials"],
  },
];

const LEARNING_STATS = [
  { value: "10k+", label: "Active Learners" },
  { value: "50k+", label: "Practice Sessions" },
  { value: "95%", label: "Reported Improvement" },
  { value: "2.5x", label: "Faster Learning" },
];

function LandingPage() {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [openAuthModal, setOpenAuthModal] = useState(false);
  const [currentPage, setCurrentPage] = useState("login");
  const [hoveredFeature, setHoveredFeature] = useState(null);

  const handleCTA = () => {
    if (!user) setOpenAuthModal(true);
    else navigate("/interview");
  };

  return (
    <>
      <div className="w-screen min-h-screen bg-gradient-to-br from-gray-900 via-gray-900 to-black text-gray-100 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"></div>
        </div>

        {/* Header */}
        <header className="relative z-10 w-full p-6 md:p-12 flex justify-between items-center">
          <div className="flex items-center gap-3">
            {/* <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
              <LuGraduationCap className="text-white text-lg" />
            </div> */}
            <h1 className="flex items-center gap-2 text-xl md:text-2xl font-bold bg-gradient-to-r from-gray-100 to-gray-300 bg-clip-text text-transparent">
              <FaLaptopCode className="text-purple-800 text-4xl" />
              Interview Ready AI
            </h1>
          </div>
          {user ? (
            <ProfileInfoCard />
          ) : (
            <button
              className="bg-gradient-to-r from-blue-600 to-purple-600 px-5 py-2 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
              onClick={() => setOpenAuthModal(true)}
            >
              Start Learning
            </button>
          )}
        </header>

        {/* Hero Section */}
        <section className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 px-6 md:px-12 pb-20">
          <div className="md:w-1/2 flex flex-col gap-6">
            <div className="inline-flex items-center gap-2 bg-gray-800/50 border border-gray-700 rounded-full px-4 py-2 w-fit mb-4">
              <LuUsers className="text-green-400" />
              <span className="text-sm">
                Join 10,000+ developers learning together
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
              Master Coding
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400">
                {" "}
                Interviews
              </span>
            </h1>

            <p className="text-gray-300 text-lg md:text-xl leading-relaxed">
              Your all-in-one learning platform to practice coding interviews,
              improve your skills, and get AI-powered feedback. Built by
              developers to help you succeed in your career journey.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mt-6">
              <button
                className="group bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 flex items-center gap-2 justify-center"
                onClick={handleCTA}
              >
                Start Practicing
                <LuArrowRight className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Learning Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8">
              {LEARNING_STATS.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-gray-100 to-gray-300 bg-clip-text text-transparent">
                    {stat.value}
                  </div>
                  <div className="text-gray-400 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="md:w-1/2 relative">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl blur-lg opacity-20"></div>
              <img
                src={HERO_IMG}
                alt="Learning Platform"
                className="relative rounded-xl shadow-2xl border border-gray-700/50 backdrop-blur-sm"
              />
            </div>

            {/* Learning indicators */}
            <div className="absolute -bottom-6 -left-6 bg-gray-800/80 backdrop-blur-sm border border-gray-700 rounded-lg p-4 shadow-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                  <LuBookOpen className="text-green-400" />
                </div>
                <div>
                  <div className="text-white font-semibold">
                    Active Learners
                  </div>
                  <div className="text-gray-400 text-sm">
                    10,000+ practicing
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-20">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-gray-100 to-gray-300 bg-clip-text text-transparent mb-6">
              Your Complete Learning Toolkit
            </h2>
            <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto">
              Everything you need to prepare for technical interviews and
              improve your programming skills in one place.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {PLATFORM_FEATURES.map((feature) => (
              <div
                key={feature.id}
                className="group bg-gray-800/30 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-6 hover:border-gray-600 transition-all duration-500 hover:transform hover:-translate-y-1 relative overflow-hidden"
                onMouseEnter={() => setHoveredFeature(feature.id)}
                onMouseLeave={() => setHoveredFeature(null)}
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-600"></div>

                <div
                  className={`w-14 h-14 bg-gradient-to-r ${feature.gradient} rounded-xl flex items-center justify-center mb-6 shadow-lg`}
                >
                  <feature.icon className="text-white text-xl" />
                </div>

                <h3 className="text-white font-bold text-xl mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-400 mb-4 leading-relaxed">
                  {feature.description}
                </p>

                <ul className="space-y-2">
                  {feature.benefits.map((benefit, index) => (
                    <li
                      key={index}
                      className="flex items-center gap-2 text-sm text-gray-300"
                    >
                      <LuArrowRight className="text-blue-400 flex-shrink-0 text-xs" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* How It Works Section */}
        <section className="relative z-10 max-w-6xl mx-auto px-6 md:px-12 py-20">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-100 to-gray-300 bg-clip-text text-transparent mb-6">
              Start Learning in 3 Simple Steps
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl">
                1
              </div>
              <h3 className="text-white font-semibold text-lg mb-3">
                Create Account
              </h3>
              <p className="text-gray-400">
                Sign up and set up your learning profile in seconds
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl">
                2
              </div>
              <h3 className="text-white font-semibold text-lg mb-3">
                Choose Your Practice
              </h3>
              <p className="text-gray-400">
                Select interview prep, code review, or resume analysis
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl">
                3
              </div>
              <h3 className="text-white font-semibold text-lg mb-3">
                Learn & Improve
              </h3>
              <p className="text-gray-400">
                Get instant AI feedback and track your progress
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative z-10 text-center px-6 md:px-12 py-24">
          <div className="max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-gray-800/50 border border-gray-700 rounded-full px-4 py-2 w-fit mb-6">
              <LuGraduationCap className="text-blue-400" />
              <span className="text-sm">
                Free learning platform for developers
              </span>
            </div>

            <h2 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-6">
              Ready to Level Up Your Skills?
            </h2>

            <p className="text-gray-300 text-lg md:text-xl mb-8 max-w-2xl mx-auto">
              Join thousands of developers who are improving their coding skills
              and interview readiness with AI-powered learning.
            </p>

            <button
              className="group bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-purple-500/30 flex items-center gap-2 mx-auto"
              onClick={handleCTA}
            >
              Start Learning Now
              <LuArrowRight className="group-hover:translate-x-1 transition-transform" />
            </button>

            <div className="mt-6 text-gray-400 text-sm">
              Completely free • No subscription • Built for learning
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="relative z-10 w-full py-8 bg-gray-900/50 backdrop-blur-sm border-t border-gray-800 text-center text-gray-500">
          <div className="max-w-6xl mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <FaLaptopCode className="text-purple-800 text-3xl" />
                  <span className="text-white font-semibold text-xl md:text-2xl">
                    Interview Ready AI
                  </span>
                </div>
              </div>
              <div className="text-sm">
                Made with ❤️ by DeshDeepak
              </div>
              <div className="text-sm text-gray-400">
                Free learning platform • Open to all
              </div>
            </div>
          </div>
        </footer>
      </div>

      {/* Auth Modal */}
      <Modal
        isOpen={openAuthModal}
        onClose={() => {
          setOpenAuthModal(false);
          setCurrentPage("login");
        }}
        hideHeader
      >
        <div className="bg-gray-800 rounded-lg">
          {currentPage === "login" && <Login setCurrentPage={setCurrentPage} />}
          {currentPage === "signup" && (
            <SignUp setCurrentPage={setCurrentPage} />
          )}
        </div>
      </Modal>
    </>
  );
}

export default LandingPage;
