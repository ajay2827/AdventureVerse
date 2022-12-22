import React from 'react'
import '../Pages/Single.css'
import Singlepost from '../singlepost/Singlepost.jsx';
import Sidebar from '../sidebar/Sidebar'
import { useEffect } from 'react';
import { useState } from 'react';


function Single() {
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
    <div className='single'>
      <Singlepost/>
      {
         windowSize.innerWidth>1200 && <Sidebar/>
      }
      
    </div>
  )
}
function getWindowSize() {
  const {innerWidth, innerHeight} = window;
  return {innerWidth, innerHeight};
}
export default Single
