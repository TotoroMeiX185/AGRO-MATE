import React, { useEffect, useState } from 'react';
import Dashboardcard from '../components/Adashboardcard.jsx';
import axios from 'axios';
import {Leaf, TrendingUp, TrendingDown, CloudSun} from 'lucide-react';


const FarmerDashboard = () => {
  const [stats, setStats] = useState({
    crops: [],
    income: 0,
    expenses: 0,
    weather: null
  });

  const API_KEY = "95e9434037da3ab29aeab0e01ed593a3";

  useEffect(() => {
    const fetchData = async () => {
       const token = localStorage.getItem('token');
      try {
          const cropsRes= await axios.get('http://localhost:5000/api/dashboard/crops', {
            headers: { Authorization: `Bearer ${token}` }
          });
          const incomeRes = await axios.get('http://localhost:5000/api/dashboard/income', {
            headers: { Authorization: `Bearer ${token}` }
          });
          const expensesRes = await axios.get('http://localhost:5000/api/dashboard/expenses', {
            headers: { Authorization: `Bearer ${token}` }
          });
          const weatherRes = await axios.get('http://localhost:5000/api/weather?city=Monaragala',)
          
          console.log("Crops:", cropsRes.data);
          console.log("Income:", incomeRes.data);
          console.log("Expenses:", expensesRes.data);
          console.log('Weather API response:', weatherRes.data);

        setStats({
          crops: cropsRes.data,
          income: incomeRes.data.totalIncome || 0,
          expenses: expensesRes.data.totalExpenses || 0,
          weather: weatherRes.data
        });

      } catch (err) {
        console.error('Error fetching farmer stats:', err);

        setStats({
          crops: [],
          income: 0,
          expenses: 0,
          weather: null
        });

        if (err.response?.status === 401) {
          // Optional: handle logout
        }
      }
    };

    fetchData();
  }, []);

  return (
    <main className="flex-1 p-10">
      <div className="flex flex-col flex-grow min-h-[calc(100vh-10rem)] p-6 bg-white rounded-2xl shadow-md w-full">
        <h1 className="text-3xl font-bold mb-6 text-primary">Farmer Dashboard</h1>
        <div className="flex flex-wrap gap-6">

          <Dashboardcard
            title="Cultivated Crops"
            value={stats.crops.length}
            icon={Leaf}
            iconColor = 'text-green-600'
            bgColor = 'bg-green-50'
            extra={
            <ul className="list-disc list-inside text-sm text-gray-700">
              {stats.crops.slice(0, 5).map((crop, i) => (
                <li key={i}>
                  {crop.cropName} -{crop.cropVariety}
                  </li>
              ))}
              {stats.crops.length> 5 && <li>and more...</li>}
            </ul>}
          />

          <Dashboardcard
            title="Net Income"
            value={`Rs. ${stats.income.toFixed(2)}`}
            icon={TrendingUp}
            iconColor="text-emerald-600"
            bgColor="bg-emerald-50"
            extra={<span className="text-green-600 font-medium">Good job!</span>}
          />

          <Dashboardcard
            title="Expenses"
            value={`Rs. ${stats.expenses.toFixed(2)}`}
            icon={TrendingDown}
            iconColor="text-red-600"
            bgColor="bg-red-50"
            extra={<span className="text-red-500 font-medium">Keep track!</span>}
          />

          <Dashboardcard
            title="Today's Weather"
            value={stats.weather && stats.weather.main ? `${stats.weather.main.temp}°C` : "Loading..."}
            icon={CloudSun}
            iconColor="text-blue-600"
            bgColor="bg-blue-50"
            extra={stats.weather?.weather?.[0] && (
              <div className="flex items-center gap-2 text-sm">
                <img
                  src={`https://openweathermap.org/img/wn/${stats.weather.weather[0].icon}@2x.png`}
                  alt="weather-icon"
                  className="w-10 h-10"
                />
                <span className="capitalize">{stats.weather.weather[0].description}</span>
              </div>
            )}
          />

        </div>
      </div>
    </main>
  );
};

export default FarmerDashboard;
