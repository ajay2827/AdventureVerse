import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import Header from '../header/Header'
import '../Pages/Home.css'
import Posts from '../posts/Posts'
import Sidebar from '../sidebar/Sidebar'
import axios from 'axios';
import { useLocation } from 'react-router-dom'

function Home() {
   const [posts,setPosts]=useState([]);
   const {search}=useLocation();
   useEffect(()=>{
        const fetchpost= async()=>{
        const res= await axios.get("http://localhost:5000/api/posts"+search);
        const result=await res.data;
        setPosts(result);
       }
       fetchpost();
   },[search]) 
  return (
    <>
    <Header/>
    <div className='home'>
    <Posts posts={posts}/>
   <Sidebar/>
    </div></>
    
  )
}

export default Home
