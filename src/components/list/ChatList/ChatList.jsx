import React, { useEffect, useState } from 'react'
import './ChatList.css'
import { FaSearch } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";
import avatar from '../../../images/avatar.jpeg'
import AddUser from './adduser/AddUser';
import { useUserStore } from '../../../lib/userStore';
import { doc, getDoc, onSnapshot, updateDoc } from 'firebase/firestore';
import { db } from '../../../lib/firebase';
import { useChatStore } from '../../../lib/chatStore';

function ChatList() {
    const [addMore, setAddMore] = useState(false);
    const [input, setInput] = useState("");
    const [chats, setChats] = useState([]);
    const { currentUser } = useUserStore();
    const {changeChat,chatId} =useChatStore();

    console.log(chatId)
   

//its below is worling correct

    // useEffect(() => {
    //     const unSub = onSnapshot(doc(db, "userchats", currentUser.id), async (res) => {
    //         const items = res.data().chats;
    //         // Filter the chats to exclude the current user from being displayed
    //         const filteredChats = items.filter(chat => chat.receiverId !== currentUser.id);
    
    //         const promises = filteredChats.map(async (item) => {
    //             const userDocRef = doc(db, "users", item.receiverId);
    //             const userDocSnap = await getDoc(userDocRef);
    //             const user = userDocSnap.data();
    //             return { ...item, user };
    //         });
    
    //         const chatData = await Promise.all(promises);
    //         setChats(chatData.sort((a, b) => b.updatedAt - a.updatedAt));
    //     });
    
    //     return () => {
    //         unSub();
    //     };
    // }, [currentUser.id]);
    
    useEffect(() => {
        const unSub = onSnapshot(doc(db, "userchats", currentUser.id), async (res) => {
          if (res.exists()) {
            const items = res.data().chats;
    
            // Filter out duplicate receiverIds
            const uniqueItems = items.reduce((acc, item) => {
              if (!acc.some(chat => chat.receiverId === item.receiverId)) {
                acc.push(item);
              }
              return acc;
            }, []);
    
            const promises = uniqueItems.map(async (item) => {
              const userDocRef = doc(db, "users", item.receiverId);
              const userDocSnap = await getDoc(userDocRef);
              const user = userDocSnap.data();
              return { ...item, user };
            });
    
            const chatData = await Promise.all(promises);
            setChats(chatData.sort((a, b) => b.updatedAt - a.updatedAt));
          } else {
            console.log('No chats found for this user');
          }
        });
    
        return () => {
          unSub();
        };
      }, [currentUser.id]);
    
      const handleSelect = async (chat)=>{

       const userChats = chats.map(item=>{
        const{user, ...rest}=item;
        return rest;

       });
       const chatIndex= userChats.findIndex(item=>item.chatId ===chat.chatId)
       userChats[chatIndex].isSeen =true;
       const userChatsRef = doc(db,"userchats",currentUser.id);
       try {
        await updateDoc(userChatsRef,{
            chats: userChats,
        });
        changeChat(chat.chatId,chat.user)
       } catch (error) {
        console.error(err)
       }
        



      };
      const filteredChats = chats.filter(c=>c.user.username.toLowerCase().includes(input.toLowerCase()))


    return (
        <div className='chatList flex flex-col gap-3   '>
            <div className="search text-white flex items-center justify-between px-2">
                <div className="searchBar text-white bg-[#2f4176] flex items-center gap-[5px] p-[10px] justify-between rounded-lg">
                    <FaSearch />
                    <input type="text" placeholder='search...' className='bg-transparent outline-none grow'  onChange={(e) => setInput(e.target.value)}/>
                </div>
                <div className='add cursor-pointer relative p-[7px] bg-[#2f4176] rounded-xl  ' onClick={() => setAddMore((prev) => !prev)}>
                    {addMore ? <FaMinus /> : <FaPlus />}
                </div>
            </div>

            {/* <div className='ls h-[500px] overflow-y-auto grow flex flex-col'>
                {chats.map(chat => (
                    <div className="items flex items-center gap-[20px] p-[20px] cursor-pointer border-b-[1px] border-solid border-[#dddddd35]" key={chat.chatId} >
                        <img src={avatar} className='w-[50px] rounded-full object-cover' alt="" />
                        <div className="text">
                            <span className='font-medium'>Kunal Mathur</span>
                            <p className='text-[14px] font-light text-gray-800'>{chat.lastMessage}</p>
                        </div>
                    </div>

                ))}




            </div> */}
            <div className='ls h-[500px] overflow-y-auto grow flex flex-col'>
  {chats.length > 0 ? (
    filteredChats.map(chat => (
      <div className="items flex items-center gap-[20px] p-[20px] cursor-pointer border-b-[1px] border-solid border-[#dddddd35]" key={chat.chatId}  onClick={()=>handleSelect(chat)} style={{
        backgroundColor: chat?.isSeen ? "transparent":"#5183fe",
      }}>
        <img src={chat.user.blocked.includes(currentUser.id)? avatar:chat.user.avatar || avatar} className='w-[50px] h-[50px] rounded-full object-cover' alt="" />
        <div className="text">
          <span className='font-medium'>{chat.user.blocked.includes(currentUser.id)? "User":chat.user.username}</span>
          <p className='text-[14px] font-light text-gray-800'>{chat.lastMessage}</p>
        </div>
      </div>
    ))
  ) : (
    <p className="text-center text-white">No chats found</p>
  )}
</div>

            {addMore && < AddUser />}

        </div>
    );
}

export default ChatList;
