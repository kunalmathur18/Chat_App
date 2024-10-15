
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";



const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "reactchat-c0240.firebaseapp.com",
  projectId: "reactchat-c0240",
  storageBucket: "reactchat-c0240.appspot.com",
  messagingSenderId: "359968386200",
  appId: "1:359968386200:web:f1f26ce5909445bc9fb4ed"
};


const app = initializeApp(firebaseConfig); 


export const auth = getAuth()
export const db = getFirestore()
export const storage = getStorage()
