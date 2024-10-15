import React from 'react'
import './UserInfo.css'
import { IoVideocam } from "react-icons/io5";
import { FaRegEdit } from "react-icons/fa";
import { MdMoreHoriz } from "react-icons/md";
import avatar from '../../../images/avatar.jpeg'
import { useUserStore } from '../../../lib/userStore';
function UserInfo() {
  const {currentUser} =  useUserStore();
 
  return (
    <div className='userInfo p-[20px] gap-[20px] flex items-center justify-between'>
      <div className="user flex items-center gap-[10px] mx-8 text-white">
        <img src={currentUser.avatar || avatar}className='w-[50px] h-[50px] rounded-full object-cover' alt="" />

        <h2>{currentUser.username}</h2>

      </div>
      <div className="icons flex ml-12 gap-[20px] text-[20px] text-white cursor-pointer">
        <MdMoreHoriz />
        <IoVideocam />
        <FaRegEdit />

      </div>

    </div>
  )
}

export default UserInfo
