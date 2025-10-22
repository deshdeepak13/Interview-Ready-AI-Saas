import React, { useState } from 'react'
import Editor from '@monaco-editor/react';
import Select from 'react-select';
import { GoogleGenAI } from "@google/genai";
import Markdown from 'react-markdown'
import RingLoader from "react-spinners/RingLoader";

const CodeReviewer = () => {
  const options = [
    { value: 'javascript', label: 'JavaScript' },
    { value: 'python', label: 'Python' },
    { value: 'java', label: 'Java' },
    { value: 'csharp', label: 'C#' },
    { value: 'cpp', label: 'C++' },
    { value: 'php', label: 'PHP' },
    { value: 'ruby', label: 'Ruby' },
    { value: 'go', label: 'Go' },
    { value: 'swift', label: 'Swift' },
    { value: 'kotlin', label: 'Kotlin' },
    { value: 'typescript', label: 'TypeScript' },
    { value: 'rust', label: 'Rust' },
    { value: 'dart', label: 'Dart' },
    { value: 'scala', label: 'Scala' },
    { value: 'perl', label: 'Perl' },
    { value: 'haskell', label: 'Haskell' },
    { value: 'elixir', label: 'Elixir' },
    { value: 'r', label: 'R' },
    { value: 'matlab', label: 'MATLAB' },
    { value: 'bash', label: 'Bash' }
  ];

  const [selectedOption, setSelectedOption] = useState(options[0]);
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState("");

  const customStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: '#1f2937',
      borderColor: '#374151',
      color: '#fff',
      minHeight: '44px',
      borderRadius: '8px',
      '&:hover': { borderColor: '#4b5563' },
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: '#1f2937',
      color: '#fff',
      borderRadius: '8px',
      border: '1px solid #374151'
    }),
    singleValue: (provided) => ({ ...provided, color: '#fff' }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? '#374151' : '#1f2937',
      color: '#fff',
      cursor: 'pointer',
      '&:active': { backgroundColor: '#4b5563' }
    }),
    input: (provided) => ({ ...provided, color: '#fff' }),
    placeholder: (provided) => ({ ...provided, color: '#9ca3af' }),
  };

  const ai = new GoogleGenAI({
    apiKey: import.meta.env.VITE_GEMINI_API_KEY,
  });

  async function reviewCode() {
    if (!code.trim()) return alert("Please enter code first");

    setResponse("");
    setLoading(true);
    try {
      const res = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: `
You are an expert software developer reviewing code written in ${selectedOption.value}.
Provide:
1️⃣ A quality rating (Better / Good / Normal / Bad)
2️⃣ Detailed improvement suggestions
3️⃣ Step-by-step explanation of what it does
4️⃣ Bugs or logic errors
5️⃣ Syntax/runtime errors
6️⃣ Fixes or optimizations.

Code:
${code}
        `,
      });
      setResponse(res.text);
    } catch (err) {
      console.error("Error reviewing code:", err);
      setResponse("Error reviewing code. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex-1 min-h-screen bg-gray-900 text-white transition-all duration-300 ease-in-out p-4 sm:p-6 lg:ml-16">
      <div className="flex h-[calc(100vh-2rem)] rounded-xl overflow-hidden border border-gray-700 bg-gray-800">
        {/* Left Panel - Code Editor */}
        <div className="flex-1 flex flex-col border-r border-gray-700">
          <div className="p-4 border-b border-gray-700 flex items-center gap-3">
            <div className="flex-1 max-w-xs">
              <Select
                value={selectedOption}
                onChange={setSelectedOption}
                options={options}
                styles={customStyles}
                placeholder="Select language..."
              />
            </div>
            <button
              className="px-4 py-2 bg-gray-800 text-gray-200 rounded-lg hover:bg-gray-700 border border-gray-600 font-medium"
            >
              Fix Code
            </button>
            <button
              onClick={reviewCode}
              disabled={loading}
              className="px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg hover:from-orange-600 hover:to-orange-700 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Reviewing...' : 'Review'}
            </button>
          </div>

          <div className="flex-1">
            <Editor
              height="100%"
              theme="vs-dark"
              language={selectedOption.value}
              value={code}
              onChange={setCode}
              options={{
                fontSize: 14,
                minimap: { enabled: true },
                scrollBeyondLastLine: false,
                automaticLayout: true,
              }}
            />
          </div>
        </div>

        {/* Right Panel - Response */}
        <div className="flex-1 flex flex-col bg-gray-800">
          <div className="p-4 border-b border-gray-700">
            <h2 className="text-lg font-semibold text-white">AI Review</h2>
          </div>

          <div className="flex-1 overflow-auto p-6">
            {loading ? (
              <div className="flex items-center justify-center h-32">
                <RingLoader color="#f97316" size={60} />
              </div>
            ) : response ? (
              <div className="prose prose-invert max-w-none">
                <Markdown
                  components={{
                    h1: ({ children }) => <h1 className="text-xl font-bold text-white mb-4">{children}</h1>,
                    h2: ({ children }) => <h2 className="text-lg font-semibold text-white mb-3">{children}</h2>,
                    h3: ({ children }) => <h3 className="text-base font-semibold text-white mb-2">{children}</h3>,
                    p: ({ children }) => <p className="text-gray-300 mb-4 leading-relaxed">{children}</p>,
                    ul: ({ children }) => <ul className="list-disc list-inside text-gray-300 mb-4 space-y-2">{children}</ul>,
                    ol: ({ children }) => <ol className="list-decimal list-inside text-gray-300 mb-4 space-y-2">{children}</ol>,
                    li: ({ children }) => <li className="text-gray-300">{children}</li>,
                    code: ({ children }) => <code className="bg-gray-700 text-orange-300 px-2 py-1 rounded text-sm">{children}</code>,
                    pre: ({ children }) => <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto my-4">{children}</pre>,
                  }}
                >
                  {response}
                </Markdown>
              </div>
            ) : (
              <div className="flex items-center justify-center h-full">
                <p className="text-gray-400 text-lg">Your code review will appear here...</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CodeReviewer;
