import React from 'react';
import { FileText, Clock, Mail } from 'lucide-react';

const ResumeAnalyzer = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-6">
      <div className="max-w-2xl mx-auto text-center">
        {/* Icon */}
        <div className="mb-8">
          <div className="w-24 h-24 bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <FileText className="w-12 h-12 text-white" />
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent mb-4">
          Resume Analyzer
        </h1>
        
        <div className="flex items-center justify-center gap-2 mb-6">
          <Clock className="w-5 h-5 text-orange-500" />
          <p className="text-xl text-gray-400">Coming Soon</p>
        </div>

        {/* Description */}
        <p className="text-lg text-gray-300 mb-8 max-w-md mx-auto">
          We're building an AI-powered resume analyzer that will provide line-by-line feedback, 
          ATS optimization tips, and personalized suggestions to make your resume stand out.
        </p>

        {/* Features List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 max-w-lg mx-auto">
          <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
            <div className="text-orange-400 text-sm font-semibold mb-2">AI-Powered Analysis</div>
            <div className="text-gray-400 text-sm">Get detailed feedback on your resume content</div>
          </div>
          
          <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
            <div className="text-orange-400 text-sm font-semibold mb-2">ATS Optimization</div>
            <div className="text-gray-400 text-sm">Improve compatibility with applicant tracking systems</div>
          </div>
          
          <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
            <div className="text-orange-400 text-sm font-semibold mb-2">Line-by-Line Feedback</div>
            <div className="text-gray-400 text-sm">Specific suggestions for each section of your resume</div>
          </div>
          
          <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
            <div className="text-orange-400 text-sm font-semibold mb-2">Skill Analysis</div>
            <div className="text-gray-400 text-sm">Identify strengths and missing keywords</div>
          </div>
        </div>

        {/* Notify Me Button */}
        <button className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-orange-600 hover:to-orange-700 transition-all flex items-center gap-2 mx-auto">
          <Mail className="w-4 h-4" />
          Notify Me When Ready
        </button>

        {/* Footer Note */}
        <p className="text-gray-500 text-sm mt-8">
          Working hard to bring you the best resume analysis tool
        </p>
      </div>
    </div>
  );
};

export default ResumeAnalyzer;