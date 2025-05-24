import React, { useEffect, useState } from 'react';
import Dashboardcard from '../components/DashboardCard';
import axios from 'axios';

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
      try {
        const token = localStorage.getItem('token');
        const [cropsRes, incomeRes, expensesRes, weatherRes] = await Promise.all([
          axios.get('http://localhost:5000/api/farmer/crops', {
            headers: { Authorization: `Bearer ${token}` }
          }),
          axios.get('http://localhost:5000/api/farmer/income', {
            headers: { Authorization: `Bearer ${token}` }
          }),
          axios.get('http://localhost:5000/api/farmer/expenses', {
            headers: { Authorization: `Bearer ${token}` }
          }),
          axios.get(`https://api.openweathermap.org/data/2.5/weather?q=Monaragala&appid=${API_KEY}&units=metric`)
        ]);

        setStats({
          crops: cropsRes.data,
          income: incomeRes.data.totalIncome,
          expenses: expensesRes.data.totalExpenses,
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
    <main className="flex-1 p-8">
      <div className="flex flex-col flex-grow min-h-[calc(100vh-10rem)] p-6 bg-gray-100 rounded-2xl shadow-md w-full">
        <h1 className="text-3xl font-bold mb-6 text-primary">Farmer Dashboard</h1>
        <div className="flex flex-wrap gap-6">

          <Dashboardcard
            title="Cultivated Crops"
            value={stats.crops.length}
            extra={<ul className="list-disc list-inside text-sm">
              {stats.crops.slice(0, 5).map((crop, i) => (
                <li key={i}>{crop.name}</li>
              ))}
              {stats.crops.length > 5 && <li>and more...</li>}
            </ul>}
          />

          <Dashboardcard
            title="Net Income"
            value={`Rs. ${stats.income}`}
            extra={<span className="text-green-600 font-medium">Good job!</span>}
          />

          <Dashboardcard
            title="Expenses"
            value={`Rs. ${stats.expenses}`}
            extra={<span className="text-red-500 font-medium">Keep track!</span>}
          />

          <Dashboardcard
            title="Today's Weather"
            
            value={stats.weather ? `${stats.weather.main.temp}°C` : "Loading..."}
            extra={stats.weather && (
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
