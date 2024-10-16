import React, { useState } from 'react'
import avatar from '../../../../images/avatar.jpeg'
import './AddUser.css'
import { arrayUnion, collection, doc, getDoc, getDocs, query, serverTimestamp, setDoc, updateDoc, where } from 'firebase/firestore'
import { db } from '../../../../lib/firebase'
import { useUserStore } from '../../../../lib/userStore'

const AddUser = () => {
  const [user,setuser] = useState(null)
  const {currentUser} = useUserStore()
  const handleSearch =async e =>{

    e.preventDefault()
    const formData = new FormData(e.target)
    const username = formData.get("username")
    try {
      const userRef = collection(db, "users");

// Create a query against the collection.
const q = query(userRef, where("username", "==", username));
const querySnapShot = await getDocs(q)
if(!querySnapShot.empty){
  setuser(querySnapShot.docs[0].data());

}
    } catch (error) {
      console.log(error)
      
    }
  }
  // const handleAdd =async () =>{
  //   const chatRef = collection(db,"chats")
  //   const userChatsRef = collection(db,"userchats")
  //   try {
  //     const  newChatRef = doc(chatRef)
  //     await setDoc(newChatRef,{
  //       createdAt:serverTimestamp(),
  //       messages:[],
  //     });

  //     // await updateDoc(doc(userChatsRef,user.id),{
  //     //   chats:arrayUnion({
  //     //     chatId: newChatRef.id,
  //     //     lastMessage:"",
  //     //     receiverId: currentUser.id,
  //     //     updatedAt:Date.now(),
  //     //   }),
  //     // });


      
    
  //     // await updateDoc(doc(userChatsRef,currentUser.id),{
  //     //   chats:arrayUnion({
  //     //     chatId: newChatRef.id,
  //     //     lastMessage:"",
  //     //     receiverId: user.id,
  //     //     updatedAt:Date.now(),
  //     //   }),
  //     // });


  //     await updateDoc(doc(userChatsRef, user.id), {
  //       chats: arrayUnion({
  //         chatId: newChatRef.id,  // Make sure this is the correct ID
  //         lastMessage: "",
  //         receiverId: currentUser.id,
  //         updatedAt: Date.now(),
  //       }),
  //     });
      
  //     await updateDoc(doc(userChatsRef, currentUser.id), {
  //       chats: arrayUnion({
  //         chatId: newChatRef.id,  // Make sure this is the correct ID
  //         lastMessage: "",
  //         receiverId: user.id,
  //         updatedAt: Date.now(),
  //       }),
  //     });
      
      
  //   } catch (error) {
  //     console.log(error)
      
  //   }
    
  // }


  // const handleAdd = async () => {
  //   const chatRef = collection(db, "chats");
  //   const userChatsRef = collection(db, "userchats");
    
  //   try {
  //     // Create a new chat in the chats collection
  //     const newChatRef = doc(chatRef);
  //     await setDoc(newChatRef, {
  //       createdAt: serverTimestamp(),
  //       messages: [],
  //     });
  
  //     // Helper function to ensure document exists
  //     const ensureUserChatDocExists = async (userId) => {
  //       const userChatDocRef = doc(userChatsRef, userId);
  //       const userChatDocSnap = await getDoc(userChatDocRef);
        
  //       // If the document doesn't exist, create it
  //       if (!userChatDocSnap.exists()) {
  //         await setDoc(userChatDocRef, { chats: [] });
  //       }
  
  //       return userChatDocRef;
  //     };
  
  //     // Ensure that the userChats document exists for both the current user and the receiver
  //     const currentUserChatDocRef = await ensureUserChatDocExists(currentUser.id);
  //     const receiverUserChatDocRef = await ensureUserChatDocExists(user.id);
  
  //     // Update the userChats document for the searched user
  //     await updateDoc(receiverUserChatDocRef, {
  //       chats: arrayUnion({
  //         chatId: newChatRef.id,
  //         lastMessage: "",
  //         receiverId: currentUser.id,
  //         updatedAt: Date.now(),
  //       }),
  //     });
  
  //     // Update the userChats document for the current user
  //     await updateDoc(currentUserChatDocRef, {
  //       chats: arrayUnion({
  //         chatId: newChatRef.id,
  //         lastMessage: "",
  //         receiverId: user.id,
  //         updatedAt: Date.now(),
  //       }),
  //     });
  
  //     // Console log to verify the chat documents were updated
  //     console.log('Chat added for user:', await getDoc(currentUserChatDocRef));  // For currentUser
  //     console.log('Chat added for receiver:', await getDoc(receiverUserChatDocRef));      // For the other user (receiver)
  
  //   } catch (error) {
  //     console.log("Error adding chat:", error);
  //   }
  // };


//it below is workin

  // const handleAdd = async () => {
  //   const chatRef = collection(db, "chats");
  //   const userChatsRef = collection(db, "userchats");
    
  //   try {
  //     // Create a new chat in the chats collection
  //     const newChatRef = doc(chatRef);
  //     await setDoc(newChatRef, {
  //       createdAt: serverTimestamp(),
  //       messages: [],
  //     });
  
  //     // Helper function to ensure document exists
  //     const ensureUserChatDocExists = async (userId) => {
  //       const userChatDocRef = doc(userChatsRef, userId);
  //       const userChatDocSnap = await getDoc(userChatDocRef);
        
  //       // If the document doesn't exist, create it
  //       if (!userChatDocSnap.exists()) {
  //         await setDoc(userChatDocRef, { chats: [] });
  //       }
  
  //       return userChatDocRef;
  //     };
  
  //     // Ensure that the userChats document exists for both the current user and the receiver
  //     const currentUserChatDocRef = await ensureUserChatDocExists(currentUser.id);
  //     const receiverUserChatDocRef = await ensureUserChatDocExists(user.id);
  
  //     // Get the current user's chat document
  //     const currentUserChatDocSnap = await getDoc(currentUserChatDocRef);
  //     const existingChats = currentUserChatDocSnap.data()?.chats || [];
  
  //     // Check if the chat already exists
  //     const chatExists = existingChats.some(chat => chat.receiverId === user.id);
      
  //     if (!chatExists) {
  //       // Update the userChats document for the searched user
  //       await updateDoc(receiverUserChatDocRef, {
  //         chats: arrayUnion({
  //           chatId: newChatRef.id,
  //           lastMessage: "",
  //           receiverId: currentUser.id,
  //           updatedAt: Date.now(),
  //         }),
  //       });
  
  //       // Update the userChats document for the current user
  //       await updateDoc(currentUserChatDocRef, {
  //         chats: arrayUnion({
  //           chatId: newChatRef.id,
  //           lastMessage: "",
  //           receiverId: user.id,
  //           updatedAt: Date.now(),
  //         }),
  //       });
  
  //       // Console log to verify the chat documents were updated
  //       console.log('Chat added for user:', await getDoc(currentUserChatDocRef));  // For currentUser
  //       console.log('Chat added for receiver:', await getDoc(receiverUserChatDocRef));  // For the other user (receiver)
  //     } else {
  //       console.log('Chat already exists with this user.');
  //     }
  
  //   } catch (error) {
  //     console.log("Error adding chat:", error);
  //   }
  // };
  


  const handleAdd = async () => {
    const chatRef = collection(db, "chats");
    const userChatsRef = collection(db, "userchats");
  
    try {
      // Create a new chat in the chats collection
      const newChatRef = doc(chatRef);
      await setDoc(newChatRef, {
        createdAt: serverTimestamp(),
        messages: [],
      });
  
      // Helper function to ensure document exists
      const ensureUserChatDocExists = async (userId) => {
        const userChatDocRef = doc(userChatsRef, userId);
        const userChatDocSnap = await getDoc(userChatDocRef);
  
        // If the document doesn't exist, create it
        if (!userChatDocSnap.exists()) {
          await setDoc(userChatDocRef, { chats: [] });
        }
  
        return userChatDocRef;
      };
  
      // Ensure that the userChats document exists for both the current user and the receiver
      const currentUserChatDocRef = await ensureUserChatDocExists(currentUser.id);
      const receiverUserChatDocRef = await ensureUserChatDocExists(user.id);
  
      // Get the current user's chats to check if the user is already added
      const currentUserChatsSnap = await getDoc(currentUserChatDocRef);
      const currentUserChats = currentUserChatsSnap.data()?.chats || [];
  
      // Check if the user is already in the chat list
      const isUserAlreadyAdded = currentUserChats.some(
        (chat) => chat.receiverId === user.id
      );
  
      if (isUserAlreadyAdded) {
        console.log("User is already in the chat list");
        return;
      }
  
      // Update the userChats document for the searched user
      await updateDoc(receiverUserChatDocRef, {
        chats: arrayUnion({
          chatId: newChatRef.id,
          lastMessage: "",
          receiverId: currentUser.id,
          updatedAt: Date.now(),
        }),
      });
  
      // Update the userChats document for the current user
      await updateDoc(currentUserChatDocRef, {
        chats: arrayUnion({
          chatId: newChatRef.id,
          lastMessage: "",
          receiverId: user.id,
          updatedAt: Date.now(),
        }),
      });
  
      console.log("Chat added successfully");
  
    } catch (error) {
      console.log("Error adding chat:", error);
    }
  };
  







  
  
  return (
    <div className='adduser '>
        <form onSubmit={handleSearch} action="" className='flex gap-[8px] '>
            <input type="text" placeholder='userName..' className='p-[10px] rounded-[10px] border-none outline-none bg-[#2f4176]' name='username' />
            <button className='p-[8px] bg-[#bc8b8b] rounded-xl cursor-pointer'>search</button>

        </form>
       { user && <div className="user mt-[50px] gap-2 flex items-center justify-between">
            <div className="detail flex items-center gap-[20px]">
                <img className='w-[50px] h-[50px]  rounded-full' src={user.avatar || avatar} alt="" />
                <span className='text-[#3eb372] font-bold'>{user.username} </span>

            </div>
            <button className='p-[8px] bg-[#bc8b8b] rounded-xl cursor-pointer' onClick={handleAdd}>Add user</button>

        </div>}
      
    </div>
  )
}

export default AddUser
