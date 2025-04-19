// AdminLayout.jsx
import { Outlet } from 'react-router-dom';

const AdminLayout = () => {
  return (
    <div className="flex h-screen">
      <AdminSidebar />
      <main className="flex-1 p-6 bg-gray-100">
        <AdminHeader />
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
