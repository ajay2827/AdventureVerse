import React from 'react'
import '../post/Post.css'
import { Link } from "react-router-dom";
import {motion} from 'framer-motion'

function Post({post}) {
  const PF="https://adventureverse-backend.onrender.com/Images/"
  return (
    <motion.div className='post'
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: false ,amount:0.1}}
    transition={{duration:0.2,type: 'tween',
    ease: 'easeIn',}} >
      {
        post.photo&&<Link to={`/post/${post._id}`} className='link'><img src={PF+post.photo} alt="" /></Link>  
      }
        <div className="postinfo">
    
            <div className="posttitle">
              <Link to={`/post/${post._id}`} className='link'> <h3>{post.title}</h3></Link>
               
            </div> 
        </div>
      <div className="postDesc">
       <p>{post.desc}</p>
      </div>
    </motion.div>
  )
}

export default Post
