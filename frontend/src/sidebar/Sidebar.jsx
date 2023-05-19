import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import axios from 'axios';
import {motion} from 'framer-motion'
import './Sidebar.css'

function Sidebar() {
  
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
  
        </div>
        
      </div>
    </motion.div>
  )
}

export default Sidebar 
