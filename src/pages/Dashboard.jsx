import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import React from "react";
import { useNavigate } from 'react-dom';

const FarmerDashboard = () => {
  return (
    <>
    <Header>
    <Sidebar/>
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
          <div className="grid grid-cols-2 gap-4 w-full max-w-5xl">
              {/* Cultivated Crop */}
              <div className="bg-green-400 rounded-lg shadow-md p-6 col-span-1 row-span-2">
                  <h2 className="text-white text-xl font-semibold mb-2">Current Crop</h2>
                  <p className="text-white text-lg">Wheat</p>
              </div>

              {/* Weather */}
              <div className="bg-yellow-100 rounded-lg shadow-md p-6">
                  <h2 className="text-gray-800 text-lg font-semibold mb-2">Today Weather</h2>
                  <p className="text-gray-700">Sunny, 28°C</p>
              </div>

              {/* Profit */}
              <div className="bg-yellow-200 rounded-lg shadow-md p-6">
                  <h2 className="text-gray-800 text-lg font-semibold mb-2">Your net profit in this season</h2>
                  <p className="text-gray-700">₹45,000</p>
              </div>

              {/* Notification or Expenses */}
              <div className="bg-blue-300 rounded-lg shadow-md p-6 col-span-1">
                  <h2 className="text-blue-900 text-lg font-semibold mb-2">Your total expenses in this season</h2>
                  <p className="text-blue-800">₹25,000</p>
              </div>
          </div>
      </div>
      </Header>
      </>
  );
};

export default FarmerDashboard;
