


//below code is completely working*******


// import React, { useState, useEffect } from 'react';
// import "./Details.css";
// import avatar from '../../images/avatar.jpeg';
// import { IoIosArrowUp } from "react-icons/io";
// import { MdOutlineKeyboardArrowDown } from "react-icons/md";
// import { IoMdDownload } from "react-icons/io";
// import { auth, db } from '../../lib/firebase';
// import { useChatStore } from '../../lib/chatStore';
// import { useUserStore } from '../../lib/userStore';
// import { arrayRemove, arrayUnion, doc, updateDoc } from 'firebase/firestore';
// import { MdModeEdit } from "react-icons/md";
// import { MdEditOff } from "react-icons/md";

// function Details() {
//     const { chatId, user, isCurrentUserBlocked, isReceiverBlocked, changeBlock } = useChatStore();
//     const { currentUser, fetchUserInfo } = useUserStore();
//     const [bio, setBio] = useState(user?.bio || "No bio available");  // Initial bio
//     const [isEditing, setIsEditing] = useState(false);  // Toggle edit mode

//     useEffect(() => {
//         // Update bio when user info changes
//         if (user?.bio) {
//             setBio(user.bio);
//         }
//     }, [user]);

//     // Handle Bio Save
//     const handleSaveBio = async () => {
//         if (!user || !bio) return;

//         const userDocRef = doc(db, "users", user.id);  // Reference to user's document in Firestore
//         try {
//             await updateDoc(userDocRef, {
//                 bio: bio  // Update the bio field in Firestore
//             });

//             // Refetch user data to ensure updates reflect in UI
//             await fetchUserInfo(user.id);  // Ensure this fetches the updated user data
//             setIsEditing(false); // Close the edit mode
//         } catch (error) {
//             console.error("Error updating bio:", error);
//         }
//     };

//     const handleBlock = async () => {
//         if (!user) return;
//         const userDocRef = doc(db, "users", currentUser.id);
//         try {
//             await updateDoc(userDocRef, {
//                 blocked: isReceiverBlocked ? arrayRemove(user.id) : arrayUnion(user.id),
//             });
//             changeBlock();
//         } catch (error) {
//             console.log(error);
//         }
//     };

//     // Only allow bio editing if the current user is viewing their own profile
//     const canEditBio = currentUser?.id === user?.id;

//     return (
//         <div className='details bg-[rgba(0,0,0,0.41)] rounded-[16px] shadow-[0_4px_30px_rgba(0,0,0,0.1)] backdrop-blur-[10.7px] border-[1px] border-solid border-[rgba(0,0,0,1)] p-[20px]'>
//             <div className='mx-12 w-[200px]'>
//                 <div className="user flex py-[20px] px-[20px] flex-col items-center gap-[10px] border-b-[1px] border-solid border-[#dddddd35]">
//                     <img className='w-[100px] h-[100px] rounded-full object-cover' src={user?.avatar || avatar} alt="" />
//                     <h2 className='text-[22px] font-bold text-[#dc6464]'>{user?.username}</h2>
                    
//                     {/* Show the bio */}
//                     {isEditing && canEditBio ? (
//                         <div className='flex gap-1'>
//                             <textarea
//                                 className="bio-input bg-[#4078cd] outline-none rounded-lg text-center"
//                                 value={bio}
//                                 onChange={(e) => setBio(e.target.value)}
//                             />
//                             <button className="save-bio-btn" onClick={handleSaveBio}>Save</button>
//                         </div>
//                     ) : (
//                         <p>{user?.bio || bio}</p>
//                     )}
                    
//                     {/* Toggle Edit button only if the user can edit their bio */}
//                     {canEditBio && (
//                         <button className='text-white text-[18px]' onClick={() => setIsEditing(!isEditing)}>
//                             {isEditing ? <MdEditOff /> : <MdModeEdit />}
//                         </button>
//                     )}
//                 </div>

//                 <div className="info p-[20px] flex flex-col gap-[20px] ">
                    
                   
//                     <div className="option ">
//                         <div className="title">
//                             <span>Shared photos</span>
//                             <MdOutlineKeyboardArrowDown />
//                         </div>
//                         <div className="photos flex flex-col gap-[20px] h-[100px] overflow-scroll ">
//                             <div className="photoItem">
//                                 <div className="photoDetail">
//                                     <img src={avatar} alt="" />
//                                     <span>photo_2024_2.png</span>
//                                 </div>
//                                 <IoMdDownload />
//                             </div>
//                         </div>
//                     </div>
                    
//                     <button className='py-[10px] px-[20px] bg-red-700 border-none rounded-xl cursor-pointer hover:bg-red-900' onClick={handleBlock}>
//                         {isCurrentUserBlocked ? "You are blocked" : isReceiverBlocked ? "User blocked" : "Block User"}
//                     </button>
//                     <button className='logout py-[10px] px-[20px] cursor-pointer border-none bg-white hover:bg-slate-800 rounded-xl' onClick={() => auth.signOut()}>
//                         LogOut
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default Details;




//it is also correct

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
import { MdModeEdit } from "react-icons/md";
import { MdEditOff } from "react-icons/md";
import upload from '../../lib/upload'; // Ensure you import your upload function

function Details() {
    const { chatId, user, isCurrentUserBlocked, isReceiverBlocked, changeBlock } = useChatStore();
    const { currentUser, fetchUserInfo } = useUserStore();
    const [bio, setBio] = useState(user?.bio || "No bio available");  // Initial bio
    const [isEditing, setIsEditing] = useState(false);  // Toggle edit mode
    const [isAvatarEditing, setIsAvatarEditing] = useState(false); // Toggle avatar edit mode
    const [newAvatar, setNewAvatar] = useState(null); // Store new avatar file
    const [avatarPreview, setAvatarPreview] = useState(user?.avatar || avatar); // Preview of avatar

    useEffect(() => {
        // Update bio when user info changes
        if (user?.bio) {
            setBio(user.bio);
        }
        // Update avatar preview if user info changes
        if (user?.avatar) {
            setAvatarPreview(user.avatar);
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

    // Handle Avatar Upload
    const handleAvatarChange = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        // Set new avatar for preview
        setNewAvatar(file);
        const previewUrl = URL.createObjectURL(file); // Create a local URL for the preview
        setAvatarPreview(previewUrl); // Update avatar preview

        // Upload the new avatar image
        try {
            const downloadURL = await upload(file); // Call the upload function
            const userDocRef = doc(db, "users", user.id); // Reference to user's document in Firestore
            await updateDoc(userDocRef, {
                avatar: downloadURL // Update avatar in Firestore
            });

            // Refetch user data to ensure updates reflect in UI
            await fetchUserInfo(user.id); // Ensure this fetches the updated user data
            setIsAvatarEditing(false); // Close the avatar edit mode
        } catch (error) {
            console.error("Error updating avatar:", error);
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
                    <img
                        className='w-[100px] h-[100px] rounded-full object-cover cursor-pointer'
                        src={avatarPreview} // Use avatarPreview for immediate update
                        alt=""
                        onClick={() => setIsAvatarEditing(true)}
                    />
                    <h2 className='text-[22px] font-bold text-[#dc6464]'>{user?.username}</h2>
                    
                    {/* Show the bio */}
                    {isEditing && canEditBio ? (
                        <div className='flex gap-1'>
                            <textarea
                                className="bio-input bg-[#4078cd] outline-none rounded-lg text-center"
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
                        <button className='text-white text-[18px]' onClick={() => setIsEditing(!isEditing)}>
                            {isEditing ? <MdEditOff /> : <MdModeEdit />}
                        </button>
                    )}

                    {/* Avatar editing section */}
                    {isAvatarEditing && canEditBio && (
                        <div className='flex flex-col items-center'>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleAvatarChange}
                                className="hidden"
                                id="avatar-upload"
                            />
                            <label
                                htmlFor="avatar-upload"
                                className='py-[5px] px-[10px] bg-blue-600 text-white rounded cursor-pointer'
                            >
                                Change Avatar
                            </label>
                        </div>
                    )}
                </div>

                <div className="info p-[20px] flex flex-col gap-[20px] ">
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



// // Details.jsx
// import React, { useState, useEffect } from 'react';
// import "./Details.css";
// import avatar from '../../images/avatar.jpeg';
// import { IoIosArrowUp } from "react-icons/io";
// import { MdOutlineKeyboardArrowDown } from "react-icons/md";
// import { IoMdDownload } from "react-icons/io";
// import { auth, db } from '../../lib/firebase';
// import { useChatStore } from '../../lib/chatStore';
// import { useUserStore } from '../../lib/userStore';
// import { arrayRemove, arrayUnion, doc, updateDoc } from 'firebase/firestore';
// import { MdModeEdit } from "react-icons/md";
// import { MdEditOff } from "react-icons/md";
// import upload from '../../lib/upload'; // Ensure you import your upload function

// function Details() {
//     const { chatId, user, isCurrentUserBlocked, isReceiverBlocked, changeBlock } = useChatStore();
//     const { currentUser, fetchUserInfo, updateUserAvatar } = useUserStore(); // Added updateUserAvatar
//     const [bio, setBio] = useState(user?.bio || "No bio available");  // Initial bio
//     const [isEditing, setIsEditing] = useState(false);  // Toggle edit mode
//     const [isAvatarEditing, setIsAvatarEditing] = useState(false); // Toggle avatar edit mode
//     const [newAvatar, setNewAvatar] = useState(null); // Store new avatar file
//     const [avatarPreview, setAvatarPreview] = useState(user?.avatar || avatar); // Preview of avatar

//     useEffect(() => {
//         // Update bio when user info changes
//         if (user?.bio) {
//             setBio(user.bio);
//         }
//         // Update avatar preview if user info changes
//         if (user?.avatar) {
//             setAvatarPreview(user.avatar);
//         }
//     }, [user]);

//     // Handle Bio Save
//     const handleSaveBio = async () => {
//         if (!user || !bio) return;

//         const userDocRef = doc(db, "users", user.id);  // Reference to user's document in Firestore
//         try {
//             await updateDoc(userDocRef, {
//                 bio: bio  // Update the bio field in Firestore
//             });

//             // Refetch user data to ensure updates reflect in UI
//             await fetchUserInfo(user.id);  // Ensure this fetches the updated user data
//             setIsEditing(false); // Close the edit mode
//         } catch (error) {
//             console.error("Error updating bio:", error);
//         }
//     };

//     // Handle Avatar Upload
//     const handleAvatarChange = async (event) => {
//         const file = event.target.files[0];
//         if (!file) return;

//         // Set new avatar for preview
//         setNewAvatar(file);
//         const previewUrl = URL.createObjectURL(file); // Create a local URL for the preview
//         setAvatarPreview(previewUrl); // Update avatar preview

//         // Upload the new avatar image
//         try {
//             const downloadURL = await upload(file); // Call the upload function
//             const userDocRef = doc(db, "users", user.id); // Reference to user's document in Firestore
//             await updateDoc(userDocRef, {
//                 avatar: downloadURL // Update avatar in Firestore
//             });

//             // Update the user store with new avatar
//             updateUserAvatar(downloadURL); // Update avatar in the store

//             // Refetch user data to ensure updates reflect in UI
//             await fetchUserInfo(user.id); // Ensure this fetches the updated user data
//             setIsAvatarEditing(false); // Close the avatar edit mode
//         } catch (error) {
//             console.error("Error updating avatar:", error);
//         }
//     };

//     const handleBlock = async () => {
//         if (!user) return;
//         const userDocRef = doc(db, "users", currentUser.id);
//         try {
//             await updateDoc(userDocRef, {
//                 blocked: isReceiverBlocked ? arrayRemove(user.id) : arrayUnion(user.id),
//             });
//             changeBlock();
//         } catch (error) {
//             console.log(error);
//         }
//     };

//     // Only allow bio editing if the current user is viewing their own profile
//     const canEditBio = currentUser?.id === user?.id;

//     return (
//         <div className='details bg-[rgba(0,0,0,0.41)] rounded-[16px] shadow-[0_4px_30px_rgba(0,0,0,0.1)] backdrop-blur-[10.7px] border-[1px] border-solid border-[rgba(0,0,0,1)] p-[20px]'>
//             <div className='mx-12 w-[200px]'>
//                 <div className="user flex py-[20px] px-[20px] flex-col items-center gap-[10px] border-b-[1px] border-solid border-[#dddddd35]">
//                     <img
//                         className='w-[100px] h-[100px] rounded-full object-cover cursor-pointer'
//                         src={avatarPreview} // Use avatarPreview for immediate update
//                         alt=""
//                         onClick={() => setIsAvatarEditing(true)}
//                     />
//                     <h2 className='text-[22px] font-bold text-[#dc6464]'>{user?.username}</h2>
                    
//                     {/* Show the bio */}
//                     {isEditing && canEditBio ? (
//                         <div className='flex gap-1'>
//                             <textarea
//                                 className="bio-input bg-[#4078cd] outline-none rounded-lg text-center"
//                                 value={bio}
//                                 onChange={(e) => setBio(e.target.value)}
//                             />
//                             <button className="save-bio-btn" onClick={handleSaveBio}>Save</button>
//                         </div>
//                     ) : (
//                         <p>{user?.bio || bio}</p>
//                     )}
                    
//                     {/* Toggle Edit button only if the user can edit their bio */}
//                     {canEditBio && (
//                         <button className='text-white text-[18px]' onClick={() => setIsEditing(!isEditing)}>
//                             {isEditing ? <MdEditOff /> : <MdModeEdit />}
//                         </button>
//                     )}

//                     {/* Avatar editing section */}
//                     {isAvatarEditing && canEditBio && (
//                         <div className='flex flex-col items-center'>
//                             <input
//                                 type="file"
//                                 accept="image/*"
//                                 onChange={handleAvatarChange}
//                                 className="hidden"
//                                 id="avatar-upload"
//                             />
//                             <label
//                                 htmlFor="avatar-upload"
//                                 className='py-[5px] px-[10px] bg-blue-600 text-white rounded cursor-pointer'
//                             >
//                                 Change Avatar
//                             </label>
//                         </div>
//                     )}
//                 </div>

//                 <div className="info p-[20px] flex flex-col gap-[20px] ">
//                     <div className="option ">
//                         <div className="title">
//                             <span>Shared photos</span>
//                             <MdOutlineKeyboardArrowDown />
//                         </div>
//                         <div className="photos flex flex-col gap-[20px] h-[100px] overflow-scroll ">
//                             <div className="photoItem">
//                                 <div className="photoDetail">
//                                     <img src={avatar} alt="" />
//                                     <span>photo_2024_2.png</span>
//                                 </div>
//                                 <IoMdDownload />
//                             </div>
//                         </div>
//                     </div>
                    
//                     <button className='py-[10px] px-[20px] bg-red-700 border-none rounded-xl cursor-pointer hover:bg-red-900' onClick={handleBlock}>
//                         {isCurrentUserBlocked ? "You are blocked" : isReceiverBlocked ? "User blocked" : "Block User"}
//                     </button>
//                     <button className='logout py-[10px] px-[20px] cursor-pointer border-none bg-white hover:bg-slate-800 rounded-xl' onClick={() => auth.signOut()}>
//                         LogOut
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default Details;
