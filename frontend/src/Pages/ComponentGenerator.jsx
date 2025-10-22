import React, { useState } from 'react'
import Select from 'react-select';
import { BsStars } from 'react-icons/bs';
import { HiOutlineCode } from 'react-icons/hi';
import Editor from '@monaco-editor/react';
import { IoCloseSharp, IoCopy } from 'react-icons/io5';
import { PiExportBold } from 'react-icons/pi';
import { ImNewTab } from 'react-icons/im';
import { FiRefreshCcw } from 'react-icons/fi';
import { GoogleGenAI } from "@google/genai";
import { ClipLoader } from 'react-spinners';
import { toast } from 'react-toastify';

const ComponentGenerator = () => {
  const options = [
    { value: 'html-css', label: 'HTML + CSS' },
    { value: 'html-tailwind', label: 'HTML + Tailwind CSS' },
    { value: 'html-bootstrap', label: 'HTML + Bootstrap' },
    { value: 'html-css-js', label: 'HTML + CSS + JS' },
    { value: 'html-tailwind-bootstrap', label: 'HTML + Tailwind + Bootstrap' },
  ];

  const [outputScreen, setOutputScreen] = useState(false);
  const [tab, setTab] = useState(1);
  const [prompt, setPrompt] = useState("");
  const [frameWork, setFrameWork] = useState(options[0]);
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [isNewTabOpen, setIsNewTabOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  function extractCode(response) {
    const match = response.match(/```(?:\w+)?\n?([\s\S]*?)```/);
    return match ? match[1].trim() : response.trim();
  }

  const ai = new GoogleGenAI({
    apiKey: "AIzaSyCjOrjISxWm17EnStrMkYXyWf_5O6TwsrI"
  });

  async function getResponse() {
    if (!prompt.trim()) return toast.error("Please describe your component first");

    try {
      setLoading(true);
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: `
     You are an experienced programmer with expertise in web development and UI/UX design. You create modern, animated, and fully responsive UI components. You are highly skilled in HTML, CSS, Tailwind CSS, Bootstrap, JavaScript, React, Next.js, Vue.js, Angular, and more.

Now, generate a UI component for: ${prompt}  
Framework to use: ${frameWork.value}  

Requirements:  
- The code must be clean, well-structured, and easy to understand.  
- Optimize for SEO where applicable.  
- Focus on creating a modern, animated, and responsive UI design.  
- Include high-quality hover effects, shadows, animations, colors, and typography.  
- Return ONLY the code, formatted properly in **Markdown fenced code blocks**.  
- Do NOT include explanations, text, comments, or anything else besides the code.  
- And give the whole code in a single HTML file.
      `,
      });

      setCode(extractCode(response.text));
      setOutputScreen(true);
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong while generating code");
    } finally {
      setLoading(false);
    }
  };

  const copyCode = async () => {
    if (!code.trim()) return toast.error("No code to copy");
    try {
      await navigator.clipboard.writeText(code);
      toast.success("Code copied to clipboard");
    } catch (err) {
      console.error('Failed to copy: ', err);
      toast.error("Failed to copy");
    }
  };

  const downnloadFile = () => {
    if (!code.trim()) return toast.error("No code to download");

    const fileName = "GenUI-Code.html"
    const blob = new Blob([code], { type: 'text/plain' });
    let url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    link.click();
    URL.revokeObjectURL(url);
    toast.success("File downloaded");
  };

  return (
  <div className="flex-1 min-h-screen bg-gray-900 text-white transition-all duration-300 ease-in-out p-4 sm:p-6 lg:ml-16">
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-7xl mx-auto">

        {/* Left Section - Input */}
        <div className="w-full p-6 rounded-xl bg-gray-800 border border-gray-700">
          <div className="mb-6">
            <h3 className='text-2xl font-semibold text-white'>AI Component Generator</h3>
            <p className='text-gray-400 mt-2'>Describe your component and let AI code it for you.</p>
          </div>

          <div className="space-y-4">
            <div>
              <label className='block text-sm font-medium text-gray-300 mb-2'>Framework</label>
              <Select
                options={options}
                value={frameWork}
                styles={{
                  control: (base) => ({
                    ...base,
                    backgroundColor: "#374151",
                    borderColor: "#4B5563",
                    color: "#fff",
                    borderRadius: "8px",
                    minHeight: "44px",
                    "&:hover": { borderColor: "#6B7280" }
                  }),
                  menu: (base) => ({
                    ...base,
                    backgroundColor: "#374151",
                    color: "#fff",
                    borderRadius: "8px",
                    border: "1px solid #4B5563"
                  }),
                  option: (base, state) => ({
                    ...base,
                    backgroundColor: state.isSelected
                      ? "#f97316"
                      : state.isFocused
                        ? "#4B5563"
                        : "#374151",
                    color: "#fff",
                    "&:active": { backgroundColor: "#f97316" }
                  }),
                  singleValue: (base) => ({ 
                    ...base, 
                    color: "#fff",
                    fontWeight: "500"
                  }),
                  placeholder: (base) => ({ ...base, color: "#9CA3AF" }),
                  input: (base) => ({ ...base, color: "#fff" })
                }}
                onChange={(selected) => setFrameWork(selected)}
              />
            </div>

            <div>
              <label className='block text-sm font-medium text-gray-300 mb-2'>Describe your component</label>
              <textarea
                onChange={(e) => setPrompt(e.target.value)}
                value={prompt}
                className='w-full min-h-[160px] rounded-lg bg-gray-700 border border-gray-600 p-4 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none transition-colors'
                placeholder="Describe your component in detail and AI will generate it..."
              ></textarea>
            </div>

            <div className="flex items-center justify-between pt-2">
              <p className='text-gray-400 text-sm'>Click on generate button to get your code</p>
              <button
                onClick={getResponse}
                disabled={loading}
                className="flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-orange-500 to-orange-600 text-white font-medium hover:from-orange-600 hover:to-orange-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? <ClipLoader color='white' size={18} /> : <BsStars className="text-lg" />}
                {loading ? 'Generating...' : 'Generate'}
              </button>
            </div>
          </div>
        </div>

        {/* Right Section - Output */}
        <div className="w-full h-[600px] bg-gray-800 rounded-xl border border-gray-700 overflow-hidden flex flex-col">
          {!outputScreen ? (
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
              <div className="w-20 h-20 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 flex items-center justify-center mb-4">
                <HiOutlineCode className="text-2xl text-white" />
              </div>
              <h4 className="text-lg font-medium text-white mb-2">No Component Generated</h4>
              <p className="text-gray-400">Your component and code will appear here after generation.</p>
            </div>
          ) : (
            <>
              {/* Tabs */}
              <div className="flex bg-gray-700 border-b border-gray-600">
                <button
                  onClick={() => setTab(1)}
                  className={`flex-1 py-3 font-medium transition-colors ${
                    tab === 1 
                      ? "bg-gray-800 text-white border-b-2 border-orange-500" 
                      : "text-gray-400 hover:text-gray-300"
                  }`}
                >
                  Code
                </button>
                <button
                  onClick={() => setTab(2)}
                  className={`flex-1 py-3 font-medium transition-colors ${
                    tab === 2 
                      ? "bg-gray-800 text-white border-b-2 border-orange-500" 
                      : "text-gray-400 hover:text-gray-300"
                  }`}
                >
                  Preview
                </button>
              </div>

              {/* Toolbar */}
              <div className="flex items-center justify-between px-4 py-3 bg-gray-700 border-b border-gray-600">
                <p className='font-medium text-gray-200'>Component {tab === 1 ? 'Code' : 'Preview'}</p>
                <div className="flex items-center gap-2">
                  {tab === 1 ? (
                    <>
                      <button 
                        onClick={copyCode}
                        className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-600 transition-colors"
                        title="Copy code"
                      >
                        <IoCopy className="text-lg" />
                      </button>
                      <button 
                        onClick={downnloadFile}
                        className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-600 transition-colors"
                        title="Export code"
                      >
                        <PiExportBold className="text-lg" />
                      </button>
                    </>
                  ) : (
                    <>
                      <button 
                        onClick={() => setIsNewTabOpen(true)}
                        className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-600 transition-colors"
                        title="Open in new tab"
                      >
                        <ImNewTab className="text-lg" />
                      </button>
                      <button 
                        onClick={() => setRefreshKey(prev => prev + 1)}
                        className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-600 transition-colors"
                        title="Refresh preview"
                      >
                        <FiRefreshCcw className="text-lg" />
                      </button>
                    </>
                  )}
                </div>
              </div>

              {/* Content Area */}
              <div className="flex-1">
                {tab === 1 ? (
                  <Editor 
                    value={code} 
                    height="100%" 
                    theme='vs-dark' 
                    language="html" 
                    options={{
                      fontSize: 14,
                      minimap: { enabled: true },
                      scrollBeyondLastLine: false,
                      automaticLayout: true,
                    }}
                  />
                ) : (
                  <iframe 
                    key={refreshKey} 
                    srcDoc={code} 
                    className="w-full h-full bg-white"
                    title="Component Preview"
                  />
                )}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Fullscreen Preview Modal */}
      {isNewTabOpen && (
        <div className="fixed inset-0 bg-gray-900 z-50 flex flex-col">
          <div className="flex items-center justify-between px-6 py-4 bg-gray-800 border-b border-gray-700">
            <h3 className="text-lg font-semibold text-white">Component Preview</h3>
            <button 
              onClick={() => setIsNewTabOpen(false)}
              className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-700 transition-colors"
            >
              <IoCloseSharp className="text-xl" />
            </button>
          </div>
          <iframe 
            srcDoc={code} 
            className="flex-1 w-full"
            title="Fullscreen Component Preview"
          />
        </div>
      )}
    </div>
  )
}

export default ComponentGenerator