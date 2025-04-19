import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import { useAuth } from '../contexts/AuthContext';
import Footer from '../components/Footer';

const Farmers = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    nic: '',
    dob: '',
    gender: '',
    address: '',
    phone: '',
    email: '',
    province: '',
    district: '',
    village: '',
    isGovEmployee: '',
    salaryAbove40k: '',
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (action) => {
    if (action === 'register') {
      alert('Registering farmer...');
    } else {
      alert('Logging in...');
    }
  };

  const naviagte = useNavigate();

  return (
    <>
    <Navbar/>
       <div className="max-w-5xl mx-auto mt-10 p-6 bg-white rounded shadow-md border border-blue-200"
       style={{marginBottom:'10px'}}>
     <div style={{fontSize:'20px', color:'green', fontWeight:'bold', textAlign:'center'}}> <h2>FARMER PERSONAL INFORMATION</h2></div>

      <form className="space-y-4">
        <Input label="Full Name" name="fullName" value={formData.fullName} onChange={handleChange} />
        <Input label="NIC" name="nic" value={formData.nic} onChange={handleChange} />
        <Input label="Date of Birth" name="dob" type="date" value={formData.dob} onChange={handleChange} />

        <div className="flex items-center space-x-4">
          <label className="w-32">Gender</label>
          <label className="flex items-center space-x-2">
            <input type="radio" name="gender" value="Male" onChange={handleChange} />
            <span>Male</span>
          </label>
          <label className="flex items-center space-x-2">
            <input type="radio" name="gender" value="Female" onChange={handleChange} />
            <span>Female</span>
          </label>
        </div>

        <Input label="Address" name="address" value={formData.address} onChange={handleChange} />
        <Input label="Telephone Number" name="phone" value={formData.phone} onChange={handleChange} />
        <Input label="E mail" name="email" type="email" value={formData.email} onChange={handleChange} />
        <Input label="Province" name="province" value={formData.province} onChange={handleChange} />
        <Input label="District" name="district" value={formData.district} onChange={handleChange} />
        <Input label="Village/Division" name="village" value={formData.village} onChange={handleChange} />

        <CheckboxGroup
          label="A government employee?"
          name="isGovEmployee"
          onChange={handleChange} />

        <CheckboxGroup
          label="Does salary exceed Rs. 40,000?"
          name="salaryAbove40k"
          onChange={handleChange} />

        <div className="flex justify-center space-x-6 mt-6">
          <button
            type="button"
            onClick={() => {
              handleSubmit('register');
              naviagte('/Dashbord');
            }}
            className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold px-6 py-2 rounded"
          >
            Register
          </button>
          <button
            type="button"
            onClick={() => {handleSubmit('login');
            naviagte('/Login');}}
            className=" text-white font-bold px-6 py-2 rounded"
            style={{backgroundColor:'green'}}
          >
            Login
          </button>
        </div>
      </form>
    </div>
    
    <Footer/>
    </>

  );
};

const Input = ({ label, name, type = 'text', value, onChange }) => (
  <div className="flex items-center space-x-4">
    <label className="w-42">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      className="flex-1 border rounded px-2 py-1"
    />
  </div>
);

const CheckboxGroup = ({ label, name, onChange }) => (
  <div className="flex items-center space-x-4">
    <label className="w-42">{label}</label>
    <label className="flex items-center space-x-1">
      <input type="radio" name={name} value="Yes" onChange={onChange} />
      <span>Yes</span>
    </label>
    <label className="flex items-center space-x-1">
      <input type="radio" name={name} value="No" onChange={onChange} />
      <span>No</span>
    </label>
  </div>
  
);

export default Farmers;
