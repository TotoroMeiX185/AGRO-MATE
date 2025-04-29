import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import axios from 'axios';

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
    //console.log('Updated formData:', formData );
  };

  const handleSubmit = async(action) => {

     console.log('Action:', action); //Debugging
    if (action === 'register') {
      // Validate form data before sending it to the server
      const formattedData = {
        ...formData,
        isGovEmployee: formData.isGovEmployee === 'Yes',
        salaryAbove40k: formData.salaryAbove40k === 'Yes',
        dob: new Date(formData.dob).toISOString(), // Format date to YYYY-MM-DD
      };

      try{
      const res = await axios.post('http://localhost:5000/api/farmer/register', formattedData,);

      if (res.status === 200) {
        const data = res.data;
        alert('Registration successful! ' + data.message);
        navigate('/Dashboard');
      } else {
        alert('Registration failed: ' + (res.data?.message || 'Unknown error occured'));
     }
      console.log('Response status:', res.status); //Debugging
      console.log('Response body:', res.data); //Debugging
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred during registration. Please try again later.');
    } 
  
      }
  };

  const navigate = useNavigate();
  console.log('Form data:', formData); //Debugging

  return (
    <>
    <Navbar/>
    <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-8 ">
       <div className="max-w-7xl mx-auto mt-10 p-6 bg-white rounded shadow-md border border-blue-200"
       style={{marginBottom:'10px',marginTop:'10px', marginLeft:'20px', marginRight:'20px'}}> 
     <div style={{fontSize:'20px', color:'green', fontWeight:'bold', textAlign:'center'}}> <h2>FARMER PERSONAL INFORMATION</h2></div>

      <form className="space-y-4">
      
        <Input label="Full Name" name="fullName" value={formData.fullName} onChange={handleChange} />
        <Input label="NIC" name="nic" value={formData.nic} onChange={handleChange} />
        <Input label="Date of Birth" name="dob" type="date" value={formData.dob} onChange={handleChange} />

        <div className="flex items-center space-x-4">
          <label className="w-32">Gender</label>
          <label className="flex items-center space-x-2">
            <input type="radio" name="gender" value="Male" onChange={handleChange} checked={formData.gender==='Male'} />
            <span>Male</span>
          </label>
          <label className="flex items-center space-x-2">
            <input type="radio" name="gender" value="Female" onChange={handleChange} checked={formData.gender==='Female'} />
            <span>Female</span>
          </label>
        </div>

        <Input label="Address" name="address" value={formData.address} onChange={handleChange} />
        <Input label="Telephone Number" name="phone" value={formData.phone} onChange={handleChange} />
        <Input label="E mail" name="email" type="email" value={formData.email} onChange={handleChange} />
        <Input label="Province" name="province" value={formData.province} onChange={handleChange} />
        <Input label="District" name="district" value={formData.district} onChange={handleChange} />
        <Input label="Village/Division" name="village" value={formData.village} onChange={handleChange} />

    <div className="flex items-center space-x-4">
    <label className="w-52">A government employee?</label>
    <label className="flex items-center space-x-1">
      <input type="radio" 
      name='isGovEmployee' 
      value="Yes" 
      onChange={handleChange}
      checked={formData.isGovEmployee==='Yes'} />
      <span>Yes</span>
    </label>
    <label className="flex items-center space-x-1">
      <input type="radio" 
      name='isGovEmployee'
      value="No" 
      onChange={handleChange}
      checked={formData.isGovEmployee==='No'
      } />
      <span>No</span>
    </label>
    </div>

     <div className="flex items-center space-x-4">
    <label className="w-52">Salary above Rs.40,000?</label>
    <label className="flex items-center space-x-1">
      <input type="radio" 
      name='salaryAbove40k'
      value="Yes" 
      onChange={handleChange}
      checked={formData.salaryAbove40k ==='Yes'} />
      <span>Yes</span>
    </label>
    <label className="flex items-center space-x-1">
      <input type="radio" 
      name='salaryAbove40k'
      value="No" 
      onChange={handleChange}
      checked={formData.salaryAbove40k ==='No'
      } />
      <span>No</span>
    </label>
    </div>
    

        <div className="flex justify-center space-x-6 mt-6">
          <button
            type="button"
            onClick={() =>handleSubmit('register')}
            className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold px-6 py-2 rounded"
          >
            Register
          </button>

          <button
            type="button"
            onClick={() =>handleSubmit('login')}
            className=" text-white font-bold px-6 py-2 rounded"
            style={{backgroundColor:'green'}}
          >
            Login
          </button>
        </div>
      </form>
    </div>
    </main>
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


export default Farmers;
