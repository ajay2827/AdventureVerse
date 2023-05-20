import React from 'react'
import axios from "axios";
import '../Login/Login.css'
import { useRef } from 'react';
import { useContext } from 'react';
import { Context } from '../../context/Context';
import panda2 from '../Login/panda2.png'
import {motion} from 'framer-motion'

function Login() {
   
  const userref=useRef();
  const passref=useRef();
  const {dispatch,isFetching}=useContext(Context);
  const handlesubmit=async (e)=>{
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("https://adventureverse-ni3v.onrender.com/api/auth/login", {
        email: userref.current.value,
        password: passref.current.value,
      });
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE" });
    }

  }
  return (
    <motion.div className="login"
    initial={{opacity:0}}
    animate={{opacity:1}}
    exit={{opacity:0}}
    transition={{duration:0.2,type: 'tween',
    ease: 'easeIn', }}  
    >
      <div className="box">
        
        <div className="innerlogin">
        <span className="loginTitle">Login</span>
      <form className="loginForm" onSubmit={handlesubmit}>
        <input className="loginInput" type="text" placeholder="Enter your username..." ref={userref}/>
        <input className="loginInput" type="password" placeholder="Enter your password..." ref={passref}/>
        <button className="loginButton" type='submit' disabled={isFetching}>Login</button>
      </form>
        </div> 
        
        
        <div className="rightlogin">
          <div className="description">
            <h1>AdventureVerse</h1>
            <img src={panda2} alt="" />
            <p>To keep connected with us please<br/>
               login with your personal info.</p>
          </div>
        </div>
      </div>    
    </motion.div>
  )
}

export default Login
