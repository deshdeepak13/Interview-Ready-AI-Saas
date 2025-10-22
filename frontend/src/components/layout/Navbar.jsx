import React from 'react'
import ProfileInfoCard from '../Cards/ProfileInfoCard'
import { Link } from 'react-router-dom'

import { FaLaptopCode } from "react-icons/fa6";


function Navbar() {
  return (
    <div className='h-16 bg-gray-800 border-b border-gray-700/50 backdrop-blur-[2px] py-2.5 px-4 md:px-22 sticky top-0 z-30'>
        <div className='container mx-auto flex items-center justify-between gap-5'>
            <Link to={"/"}><div className="flex items-center gap-2">
        <FaLaptopCode className="text-white text-xl" />
        <h2 className="text-lg md:text-xl font-medium leading-5 text-white hover:text-gray-200 transition-colors">
          Interview Ready AI
        </h2>
      </div></Link>

            <ProfileInfoCard/>
        </div>
    </div> 
  )
}
 
export default Navbar