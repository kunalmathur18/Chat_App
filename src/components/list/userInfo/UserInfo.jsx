// import React from 'react'
// import './UserInfo.css'
// import { IoVideocam } from "react-icons/io5";
// import { FaRegEdit } from "react-icons/fa";
// import { MdMoreHoriz } from "react-icons/md";
// import avatar from '../../../images/avatar.jpeg'
// import { useUserStore } from '../../../lib/userStore';
// function UserInfo() {
//   const {currentUser} =  useUserStore();
 
//   return (
//     <div className='userInfo p-[20px] gap-[20px] flex items-center justify-between'>
//       <div className="user flex items-center gap-[10px] mx-8 text-white">
//         <img src={currentUser.avatar || avatar}className='w-[50px] h-[50px] rounded-full object-cover' alt="" />

//         <h2>{currentUser.username}</h2>

//       </div>
//       <div className="icons flex ml-12 gap-[20px] text-[20px] text-white cursor-pointer">
//         <MdMoreHoriz />
//         <IoVideocam />
//         <FaRegEdit />

//       </div>

//     </div>
//   )
// }

// export default UserInfo



///above code is completely working below code are for testing


import React, { useState } from 'react';
import './UserInfo.css';
import { IoVideocam } from 'react-icons/io5';
import { FaRegEdit } from 'react-icons/fa';
import { MdMoreHoriz } from 'react-icons/md';
import avatar from '../../../images/avatar.jpeg';
import { useUserStore } from '../../../lib/userStore';

function UserInfo() {
  const { currentUser } = useUserStore();
  const [showIcons, setShowIcons] = useState(false); // State to control dropdown visibility

  return (
    <div className='userInfo p-[20px] gap-[20px] flex items-center justify-between'>
      <div className="user flex items-center gap-[10px]  text-white">
        <img src={currentUser.avatar || avatar} className='w-[50px] h-[50px] rounded-full object-cover' alt="" />
        <h2>{currentUser.username}</h2>
      </div>

      {/* Icon dropdown for smaller screens */}
      <div className="relative icons md:hidden flex ml-12 gap-[20px] text-[20px] text-white cursor-pointer">
        <MdMoreHoriz onClick={() => setShowIcons(!showIcons)} />
        {showIcons && (
          <div className="absolute right-0 mt-2 bg-gray-800 rounded-lg p-2 flex flex-col gap-2">
            <IoVideocam />
            <FaRegEdit />
          </div>
        )}
      </div>

      {/* Icons visible directly on larger screens */}
      <div className="hidden md:flex ml-12 gap-[20px] text-[20px] text-white cursor-pointer">
        <MdMoreHoriz />
        <IoVideocam />
        <FaRegEdit />
      </div>
    </div>
  );
}

export default UserInfo;
