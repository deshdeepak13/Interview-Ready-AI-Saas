import { desc, div } from "framer-motion/client";
import React from "react";
import { LuTrash2 } from "react-icons/lu";
import { getInitials } from "../../utils/helper";

function SummaryCard({
  colors,
  role,
  topicToFocus,
  experience,
  questions,
  description,
  lastUpdated,
  onSelect,
  onDelete,
}) {
  return (
    <div className="bg-gray-800 border border-gray-600/40 rounded-xl p-2 overflow-hidden cursor-pointer hover:shadow-xl shadow-gray-900/50 hover:border-gray-500/60 relative group transition-all duration-200" onClick={onSelect}>
      <div
        className="rounded-lg p-4 cursor-pointer relative"
        style={{
          background: colors.bgcolor,
        }}
      >
        <div className="flex items-start">
          <div className="flex-shrink-0 w-12 h-12 bg-gray-700 rounded-md flex items-center justify-center mr-4 border border-gray-600">
            <span className="text-lg font-semibold text-white">{getInitials(role)}</span>
          </div>
          {/* content cont */}
          <div className="flex-grow">
            <div className="flex justify-between items-start">
              {/* title and skills */}
              <div>
                <h2 className="text-[17px] font-medium text-white">{role}</h2>
                <p className="text-xs text-medium text-gray-200 mt-1">{topicToFocus}</p>
              </div>
            </div>
          </div>
        </div>
        <button
          className="hidden group-hover:flex items-center gap-2 text-xs text-rose-300 font-medium bg-rose-900/40 px-3 py-1 rounded text-nowrap border border-rose-800/50 hover:border-rose-600/70 hover:bg-rose-900/60 cursor-pointer top-2 right-2 absolute transition-colors"
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
        >
          <LuTrash2/>
        </button>
      </div>

      <div className="px-3 pb-3">
        <div className="flex items-center gap-3 mt-4 flex-wrap">
          <div className="text-[10px] font-medium text-gray-200 px-3 py-1 border border-gray-500 rounded-full bg-gray-700/50">
            Experience: {experience} {experience == 1 ? "Year" : "Years"}
          </div>
          <div className="text-[10px] font-medium text-gray-200 px-3 py-1 border border-gray-500 rounded-full bg-gray-700/50">{questions} Q&A</div>
          <div className="text-[10px] font-medium text-gray-200 px-3 py-1 border border-gray-500 rounded-full bg-gray-700/50">Last Updated: {lastUpdated}</div>
        </div>

        {/* Desc */}
        <p className="text-12px text-gray-400 font-medium line-clamp-2 mt-3">{description}</p>
      </div>
    </div>
  );
}

export default SummaryCard;