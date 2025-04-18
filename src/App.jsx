import React from 'react';
import {Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Farmers from './pages/Farmers';
import Dashboard from './pages/Dashboard';
import Finance from './pages/Finance';
import Crops from './pages/Crops';
import Market from './pages/Market';


 function App() {
  return (
    <>
    <Routes>
    <Route path="/" element={<Home />} />    
    <Route path="/Login" element={<Login />} /> 
    <Route path="/Farmers" element={<Farmers />} /> 
    <Route path="/Dashboard" element={<Dashboard />} /> 
    <Route path="/Finance" element={<Finance />} /> 
    <Route path="/Crops" element={<Crops />} /> 
    <Route path="/Market" element={<Market />} /> 
    </Routes>
      
    </>
  );

}
export default App;