// AdminLayout.jsx
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Sidebar  from '../components/Sidebar';
import Footer from '../components/Footer';
import { useAuth } from '../contexts/AuthContext'; // Adjust the import based on your context structure

const AdminLayout = () => {

  const { user } = useAuth(); // or wherever you're storing the user
  if (!user) return null; // or redirect to login
  
  return (
    <div className="flex h-screen">
      <Sidebar/>
      <div className="flex flex-col flex-1 bg-gray-100">
      <Navbar />
      <main className="flex-1 p-6 overflow-y-auto bg-gray-100">
        
        <Outlet />
      </main>
      <Footer/>
      </div>
    </div>
  );
};

export default AdminLayout;
