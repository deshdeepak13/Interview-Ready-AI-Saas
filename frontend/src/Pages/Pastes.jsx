import React, { useState, useEffect } from "react";

const Pastes = () => {
  const [text, setText] = useState("");
  const [pastes, setPastes] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);

  // Load from localStorage on mount
  useEffect(() => {
    const storedPastes = JSON.parse(localStorage.getItem("pastes")) || [];
    setPastes(storedPastes);
  }, []);

  // Save to localStorage whenever pastes change
  useEffect(() => {
    localStorage.setItem("pastes", JSON.stringify(pastes));
  }, [pastes]);

  const handleSave = () => {
    if (!text.trim()) return;

    if (editingIndex !== null) {
      const updated = [...pastes];
      updated[editingIndex] = text;
      setPastes(updated);
      setEditingIndex(null);
    } else {
      setPastes([text, ...pastes]);
    }
    setText("");
  };

  const handleEdit = (index) => {
    setText(pastes[index]);
    setEditingIndex(index);
  };

  const handleDelete = (index) => {
    const updated = pastes.filter((_, i) => i !== index);
    setPastes(updated);
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    alert("Copied to clipboard!");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold mb-4">Paste Manager</h1>
      
      <div className="w-full max-w-xl bg-white p-4 rounded-lg shadow-md mb-6">
        <textarea
          className="w-full h-24 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Paste your text here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button
          onClick={handleSave}
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
          {editingIndex !== null ? "Update Paste" : "Save Paste"}
        </button>
      </div>

      <div className="w-full max-w-xl">
        {pastes.length === 0 ? (
          <p className="text-gray-500 text-center">No pastes yet</p>
        ) : (
          pastes.map((paste, index) => (
            <div
              key={index}
              className="bg-white p-4 mb-3 rounded shadow flex flex-col sm:flex-row justify-between items-start sm:items-center"
            >
              <p className="break-words mb-2 sm:mb-0">{paste}</p>
              <div className="flex gap-2">
                <button
                  onClick={() => handleCopy(paste)}
                  className="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition"
                >
                  Copy
                </button>
                <button
                  onClick={() => handleEdit(index)}
                  className="px-2 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(index)}
                  className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Pastes;
