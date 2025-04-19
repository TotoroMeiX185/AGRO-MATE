// FarmerLayout.jsx
import { Outlet } from 'react-router-dom';


const FarmerLayout = () => {
  return (
    <div className="flex">
      <FarmerSidebar />
      <main className="flex-1 p-4">
        <FarmerNavbar />
        <Outlet /> {/* This renders child routes */}
      </main>
    </div>
  );
};

export default FarmerLayout;
