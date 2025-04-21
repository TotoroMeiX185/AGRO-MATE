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
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-4">
        <Navbar />
        <Outlet /> {/* This renders child routes */}
      </main>
      <Footer/>
    </div>
  );
};

export default FarmerLayout;
