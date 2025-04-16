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
    { icon: BarChart2, label: 'Dashboard' },
    { icon: Users, label: 'Farmers' },
    { icon: Leaf, label: 'Crops' },
    { icon: Store, label: 'Market' },
    { icon: CreditCard, label: 'Finance' },
  ];
  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Dashboard', href: '/Dashboard' },
    { name: 'Farmers', href: '/Farmers' },
    { name: 'Crops', href: '/Crops' },
    { name: 'Market', href: '/Market' },
    { name: 'Finance', href: '/Finance' },
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
