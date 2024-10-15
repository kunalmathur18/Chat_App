import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import List from './components/list/List'
import Chat from './components/chat/Chat'
import Details from './components/detail/Details'
import Login from './components/login/Login'
import Notification from './components/notification/Notification'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './lib/firebase'
import { useUserStore } from './lib/userStore'
import { useChatStore } from './lib/chatStore'

function App() {
  // const [count, setCount] = useState(0)
  const {currentUser,isLoading,fetchUserInfo} =  useUserStore();
  const {chatId} =  useChatStore();
 
  useEffect(()=>{
    const unSub = onAuthStateChanged(auth,(user)=>{
      fetchUserInfo(user?.uid);

    });
    return() =>{
      unSub();
    };
  },[fetchUserInfo]);
  
  if (isLoading) return <div className='loading animate-pulse'>Loading..</div>

  return (

    <div className='container flex gap-3'>
      {
        currentUser ? (
          <>
            <List className='grow-[1] ' />
            {chatId && <Chat className='grow-[2]' />}
            {chatId && <Details className='grow-[1]' />}
          </>
        ) : (<Login />)
      }
      <Notification/>

    </div>



  )
}

export default App
