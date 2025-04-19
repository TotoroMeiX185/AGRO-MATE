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


 function App() {

  const { user } = useAuth(); // or wherever you're storing the user
  const isAdmin = user?.role === "admin";
  const isFarmer = user?.role === "farmer";
  const isLoggedIn = !!user;
  const isUnauthorized = !isAdmin && !isFarmer;

  return (
    <>
    <Routes>
    <Route element={<RequireAuth allowedRoles={['farmer']} />}>
    <Route path="/farmer" element={<FarmerLayout />}>
      <Route index element={<Home />} />
      <Route path="Login" element={<Login />} />
      <Route path="Dashboard" element={<Dashboard />} />
      <Route path="Farmers" element={<Farmers />} />
      <Route path="Crops" element={<Crops />} />
      <Route path="Finance" element={<Finance />} />
      <Route path="Market" element={<Market />} />
    </Route>
  </Route>

  <Route element={<RequireAuth allowedRoles={['admin']} />}>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={ isAdmin ?<Adashboard /> : <Navigate to="/unauthorized"/>} />
          <Route path="Farmers" element={ isAdmin? <Afarmers/> :<Navigate to="/unauthorized"/>} />
          <Route path="Finance" element={ isAdmin? <Afinance /> :<Navigate to="/unauthorized"/>} />
          <Route path="Crops" element={ isAdmin ?<Acrops />  : <Navigate to="/unauthorized" />} />
          <Route path="Market" element={isAdmin? <Amarket /> : <Navigate to="/unauthorized"/>} />

          {/* Other admin routes */}
        </Route>
      </Route>

      {/* Fallback for unauthorized access */}
      <Route path="*" element={<Navigate to="/login" />} />
</Routes>
    </>
  );

}
export default App;