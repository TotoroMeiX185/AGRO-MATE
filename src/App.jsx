import React from 'react';
import {Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Farmers from './pages/Farmers';
import Dashboard from './pages/Dashboard';
import Finance from './pages/Finance';
import Crops from './pages/Crops';
import Market from './pages/Market';
import FarmerLayout from './Layouts/Farmerlayout';
import AdminLayout from './Layouts/Adminlayout';
import Adashboard from './Adminpages/Adashboard';
import Afarmers from './Adminpages/Afarmers';
import Acrops from './Adminpages/Acrops';
import Afinance from './Adminpages/Afinance';
import Amarket from './Adminpages/Amarket'; 
import { Navigate } from 'react-router-dom';
import RequireAuth from './components/RequireAuth';
import { useAuth } from './contexts/AuthContext'; // Adjust the import based on your context structure
import LoginRedirect from './components/loginRedirect'; // Adjust the import based on your context structure

function App() {
 
  return (
    <Routes>
    <Route path="/" element={<Home />} /> 
    <Route path="/login" element={<LoginRedirect />} />
    <Route path="/farmers" element={<Farmers/>} />

    <Route element={<RequireAuth allowedRoles={['farmer']} />}>
      <Route path="/farmer" element={<FarmerLayout />}>
      <Route path="/farmers" element={<Farmers/>} />
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="crops" element={<Crops />} />
      <Route path="finance" element={<Finance />} />
      <Route path="market" element={<Market />} />
    </Route>
    </Route>  
  

  <Route element={<RequireAuth allowedRoles={['admin']} />}>
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={ <Adashboard/>} />
          <Route path="farmers" element={ <Afarmers/>} />
          <Route path="finance" element={ <Afinance /> } />
          <Route path="crops" element={ <Acrops />} />
          <Route path="market" element={<Amarket />} />

          {/* Other admin routes */}
        </Route>
      </Route>

      {/* Fallback for unauthorized access */}
      <Route path="*" element={<Navigate to="/login" />} />
</Routes>
    
  );

}
export default App;