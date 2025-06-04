import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useAuth } from '../contexts/AuthContext'; // Adjust the import based on your context structure
import { useEffect } from 'react';


const Finance = () => {

const [profile, setProfile] = useState(null);
const [error, setError] = useState('');
const [loading, setLoading] = useState(true);
const [disableSubsidies, setDisableSubsidies] = useState(false);
const [income, setIncome] = useState(null);
const [expense, setExpense] = useState(null);


const initialState = {
    cropSale: '',
    moneySubsidies: '',
    fertilizerSubsidies: '',
    loan: '',
    otherIncome: '',
    seedCost: '',
    fertilizerCost: '',
    laborCost: '',
    transportationCost: '',
    otherExpenses: ''
  };

  const [formData, setFormData] = useState(initialState);



useEffect(() => {
  const fetchFarmerProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get('http://localhost:5000/api/farmer/profile', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
       setProfile(res.data);
      console.log('Farmer profile:', res.data);

      // Determine if fields should be disabled
                       
   // Use res.data, not profile (which is not updated yet)
      setDisableSubsidies(
        res.data.isGovEmployee === true && res.data.salaryAbove40k === true
      );
      
    } catch (error) {
      console.error('Error fetching farmer profile:', error);
      setError("Failed to load profile")
    } finally {
      setLoading(false);
    }
  };

  const fetchFinanceSummary = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:5000/api/finance/latest', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setIncome(res.data.income);
        setExpense(res.data.expense);
      } catch (err) {
        console.error("Failed to fetch latest finance data", err);
      }
    };
  fetchFarmerProfile();
  fetchFinanceSummary();
}, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAdd = async () => {


    
    // Simple validation: check required fields
  if (!formData.cropSale || 
    !formData.seedCost || 
    !formData.fertilizerCost || 
    !formData.laborCost || 
    !formData.transportationCost || 
    !formData.otherExpenses || 
    !formData.loan || 
    //!formData.moneySubsidies|| 
    //!formData.fertilizerSubsidies || 
    !formData.otherIncome ||
    (!disableSubsidies && (!formData.moneySubsidies || !formData.fertilizerSubsidies))
  ) {
    Swal.fire({
      icon: 'warning',
      title: 'Incomplete Form',
      text: 'Please fill in all required fields before submitting.',
      confirmButtonColor: '#f0ad4e',
      background: '#fff8e1',
    });
    return;
  }
  // Optionally, check for valid numbers
  const numberFields = [
    'cropSale', 'moneySubsidies', 'fertilizerSubsidies', 'loan', 'otherIncome',
    'seedCost', 'fertilizerCost', 'laborCost', 'transportationCost', 'otherExpenses'
  ];
  for (let field of numberFields) {
    if (formData[field] && isNaN(Number(formData[field]))) {
      alert(`Please enter a valid number for ${field.replace(/([A-Z])/g, ' $1')}.`);
      return;
    }
  }

    try {
      const token = localStorage.getItem('token');
      console.log('Token from localStorage:', token);

    if (!token) {
    console.error('No token found in localStorage!');
    return;
    }

const {
      cropSale,
      moneySubsidies,
      fertilizerSubsidies,
      loan,
      otherIncome,
      seedCost,
      fertilizerCost,
      laborCost,
      transportationCost,
      otherExpenses
    } = formData;

     const toNumber = (val) => {
      const num = parseFloat(val);
      return isNaN(num) ? 0 : num;
    };

      const res = await axios.post('http://localhost:5000/api/finance', 
         {
        cropSale: toNumber(cropSale),
        moneySubsidies: toNumber(moneySubsidies),
        fertilizerSubsidies: toNumber(fertilizerSubsidies),
        loan: toNumber(loan),
        otherIncome: toNumber(otherIncome),
        seedCost: toNumber(seedCost),
        fertilizerCost: toNumber(fertilizerCost),
        laborCost: toNumber(laborCost),
        transportationCost: toNumber(transportationCost),
        otherExpenses: toNumber(otherExpenses),
      }, 
        {
        headers: {
          'Authorization': `Bearer ${token}`,
          //'Content-Type': 'application/json'
        },
        
      });

      Swal.fire({
      icon: 'success',
      title: 'Success!',
      text: 'Finance data added successfully!',
      confirmButtonColor: '#28a745',
    });
      setFormData(initialState);
    } catch (error) {
      console.error('Error:', error);
      Swal.fire({
      icon: 'error',
      title: 'Submission Failed',
      text: 'An error occurred while submitting the data.',
      confirmButtonColor: '#d33',
    });
      
    }
  };

  const handleCancel = () => {
    setFormData(initialState);
  };

  return (
    <>
      <main className="flex-1 p-8 ">
      <div style={{ padding: 20, maxWidth: 1200, margin: 'auto', border: '1px solid #ccc', borderRadius: 8, 
        marginTop:'10px', marginBottom:'10px' }}>

        <h3 style={{ textAlign: 'center', fontSize: '25px', fontWeight: 'bold',color:'green' }}>
          FINANCIAL INFORMATION</h3>
          
              <div style={{ display: 'flex', flexWrap:'wrap',gap:30, justifyContent: 'space-between', paddingTop:'40px' }}>
                  {/* Income Section */}
                  <div>
                   <div style={{fontSize:'20px',fontWeight:'bold',color:'green'}}><h4>Income</h4></div>
                      <div className='mb-4'style={{fontSize:'16px'}}>
                      <Input 
                      type='number'
                      label="Crop Sales (Rs.)" 
                      name="cropSale" 
                      value={formData.cropSale} 
                      onChange={handleChange} />  
                      </div>
                      
                      <div className='mb-4'style={{fontSize:'16px'}}>
                      <Input 
                      type='number'
                      label="Money Subsidies (Rs.)" 
                      name="moneySubsidies" 
                      value={formData.moneySubsidies} 
                      onChange={handleChange} 
                      disabled={disableSubsidies} 
                      />
                      </div>

                      <div className='mb-4'style={{fontSize:'16px'}}>
                      <Input 
                      type='number'
                      label="Fertilizer Subsidies (Kg)" 
                      name="fertilizerSubsidies" 
                      value={formData.fertilizerSubsidies} 
                      onChange={handleChange} 
                      disabled={disableSubsidies} />
                      </div>

                      <div className='mb-4' style={{fontSize:'16px'}}>
                      <Input 
                      type='number'
                      label="Loan (Rs.)" 
                      name="loan" 
                      value={formData.loan} 
                      onChange={ handleChange} />
                      </div>
                       
                      <div className='mb-4'  style={{fontSize:'16px'}}>
                      <Input 
                      type='number'
                      label="Other Income (Rs.)" 
                      name="otherIncome" 
                      value={formData.otherIncome} 
                      onChange={ handleChange} />
                      </div>
                  </div>

                  {/* Expenses Section */}
                  <div>
                    <div style={{fontSize:'20px',fontWeight:'bold',color:'green'}}>  <h4>Expenses</h4> </div>
                      <div className='mb-4'  style={{fontSize:'16px'}}>
                      <Input 
                      type='number'
                      label="Seed Cost (Rs.)" 
                      name="seedCost" 
                      value={formData.seedCost} 
                      onChange={ handleChange} />
                      </div>

                      <div className='mb-4'  style={{fontSize:'16px'}}>
                      <Input
                      type='number' 
                      label="Fertilizer Cost (Rs.)" 
                      name="fertilizerCost" 
                      value={formData.fertilizerCost} 
                      onChange={ handleChange} />
                      </div>

                      <div className='mb-4'  style={{fontSize:'16px'}}>
                      <Input 
                      type='number'
                      label="Labor Cost (Rs.)" 
                      name="laborCost" 
                      value={formData.laborCost} 
                      onChange={handleChange} />
                      </div>

                      <div className='mb-4'  style={{fontSize:'16px'}}>
                      <Input 
                      type='number'
                      label="Transportation Cost (Rs.)" 
                      name="transportationCost" 
                      value={formData.transportationCost} 
                      onChange={ handleChange} />
                      </div>

                      <div className='mb-4'  style={{fontSize:'16px'}}>
                      <Input 
                      type='number'
                      label="Other Expenses (Rs.)" 
                      name="otherExpenses" 
                      value={formData.otherExpenses} 
                      onChange={ handleChange} />
                      </div>
                  </div>
              </div>

              {/* Buttons */}
              <div style={{ textAlign: 'center', marginTop: 20 }}>
                  <button
                      style={{ backgroundColor: 'green', color: 'white', marginRight: 20, padding: '8px 20px', border: 'none', 
                        borderRadius: 5 , fontWeight:'bold' }}
                      onClick={handleAdd}
                  >
                      Add
                  </button>
                  <button
                      style={{ backgroundColor: 'orange', color: 'white', padding: '8px 20px', border: 'none', 
                        borderRadius: 5 , fontWeight:'bold'}}
                      onClick={handleCancel}
                  >
                      Cancel
                  </button>
              </div>
          </div>
          </main>
    </>
  );
};

export default Finance;

const Input = ({ label, name, type = 'text', value, onChange, disabled }) => (
  <div className="flex items-center space-x-4">
    <label htmlFor={name} className="w-42">{label}</label>
    <input
      id={name}
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      disabled={disabled}
      className="flex-1 border rounded px-2 py-1 "
    />
  </div>
);