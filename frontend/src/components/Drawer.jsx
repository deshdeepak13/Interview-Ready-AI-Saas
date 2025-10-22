import React from 'react'
import {LuX} from "react-icons/lu"

function Drawer({isOpen, onClose, title,children}) {
  return (
    <div className={`fixed top-[64px] right-0 z-40 h-[calc(100vh-64px)] p-4 overflow-y-auto transition-transform bg-gray-800 w-full md:w-[40vw] shadow-2xl shadow-gray-900/50 border-l border-gray-700 ${isOpen ? "translate-x-0" : "translate-x-full"}`} tabIndex="-1" aria-labelledby='drawer-right-label'>

      <div className='flex items-center justify-between mb-4'>
        <h5 id="drawer-right-label" className='flex items-center text-base font-semibold text-white'>{title}</h5>
        <button type='button' onClick={onClose} className='text-gray-400 bg-transparent hover:bg-gray-700 hover:text-white rounded-lg text-sm w-8 h-8 inline-flex items-center justify-center transition-colors'>
          <LuX className='text-lg'/>
        </button>
      </div>

      <div className='text-sm mx-3 mb-6 text-gray-200'>{children}</div>
    </div>
  )
}

export default Drawer