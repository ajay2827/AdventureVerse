import React from 'react'
import { useContext } from 'react';
import { useState } from 'react'
import { Context } from '../../context/Context';
import axios from "axios";
import '../write/Write.css'
import {motion} from 'framer-motion'

function Write() {
  const[title,setTitle]=useState("");
  const[desc,setDesc]=useState("");
  const[file,setFile]=useState(null);
  const{user}=useContext(Context);

  const handlesubmit=async(e)=>{
    e.preventDefault()
    console.log("jhjhj");
    const newPost={
        username:user.username,
        title,
        desc
    };
    if(file)
    {
      const data=new FormData();
      const filename=Date.now()+file.name;
      data.append("name",filename);
      data.append("file",file);
      newPost.photo=filename;
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
          const res=await axios.post("http://localhost:5000/api/posts",newPost);
          window.location.replace("/post/" + res.data._id);
       }
       catch(err)
       {
        console.log(err);
       }
  }
  return (
    <motion.div className='write'
    initial={{opacity:0}}
    animate={{opacity:1}}
    exit={{opacity:0}}
    transition={{duration:0.5,type: 'tween',
    ease: 'easeIn', }} >

      
      {file ? (
        <img className='writeimg' src={URL.createObjectURL(file)} alt="" />
      ):
      (
        <img className='writeimg' src="https://media.istockphoto.com/id/904172104/photo/weve-made-it-all-this-way-i-am-proud.jpg?s=612x612&w=0&k=20&c=MewnsAhbeGRcMBN9_ZKhThmqPK6c8nCT8XYk5ZM_hdg=" alt="" />
      )
      }
        
      
      
      <form className='writeForm' onSubmit={handlesubmit}>
       
       <label htmlFor="fileInput">
       <i className="fa-regular fa-id-badge"></i>
       </label>
       <div className="writegroup">   
         <input type="file" id="fileInput"  style={{ display: "none" }} onChange={(e)=> setFile(e.target.files[0])} />
         <input type="text" placeholder="Title... " autoFocus={true}  className='titleinput' onChange={(e)=>setTitle(e.target.value) } />
       </div>
      
      <div className="para">
      <textarea
            className="writeInput writeText"
            placeholder="Tell your story..."
            type="text"
            onChange={(e)=>
              setDesc(e.target.value) 
            }
          />
      </div>
      <div className="submitbtn">
        <button type='submit'>SUBMIT</button>
      </div>
      </form>

    </motion.div>
  )
}

export default Write
