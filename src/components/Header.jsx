import React, { useState } from 'react';
import { User, CircleDot } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const [loggedIn, setLoggedIn] = useState(true); // Assume user is logged in by default
  const navigate = useNavigate();

  const handleAuthToggle = () => {
    if (loggedIn) {
      // Logging out
      setLoggedIn(false);
      navigate('/login'); // Navigate to login page
    } else {
      // Logging in - for demonstration (you can add real login later)
      setLoggedIn(true);
    }
  };

  return (
    <header className="bg-[#f8f2f2] flex justify-between items-center p-4 border-b border-blue-200">
      {/* Logo */}
      <div className="flex items-center space-x-2 text-green-700 font-bold text-lg">
        <CircleDot size={20} />
        <span>AgroMate</span>
      </div>

      {/* Profile + Auth Button */}
      <div className="flex items-center space-x-3">
        <User size={20} />
        <button
          onClick={handleAuthToggle}
          className={`px-4 py-1 rounded text-white font-semibold ${
            loggedIn ? 'bg-green-700 hover:bg-green-800' : 'bg-yellow-500 hover:bg-yellow-600'
          }`}
        >
          {loggedIn ? 'Logout' : 'Login'}
        </button>
      </div>
    </header>
  );
};

export default Header;
