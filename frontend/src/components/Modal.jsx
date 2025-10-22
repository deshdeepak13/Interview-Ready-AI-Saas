import React, { useEffect, useRef } from 'react';

function Modal({ children, isOpen, onClose, title, hideHeader }) {
  const modalRef = useRef();

  // Prevent background scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  // Close modal when clicking outside
  const handleClickOutside = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
      onClick={handleClickOutside}
    >
      <div
        ref={modalRef}
        className="bg-gray-800 relative rounded-lg border border-gray-700 shadow-2xl shadow-gray-900/50 max-h-[90vh] w-[85vw] md:w-[50vw] flex flex-col overflow-hidden"
      >
        {/* Header */}
        {!hideHeader && (
          <div className="px-5 py-4 border-b border-gray-700 flex justify-between items-center">
            <h2 className="text-white font-semibold text-lg">{title}</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white hover:bg-gray-700 w-8 h-8 flex items-center justify-center rounded-lg transition-colors"
            >
              <ion-icon name="close-outline"></ion-icon>
            </button>
          </div>
        )}

        {/* Content */}
<div className="flex-1 overflow-y-auto p-5 scrollbar-none">
  <div className="w-full flex justify-center">{children}</div>
</div>


      </div>
    </div>
  );
}

export default Modal;
