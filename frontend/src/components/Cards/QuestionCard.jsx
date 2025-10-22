import React, { useEffect, useRef, useState } from "react";
import { LuChevronDown, LuPin, LuPinOff, LuSparkles } from "react-icons/lu";
import AIResponsePreview from "../../Pages/InterviewPrep/components/AIResponsePreview";

function QuestionCard({
  question,
  answer,
  onLearnMore,
  isPinned,
  onTogglePin,
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [height, setHeight] = useState(0);
  const contentRef = useRef(null);

  useEffect(() => {
    if (isExpanded) {
      const contentHeight = contentRef.current.scrollHeight;
      setHeight(contentHeight + 10);
    } else {
      setHeight(0);
    }
  }, [isExpanded]);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };
  return (
    <>
      <div className="bg-gray-800 rounded-lg mb-4 overflow-hidden py-4 px-5 shadow-xl shadow-gray-900/70 border border-gray-700/60 group hover:border-gray-600/60 transition-colors">
        <div className="flex items-start justify-between cursor-pointer">
          <div className="flex items-start gap-3.5">
            <span className="text-xs md:text-[15px] font-semibold text-gray-400 leading-[18px]">Q</span>
            <h3 className="text-xs md:text-[14px] font-medium text-white mr-0 md:mr-2" onClick={toggleExpand}>{question}</h3>
          </div>
          <div className="flex items-center justify-end ml-4 relative">
            <div
              className={`flex ${
                isExpanded ? "md:flex" : "md:hidden group-hover:flex"
              }`}
            >
              <button className="flex items-center gap-2 text-xs text-indigo-300 font-medium bg-indigo-900/30 px-3 py-1 mr-2 rounded text-nowrap border border-indigo-800/50 hover:border-indigo-600/70 hover:bg-indigo-900/50 cursor-pointer transition-colors" 
              onClick={onTogglePin}>
                {isPinned ? <LuPinOff className="text-xs"/> : <LuPin className="text-xs" />}
              </button>
              <button
              className="flex items-center gap-2 text-xs text-cyan-300 font-medium bg-cyan-900/30 px-3 py-1 mr-2 rounded text-nowrap border border-cyan-800/50 hover:border-cyan-600/70 hover:bg-cyan-900/50 cursor-pointer transition-colors"
                onClick={() => {
                  setIsExpanded(true);
                  onLearnMore();
                }}
              >
                <LuSparkles />
                <span className="hidden md:block">Learn More</span>
              </button>
            </div>
            <button
            className="text-gray-400 hover:text-gray-300 cursor-pointer transition-colors"
            onClick={toggleExpand}>
              <LuChevronDown
                size={20}
                className={`transform transition-transform duration-300 ${
                  isExpanded ? "rotate-180" : ""
                }`}
              />
            </button>
          </div>
        </div>

        <div
        className="overflow-hidden transition-all duration-300 ease-in-out"
        style={{ maxHeight: `${height}px` }}>
          <div
          className="mt-4 text-gray-200 bg-gray-700/50 px-5 py-3 rounded-lg border border-gray-600/50"
          ref={contentRef}>
            <AIResponsePreview content={answer} />
          </div>
        </div>
      </div>
    </>
  );
}

export default QuestionCard;