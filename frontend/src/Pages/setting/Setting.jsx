import React from 'react'
import { useState,useEffect } from 'react'
import { useContext } from 'react'
import { Context } from '../../context/Context'
import Sidebar from '../../sidebar/Sidebar'
import axios from 'axios'
import {motion} from 'framer-motion'
import '../setting/Setting.css'

function Setting() {
  const{user,dispatch}=useContext(Context);
  const[file,setfile]=useState(null);
  const[username,setUsername]=useState("");
  const[email,setEmail]=useState("");
  const[password,setPassword]=useState("");
  const [success, setSuccess] = useState(false);
  const PF = "http://localhost:5000/Images/"

  const handlesubmit=async(e)=>{
    e.preventDefault();
    dispatch({ type: "UPDATE_START" });
    const updateUser={
        userId:user._id,
        username,
        email,
        password
    };
    if(file)
    {
      const data=new FormData();
      const filename=Date.now()+file.name;
      data.append("name",filename);
      data.append("file",file);
      updateUser.profilepic=filename;
      try
      {
        await axios.post('http://localhost:5000/api/upload',data)
      }
      catch(err)
      { 
         console.log(err);
      }
    }

       try{
          const res=await axios.put("http://localhost:5000/api/users/"+user._id,updateUser);
          setSuccess(true);
          dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
       }
       catch(err)
       {
        dispatch({ type: "UPDATE_FAILURE" });
       }
  }

  const [windowSize, setWindowSize] = useState(getWindowSize());
  useEffect(() => {
    function handleWindowResize() {
      setWindowSize(getWindowSize());
    }
    
    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };

  }, []);
  return (
    <motion.div className='setting'
    initial={{opacity:0}}
    animate={{opacity:1}}
    exit={{opacity:0}}
    transition={{duration:0.5,type: 'tween',
    ease: 'easeIn', }} 
    >
      <div className="settinguser">
        <div className="settingtitleuser">

         <div className="settingtitle">
            <span className='account'>Update Your Account</span>
         </div>

         <form className='formsetting' onSubmit={handlesubmit}>
            <div className="updatesetting">
            <img src={file?URL.createObjectURL(file):PF+user.profilepic} alt="" />
            <label htmlFor="fileInput">
            <i className="fa-solid fa-camera-rotate"></i>
            </label>
            <input type="file" id="fileInput"  style={{ display: "none" }} onChange={(e)=> setfile(e.target.files[0]) }/>
            </div>
            
            <div className="inputsetting">
                <input type="text" placeholder={user.username} className='settingvalue' onChange={(e)=>setUsername(e.target.value)}/>
                <input type="email" placeholder={user.email} className='settingvalue' onChange={(e)=>setEmail(e.target.value)}/>
                <input type="password" placeholder='*****' className='settingvalue' onChange={(e)=>setPassword(e.target.value)}/>
            </div>
            <button className='settinguserbtn' type='submit' >Update</button>
            
         </form>
        </div>
       
      </div>
      {

      }
      {
         windowSize.innerWidth>1200 && <Sidebar/>
      }
    </motion.div>
  )
}

function getWindowSize() {
  const {innerWidth, innerHeight} = window;
  return {innerWidth, innerHeight};
}

export default Setting
