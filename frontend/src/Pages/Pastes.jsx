import React, { useState, useEffect } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";


const Pastes = () => {
  const [text, setText] = useState("");
  const [pastes, setPastes] = useState([]);
const [isLoaded, setIsLoaded] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [displayFormat, setDisplayFormat] = useState("text");

  // Load from localStorage on mount
  useEffect(() => {
  const stored = localStorage.getItem("pastes");
  if (stored) {
    try {
      setPastes(JSON.parse(stored));
    } catch {
      setPastes([]);
    }
  }
  setIsLoaded(true); // mark load complete
}, []);

  
// Save only AFTER data is loaded
useEffect(() => {
  if (isLoaded) {
    localStorage.setItem("pastes", JSON.stringify(pastes));
  }
}, [pastes, isLoaded]);

  // Save or update a paste
  const handleSave = () => {
    if (!text.trim()) return;

    if (editingIndex !== null) {
      const updated = [...pastes];
      updated[editingIndex].content = text;
      updated[editingIndex].format = displayFormat;
      updated[editingIndex].updatedAt = new Date().toISOString();
      setPastes(updated);
      setEditingIndex(null);
    } else {
      const newPaste = {
        id: Date.now(),
        content: text,
        format: displayFormat,
        createdAt: new Date().toISOString(),
      };
      setPastes([newPaste, ...pastes]);
    }
    setText("");
  };

  // Edit existing paste
  const handleEdit = (index) => {
    setText(pastes[index].content);
    setDisplayFormat(pastes[index].format);
    setEditingIndex(index);
  };
 
  // Delete paste
  const handleDelete = (index) => {
    const updated = pastes.filter((_, i) => i !== index);
    setPastes(updated);
  };

  // Copy to clipboard
  const handleCopy = (content) => {
    navigator.clipboard.writeText(content);
    alert("Copied to clipboard!");
  };

  // Format paste for display
  const formatContent = (paste) => {
    try {
      switch (paste.format) {
        case "json":
          return JSON.stringify(JSON.parse(paste.content), null, 2);
        default:
          return paste.content;
      }
    } catch {
      return paste.content;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold text-white mb-6">Paste Manager</h1>

      {/* Input Section */}
      <div className="w-full max-w-4xl bg-gray-800 rounded-lg border border-gray-700 shadow-lg mb-6 overflow-hidden">
        <div className="bg-gray-700 px-4 py-3 border-b border-gray-600 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span className="text-gray-300 text-sm ml-2">new-paste.txt</span>
          </div>
        </div>

        <textarea
          className="w-full h-32 bg-gray-800 text-gray-100 p-4 font-mono text-sm focus:outline-none resize-none"
          placeholder="Paste your text, code, or JSON here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <div className="bg-gray-700 px-4 py-3 border-t border-gray-600 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <span className="text-gray-300 text-sm">Format:</span>
            <select
              value={displayFormat}
              onChange={(e) => setDisplayFormat(e.target.value)}
              className="bg-gray-600 text-gray-100 px-3 py-1 rounded border border-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <option value="text">Text</option>
              <option value="code">Code</option>
              <option value="json">JSON</option>
            </select>
          </div>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all font-medium"
          >
            {editingIndex !== null ? "Update Paste" : "Save Paste"}
          </button>
        </div>
      </div>

      {/* Pastes List */}
      <div className="w-full max-w-4xl">
        {pastes.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-500 text-lg mb-2">No pastes yet</div>
            <div className="text-gray-400 text-sm">
              Create your first paste above
            </div>
          </div>
        ) : (
          pastes.map((paste, index) => (
            <div
              key={paste.id}
              className="bg-gray-800 rounded-lg border border-gray-700 shadow-lg mb-4 overflow-hidden"
            >
              {/* Header */}
              <div className="bg-gray-700 px-4 py-3 border-b border-gray-600 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span className="text-gray-300 text-sm ml-2">
                    paste-{index + 1}.
                    {paste.format === "json"
                      ? "json"
                      : paste.format === "code"
                      ? "js"
                      : "txt"}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleCopy(paste.content)}
                    className="px-3 py-1 bg-gray-600 text-gray-200 rounded hover:bg-gray-500 transition-colors text-sm font-medium"
                  >
                    Copy
                  </button>
                  <button
                    onClick={() => handleEdit(index)}
                    className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-500 transition-colors text-sm font-medium"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(index)}
                    className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-500 transition-colors text-sm font-medium"
                  >
                    Delete
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-4 bg-gray-800">
                <div className="p-4 bg-gray-800">
  {paste.format === "code" ? (
    <SyntaxHighlighter
      language="javascript"
      style={oneDark}
      customStyle={{
        backgroundColor: "#1f2937",
        padding: "1rem",
        borderRadius: "0.5rem",
        fontSize: "0.9rem",
      }}
    >
      {paste.content}
    </SyntaxHighlighter>
  ) : paste.format === "json" ? (
    <SyntaxHighlighter
      language="json"
      style={oneDark}
      customStyle={{
        backgroundColor: "#1f2937",
        padding: "1rem",
        borderRadius: "0.5rem",
        fontSize: "0.9rem",
      }}
    >
      {formatContent(paste)}
    </SyntaxHighlighter>
  ) : (
    <pre className="text-gray-100 font-mono text-sm whitespace-pre-wrap break-words">
      {paste.content}
    </pre>
  )}
</div>

              </div>

              {/* Footer */}
              <div className="bg-gray-700 px-4 py-2 border-t border-gray-600 text-xs text-gray-400 flex justify-between">
                <span>
                  Created: {new Date(paste.createdAt).toLocaleString()}
                </span>
                <span>Length: {paste.content.length} characters</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Pastes;
