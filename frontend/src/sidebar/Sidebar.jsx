import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom'
import {motion} from 'framer-motion'
import './Sidebar.css'

function Sidebar() {
  const[cats,setCats]=useState([]);
  useEffect(()=>{
    const fetchcat=async()=>{
      const res=await axios.get('http://localhost:5000/api/categorys');
      setCats(res.data);
    }
    fetchcat();
  },[])
  return (
    <motion.div className='sidebar'
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: false ,amount:0.1}}
    transition={{duration:0.5,type: 'tween',
    ease: 'easeIn'}}>
      <div className="background">
      
        <div className="card">
            <div className="about">
              <h2>About Me</h2>
              <img src="https://hardcode.pro/images/profile.png" alt="" />
            <h1>Ajay Singh</h1>
            <p>I'm a Web Developer and <br/> I like to learn coding</p>
            </div>
            <div className="categories">
              <h2>CATEGORIES</h2>
              <ul className="categorieslist">
                {
                  cats.map((c)=>(
                    <li className="categorieslistitem" key={c._id}> {c.name}</li>               
                  ))
                }
              </ul>
            </div>
        </div>
        
      </div>
    </motion.div>
  )
}

export default Sidebar 
