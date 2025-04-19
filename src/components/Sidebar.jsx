import React, { useState } from 'react';

import {
  BarChart2,
  Users,
  Leaf,
  Store,
  CreditCard,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const toggleSidebar = () => setCollapsed(!collapsed);

  const menuItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: BarChart2, label: 'Dashboard', path: '/dashboard' },
    { icon: Users, label: 'Farmers', path: '/farmers' },
    { icon: Leaf, label: 'Crops', path: '/crops' },
    { icon: Store, label: 'Market', path: '/market' },
    { icon: CreditCard, label: 'Finance', path: '/finance' },
    { icon: BarChart2, label: 'Dashboard', path: '/Adashboard' },
    { icon: Users, label: 'Farmers', path: '/Afarmers' },
    { icon: Leaf, label: 'Crops', path: '/Acrops' },
    { icon: Store, label: 'Market', path: '/Amarket' },
    { icon: CreditCard, label: 'Finance', path: '/Afinance' },
    // Add your other 5 pages here if needed
  ];

  return (
    <div
      className={`bg-[#f8f2f2] h-screen p-4 border-r border-blue-200 transition-all duration-300 ease-in-out ${
        collapsed ? 'w-20' : 'w-48'
      }`}
    >
      {/* Toggle Button */}
      <div className="flex justify-end mb-6">
        <button
          onClick={toggleSidebar}
          className="text-gray-700 hover:text-gray-900"
        >
          {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>

      {/* Menu Items */}
      <nav className="flex flex-col space-y-6">
        {menuItems.map((item, index) => (
          <NavItem
            key={index}
            icon={item.icon}
            label={item.label}
            active={activeIndex === index}
            collapsed={collapsed}
            onClick={() => setActiveIndex(index)}
          />
        ))}
      </nav>
    </div>
  );
};

const NavItem = ({ icon: Icon, label, active, collapsed, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`flex items-center space-x-2 px-3 py-2 rounded-md cursor-pointer transition-colors ${
        active
          ? 'bg-green-700 text-white font-semibold'
          : 'text-gray-700 hover:bg-gray-200'
      }`}
    >
      <Icon size={20} color={active ? 'white' : 'black'} />
      {!collapsed && <span className="text-sm">{label}</span>}
    </div>
  );
};

export default Sidebar;
