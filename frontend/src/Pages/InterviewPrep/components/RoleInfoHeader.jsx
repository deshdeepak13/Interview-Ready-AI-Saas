import { div } from 'framer-motion/client'
import React from 'react'

function RoleInfoHeader({ role, topicsToFocus, experience, questions, description, lastUpdated }) {
  return (
    <div className='bg-gray-800 relative border-b border-gray-700 p-4 sm:p-6 lg:ml-9'>
        <div className='container mx-auto px-4 md:px-16'>
            <div className='h-[200px] flex flex-col justify-center relative z-10'>
                <div className='flex items-start'>
                    <div className='flex grow'>
                        <div className='flex justify-between items-start'>
                            <div>
                                <h2 className='text-2xl font-medium text-white'>{role}</h2>
                                <p className='text-sm font-medium text-gray-300 mt-1'>{topicsToFocus}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='flex items-center gap-3 mt-4 flex-wrap'>
                    <div className='text-[10px] font-semibold text-gray-200 bg-gray-700 px-3 py-1 rounded-full border border-gray-600'>
                        Experience: {experience} {experience == 1 ? "Year" : "Years"}
                    </div>
                    <div className='text-[10px] font-semibold text-gray-200 bg-gray-700 px-3 py-1 rounded-full border border-gray-600'>
                        {questions} Q&A
                    </div>
                    <div className='text-[10px] font-semibold text-gray-200 bg-gray-700 px-3 py-1 rounded-full border border-gray-600'>
                        Last Updated: {lastUpdated}
                    </div>
                </div>
            </div>

            <div className='w-[40vw] md:w-[30vw] h-[200px] flex items-center justify-center bg-gray-800 overflow-hidden absolute top-0 right-0'>
                <div className='w-16 h-16 bg-lime-500 blur-[65px] animate-blob1 opacity-70'></div>
                <div className='w-16 h-16 bg-teal-500 blur-[65px] animate-blob2 opacity-70'></div>
                <div className='w-16 h-16 bg-cyan-500 blur-[65px] animate-blob3 opacity-70'></div>
                <div className='w-16 h-16 bg-fuchsia-500 blur-[65px] animate-blob4 opacity-70'></div>
            </div>
        </div>
    </div>
  )
}

export default RoleInfoHeader