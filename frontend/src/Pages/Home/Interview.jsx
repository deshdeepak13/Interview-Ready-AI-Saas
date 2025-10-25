import React, { useEffect, useState } from 'react'
import { LuPlus } from 'react-icons/lu';
// import {CARD_BG} from '../../utils/data.js'
// import DashboardLayout from '../../components/layout/DashboardLayout';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import { CARD_BG } from '../../utils/data';
import moment from 'moment';
import SummaryCard from '../../components/Cards/SummaryCard';
import Modal from '../../components/Modal'
import CreateSessionForm from './CreateSessionForm';
import DeleteAlertContent from '../../components/DeleteAlertContent';
import toast from 'react-hot-toast';

function Interview() {
  const navigate = useNavigate()

  const [openCreateModal, setOpenCreateModal] = useState(false)
  const [session,setSession] = useState([])
  const [openDeleteAlert,setOpenDeleteAlert] = useState({
    open: false,
    data: null
  })
  const fetchAllSessions = async() => {
    try{
      const response = await axiosInstance.get(API_PATHS.SESSION.GET_ALL);
      setSession(response.data.sessions)
    }catch(err){
      console.error("Error fetching session data: ",err);
      
    }
  }
  const deleteSession = async(sessionData) => {
    try{
      await axiosInstance.delete(API_PATHS.SESSION.DELETE(sessionData?._id))
  
      toast.success("Session Deleted Successfully")
      setOpenDeleteAlert({
        open: false,
        data:null
      })
      fetchAllSessions()
    }catch(e){
      console.error("Error deleting session data:", e)
    }
  }

  useEffect(() => {
     fetchAllSessions();
  },[])
  
  return (
    <>
      <div className='container mx-auto pt-4 pb-4 bg-gray-900 min-h-screen'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-7 pt-1 pb-6 px-4 md:px-22'>

          {session?.length > 0 ? (
  session.map((data, index) => (
    <SummaryCard
      key={data?._id}
      colors={CARD_BG[index % CARD_BG.length]}
      role={data?.role || ""}
      topicToFocus={data?.topicsToFocus || ""}
      experience={data?.experience || "-"}
      questions={data?.questions?.length || "-"}
      description={data?.description || ""}
      lastUpdate={
        data?.updatedAt ? moment(data.updatedAt).format("DD MMM YYYY") : ""
      }
      onSelect={() => navigate(`/interview-prep/${data?._id}`)}
      onDelete={() => setOpenDeleteAlert({ open: true, data })}
    />
  ))
) : (
  <div className="col-span-full flex flex-col items-center justify-center text-gray-400 py-24">
    <img
      src="https://cdn-icons-png.flaticon.com/512/4076/4076500.png"
      alt="Empty"
      className="w-32 h-32 mb-6 opacity-70"
    />
    <h2 className="text-xl font-semibold mb-2 text-gray-300">
      No sessions yet
    </h2>
    <p className="text-gray-500 mb-6">
      Click the <span className="text-orange-400 font-semibold">“Add New”</span> button to create your first interview session.
    </p>
    <button
      onClick={() => setOpenCreateModal(true)}
      className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-yellow-500 text-white px-5 py-2.5 rounded-full hover:scale-105 transition-all"
    >
      <LuPlus className="text-lg" /> Create Session
    </button>
  </div>
)}

        </div>
        <button className='h-12 md:h-12 flex items-center justify-center gap-3 bg-gradient-to-r from-[#FF9324] to-[#e99a4b] text-sm font-semibold text-white px-7 py-2.5 rounded-full hover:bg-gradient-to-r hover:from-[#ffa94d] hover:to-[#ffb366] transition-colors cursor-pointer hover:shadow-2xl hover:shadow-orange-500/30 fixed bottom-10 md:bottom-20 right-10 md:right-20 z-10 border border-orange-400/30' onClick={() => setOpenCreateModal(true)}>
          <LuPlus className='text-2xl text-white'/>
          Add New
        </button>
      </div>

      <Modal
      isOpen={openCreateModal}
      onClose={() => {
        setOpenCreateModal(false)
      }}
      hideHeader
      >
        <div className='bg-gray-800'>
          <CreateSessionForm/>
        </div>
      </Modal>
      <Modal
      isOpen={openDeleteAlert?.open}
      isClose={() => {
        setOpenDeleteAlert({open:false, data:null})
      }}
      title="Delete Alert"
      >
        <div className='w-[30vw] bg-gray-800'>
          <DeleteAlertContent
          content="Are you sure you want to delete this session details?"
          onDelete={() => deleteSession(openDeleteAlert.data)}
          />
        </div>
      </Modal>
    </>
  )
}

export default Interview