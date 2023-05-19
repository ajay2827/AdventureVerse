import React from 'react'
import '../register/Register.css'
import { useState } from 'react';
import axios from 'axios';
import panda2 from '../register/panda2.png'
import {motion} from 'framer-motion'

function Register() {
  const[username,setUsername]=useState("");
  const[email,setEmail]=useState("");
  const[password,setPassword]=useState("");
  const [error,setError]=useState(false);
  const handlesubmit=async(e)=>{
    e.preventDefault();
    setError(false);
    try{   
      const res=await axios.post("https://adventureverse-backend.onrender.com/api/auth/register",{
        username,
        email,
        password,
      })
      res.data&&window.location.replace('/login')
    }
    catch(err)
    {
         setError(true);
    }
    
  }
  return (
    <motion.div className="register"
    initial={{opacity:0}}
    animate={{opacity:1}}
    exit={{opacity:0}}
    transition={{duration:0.2,type: 'tween',
    ease: 'easeIn', }}>      
      <div className="box">
      <div className="innerregister">
      <span className="registerTitle">Register</span>
      <form className="registerForm" onSubmit={handlesubmit}>
        <input className="registerInput" type="text" placeholder="Enter your username..." onChange={(e)=>{setUsername(e.target.value)}} />
        <input className="registerInput" type="text" placeholder="Enter your email..." onChange={(e)=>{setEmail(e.target.value)}}/>
        <input className="registerInput" type="password" placeholder="Enter your password..." onChange={(e)=>{setPassword(e.target.value)}}/>
        <button className="registerButton" type='submit' >Register</button>
      </form>
      {
        error&&<span className='errormessage'>Something went wrong!!!</span>
      }
      
      </div>


        <div className="rightlogin">
          <div className="description">
          <h1>AdventureVerse</h1>
            <img src={panda2} alt="" />
            <p>To keep connected with us please<br/>
               register with your personal info.</p>
          </div>
        </div>
      </div>

    </motion.div>
  )
}

export default Register
