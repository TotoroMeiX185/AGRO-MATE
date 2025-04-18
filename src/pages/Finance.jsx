import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const FinancialInfoForm = () => {
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAdd = async () => {
    try {
      const response = await fetch('https://your-backend-api.com/financial-info', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        alert('Data added successfully!');
        setFormData(initialState);
      } else {
        alert('Failed to add data.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while submitting the data.');
    }
  };

  const handleCancel = () => {
    setFormData(initialState);
  };

  return (
    <>
    <Navbar/> 
      <div style={{ padding: 20, maxWidth: 1200, margin: 'auto', border: '1px solid #ccc', borderRadius: 8, 
        marginTop:'10px', marginBottom:'10px' }}>

        <h3 style={{ textAlign: 'center', fontSize: '20px', fontWeight: 'bold',color:'green' }}>
          FINANCIAL INFORMATION</h3>
          
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  {/* Income Section */}
                  <div>
                   <div style={{fontSize:'16px',fontWeight:'bold',color:'green'}}><h4>Income</h4></div>
                      <div style={{fontSize:'16px'}}>
                      <Input label="Crop Sales (Rs.)" name="cropSales (Rs.)" value={formData.cropSale} onChange={handleChange} />  
                      </div>
                      
                      <div style={{fontSize:'16px'}}>
                      <Input label="Money Subsidies (Rs.)" name="moneySubsidies" value={formData.moneySubsidies} onChange={handleChange} />
                      </div>

                      <div style={{fontSize:'16px'}}>
                      <Input label="Fertilizer Subsidies (Kg)" name="fertilizerSubsidies" value={formData.fertilizerSubsidies} onChange={handleChange} />
                      </div>

                      <div style={{fontSize:'16px'}}>
                      <Input label="Loan (Rs.)" name="loan" value={formData.loan} onChange={handleChange} />
                      </div>
                       
                      <div style={{fontSize:'16px'}}>
                      <Input label="Other Income (Rs.)" name="otherIncome" value={formData.otherIncome} onChange={handleChange} />
                      </div>
                  </div>

                  {/* Expenses Section */}
                  <div>
                    <div style={{fontSize:'16px',fontWeight:'bold',color:'green'}}>  <h4>Expenses</h4> </div>
                      <div style={{fontSize:'16px'}}>
                      <Input label="Seed Cost (Rs.)" name="seedCost" value={formData.seedCost} onChange={handleChange} />
                      </div>

                      <div style={{fontSize:'16px'}}>
                      <Input label="Fertilizer Cost (Rs.)" name="fertilizerCost" value={formData.fertilizerCost} onChange={handleChange} />
                      </div>

                      <div style={{fontSize:'16px'}}>
                      <Input label="Labor Cost (Rs.)" name="laborCost" value={formData.laborCost} onChange={handleChange} />
                      </div>

                      <div style={{fontSize:'16px'}}>
                      <Input label="Transpotation Cost (Rs.)" name="transpotationCost" value={formData.transportationCost} onChange={handleChange} />
                      </div>

                      <div style={{fontSize:'16px'}}>
                      <Input label="Other Expences (Rs.)" name="otherExpences" value={formData.otherExpenses} onChange={handleChange} />
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
    
    <Footer/>
    </>
  );
};

export default FinancialInfoForm;

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