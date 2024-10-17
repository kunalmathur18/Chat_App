
/////above code is working completely*******




////below code is also working fine


import { useEffect, useState } from 'react';
import './App.css';
import List from './components/list/List';
import Chat from './components/chat/Chat';
import Details from './components/detail/Details';
import Login from './components/login/Login';
import Notification from './components/notification/Notification';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './lib/firebase';
import { useUserStore } from './lib/userStore';
import { useChatStore } from './lib/chatStore';

// function App() {
//   const { currentUser, isLoading, fetchUserInfo } = useUserStore();
//   const { chatId } = useChatStore();
//   const [showDetails, setShowDetails] = useState(false); // State to control Details visibility

//   useEffect(() => {
//     const unSub = onAuthStateChanged(auth, (user) => {
//       fetchUserInfo(user?.uid);
//     });
//     return () => {
//       unSub();
//     };
//   }, [fetchUserInfo]);

//   if (isLoading) return <div className='loading animate-pulse'>Loading..</div>;

//   return (
//     <div className='container '>
//       {currentUser ? (
//         <>
//           <List  />
//           {chatId && (
//             <Chat  onAvatarClick={() => setShowDetails(true)} />  // Show Details on avatar click
//           )}
//           {chatId && showDetails && (
//             <Details  onBack={() => setShowDetails(false)} />  // Hide Details on back button click
//           )}
//         </>
//       ) : (
//         <Login />
//       )}
//       <Notification />
//     </div>
//   );
// }



function App() {
  const { currentUser, isLoading, fetchUserInfo } = useUserStore();
  const { chatId } = useChatStore();
  const [showDetails, setShowDetails] = useState(false); // State to control Details visibility

  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (user) => {
      fetchUserInfo(user?.uid);
    });
    return () => {
      unSub();
    };
  }, [fetchUserInfo]);

  if (isLoading) return <div className='loading animate-pulse'>Loading..</div>;

  return (
    <div className='container '>
      {currentUser ? (
        <>
          <List  />
          {chatId && !showDetails && (  // Render Chat only if showDetails is false
            <Chat onAvatarClick={() => setShowDetails(true)} />  // Show Details on avatar click
          )}
          {chatId && showDetails && (  // Render Details only if showDetails is true
            <Details onBack={() => setShowDetails(false)} />  // Hide Details on back button click
          )}
        </>
      ) : (
        <Login />
      )}
      <Notification />
    </div>
  );
}




export default App;


//////end*********