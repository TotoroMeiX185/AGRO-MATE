// FarmerLayout.jsx
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';
import { useAuth } from '../contexts/AuthContext'; // Adjust the import based on your context structure

const FarmerLayout = () => {

  const { user } = useAuth(); // or wherever you're storing the user
  if (!user) return null; // or redirect to login
  
  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
      <main className="flex-1 bg-gray-50 p-6 ">
        <Outlet /> {/* This renders child routes */}
      </main>
    </div>
    
      <Footer className="mt-auto"/>
    </div>
  );
};

export default FarmerLayout;
