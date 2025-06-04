import React, { useEffect, useState } from 'react';
import Dashboardcard from '../components/Dashboardcard.jsx';
import axios from 'axios';
import {Leaf, TrendingUp, TrendingDown, CloudSun} from 'lucide-react';
import { PieChart, Pie, Cell, Legend, ResponsiveContainer } from 'recharts'
import { LineChart, Line, XAxis, YAxis, Tooltip,  } from 'recharts';

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
          weather: weatherRes.data,
        });

      } catch (err) {
        console.error('Error fetching farmer stats:', err);

        setStats({
          crops: [],
          income: 0,
          expenses: 0,
          weather: null,
         
        });

        if (err.response?.status === 401) {
          // Optional: handle logout
        }
      }
    };

    fetchData();
  }, []);

  const COLORS = ['#34d399', '#60a5fa', '#fbbf24', '#f87171', '#a78bfa', '#fb923c'];

  const cropMap = stats.crops.reduce((acc, crop) => {
    
  const label =`${crop.cropName} - ${crop.cropVariety}`;
  const existing = acc.find(item=> item.name === label);
  if(existing){
    existing.value += 1;
  }else{
    acc.push({name:label, value:1});
  }
    return acc;
  }, []);

  const data = cropMap;

   // Custom label for pie slices
  const renderLabel = ({ name }) => name;

  const conditionColorMap = {
  Clear: 'bg-yellow-100 text-yellow-700',
  Clouds: 'bg-gray-100 text-gray-800',
  Rain: 'bg-blue-100 text-blue-700',
  Thunderstorm: 'bg-purple-100 text-purple-700',
};

const condition = stats.weather?.weather?.[0]?.main || "Clear";
const badgeStyle = conditionColorMap[condition] || 'bg-gray-100 text-gray-700';


  return (
    <main className="flex-1 p-10">
      <div className="flex flex-col flex-grow min-h-[calc(100vh-10rem)] p-6 bg-white rounded-2xl shadow-md w-full">
        <h1 className="text-3xl font-bold mb-6 text-primary">Farmer Dashboard</h1>
        <div className="flex flex-wrap gap-5">

          <Dashboardcard
            title="Cultivated Crops"
            value={stats.crops.length}
            icon={Leaf}
            iconColor = 'text-green-600'
            bgColor = 'bg-yellow-50'
            width="w-[470px]"
            height="h-[300px]"
            className=""
            extra={
            <div className="w-full h-48">
       <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={50}
            label={renderLabel}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
            }
          />

          <Dashboardcard
            title="Today's Weather"
            value={stats.weather && stats.weather.main ? `${stats.weather.main.temp}°C` : "Loading..."}
            icon={CloudSun}
            iconColor="text-blue-600"
            bgColor="bg-blue-100"
            width="w-[400px]"
            height="h-[300px]"
            extra={stats.weather?.weather?.[0] && (
              <div className=" flex items-center gap-4 text-sm">
                <img
                  src={`https://openweathermap.org/img/wn/${stats.weather.weather[0].icon}@2x.png`}
                  alt="weather-icon"
                  className="w-15 h-15 bg-transparent"
                />

              {/* Dynamic Condition Badge */}
        <span className={`inline-block px-2 py-0.5 rounded-full text-xs capitalize ${badgeStyle}`}>
          {condition}
        </span>

<div className="mt-5 pt-8  flex flex-wrap gap-3 text-center text-gray-600 ">
      <div>🌡 Feels: {stats.weather.main.feels_like}°C</div>
      <div>💧 Humidity: {stats.weather.main.humidity}%</div>
      <div>💨 Wind: {stats.weather.wind.speed} m/s</div>
    </div>
              </div>
            )}
          />

          <Dashboardcard
            title="Net Income"
            value={`Rs. ${stats.income.toFixed(2)}`}
            icon={TrendingUp}
            iconColor="text-emerald-600"
            bgColor="bg-emerald-50"
            width="w-[450px]"
            height="h-[150px]"
        
         extra={
          <span className="text-green-600 font-medium">Good job!</span>}
          />

                    <Dashboardcard
            title="Expenses"
            value={`Rs. ${stats.expenses.toFixed(2)}`}
            icon={TrendingDown}
            iconColor="text-red-600"
            bgColor="bg-red-50"
             width="w-[430px]"
            height="h-[150px]"
            extra={<span className="text-red-500 font-medium">Keep track!</span>}
          />

          

        
        </div>
      </div>
    </main>
  );
};

export default FarmerDashboard;
