import React, { useState } from 'react';
import avatar1 from '../../images/avatar.jpeg';
import './Login.css';
import logo from "../../images/logo.gif";
import { toast } from 'react-toastify';
import { createUserWithEmailAndPassword,signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../../lib/firebase';
import { doc, setDoc } from 'firebase/firestore';
import upload from '../../lib/upload';

function Login() {
    const [avatar, setAvatar] = useState({
        file: null,
        url: ""
    });
    const  [loading ,setLoading] = useState(false)
    const [isSignUp, setIsSignUp] = useState(true); // State to toggle between Sign Up and Sign In forms

    const handleAvatar = (e) => {
        if (e.target.files[0]) {
            setAvatar({
                file: e.target.files[0],
                url: URL.createObjectURL(e.target.files[0]) // Fix the event reference
            });
        }
    };
    const handleLogin = async (e) =>{
        e.preventDefault();
        setLoading(true);
        const formData = new FormData(e.target)
        const {email,password} = Object.fromEntries(formData);
        try {
            await signInWithEmailAndPassword(auth,email,password);
        } catch (error) {
            console.log(error)
            toast.error(error.message)
            
        }
        finally{
            setLoading(false)
        }
        // toast.success("done")
    }
    const handleRegister = async (e) =>{
        e.preventDefault();
        setLoading(true)
        const formData = new FormData(e.target)
        const {username,email,password} = Object.fromEntries(formData);
        try {
            const res = await createUserWithEmailAndPassword(auth,email,password);
            const imgUrl = await upload(avatar.file)
            await setDoc(doc(db, "users", res.user.uid), {
                username,
                email,
                avatar:imgUrl,
                id:res.user.uid,
                blocked:[],

                
              }); 
              await setDoc(doc(db, "userchats", res.user.uid), {
               chats: [],
                
              }); 

              toast.success("Account  Created ! You can login now")
            
        } catch (error) {
            console.log(error)
            toast.error(error.message)
            
        }
        finally {
            setLoading(false);

        }
        
        // toast.success("done")
    };

    return (
        <div className='login w-[100%] h-[100%] sm:flex items-center gap-[56px]'>
            <div className='logo   animate-bounce'>
                <img src={logo} alt="" />
            </div>

            {isSignUp ? (
                // Sign Up Form
                <div className="item">
                    <h2 className='text-[25px]'>
                        Welcome , To <span className='text-[#33dbbf] font-bold'>Let's Chat</span>
                    </h2>
                    <h2>Create an Account, <span className='text-[20px] font-bold text-white'>Sign Up</span></h2>
                    <form  onSubmit={handleRegister} >
                        <label htmlFor="file">
                            <img src={avatar.url || avatar1} alt="avatar" />
                            <p className='hover:text-[#7fa069]'>Upload an Image </p>
                        </label>
                        <input type="file" id="file" style={{ display: "none" }} onChange={handleAvatar} />
                        <input type="text" placeholder='UserName..' name='username' />
                        <input type="text" placeholder='Email..' name='email' />
                        <input type="password" placeholder='Password..' name='password' />
                        <p>If user exists, <span className='text-white underline hover:text-[#9be2c3] cursor-pointer' onClick={() => setIsSignUp(false)}>Click Here</span> to Sign In</p>
                        <button disabled={loading}>{loading?"Loading":"Sign Up"}</button>
                    </form>
                </div>
            ) : (
                // Sign In Form
                <div className="item">
                    <h2 className='text-[25px]'>
                        Welcome back, To <span className='text-[#33dbbf] font-bold'>Let's Chat</span>
                    </h2>
                    <p className='text-[18px] font-bold text-white'>Sign In</p>
                    <form action="" onSubmit={handleLogin}>
                        <input type="text" placeholder='Email..' name='email' />
                        <input type="password" placeholder='Password..' name='password' />
                        <p>If new user, <span className='text-white underline hover:text-[#9be2c3] cursor-pointer' onClick={() => setIsSignUp(true)}>Click Here</span> to Sign Up</p>
                        <button disabled={loading}>{loading?"Loading":"Sign In"}</button>
                    </form>
                </div>
            )}
        </div>
    );
}

export default Login;
