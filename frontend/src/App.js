import './App.css';
import Navbar from './navabar/Navbar';
import Home from './Pages/Home';
import Login from './Pages/Login/Login';
import Register from './Pages/register/Register';
import Setting from './Pages/setting/Setting';
import Single from './Pages/Single';
import Write from './Pages/write/Write';
import {  Routes, Route } from "react-router-dom";
import { useContext } from 'react';
import { Context } from './context/Context';
import {  AnimatePresence } from "framer-motion"
import { useLocation } from 'react-router-dom';
import Sidebar from './sidebar/Sidebar';

function App() {
  const {user}= useContext(Context);
  const location=useLocation();
  return (
    <div className="App">
     
      <>
        <Navbar />
        <AnimatePresence mode='wait' >
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home/>}></Route>
          <Route path="/login" element={user?<Home/>:<Login/>}></Route>            
          <Route path="/register" element={user?<Home/>:<Register/>}></Route>       
          <Route path="/setting" element={user?<Setting/>:<Home/>}></Route>       
          <Route path="/write" element={user?<Write/>:<Home/>}></Route>        
          <Route path="/post/:postId" element={<Single/>}></Route>     
          <Route path='/about' element={<Sidebar/>}></Route>
        </Routes>
        </AnimatePresence>
        </>
    </div>
  );
}

export default App;
