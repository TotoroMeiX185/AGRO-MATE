import React from 'react';
import {Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Farmers from './pages/Farmers';


 function App() {
  return (
    <>
    <Routes>
    <Route path="/" element={<Home />} />    
    <Route path="/Login" element={<Login />} /> 
    <Route path="/Farmers" element={<Farmers />} /> 
    </Routes>
      
    </>
  );

}
export default App;