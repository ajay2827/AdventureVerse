import '../navabar/Navbar.css'
import React from 'react'
import {FiSearch} from 'react-icons/fi'
import {Link } from "react-router-dom";
import { useContext } from 'react';
import { Context } from '../context/Context';
import {motion} from 'framer-motion'

function Navbar() {
  const {user,dispatch}=useContext(Context);
  const PF = "http://localhost:5000/Images/"
  const handlelogout=()=>{
    dispatch({type:"LOGOUT"})
  }
  return (
    <motion.div className='navbar'
    initial={{opacity:0.5,y:-100,x:160}}
    animate={{opacity:1,transformOrigin:0,y:0,x:160}}
    transition={{duration:0.5,type: 'tween',
    ease: 'easeInOut',delay:0.5}}
    >
      <div className="left">
      <i className="fa-brands fa-facebook"></i>
      <i className="fa-brands fa-instagram"></i>
      <i className="fa-brands fa-linkedin"></i>
      </div>
      <div className="center">
       <ul>
         <motion.li
        whileHover={{scale:1.08, textShadow:'0px 0px 2px white'}}
         ><Link to='/' className='link'>HOME</Link></motion.li>
         <motion.li
         whileHover={{scale:1.08, textShadow:'0px 0px 2px white'}}
         ><Link to='/' className='link'>ABOUT</Link></motion.li>
         <motion.li
         whileHover={{scale:1.08, textShadow:'0px 0px 2px white'}}
         ><Link to='/write' className='link'>WRITE</Link></motion.li>
       </ul>

      </div>
      <div className="right">
        <motion.span className="loginout right-part" onClick={handlelogout} 
        whileHover={{scale:1.08, textShadow:'0px 0px 2px white'}}
        >{user?"LOGOUT":" "}
        </motion.span>
        {
          user ? (
            <Link to='setting' className='link'>
              <motion.img
              whileHover={{scale:1.08,boxShadow:'0px 0px 10px white'}} className='right-part' src={PF+user.profilepic}  alt="" />
            </Link>

          )
          :
          (
            <ul>
              <motion.li
              whileHover={{scale:1.08, textShadow:'0px 0px 2px white'}}
              ><Link to='/login' className='link'>Login</Link></motion.li>
              <motion.li
              whileHover={{scale:1.08, textShadow:'0px 0px 2px white'}}
              ><Link to='/register' className='link'>Register</Link></motion.li>
            </ul>
          )
        }
       
      </div>
    </motion.div>
  )
}

export default Navbar
