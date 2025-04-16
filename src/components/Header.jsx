import React, { useState } from 'react';
import { User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import * as agromateSvg from '../assets/agromate.svg';

const Header = () => {
  const [loggedIn, setLoggedIn] = useState(true);
  const navigate = useNavigate();

  const handleAuthToggle = () => {
    if (loggedIn) {
      setLoggedIn(false);
      navigate('/Login');
    } else {
      // Logging in - for demonstration (you can add real login later)
      setLoggedIn(true);
    }
  };

  return (
    <header className="bg-[#f8f2f2] flex justify-between items-center p-4 border-b border-blue-200">
      {/* Logo with text */}
      <div className="flex items-center space-x-2 text-green-700 font-bold text-lg">
        <img src={agromateSvg.default} alt="AgroMate Logo" className="h-8 w-8 mr-2" /> 
        <span>AgroMate</span>
      </div>

      {/* User and Button */}
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
