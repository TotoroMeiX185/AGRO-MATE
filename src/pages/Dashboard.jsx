import Sidebar from '../components/Sidebar';
//import Header from '../components/Header';
import React from "react";
import { useNavigate } from 'react-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useEffect, useState } from "react";
import axios from "axios";

function FarmerDashboard() {

    const [weather, setWeather] = useState(null);

    const API_KEY = "95e9434037da3ab29aeab0e01ed593a3";
    const city = "Monaragala";

    useEffect(() => {
        const fetchWeather = async () => {
            try {
                const res = await axios.get(
                    `https://api.openweathermap.org/data/2.5/weather?q=${'Colombo'}&appid=${'95e9434037da3ab29aeab0e01ed593a3'}&units=metric`
                );
                setWeather(res.data);
            } catch (error) {
                console.error("Error fetching weather data:", error);
            }
        };

        fetchWeather();
    }, []);

    return (
    <>
    <Navbar />
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
            <div className="grid grid-cols-2 gap-4 w-full max-w-5xl">
                    {/* Cultivated Crop */}
                <div className="bg-green-400 rounded-lg shadow-md p-6 col-span-1 row-span-2">
                    <h2 className="text-white text-xl font-semibold mb-2">Current Crop</h2>
                    <p className="text-white text-lg">Wheat</p>
                </div>    
            

                    {/* Weather */}
            <div className="bg-yellow-100 rounded-lg shadow-md p-6">
                <div>
                <h2 className="text-gray-800 text-lg font-semibold mb-2">Today Weather</h2>
                <div className={`rounded-lg shadow-md p-6 flex items-center gap-4 transition-colors duration-200 ${
            weather? weather.weather[0].main === "Clear"
                ? "bg-yellow-100"
                : weather.weather[0].main === "Rain" || weather.weather[0].main === "Drizzle"
                ? "bg-blue-100"
                : weather.weather[0].main === "Clouds"
                ? "bg-gray-100"
                : weather.weather[0].main === "Snow"
                ? "bg-white"
                : weather.weather[0].main === "Mist" || weather.weather[0].main === "Fog"
                ? "bg-gray-200"
                : "bg-green-100"
                : "bg-gray-100"
           }`}
          >
            <div className="bg-white p-4 rounded-full shadow-inner">
    {weather ? (
      <img
        src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
        alt="Weather icon"
        className="w-12 h-12"
      />
    ) : (
        <div className="w-12 h-12 bg-gray-200 animate-pulse rounded-full"></div>
      )}
    </div>
       </div>
                {weather ? (
                        <div>
                            <p className="text-gray-800 text-xl font-bold">{weather.main.temp}°C</p>
                            <p className='text-gray-600 capitalize'> {weather.weather[0].description} </p>
                        </div>
                            ) : (
                            <p className="text-gray-500">Loading...</p>
                            )}
                </div>
            </div>    

            <div>
                {/* Profit */}
                <div className="bg-yellow-200 rounded-lg shadow-md p-6">
                    <h2 className="text-gray-800 text-lg font-semibold mb-2">Your net profit in this season</h2>
                    <p className="text-gray-700">₹45,000</p>
                </div>
            </div>

            <div>
                {/* Notification or Expenses */}
                <div className="bg-blue-300 rounded-lg shadow-md p-6 col-span-1">
                    <h2 className="text-blue-900 text-lg font-semibold mb-2">Your total expenses in this season</h2>
                    <p className="text-blue-800">₹25,000</p>
                </div>
            </div>
            </div>
        </div>
        <Footer />
        </>
     );
    };

    export default FarmerDashboard;
