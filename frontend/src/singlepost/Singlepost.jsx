import axios from "axios";
import React from "react";
import { useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Context } from "../context/Context";
import {motion} from 'framer-motion'
import "../singlepost/Singlepost.css";

function Singlepost() {
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const [post, setPost] = useState({});
  const PF = "https://adventureverse-ni3v.onrender.com/Images/";
  const { user } = useContext(Context);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    const fetchpost = async () => {
      const res = await axios.get("https://adventureverse-ni3v.onrender.com/api/posts/" + path);
      setPost(res.data);
      setTitle(res.data.title);
      setDesc(res.data.desc);
      console.log(post);
    };
    fetchpost();
  }, [path]);

  const handledelete = async () => {
    try {
      await axios.delete("https://adventureverse-ni3v.onrender.com/api/posts/" + post._id, {
        data: { username: user.username },
      });
      window.location.replace("/");

    } catch (err) {
      console.log(err);
    }
  };

  const handleupdate = async () => {
    try {
      await axios.put("https://adventureverse-ni3v.onrender.com/api/posts/" + post._id, {
        username: user.username,
        desc,
        title,
      });
      setUpdate(false);
      window.location.replace("/");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <motion.div className="Singlepost"
    initial={{opacity:0}}
    animate={{opacity:1}}
    exit={{opacity:0}}
    transition={{duration:0.2,type: 'tween',
    ease: 'easeIn', }} 
    >
      <div className="singletitle">
        {update ? (
          <input
            type="text"
            placeholder="Title... "
            autoFocus={true}
             value={title}
            className="titleinput"
            onChange={(e) => setTitle(e.target.value)}
          />
        ) : (
          <>
            <h1>{title} </h1>
            <div className="singlepostedit">
              {post.username === user.username && (
                <>
                  <i
                    className="fa-solid fa-user-pen edit"
                    onClick={(e) => setUpdate(true)}
                  ></i>
                  <i
                    className="fa-solid fa-user-minus delete"
                    onClick={handledelete}
                  ></i>
                </>
              )}
            </div>
          </>
        )}
      </div>

      <div className="singleimage">
        {post.photo && <img src={PF+post.photo} alt="" />}
      </div>

      

      <div className="authordetail">
        <span className="author">
          Author:{" "}
          <b className="bold">
            <Link to={`/?user=${post.username}`} className="link">
              {post.username}
            </Link>{" "}
          </b>
        </span>
        <span className="posttiming">
          {new Date(post.createdAt).toDateString()}
        </span>
      </div>

      <div className="singledesc">
        {update ? (
          
          <textarea
            className="writeInput writeText"
            type="text"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
          
        ) : (
          <p>{desc} </p>
        )}
      </div>
      {
        update&&<div className="updatebtn">
        <button onClick={handleupdate} >Update</button>
      </div>
      }
      
    </motion.div>
  );
}

export default Singlepost;
