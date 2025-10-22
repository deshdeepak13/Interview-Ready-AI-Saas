import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LuSparkles, LuCode, LuCpu, LuZap } from "react-icons/lu";
import HERO_IMG from "../assets/Hero.png";
import { UserContext } from "../Context/userContext";
import Modal from "../components/Modal";
import Login from "../Pages/Auth/Login";
import SignUp from "../Pages/Auth/SignUp";
import ProfileInfoCard from "../components/Cards/ProfileInfoCard";

const PLATFORM_FEATURES = [
  {
    id: 1,
    title: "AI Interview Prep",
    description: "Practice coding challenges, system design, and behavioral questions with instant AI feedback.",
    icon: LuCpu,
  },
  {
    id: 2,
    title: "React Component Generator",
    description: "Generate production-ready React components in seconds, ready to integrate into your projects.",
    icon: LuCode,
  },
  {
    id: 3,
    title: "Code Reviewer",
    description: "Analyze your code for bugs, optimization, and best practices using AI-powered reviews.",
    icon: LuZap,
  },
  {
    id: 4,
    title: "Resume Analyzer",
    description: "Upload your resume and get structured feedback on strengths, weaknesses, and ATS optimization tips.",
    icon: LuSparkles,
  },
  {
    id: 5,
    title: "AI Clipboard / Pastes",
    description: "Save text, code, or JSON snippets for future use. Access them anytime—perfect for reusable templates and notes.",
    icon: LuSparkles, // Or another relevant icon
  },
];


function LandingPage() {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [openAuthModal, setOpenAuthModal] = useState(false);
  const [currentPage, setCurrentPage] = useState("login");

  const handleCTA = () => {
    if (!user) setOpenAuthModal(true);
    else navigate("/interview");
  };

  return (
    <>
      <div className="w-screen min-h-screen bg-gradient-to-br from-gray-900 to-black text-gray-100 p-6 md:p-12 flex flex-col gap-16">
        
        {/* Header */}
        <header className="w-full flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
              <LuCode className="text-white text-lg" />
            </div>
            <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-gray-100 to-gray-300 bg-clip-text text-transparent">
              DevAI Suite
            </h1>
          </div>
          {user ? <ProfileInfoCard /> : (
            <button
              className="bg-gradient-to-r from-blue-600 to-purple-600 px-5 py-2 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700"
              onClick={() => setOpenAuthModal(true)}
            >
              Login / Sign Up
            </button>
          )}
        </header>

        {/* Hero Section */}
        <section className="flex flex-col md:flex-row items-center md:justify-between gap-8">
          <div className="md:w-1/2 flex flex-col gap-4">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">AI-Powered</span> Coding Companion
            </h1>
            <p className="text-gray-300 text-lg">
              From interview prep to code generation, review, and resume analysis—boost your productivity and level up your career with AI.
            </p>
            <div className="flex gap-4 mt-4">
              <button
                className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700"
                onClick={handleCTA}
              >
                Start Free Trial
              </button>
              <button className="bg-gray-800 px-6 py-3 rounded-lg font-semibold hover:bg-gray-700">
                View Demo
              </button>
            </div>
          </div>
          <div className="md:w-1/2 relative">
            <img src={HERO_IMG} alt="AI Developer Platform" className="rounded-xl shadow-2xl border border-gray-700" />
          </div>
        </section>

        {/* Features Section */}
        <section className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PLATFORM_FEATURES.map(feature => (
            <div key={feature.id} className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 p-6 hover:border-blue-500/30 transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mb-4">
                <feature.icon className="text-white text-lg" />
              </div>
              <h3 className="text-white font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-400 text-sm">{feature.description}</p>
            </div>
          ))}
        </section>

        {/* Stats Section */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="bg-gray-800/30 rounded-xl p-4 border border-gray-700">
            <LuCpu className="text-blue-400 text-2xl mx-auto mb-2" />
            <p className="text-2xl font-bold text-white">500+</p>
            <p className="text-gray-400 text-sm">Coding Questions</p>
          </div>
          <div className="bg-gray-800/30 rounded-xl p-4 border border-gray-700">
            <LuZap className="text-purple-400 text-2xl mx-auto mb-2" />
            <p className="text-2xl font-bold text-white">50+</p>
            <p className="text-gray-400 text-sm">System Design Topics</p>
          </div>
          <div className="bg-gray-800/30 rounded-xl p-4 border border-gray-700">
            <LuSparkles className="text-amber-400 text-2xl mx-auto mb-2" />
            <p className="text-2xl font-bold text-white">AI</p>
            <p className="text-gray-400 text-sm">Instant Feedback</p>
          </div>
          <div className="bg-gray-800/30 rounded-xl p-4 border border-gray-700">
            <LuCode className="text-green-400 text-2xl mx-auto mb-2" />
            <p className="text-2xl font-bold text-white">25+</p>
            <p className="text-gray-400 text-sm">Tech Stacks</p>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center py-16">
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-6">
            Level Up Your Developer Skills
          </h2>
          <p className="text-gray-300 mb-8">
            Join thousands of developers who’ve landed their dream jobs using our AI-powered platform.
          </p>
          <button
            className="bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-4 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700"
            onClick={handleCTA}
          >
            Start Free Trial
          </button>
          <p className="text-gray-500 mt-4 text-sm">No credit card required • 7-day free trial</p>
        </section>

      </div>

      {/* Footer */}
      <footer className="w-screen py-6 bg-black border-t border-gray-800 text-center text-gray-500">
        Made with ❤️ by developers, for developers
      </footer>

      {/* Auth Modal */}
      <Modal
        isOpen={openAuthModal}
        onClose={() => { setOpenAuthModal(false); setCurrentPage("login"); }}
        hideHeader
      >
        <div className="bg-gray-800 rounded-lg">
          {currentPage === "login" && <Login setCurrentPage={setCurrentPage} />}
          {currentPage === "signup" && <SignUp setCurrentPage={setCurrentPage} />}
        </div>
      </Modal>
    </>
  );
}

export default LandingPage;
