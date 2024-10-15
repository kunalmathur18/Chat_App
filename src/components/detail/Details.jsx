// import React from 'react'
// import "./Details.css"
// import avatar from '../../images/avatar.jpeg'
// import { IoIosArrowUp } from "react-icons/io";
// import { MdOutlineKeyboardArrowDown } from "react-icons/md";
// import { IoMdDownload } from "react-icons/io";
// import { auth, db } from '../../lib/firebase';
// import { useChatStore } from '../../lib/chatStore';
// import { useUserStore } from '../../lib/userStore';
// import { arrayRemove, arrayUnion, doc, updateDoc } from 'firebase/firestore';
// function Details() {
//     const {chatId,user ,isCurrentUserBlocked,isReceiverBlocked ,changeBlock}=useChatStore();
//     const {currentUser} = useUserStore();
//     const handleBlock = async ()=>{
//         if(!user) return;
//         const userDocRef = doc(db , "users",currentUser.id)
//         try {
//             await updateDoc(userDocRef,{
//                 blocked:isReceiverBlocked ? arrayRemove(user.id) : arrayUnion(user.id),
//             });
//             changeBlock()
//         } catch (error) {
//             console.log(err)
            
//         }



//     }
//     return (
//         <div className='details  bg-[rgba(0,0,0,0.41)] rounded-[16px] shadow-[0_4px_30px_rgba(0,0,0,0.1)] backdrop-blur-[10.7px] border-[1px] border-solid border-[rgba(0,0,0,1)] p-[20px]'>

//           <div className='mx-12 w-[200px]'>
//           <div className="user flex py-[20px] px-[20px] flex-col items-center gap-[10px] border-b-[1px] border-solid border-[#dddddd35]">
//                 <img className='w-[100px] h-[100px] rounded-full object-cover' src={user?.avatar || avatar} alt="" />
//                 <h2>{user?.username}</h2>
//                 <p>Lorem ipsum dolor sit amet .</p>
//             </div>
//             <div className="info p-[20px] flex flex-col gap-[20px] ">
//                 <div className="option ">
//                     <div className="title ">
//                         <span>Chat Setting</span>
//                         <IoIosArrowUp />

//                     </div>
//                 </div>
//                 <div className="option">
//                     <div className="title">
//                         <span>Privacy & help</span>
//                         <IoIosArrowUp />

//                     </div>
//                 </div>
//                 <div className="option ">
//                     <div className="title">
//                         <span>Shared photos</span>
//                         <MdOutlineKeyboardArrowDown />

//                     </div>
//                     <div className="photos flex flex-col gap-[20px] h-[100px] overflow-scroll ">
//                         <div className="photoItem  ">
//                             <div className="photoDetail  ">
//                                 <img src={avatar} alt="" />
//                                 <span>photp_2024_2.png</span>

//                             </div>
//                             <IoMdDownload />

//                         </div>
//                         <div className="photoItem">
//                             <div className="photoDetail">
//                                 <img src={avatar} alt="" />
//                                 <span>photp_2024_2.png</span>

//                             </div>
//                             <IoMdDownload />

//                         </div>
//                         <div className="photoItem">
//                             <div className="photoDetail">
//                                 <img src={avatar} alt="" />
//                                 <span>photp_2024_2.png</span>

//                             </div>
//                             <IoMdDownload />

//                         </div>
//                         <div className="photoItem">
//                             <div className="photoDetail">
//                                 <img src={avatar} alt="" />
//                                 <span>photp_2024_2.png</span>

//                             </div>
//                             <IoMdDownload />

//                         </div>


//                     </div>
//                 </div>

//                 <div className="option">
//                     <div className="title">
//                         <span>Shared Files</span>
//                         <IoIosArrowUp />

//                     </div>
//                 </div>
//                 <button className='py-[10px] px-[20px]  bg-red-700 border-none rounded-xl cursor-pointer hover:bg-red-900' onClick={handleBlock} >{
//                     isCurrentUserBlocked? "you are blocked": isReceiverBlocked?"user blocked":"block user"
// }</button>
//                 <button className='logout py-[10px] px-[20px] cursor-pointer border-none bg-white hover:bg-slate-800 rounded-xl' onClick={()=>auth.signOut()} >LogOut</button>
//             </div>
//           </div>
//         </div>
//     )
// }

// export default Details







import React, { useState, useEffect } from 'react';
import "./Details.css";
import avatar from '../../images/avatar.jpeg';
import { IoIosArrowUp } from "react-icons/io";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { IoMdDownload } from "react-icons/io";
import { auth, db } from '../../lib/firebase';
import { useChatStore } from '../../lib/chatStore';
import { useUserStore } from '../../lib/userStore';
import { arrayRemove, arrayUnion, doc, updateDoc } from 'firebase/firestore';

function Details() {
    const { chatId, user, isCurrentUserBlocked, isReceiverBlocked, changeBlock } = useChatStore();
    const { currentUser, fetchUserInfo } = useUserStore();
    const [bio, setBio] = useState(user?.bio || "No bio available");  // Initial bio
    const [isEditing, setIsEditing] = useState(false);  // Toggle edit mode

    useEffect(() => {
        // Update bio when user info changes
        if (user?.bio) {
            setBio(user.bio);
        }
    }, [user]);

    // Handle Bio Save
    const handleSaveBio = async () => {
        if (!user || !bio) return;

        const userDocRef = doc(db, "users", user.id);  // Reference to user's document in Firestore
        try {
            await updateDoc(userDocRef, {
                bio: bio  // Update the bio field in Firestore
            });

            // Refetch user data to ensure updates reflect in UI
            await fetchUserInfo(user.id);  // Ensure this fetches the updated user data
            setIsEditing(false); // Close the edit mode
        } catch (error) {
            console.error("Error updating bio:", error);
        }
    };

    const handleBlock = async () => {
        if (!user) return;
        const userDocRef = doc(db, "users", currentUser.id);
        try {
            await updateDoc(userDocRef, {
                blocked: isReceiverBlocked ? arrayRemove(user.id) : arrayUnion(user.id),
            });
            changeBlock();
        } catch (error) {
            console.log(error);
        }
    };

    // Only allow bio editing if the current user is viewing their own profile
    const canEditBio = currentUser?.id === user?.id;

    return (
        <div className='details bg-[rgba(0,0,0,0.41)] rounded-[16px] shadow-[0_4px_30px_rgba(0,0,0,0.1)] backdrop-blur-[10.7px] border-[1px] border-solid border-[rgba(0,0,0,1)] p-[20px]'>
            <div className='mx-12 w-[200px]'>
                <div className="user flex py-[20px] px-[20px] flex-col items-center gap-[10px] border-b-[1px] border-solid border-[#dddddd35]">
                    <img className='w-[100px] h-[100px] rounded-full object-cover' src={user?.avatar || avatar} alt="" />
                    <h2>{user?.username}</h2>
                    
                    {/* Show the bio */}
                    {isEditing && canEditBio ? (
                        <div>
                            <textarea
                                className="bio-input"
                                value={bio}
                                onChange={(e) => setBio(e.target.value)}
                            />
                            <button className="save-bio-btn" onClick={handleSaveBio}>Save</button>
                        </div>
                    ) : (
                        <p>{user?.bio || bio}</p>
                    )}
                    
                    {/* Toggle Edit button only if the user can edit their bio */}
                    {canEditBio && (
                        <button onClick={() => setIsEditing(!isEditing)}>
                            {isEditing ? "Cancel" : "Edit Bio"}
                        </button>
                    )}
                </div>

                <div className="info p-[20px] flex flex-col gap-[20px] ">
                    <div className="option ">
                        <div className="title ">
                            <span>Chat Setting</span>
                            <IoIosArrowUp />
                        </div>
                    </div>
                    <div className="option">
                        <div className="title">
                            <span>Privacy & help</span>
                            <IoIosArrowUp />
                        </div>
                    </div>
                    <div className="option ">
                        <div className="title">
                            <span>Shared photos</span>
                            <MdOutlineKeyboardArrowDown />
                        </div>
                        <div className="photos flex flex-col gap-[20px] h-[100px] overflow-scroll ">
                            <div className="photoItem">
                                <div className="photoDetail">
                                    <img src={avatar} alt="" />
                                    <span>photo_2024_2.png</span>
                                </div>
                                <IoMdDownload />
                            </div>
                        </div>
                    </div>
                    <div className="option">
                        <div className="title">
                            <span>Shared Files</span>
                            <IoIosArrowUp />
                        </div>
                    </div>
                    <button className='py-[10px] px-[20px] bg-red-700 border-none rounded-xl cursor-pointer hover:bg-red-900' onClick={handleBlock}>
                        {isCurrentUserBlocked ? "You are blocked" : isReceiverBlocked ? "User blocked" : "Block User"}
                    </button>
                    <button className='logout py-[10px] px-[20px] cursor-pointer border-none bg-white hover:bg-slate-800 rounded-xl' onClick={() => auth.signOut()}>
                        LogOut
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Details;
