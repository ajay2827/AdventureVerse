import React from "react";
import "./Header.css";
import{ motion} from 'framer-motion'

function Header() {
  return (
    <motion.div className="main"
      initial={{opacity:0}}
    animate={{opacity:1}}
    exit={{opacity:0}}
    transition={{duration:0.5,type: 'tween',
    ease: 'easeIn', }} 
    >
      <h1>AdventureVerse</h1>
      <p>
      All men dream, but not equally. Those who dream by night in the dusty<br/> recesses of their minds wake in the day to find it was vanity.<br/> But the dreamers of the day are dangerous men,<br/> for they may act on their dreams with open eyes to make them possible.
      </p>
      <div className="button">
        <div className="mouse">
          <div className="roll"></div>
          <div className="rollshadow"></div>
        </div>
      </div>
    </motion.div>
  );
}

export default Header;
