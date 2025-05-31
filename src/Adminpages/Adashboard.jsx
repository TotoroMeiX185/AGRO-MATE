import React, { useEffect, useState } from 'react';
import Dashboardcard from '../components/AdashboardCard.jsx';
import axios from 'axios';
import { UserGroupIcon ,MapIcon, CurrencyDollarIcon, PresentationChartBarIcon } from '@heroicons/react/24/outline';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from 'recharts';
import {
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';


const AdminDashboard = () => {


const[error, setError] = useState(null);

  const [stats, setStats] = useState({
    totalFarmers: 0,
    totalLandUsed: 0,
    subsidyFarmers: {
      total: 0,
      money: 0,
      fertilizer: 0
    },
    cultivatedCrops: []
  });

  useEffect(() => {
    const fetchData = async () => {

      const token = localStorage.getItem('token');

      try {
        
          const farmersRes = await axios.get('http://localhost:5000/api/admin/stats/registered-farmers', {
            headers: { Authorization: `Bearer ${token}` }
          });
          const landRes = await axios.get('http://localhost:5000/api/admin/stats/total-land-area', {
            headers: { Authorization: `Bearer ${token}` }
          });
          const subsidyRes = await axios.get('http://localhost:5000/api/admin/stats/subsidies', {
            headers: { Authorization: `Bearer ${token}` }
          });
          const cropsRes = await axios.get('http://localhost:5000/api/admin/stats/crops',{
            headers: { Authorization: `Bearer ${token}` }
          });
        
          console.log("farmers:", farmersRes.data);
          console.log("land:", landRes.data);
          console.log("subsidy:", subsidyRes.data);
          console.log('crop:', cropsRes.data);

        setStats({
          totalFarmers: farmersRes.data.totalFarmers,
          totalLandUsed: landRes.data.totalLandArea || 0,
          subsidyFarmers:{
            total: subsidyRes.data.totalFarmers || 0,
            money: subsidyRes.data.money || 0,
            fertilizer: subsidyRes.data.fertilizer || 0
          },
          cultivatedCrops: cropsRes.data.crops
        });
      } catch (err) {
        console.log('caught error:', err.res?.data || err.message);
        setError(err.message  || 'something went wrong');

        //set default values when the API fails
        setStats({
          totalFarmers: 0,
          totalLandArea: 0,
          subsidyFarmers: {
            total: 0,
            money: 0,
            fertilizer: 0
          },
          cultivatedCrops: []
        });

        //If unauthorized, potentially redirect to login
        if (err.res && err.res.status === 401) {
        //localStorage.removeItem('token');
        //localStorage.removeItem('user');
        //window.location.href = '/login';
        }
      }
    };

    fetchData();
  }, []);

  const subsidyData = [
  { name: 'Money', value: stats.subsidyFarmers.money },
  { name: 'Fertilizer', value: stats.subsidyFarmers.fertilizer }
];

const COLORS = ['#8884d8', '#82ca9d'];

const renderCustomLabel = ({
  cx, cy, midAngle, innerRadius, outerRadius, percent, index, name, value
}) => {
  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="#333"
      textAnchor={x > cx ? 'start' : 'end'}
      dominantBaseline="central"
      fontSize={13}
    >
      {`${name || ''} ${value} (${(percent * 100).toFixed(0)}%)`}
    </text>
  );
};


  return (
    <>
   
  <main className="flex-1 p-8 ">
  <div className="flex flex-col flex-grow min-h-[calc(100vh-10rem)] p-6 bg-gray-100 rounded-2xl
   shadow-md w-[1000px] mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-primary">Admin Dashboard</h1>
      <div className="flex flex-wrap gap-6 ">
        <Dashboardcard
          title="Registered Farmers"
          value={stats.totalFarmers} 
          icon={UserGroupIcon}
          iconColor="text-blue-600"
          bgColor="bg-pink-50"
          width="w-[400px]"
          className="text-4xl"
        
          />
        <Dashboardcard
          title="Total Land Area"
          value={`${stats.totalLandUsed} Acres`} 
          icon= {MapIcon}
          iconColor="text-green-600"
          bgColor="bg-green-50"
          width="w-[500px]"
          />

        <Dashboardcard
          title="Subsidy Beneficiaries"
          value={stats.subsidyFarmers.total}
          icon={CurrencyDollarIcon}
          iconColor="text-yellow-600"
          bgColor="bg-yellow-50"
          width="w-[500px]"
          height="h-[350px]"
          extra={
             <div className="w-full h-60">
      {stats.subsidyFarmers.money > 0 || stats.subsidyFarmers.fertilizer > 0 ? (
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <defs>
              <linearGradient id="moneyGradient" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#00C49F" stopOpacity={0.8} />
                <stop offset="100%" stopColor="#00C49F" stopOpacity={0.2} />
              </linearGradient>
              <linearGradient id="fertilizerGradient" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#FF8042" stopOpacity={0.8} />
                <stop offset="100%" stopColor="#FF8042" stopOpacity={0.2} />
              </linearGradient>
            </defs>
            <Pie
              data={subsidyData}
              cx="50%"
              cy="50%"
              innerRadius={40}
              outerRadius={60}
              fill="#8884d8"
              paddingAngle={4}
              label={renderCustomLabel}
              dataKey="value"
            >
              {subsidyData.map((entry, index) => (
                <Cell 
                key={`cell-${index}`} 
                fill={`url(#${index === 0 ? 'moneyGradient' : 'fertilizerGradient'})`} 
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      ) : (
        <p className="text-sm text-gray-500">No subsidy data available</p>
      )}
    </div>
          }/>

        <Dashboardcard
          className="self-end"
          title="Cultivated Crops"
          value={`${stats.cultivatedCrops.length} Types`}
          icon={PresentationChartBarIcon}
          iconColor="text-purple-600"
          bgColor="bg-purple-50"
          width="w-[400px] " 
          height="h-[350px]"
        
          extra={
          <div className="w-full h-60">
      {stats.cultivatedCrops.length > 0 ? (
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={stats.cultivatedCrops.slice(0, 5)}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis/>
            <Tooltip />
            <Bar dataKey="count" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <p className="text-sm text-gray-500">No data available</p>
      )}           
          </div>
        }
      />
      </div>
    </div>
  </main>
   </>
  );
};

export default AdminDashboard;
