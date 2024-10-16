



//below code is completely working *****

// import React, { useEffect, useRef, useState } from 'react';
// import "./Chat.css";
// import avatar from '../../images/avatar.jpeg';
// import { FaPhoneAlt } from "react-icons/fa";
// import { FaVideo } from "react-icons/fa";
// import { FaCircleInfo } from "react-icons/fa6";
// import { MdEmojiEmotions } from "react-icons/md";
// import { IoSendSharp } from "react-icons/io5";
// import { FaImages } from "react-icons/fa";
// import { FaMicrophone } from "react-icons/fa";
// import { FaCamera } from "react-icons/fa";
// import EmojiPicker from 'emoji-picker-react';
// import { arrayUnion, doc, getDoc, onSnapshot, updateDoc } from 'firebase/firestore';
// import { db } from '../../lib/firebase';
// import { useChatStore } from '../../lib/chatStore';
// import { useUserStore } from '../../lib/userStore';
// import upload from '../../lib/upload';

// function Chat() {
//     const [chat, setChat] = useState();
//     const [open, setOpen] = useState(false);
//     const [text, setText] = useState("");
//     const [img, setImg] = useState({
//         file: null,
//         url: "",
//     });

//     const { chatId, user, isCurrentUserBlocked, isReceiverBlocked } = useChatStore();
//     const { currentUser } = useUserStore();

//     const endRef = useRef(null);

//     useEffect(() => {
//         endRef.current?.scrollIntoView({ behavior: "smooth" });
//     });

//     useEffect(() => {
//         const unSub = onSnapshot(doc(db, "chats", chatId), (res) => {
//             setChat(res.data());
//         });
//         return () => {
//             unSub();
//         };
//     }, [chatId]);

//     const handleEmoji = (e) => {
//         setText((prev) => prev + e.emoji);
//         setOpen(false);
//     };

//     const handleImg = (e) => {
//         if (e.target.files[0]) {
//             setImg({
//                 file: e.target.files[0],
//                 url: URL.createObjectURL(e.target.files[0]),
//             });
//         }
//     };

//     const handleSend = async () => {
//         if (text === "") return;

//         let imgUrl = null;

//         try {
//             if (img.file) {
//                 imgUrl = await upload(img.file);
//             }

//             // Update the main chat collection with the new message
//             await updateDoc(doc(db, "chats", chatId), {
//                 messages: arrayUnion({
//                     senderId: currentUser.id,
//                     text,
//                     createdAt: new Date(),
//                     ...(imgUrl && { img: imgUrl }),
//                 }),
//             });

//             const userIDs = [currentUser.id, user.id];

//             for (const id of userIDs) {
//                 const userChatsRef = doc(db, "userchats", id);
//                 const userChatsSnapshot = await getDoc(userChatsRef);

//                 if (userChatsSnapshot.exists()) {
//                     const userChatsData = userChatsSnapshot.data();
//                     const chatIndex = userChatsData.chats.findIndex((c) => c.chatId === chatId);

//                     if (chatIndex !== -1) {
//                         userChatsData.chats[chatIndex].lastMessage = text;
//                         userChatsData.chats[chatIndex].isSeen = id === currentUser.id;
//                         userChatsData.chats[chatIndex].updatedAt = Date.now();

//                         await updateDoc(userChatsRef, {
//                             chats: userChatsData.chats,
//                         });
//                     } else {
//                         console.error(`Chat not found in userChats for user ID: ${id}`);
//                     }
//                 } else {
//                     console.error(`userChats document not found for user ID: ${id}`);
//                 }
//             }

//             setText("");
//         } catch (error) {
//             console.log("Error sending message or updating userChats:", error);
//         }

//         setImg({
//             file: null,
//             url: "",
//         });
//     };

//     return (
//         <div className='chat flex flex-col bg-[rgba(0,0,0,0.41)] rounded-[16px] shadow-[0_4px_30px_rgba(0,0,0,0.1)] backdrop-blur-[10.7px] border-[1px] border-solid border-[rgba(0,0,0,1)] z-20 h-[100%]'>
//             <div className="top p-[20px] flex items-center justify-between border-b-[1px] border-solid border-[#dddddd35]">
//                 <div className="user flex items-center gap[20px]">
//                     <img src={user?.avatar || avatar} className='w-[60px] h-[60px] rounded-full object-cover' alt="" />
//                     <div className="text flex flex-col gap-2">
//                         <span className='text-[18px] font-bold'>{user?.username}</span>
//                         <p className='text-[14px] font-light text-[#a5a5a5]'>
//                             {user?.bio || "No bio available"}
//                         </p> {/* Display user bio */}
//                     </div>
//                 </div>
//                 <div className="icons flex gap-[20px] text-[20px] cursor-pointer text-white">
//                     <FaPhoneAlt />
//                     <FaVideo />
//                     <FaCircleInfo />
//                 </div>
//             </div>

//             <div className="center p-[20px] grow overflow-scroll flex flex-col gap-[20px]">
//                 {chat?.messages?.map((message) => (
//                     <div className={message.senderId === currentUser?.id ? "message own" : "message"} key={message?.createAt}>
//                         <div className="text">
//                             {message.img && <img src={message.img} alt="" className='w-[100%] h-[300px] rounded-md object-cover' />}
//                             <p>{message.text}</p>
//                         </div>
//                     </div>
//                 ))}

//                 {img.url && (
//                     <div className="message own">
//                         <div className="texts">
//                             <img src={img.url} alt="" />
//                         </div>
//                     </div>
//                 )}
//                 <div ref={endRef}></div>
//             </div>

//             <div className="bottom flex items-center justify-between text-white p-[20px] border-t-[1px] border-solid border-[#dddddd35] gap-[20px]">
//                 <div className="icons flex gap-[20px] text-[20px]">
//                     <label htmlFor="file">
//                         <FaImages className='cursor-pointer' />
//                     </label>
//                     <input type="file" id="file" style={{ display: "none" }} onChange={handleImg} />
//                     <FaCamera className='cursor-pointer' />
//                     <FaMicrophone className='cursor-pointer' />
//                 </div>
//                 <input
//                     type="text"
//                     className='grow bg-[#2f4176] rounded-lg p-1 outline-none border-none text-white'
//                     placeholder='Type a message...'
//                     onChange={(e) => setText(e.target.value)}
//                     value={text}
//                     disabled={isCurrentUserBlocked || isReceiverBlocked}
//                 />
//                 <div className="emoji relative">
//                     <MdEmojiEmotions className='cursor-pointer text-[20px]' onClick={() => setOpen((prev) => !prev)} />
//                     <div className="picker absolute bottom-[50px] left-0 z-[999]">
//                         <EmojiPicker open={open} onEmojiClick={handleEmoji} />
//                     </div>
//                 </div>
//                 <div className='sendButton cursor-pointer' onClick={handleSend}>
//                     <IoSendSharp className='cursor-pointer text-[20px]' />
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default Chat;
 
//******** */





import React, { useEffect, useRef, useState } from 'react';
import "./Chat.css";
import avatar from '../../images/avatar.jpeg';
import { FaPhoneAlt } from "react-icons/fa";
import { FaVideo } from "react-icons/fa";
import { FaCircleInfo } from "react-icons/fa6";
import { MdEmojiEmotions } from "react-icons/md";
import { IoSendSharp } from "react-icons/io5";
import { FaImages } from "react-icons/fa";
import { FaMicrophone } from "react-icons/fa";
import { FaCamera } from "react-icons/fa";
import EmojiPicker from 'emoji-picker-react';
import { arrayUnion, doc, getDoc, onSnapshot, updateDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { useChatStore } from '../../lib/chatStore';
import { useUserStore } from '../../lib/userStore';
import upload from '../../lib/upload';

function Chat({ onAvatarClick }) {  // Accepting onAvatarClick prop from App.jsx
    const [chat, setChat] = useState();
    const [open, setOpen] = useState(false);
    const [text, setText] = useState("");
    const [img, setImg] = useState({
        file: null,
        url: "",
    });

    const { chatId, user, isCurrentUserBlocked, isReceiverBlocked } = useChatStore();
    const { currentUser } = useUserStore();

    const endRef = useRef(null);

    useEffect(() => {
        endRef.current?.scrollIntoView({ behavior: "smooth" });
    });

    useEffect(() => {
        const unSub = onSnapshot(doc(db, "chats", chatId), (res) => {
            setChat(res.data());
        });
        return () => {
            unSub();
        };
    }, [chatId]);

    const handleEmoji = (e) => {
        setText((prev) => prev + e.emoji);
        setOpen(false);
    };

    const handleImg = (e) => {
        if (e.target.files[0]) {
            setImg({
                file: e.target.files[0],
                url: URL.createObjectURL(e.target.files[0]),
            });
        }
    };

    const handleSend = async () => {
        if (text === "") return;

        let imgUrl = null;

        try {
            if (img.file) {
                imgUrl = await upload(img.file);
            }

            await updateDoc(doc(db, "chats", chatId), {
                messages: arrayUnion({
                    senderId: currentUser.id,
                    text,
                    createdAt: new Date(),
                    ...(imgUrl && { img: imgUrl }),
                }),
            });

            const userIDs = [currentUser.id, user.id];

            for (const id of userIDs) {
                const userChatsRef = doc(db, "userchats", id);
                const userChatsSnapshot = await getDoc(userChatsRef);

                if (userChatsSnapshot.exists()) {
                    const userChatsData = userChatsSnapshot.data();
                    const chatIndex = userChatsData.chats.findIndex((c) => c.chatId === chatId);

                    if (chatIndex !== -1) {
                        userChatsData.chats[chatIndex].lastMessage = text;
                        userChatsData.chats[chatIndex].isSeen = id === currentUser.id;
                        userChatsData.chats[chatIndex].updatedAt = Date.now();

                        await updateDoc(userChatsRef, {
                            chats: userChatsData.chats,
                        });
                    } else {
                        console.error(`Chat not found in userChats for user ID: ${id}`);
                    }
                } else {
                    console.error(`userChats document not found for user ID: ${id}`);
                }
            }

            setText("");
        } catch (error) {
            console.log("Error sending message or updating userChats:", error);
        }

        setImg({
            file: null,
            url: "",
        });
    };

    return (
        <div className='chat flex flex-col bg-[rgba(0,0,0,0.41)] rounded-[16px] shadow-[0_4px_30px_rgba(0,0,0,0.1)] backdrop-blur-[10.7px] border-[1px] border-solid border-[rgba(0,0,0,1)] z-20 h-[100%]'>
            <div className="top p-[20px] flex items-center justify-between border-b-[1px] border-solid border-[#dddddd35]">
                <div className="user flex items-center gap[20px]">
                    <img 
                        src={user?.avatar || avatar} 
                        className='w-[60px] h-[60px] rounded-full object-cover' 
                        alt="" 
                        onClick={onAvatarClick}  // Triggering the function on avatar click
                        style={{ cursor: 'pointer' }} 
                    />
                    <div className="text flex flex-col gap-2">
                        <span className='text-[22px] text-[#f49778] font-bold'>{user?.username}</span>
                        <p className='text-[18px] font-light text-[#f0e9e9] '>
                            {user?.bio || "No bio available"}
                        </p> 
                    </div>
                </div>
                <div className="icons flex gap-[20px] text-[20px] cursor-pointer text-white">
                    <FaPhoneAlt />
                    <FaVideo />
                    <FaCircleInfo />
                </div>
            </div>

            {/* <div className="center p-[20px] grow overflow-scroll flex flex-col gap-[20px]">
                {chat?.messages?.map((message) => (
                    <div className={message.senderId === currentUser?.id ? "message own" : "message"} key={message?.createAt}>
                        <div className="text">
                            {message.img && <img src={message.img} alt="" className='w-[100%] h-[300px] rounded-md object-cover' />}
                            <p>{message.text}</p>
                        </div>
                    </div>
                ))}

                {img.url && (
                    <div className="message own">
                        <div className="texts">
                            <img src={img.url} alt="" />
                        </div>
                    </div>
                )}
                <div ref={endRef}></div>
            </div> */}
            <div className="center p-[20px] grow overflow-y-scroll  flex flex-col gap-[20px]">
    {chat?.messages?.map((message) => (
        <div className={message.senderId === currentUser?.id ? "message own" : "message"} key={`${message.senderId}-${message.createdAt}`}>
            <div className="text">
                {message.img && <img src={message.img} alt="" className='w-[100%] h-[300px] rounded-md object-cover' />}
                <p>{message.text}</p>
            </div>
        </div>
    ))}
    
    {img.url && (
        <div className="message own">
            <div className="texts">
                <img src={img.url} alt="" />
            </div>
        </div>
    )}
    <div ref={endRef}></div>
</div>


            <div className="bottom flex items-center justify-between text-white p-[20px] border-t-[1px] border-solid border-[#dddddd35] gap-[20px]">
                <div className="icons flex gap-[20px] text-[20px]">
                    <label htmlFor="file">
                        <FaImages className='cursor-pointer' />
                    </label>
                    <input type="file" id="file" style={{ display: "none" }} onChange={handleImg} />
                    <FaCamera className='cursor-pointer' />
                    <FaMicrophone className='cursor-pointer' />
                </div>
                <input
                    type="text"
                    className='grow bg-[#2f4176] rounded-lg p-1 outline-none border-none text-white'
                    placeholder='Type a message...'
                    onChange={(e) => setText(e.target.value)}
                    value={text}
                    disabled={isCurrentUserBlocked || isReceiverBlocked}
                />
                <div className="emoji relative">
                    <MdEmojiEmotions className='cursor-pointer text-[20px]' onClick={() => setOpen((prev) => !prev)} />
                    <div className="picker absolute bottom-[50px] left-0 z-[999]">
                        <EmojiPicker open={open} onEmojiClick={handleEmoji} />
                    </div>
                </div>
                <div className='sendButton cursor-pointer' onClick={handleSend}>
                    <IoSendSharp className='cursor-pointer text-[20px]' />
                </div>
            </div>
        </div>
    );
}

export default Chat;






// import React, { useEffect, useRef, useState } from 'react';
// import "./Chat.css";
// import avatar from '../../images/avatar.jpeg';
// import { FaPhoneAlt, FaVideo, FaCircleInfo, FaImages, FaMicrophone, FaCamera } from "react-icons/fa";
// import { MdEmojiEmotions } from "react-icons/md";
// import { IoSendSharp } from "react-icons/io5";
// import EmojiPicker from 'emoji-picker-react';
// import { arrayUnion, doc, getDoc, onSnapshot, updateDoc } from 'firebase/firestore';
// import { db } from '../../lib/firebase';
// import { useChatStore } from '../../lib/chatStore';
// import { useUserStore } from '../../lib/userStore';
// import upload from '../../lib/upload';

// function Chat({ onAvatarClick }) {
//     const [chat, setChat] = useState();
//     const [open, setOpen] = useState(false);
//     const [text, setText] = useState("");
//     const [img, setImg] = useState({
//         file: null,
//         url: "",
//     });

//     const { chatId, user, isCurrentUserBlocked, isReceiverBlocked } = useChatStore();
//     const { currentUser } = useUserStore();
//     const [currentUserData, setCurrentUserData] = useState(currentUser);

//     const endRef = useRef(null);

//     useEffect(() => {
//         endRef.current?.scrollIntoView({ behavior: "smooth" });
//     }, [chat]);  // Scroll to bottom when chat updates

//     useEffect(() => {
//         const chatUnsub = onSnapshot(doc(db, "chats", chatId), (res) => {
//             setChat(res.data());
//         });

//         // Firestore listener for the current user's data
//         const userUnsub = onSnapshot(doc(db, "users", currentUser.id), (res) => {
//             if (res.exists()) {
//                 setCurrentUserData(res.data()); // Update local user data when it changes
//             } else {
//                 console.error("User document does not exist");
//             }
//         });

//         return () => {
//             chatUnsub();
//             userUnsub();
//         };
//     }, [chatId, currentUser.id]);

//     const handleEmoji = (e) => {
//         setText((prev) => prev + e.emoji);
//         setOpen(false);
//     };

//     const handleImg = (e) => {
//         if (e.target.files[0]) {
//             setImg({
//                 file: e.target.files[0],
//                 url: URL.createObjectURL(e.target.files[0]),
//             });
//         }
//     };

//     const handleSend = async () => {
//         if (text === "") return;

//         let imgUrl = null;

//         try {
//             if (img.file) {
//                 imgUrl = await upload(img.file);
//             }

//             await updateDoc(doc(db, "chats", chatId), {
//                 messages: arrayUnion({
//                     senderId: currentUser.id,
//                     text,
//                     createdAt: new Date(),
//                     ...(imgUrl && { img: imgUrl }),
//                 }),
//             });

//             const userIDs = [currentUser.id, user.id];

//             for (const id of userIDs) {
//                 const userChatsRef = doc(db, "userchats", id);
//                 const userChatsSnapshot = await getDoc(userChatsRef);

//                 if (userChatsSnapshot.exists()) {
//                     const userChatsData = userChatsSnapshot.data();
//                     const chatIndex = userChatsData.chats.findIndex((c) => c.chatId === chatId);

//                     if (chatIndex !== -1) {
//                         userChatsData.chats[chatIndex].lastMessage = text;
//                         userChatsData.chats[chatIndex].isSeen = id === currentUser.id;
//                         userChatsData.chats[chatIndex].updatedAt = Date.now();

//                         await updateDoc(userChatsRef, {
//                             chats: userChatsData.chats,
//                         });
//                     } else {
//                         console.error(`Chat not found in userChats for user ID: ${id}`);
//                     }
//                 } else {
//                     console.error(`userChats document not found for user ID: ${id}`);
//                 }
//             }

//             setText("");
//         } catch (error) {
//             console.log("Error sending message or updating userChats:", error);
//         }

//         setImg({
//             file: null,
//             url: "",
//         });
//     };

//     return (
//         <div className='chat flex flex-col bg-[rgba(0,0,0,0.41)] rounded-[16px] shadow-[0_4px_30px_rgba(0,0,0,0.1)] backdrop-blur-[10.7px] border-[1px] border-solid border-[rgba(0,0,0,1)] z-20 h-[100%]'>
//             <div className="top p-[20px] flex items-center justify-between border-b-[1px] border-solid border-[#dddddd35]">
//                 <div className="user flex items-center gap-[20px]">
//                     <img 
//                         src={currentUserData?.avatar || avatar}  // Use updated user data
//                         className='w-[60px] h-[60px] rounded-full object-cover' 
//                         alt="" 
//                         onClick={onAvatarClick}  // Triggering the function on avatar click
//                         style={{ cursor: 'pointer' }} 
//                     />
//                     <div className="text flex flex-col gap-2">
//                         <span className='text-[22px] text-[#f49778] font-bold'>{user?.username}</span>
//                         <p className='text-[18px] font-light text-[#f0e9e9]'>{user?.bio || "No bio available"}</p> 
//                     </div>
//                 </div>
//                 <div className="icons flex gap-[20px] text-[20px] cursor-pointer text-white">
//                     <FaPhoneAlt />
//                     <FaVideo />
//                     <FaCircleInfo />
//                 </div>
//             </div>

//             <div className="center p-[20px] grow overflow-scroll flex flex-col gap-[20px]">
//                 {chat?.messages?.map((message) => (
//                     <div className={message.senderId === currentUser.id ? "message own" : "message"} key={message.createdAt}>
//                         <div className="text">
//                             {message.img && <img src={message.img} alt="" className='w-[100%] h-[300px] rounded-md object-cover' />}
//                             <p>{message.text}</p>
//                         </div>
//                     </div>
//                 ))}

//                 {img.url && (
//                     <div className="message own">
//                         <div className="texts">
//                             <img src={img.url} alt="" />
//                         </div>
//                     </div>
//                 )}
//                 <div ref={endRef}></div>
//             </div>

//             <div className="bottom flex items-center justify-between text-white p-[20px] border-t-[1px] border-solid border-[#dddddd35] gap-[20px]">
//                 <div className="icons flex gap-[20px] text-[20px]">
//                     <label htmlFor="file">
//                         <FaImages className='cursor-pointer' />
//                     </label>
//                     <input type="file" id="file" style={{ display: "none" }} onChange={handleImg} />
//                     <FaCamera className='cursor-pointer' />
//                     <FaMicrophone className='cursor-pointer' />
//                 </div>
//                 <input
//                     type="text"
//                     className='grow bg-[#2f4176] rounded-lg p-1 outline-none border-none text-white'
//                     placeholder='Type a message...'
//                     onChange={(e) => setText(e.target.value)}
//                     value={text}
//                     disabled={isCurrentUserBlocked || isReceiverBlocked}
//                 />
//                 <div className="emoji relative">
//                     <MdEmojiEmotions className='cursor-pointer text-[20px]' onClick={() => setOpen((prev) => !prev)} />
//                     <div className="picker absolute bottom-[50px] left-0 z-[999]">
//                         <EmojiPicker open={open} onEmojiClick={handleEmoji} />
//                     </div>
//                 </div>
//                 <div className='sendButton cursor-pointer' onClick={handleSend}>
//                     <IoSendSharp className='cursor-pointer text-[20px]' />
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default Chat;
