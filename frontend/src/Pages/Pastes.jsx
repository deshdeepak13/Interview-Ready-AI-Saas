import React, { useState, useEffect } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

const Pastes = () => {
  const [text, setText] = useState("");
  const [folders, setFolders] = useState([]);
  const [selectedFolder, setSelectedFolder] = useState("General");
  const [editingInfo, setEditingInfo] = useState({ folder: null, index: null });
  const [isLoaded, setIsLoaded] = useState(false);
  const [displayFormat, setDisplayFormat] = useState("text");
  const [label, setLabel] = useState("");
  const [showSnack, setShowSnack] = useState(false);


  useEffect(() => {
    const stored = localStorage.getItem("folders");
    if (stored) {
      try {
        setFolders(JSON.parse(stored));
      } catch {
        setFolders([{ name: "General", pastes: [] }]);
      }
    } else {
      setFolders([{ name: "General", pastes: [] }]);
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("folders", JSON.stringify(folders));
    }
  }, [folders, isLoaded]);

  const createFolder = () => {
    const input = document.getElementById("newFolderName");
    const name = input.value.trim();
    if (!name) return;

    if (!folders.some((f) => f.name === name)) {
      setFolders([...folders, { name, pastes: [] }]);
    }

    setSelectedFolder(name);
    input.value = "";
  };

  const handleSave = () => {
    if (!text.trim()) return;

    if (editingInfo.folder !== null && editingInfo.index !== null) {
      setFolders(
        folders.map((folder) => {
          if (folder.name === editingInfo.folder) {
            const updated = [...folder.pastes];
            updated[editingInfo.index] = {
              ...updated[editingInfo.index],
              content: text,
              format: displayFormat,
              updatedAt: new Date().toISOString(),
            };
            return { ...folder, pastes: updated };
          }
          return folder;
        })
      );
      setEditingInfo({ folder: null, index: null });
    } else {
      setFolders(
        folders.map((folder) => {
          if (folder.name === selectedFolder) {
            return {
              ...folder,
              pastes: [
                {
                  id: Date.now(),
                  label: label.trim() || "Untitled",
                  content: text,
                  format: displayFormat,
                  createdAt: new Date().toISOString(),
                },

                ...folder.pastes,
              ],
            };
          }
          return folder;
        })
      );
    }

    setText("");
    setLabel("");

  };

  const handleEdit = (folderName, index) => {
    const paste = folders.find((f) => f.name === folderName).pastes[index];
    setText(paste.content);
    setDisplayFormat(paste.format);
    setEditingInfo({ folder: folderName, index });
  };

  const handleDelete = (folderName, index) => {
    setFolders(
      folders.map((folder) =>
        folder.name === folderName
          ? { ...folder, pastes: folder.pastes.filter((_, i) => i !== index) }
          : folder
      )
    );
  };

  const handleCopy = (content) => {
  navigator.clipboard.writeText(content);

  setShowSnack(true);
  setTimeout(() => setShowSnack(false), 2000); // Hide after 2s
};


  const formatContent = (paste) => {
    try {
      return paste.format === "json"
        ? JSON.stringify(JSON.parse(paste.content), null, 2)
        : paste.content;
    } catch {
      return paste.content;
    }
  };

  const currentFolder = folders.find((f) => f.name === selectedFolder) || {
    name: selectedFolder,
    pastes: [],
  };

  return (
    // <div className="min-h-screen bg-gray-900 flex gap-6 p-6 items-center ">
    <div className="min-h-screen bg-gray-900 flex gap-6 p-6 ml-16 transition-all duration-300">
      <div className="w-60 bg-gray-800 border border-gray-700 rounded-lg p-4 h-fit">
        <h2 className="text-gray-200 font-semibold mb-3">Folders</h2>
        {folders.map((f) => (
          <div
            key={f.name}
            onClick={() => setSelectedFolder(f.name)}
            className={`px-3 py-2 rounded cursor-pointer text-sm mb-1 ${
              selectedFolder === f.name
                ? "bg-gray-600 text-white"
                : "text-gray-300 hover:bg-gray-700"
            }`}
          >
            {f.name}
          </div>
        ))}

        <div className="flex gap-2 mt-4">
          <input
            id="newFolderName"
            className="bg-gray-700 text-white px-2 py-1 rounded text-sm w-full"
            placeholder="New Folder"
          />
          <button
            onClick={createFolder}
            className="px-2 bg-green-600 text-white rounded text-sm"
          >
            +
          </button>
        </div>
      </div>

      <div className="flex-1">
        <h1 className="text-3xl font-bold text-white mb-6">Paste Manager</h1>

        <div className="w-full bg-gray-800 rounded-lg border border-gray-700 shadow-lg mb-6 overflow-hidden">
          <input
            type="text"
            placeholder="Label / Title (optional)"
            className="w-full bg-gray-800 text-gray-200 px-4 py-2 border-b border-gray-700 focus:outline-none"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
          />

          <textarea
            className="w-full h-32 bg-gray-800 text-gray-100 p-4 font-mono text-sm focus:outline-none resize-none"
            placeholder="Paste text/code/JSON..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />

          <div className="bg-gray-700 px-4 py-3 border-t border-gray-600 flex justify-between items-center">
            <select
              value={displayFormat}
              onChange={(e) => setDisplayFormat(e.target.value)}
              className="bg-gray-600 text-gray-100 px-3 py-1 rounded border border-gray-500 text-sm"
            >
              <option value="text">Text</option>
              <option value="code">Code</option>
              <option value="json">JSON</option>
            </select>

            <select
              value={selectedFolder}
              onChange={(e) => setSelectedFolder(e.target.value)}
              className="bg-gray-600 text-gray-100 px-3 py-1 rounded border border-gray-500 text-sm"
            >
              {folders.map((folder) => (
                <option key={folder.name} value={folder.name}>
                  {folder.name}
                </option>
              ))}
            </select>

            <button
              onClick={handleSave}
              className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
            >
              {editingInfo.index !== null ? "Update Paste" : "Save Paste"}
            </button>
          </div>
        </div>

        {currentFolder?.pastes.length === 0 ? (
          <div className="text-gray-500 text-center">
            No pastes in this folder
          </div>
        ) : (
          currentFolder.pastes.map((paste, index) => (
            <div
              key={paste.id}
              className="bg-gray-800 border border-gray-700 rounded-lg mb-4 overflow-hidden"
            >
              <div className="bg-gray-700 px-4 py-3 border-b border-gray-600 flex justify-between items-center">
                <span className="text-gray-300 text-sm font-semibold">
  {paste.label || `paste-${index + 1}`}
</span>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleCopy(paste.content)}
                    className="px-3 py-1 bg-gray-600 text-gray-200 rounded text-sm"
                  >
                    Copy
                  </button>
                  <button
                    onClick={() => handleEdit(selectedFolder, index)}
                    className="px-3 py-1 bg-blue-600 text-white rounded text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(selectedFolder, index)}
                    className="px-3 py-1 bg-red-600 text-white rounded text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>

              <div className="p-4">
                {paste.format === "code" ? (
                  <SyntaxHighlighter language="javascript" style={oneDark}>
                    {paste.content}
                  </SyntaxHighlighter>
                ) : paste.format === "json" ? (
                  <SyntaxHighlighter language="json" style={oneDark}>
                    {formatContent(paste)}
                  </SyntaxHighlighter>
                ) : (
                  <pre className="text-gray-100 font-mono text-sm whitespace-pre-wrap break-words">
                    {paste.content}
                  </pre>
                )}
              </div>
            </div>
          ))
        )}
      </div>
      {showSnack && (
  <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-gray-800 text-white px-4 py-2 rounded-lg shadow-lg border border-gray-700 animate-fade-in">
    ✅ Copied to clipboard!
  </div>
)}

    </div>
  );
};

export default Pastes;
