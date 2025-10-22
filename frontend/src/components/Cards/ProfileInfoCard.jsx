import React, { useContext } from 'react'
import { UserContext } from '../../Context/userContext'
import { useNavigate } from 'react-router-dom'
import { div } from 'framer-motion/client'

function ProfileInfoCard() {
    const { user, clearUser } = useContext(UserContext)
    const navigate = useNavigate()

    const handleLogout = () => {
        localStorage.clear()
        clearUser()
        navigate("/")
    }
    return user && (
        <div className='flex items-center gap-2'>
            <div className='h-11 w-11 rounded-full overflow-hidden border-2 border-gray-600'>
            <img src={user.profileImageUrl || undefined} alt="profile" className='h-full w-full rounded-full mr-3 object-cover' />
            </div>
            <div className='flex flex-col items-start gap-1'>
                <p className='text-[15px] font-bold leading-3 text-white'>{user.name || ""}</p>
                <button onClick={handleLogout} className='text-sm font-semibold text-amber-400 cursor-pointer hover:text-amber-300 hover:underline transition-colors'>Logout</button>
            </div>
        </div>
    )
}

export default ProfileInfoCard