import React from 'react'
import './Posts.css'
import Post from '../post/Post'
import { useEffect } from 'react'
import {motion} from 'framer-motion'

function Posts({posts}) {
  return (
    <div className='posts'>
      <div className="heading">
        <h1>Posts</h1>
      </div>
      <div className="blog" >
      {
        posts.map(p=>{
          return <Post post={p} key={p._id}/>
        })
      }
      </div>
    </div>
  )
}

export default Posts
