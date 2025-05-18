import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  BarChart2,
  Users,
  Leaf,
  Store,
  CreditCard,
  ChevronLeft,
  ChevronRight,
  Home,
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext'; // Make sure this returns user with a role

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const { user } = useAuth();

  const toggleSidebar = () => setCollapsed(!collapsed);

  // Dynamic menu based on user role
  const basePath = user?.role === 'admin' ? '/admin' : '/farmer';

  const menuItems = [
    { icon: Home, label: 'Home', path: `${basePath}/home` },
    { icon: BarChart2, label: 'Dashboard', path: `${basePath}/dashboard` },
    { icon: Users, label: 'Farmers', path: `${basePath}/farmers` },
    { icon: Leaf, label: 'Crops', path: `${basePath}/crops` },
    { icon: Store, label: 'Market', path: `${basePath}/market` },
    { icon: CreditCard, label: 'Finance', path: `${basePath}/finance` },
  ];

  return (
    <div
      className={`bg-[#fffff7] h-screen p-4 border-r border-white transition-all duration-300 ease-in-out ${
        collapsed ? 'w-20' : 'w-48'
      }`}
    >
      {/* Toggle Button */}
      <div className="flex justify-end mb-6">
        <button
          onClick={toggleSidebar}
          className="text-black hover:text-gray-900"
        >
          {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>

      {/* Menu Items */}
      <nav className="flex flex-col space-y-6">
        {menuItems.map((item, index) => {
          const isActive = location.pathname === item.path;
          return (
            <Link key={index} to={item.path}>
              <NavItem
                icon={item.icon}
                label={item.label}
                active={isActive}
                collapsed={collapsed}
              />
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

const NavItem = ({ icon: Icon, label, active, collapsed }) => {
  return (
    <div
      className={`flex items-center space-x-2 px-3 py-2 rounded-md cursor-pointer transition-colors ${
        active
          ? 'bg-primary text-black '
          : 'text-black hover:bg-primary'
      }`}
    >
      <Icon size={20} color={active ? 'black' : 'black'} />
      {!collapsed && <span className="text-sm">{label}</span>}
    </div>
  );
};

export default Sidebar;
