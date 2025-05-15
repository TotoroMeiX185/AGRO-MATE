import React, { useEffect, useState } from 'react';
import Dashboardcard from '../components/Dashboardcard';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Sidebar from '../components/Sidebar';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalFarmers: 0,
    totalLandArea: 0,
    subsidyFarmers: {
      total: 0,
      money: 0,
      fertilizer: 0
    },
    cultivatedCrops: []
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [farmersRes, landRes, subsidyRes, cropsRes] = await Promise.all([
          axios.get('/api/admin/stats/registered-farmers'),
          axios.get('/api/admin/stats/total-land-area'),
          axios.get('/api/admin/stats/subsidies'),
          axios.get('/api/admin/stats/crops')
        ]);

        setStats({
          totalFarmers: farmersRes.data.totalFarmers,
          totalLandArea: landRes.data.totalLandArea,
          subsidyFarmers:{
            total: subsidyRes.data.totalFarmers,
            money: subsidyRes.data.money,
            fertilizer: subsidyRes.data.fertilizer
          },
          cultivatedCrops: cropsRes.data.crops
        });
      } catch (err) {
        console.error('Error fetching stats:', err);

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
        if (err.response && err.response.status === 401) {
        //localStorage.removeItem('token');
        //localStorage.removeItem('user');
        //window.location.href = '/login';
        }
      }
    };

    fetchData();
  }, []);

  return (
    <>
    <Navbar/>
    <div className="flex flex-1">
    <Sidebar/>
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <div className="flex flex-wrap gap-4">
        <Dashboardcard
          title="Registered Farmers"
          value={stats.totalFarmers} />
        <Dashboardcard
          title="Total Land Area"
          value={`${stats.totalLandArea} Acres`} />
        <Dashboardcard
          title="Subsidy Beneficiaries"
          value={stats.subsidyFarmers.total}
          extra={<>
            <p>• Money: {stats.subsidyFarmers.money}</p>
            <p>• Fertilizer: {stats.subsidyFarmers.fertilizer}</p>
          </>} />
        <Dashboardcard
          title="Cultivated Crops"
          value={`${stats.cultivatedCrops.length} Types`}
          extra={<ul className="list-disc list-inside text-sm">
            {stats.cultivatedCrops.slice(0, 5).map((crop, i) => (
              <li key={i}>
                {crop.name} ({crop.count} Farmers)
              </li>
            ))}
            {stats.cultivatedCrops.length > 5 && <li>and more...</li>}
          </ul>} />
      </div>
    </div>
    </div>
    <Footer/>
    </>
  );
};

export default AdminDashboard;
