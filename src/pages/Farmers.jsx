import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
//import axios from 'axios';

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
    password: '',
    confirmPassword: '',
  });

   const[error, setError] = useState('');
   const [loading, setLoading] = useState(false);
   const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async(action) => {
    console.log('Handle submit triggered with Action:', action);
    setError('');
    setLoading(true);
      //Debugging
    
     if (action === 'login') {
       navigate('/login');
      setLoading(false);
      return;
     }

     if (action !== 'register') {
      console.warn('Unexpected action:', action);
      setLoading(false);
      return;
     }

     console.log('Form data:', formData); // Debugging

     const requiredFields = [
      'fullName', 'nic', 'dob', 'gender', 'address',
      'phone', 'email', 'province', 'district', 'village',  
      'isGovEmployee', 'salaryAbove40k'
    ];

    for(let field of requiredFields) {
      if (!formData[field]) {
        setError(`${field} is required`);
        console.warn(`Missing field:, ${field}`); // Debugging
      setLoading(false);
        return;
      }
    }

    if (!['Male', 'Female'].includes(formData.gender)) {
      setError('Gender is required');
      return;
    }
    
    if (new Date(formData.dob) > new Date()) {
      setError('Date of Birth cannot be in the future');
      setLoading(false);
      return;
    }
    

      if (!/^\d{10}$/.test(formData.phone)) {
        setError('Phone number must be exactly 10 digits');
        setLoading(false);
        return;
      }

      if (!/\S+@\S+\.\S+/.test(formData.email)) {
        setError('Please enter a valid email address');
        setLoading(false);
        return;
      }

      // Password validation
      if (!formData.password || !formData.confirmPassword) {
      setError('Both password fields are required');
      setLoading(false);
      return;
      }

      if (formData.password.length < 8) {
      setError('Password must be at least 8 characters');
      setLoading(false);
      return;
      }

      if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
      }


      // Validate form data before sending it to the server
      const formattedData = {
        ...formData,
        isGovEmployee: formData.isGovEmployee === 'Yes',
        salaryAbove40k: formData.salaryAbove40k === 'Yes',
        dob: new Date(formData.dob).toISOString(), // Format date to YYYY-MM-DD
      };

      console.log("Submitting formatted data:", formattedData);

      try{
        console.log('Sending to backend:', formattedData);
      
        const res = await fetch('http://localhost:5000/api/farmer/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formattedData),
        });

      //const res = await axios.post('/api/farmer/register', formattedData);
      
      const data = await res.json();
      console.log('server response:',data);
      
      if (res.status === 200 || res.status ===201){
        alert('Registration Successful!');
        setFormData({
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
        password: '',
        confirmPassword: '',
        });
        navigate('/Dashboard');
      } else {
        setError(`Registration failed: ${data.message || 'Unknown error'}`);
      }
      } catch(error) {
        console.error('Error during fetch:', error);
        setError('An error occurred during registration. Please try again later.');
      } finally{
        setLoading(false);
      }
    };

  return (
    <>
<Navbar/>
    <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-8 ">
       <div className="max-w-7xl mx-auto mt-10 p-6 bg-white rounded shadow-md border border-blue-200"
       style={{marginBottom:'10px',marginTop:'10px', marginLeft:'20px', marginRight:'20px'}}> 
     <div style={{fontSize:'20px', color:'green', fontWeight:'bold', textAlign:'center'}}> <h2>FARMER PERSONAL INFORMATION</h2></div>

      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
      
        <Input label="Full Name" name="fullName" value={formData.fullName} onChange={handleChange} autoComplete="name" />
        <Input label="NIC" name="nic" value={formData.nic} onChange={handleChange} autoComplete="off"/>
        <Input label="Date of Birth" name="dob" type="date" value={formData.dob} onChange={handleChange} autoComplete="bday" />

      <fieldset className='mb-4'> 
        <div className="flex items-center space-x-4">
          <legend className="w-32">Gender</legend>
          <label className="flex items-center space-x-2">
            <input type="radio" name="gender" value="Male" onChange={handleChange} checked={formData.gender==='Male'} />
            <span>Male</span>
          </label>
          <label className="flex items-center space-x-2">
            <input type="radio" name="gender" value="Female" onChange={handleChange} checked={formData.gender==='Female'} />
            <span>Female</span>
          </label>
        </div>
        </fieldset>

        <Input label="Address" name="address" value={formData.address} onChange={handleChange} autoComplete="street-address" />
        <Input label="Telephone Number" name="phone" value={formData.phone} onChange={handleChange} autoComplete="tel" />
        <Input label="E mail" name="email" type="email" value={formData.email} onChange={handleChange} autoComplete= "email" />
        <Input label="Province" name="province" value={formData.province} onChange={handleChange} autoComplete="province" />
        <Input label="District" name="district" value={formData.district} onChange={handleChange} autoComplete="district" />
        <Input label="Village/Division" name="village" value={formData.village} onChange={handleChange} autoComplete="village" />
        <Input label="Password" name="password" type="password" value={formData.password} onChange={handleChange} autoComplete="new-password"/>
        <Input label="Re-enter Password" name="confirmPassword" type="password" value={formData.confirmPassword} onChange={handleChange} autoComplete="new-password"/>

    <fieldset className='mb-4'>
    <div className="flex items-center space-x-4">
    <legend className="w-52">A government employee?</legend>
    <label className="flex items-center space-x-1">
      <input 
      type="radio" 
      name='isGovEmployee' 
      value="true" 
      onChange={handleChange}
      checked={formData.isGovEmployee==='true'} />
      <span>Yes</span>
    </label>
    <label className="flex items-center space-x-1">
      <input 
      type="radio" 
      name='isGovEmployee'
      value="false" 
      onChange={handleChange}
      checked={formData.isGovEmployee==='false'} 
      />
      <span>No</span>
    </label>
    </div>
</fieldset>

    <fieldset className='mb-4'>
    <div className="flex items-center space-x-4">
    <legend className="w-52">Salary above Rs.40,000?</legend>
    <label className="flex items-center space-x-1">
      <input type="radio" 
      name='salaryAbove40k'
      value="true" 
      onChange={handleChange}
      checked={formData.salaryAbove40k ==='true'} />
      <span>Yes</span>
    </label>
    <label className="flex items-center space-x-1">
      <input type="radio" 
      name='salaryAbove40k'
      value="false" 
      onChange={handleChange}
      checked={formData.salaryAbove40k ==='false'
      } />
      <span>No</span>
    </label>
    </div>
    </fieldset>
    
    {error && (
  <div className="text-red-600 text-sm text-center mb-4">
    {error}
  </div>
)}

        <div className="flex justify-center space-x-6 mt-6">
          <button
            type="button"
            onClick={() => handleSubmit('register')}
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

const Input = ({ label, name, type = 'text', value, onChange,autoComplete }) => {
  const id = `input-${name}`;
  return (
    <div className="flex items-center space-x-4">
      <label htmlFor={id} className="w-42">{label}</label>
      <input
        id={id}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        autoComplete={autoComplete}
        className="flex-1 border rounded px-2 py-1"
      />
    </div>
  );
};


export default Farmers;
