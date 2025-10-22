import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
function Input({ value, onChange, label, placeholder, type }) {
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div>
      <label className="text-gray-200 font-medium">{label}</label>
      <div className="input-box mt-1">
        <input
          value={value}
          className="bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 outline-none w-full text-white placeholder-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-colors"
          onChange={onChange}
          placeholder={placeholder}
          type={showPassword ? "text" : type}
        />
        {type === "password" && (
          <button 
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute right-3 top-1/2 transform -translate-y-1/2"
          >
            {showPassword ? (
              <FaRegEye size={20} className="text-gray-400 hover:text-gray-300 cursor-pointer transition-colors"/>
            ) : (
              <FaRegEyeSlash size={20} className="text-gray-400 hover:text-gray-300 cursor-pointer transition-colors"/>
            )}
          </button>
        )}
      </div>
    </div>
  );
}

export default Input;