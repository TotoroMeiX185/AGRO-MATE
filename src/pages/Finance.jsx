import React, { useState } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
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
    <Header>
      <Sidebar/>
      <div style={{ padding: 20, maxWidth: 600, margin: 'auto', border: '1px solid #ccc', borderRadius: 8 }}>
              <h3 style={{ textAlign: 'center' }}>FINANCIAL INFORMATION</h3>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  {/* Income Section */}
                  <div>
                      <h4><u>INCOME</u></h4>
                      <div>
                          <label>Crop Sale: </label>
                          <input name="cropSale" value={formData.cropSale} onChange={handleChange} />
                      </div>
                      <div>
                          <label>Money Subsidies (Rs.): </label>
                          <input name="moneySubsidies" value={formData.moneySubsidies} onChange={handleChange} />
                      </div>
                      <div>
                          <label>Fertilizer Subsidies (Kg): </label>
                          <input name="fertilizerSubsidies" value={formData.fertilizerSubsidies} onChange={handleChange} />
                      </div>
                      <div>
                          <label>Loan: </label>
                          <input name="loan" value={formData.loan} onChange={handleChange} />
                      </div>
                      <div>
                          <label>Other Incomes: </label>
                          <input name="otherIncome" value={formData.otherIncome} onChange={handleChange} />
                      </div>
                  </div>

                  {/* Expenses Section */}
                  <div>
                      <h4><u>Expenses</u></h4>
                      <div>
                          <label>Seed Cost: </label>
                          <input name="seedCost" value={formData.seedCost} onChange={handleChange} />
                      </div>
                      <div>
                          <label>Fertilizer Cost: </label>
                          <input name="fertilizerCost" value={formData.fertilizerCost} onChange={handleChange} />
                      </div>
                      <div>
                          <label>Labor Cost: </label>
                          <input name="laborCost" value={formData.laborCost} onChange={handleChange} />
                      </div>
                      <div>
                          <label>Transportation Cost: </label>
                          <input name="transportationCost" value={formData.transportationCost} onChange={handleChange} />
                      </div>
                      <div>
                          <label>Other Expenses: </label>
                          <input name="otherExpenses" value={formData.otherExpenses} onChange={handleChange} />
                      </div>
                  </div>
              </div>

              {/* Buttons */}
              <div style={{ textAlign: 'center', marginTop: 20 }}>
                  <button
                      style={{ backgroundColor: 'green', color: 'white', marginRight: 20, padding: '8px 20px', border: 'none', borderRadius: 5 }}
                      onClick={handleAdd}
                  >
                      Add
                  </button>
                  <button
                      style={{ backgroundColor: 'orange', color: 'white', padding: '8px 20px', border: 'none', borderRadius: 5 }}
                      onClick={handleCancel}
                  >
                      Cancel
                  </button>
              </div>
          </div>
    </Header>
    <Footer/>
    </>
  );
};

export default FinancialInfoForm;
