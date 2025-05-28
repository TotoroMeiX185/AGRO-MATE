import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const CropsForm = ({currentUser}) => {
  const initialState = {
    cropName: '',
    cropVariety: '',
    season: '',
    sowingDate: '',
    harvestDate: '',
    typeOfFarming: '',
    irrigationMethod: '',
    fertilizerUsed: '',
    pesticidesUsed: '',
    landLocation: '',
    totalLandUsed: '',
    farmerId: currentUser?.id
  };

  

  const [formData, setFormData] = useState(initialState);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCancel = () => {
    setFormData(initialState);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const token = localStorage.getItem('token'); // Assuming you store the token in local storage
    try {
      // Replace this URL with your backend API
      const res = await axios.post(
        'http://localhost:5000/api/crops',formData,{
          headers: { 
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
             // Assuming you have a token for authentication
          },
        }
      );

      console.log('Crop addes:', res.data);
      
      Swal.fire({
      icon: 'success',
      title: 'Success!',
      text: 'Crop data added successfully!',
      confirmButtonColor: '#28a745',
    });

    } catch (error) {
      console.error('Error submitting data:', error);
      
      Swal.fire({
      icon: 'error',
      title: 'Submission Failed',
      text: 'Failed to submit crop data. Please try again.',
      confirmButtonColor: '#d33',
    });
      
    }
  };
 
  
  return (
      <>
          <div style={{ maxWidth: '1200px', margin: '0 auto', fontFamily: 'Arial', fontStyle: 'normal', fontSize: '15px', padding: '20px', border: '1px solid #ccc', borderRadius: '8px', 
            marginTop:'10px', marginBottom:'10px'}}>
          
          <div style={{fontSize: '20px', fontWeight: 'bold', textAlign: 'center', marginBottom: '20px', color: 'green'}}>
            <h2 >CROPS INFORMATION</h2> 
            </div>

              <div style={{ display: 'flex', gap: '30px', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                  {/* Basic Crop Information */}
                  <div style={{ flex: 1, fontSize: '16px' }}>
                <div style={{ fontSize:'19px', color:'green', fontWeight:'bold'}}>
                  <h4>Basic Crop Information</h4>
                  </div>
                  <Select
                   label="Crop Name"
                   name="cropName"
                   value={formData.cropName}
                   onChange={handleChange}
                   options={[
                        { value: 'Rice', label: 'Rice' },
                        { value: 'Corn', label: 'Corn' },
                        { value: 'FingerMillet', label: 'Finger Millet' },
                        { value: 'Banana', label: 'Banana' },
                        { value: 'Papaya', label: 'Papaya' },
                        { value: 'Orange', label: 'Orange' },
                        { value: 'Pineapple', label: 'Pineapple' },
                        { value: 'Coconut', label: 'Coconut' },
                        { value: 'Coffee', label: 'Coffee' },
                        { value: 'BlackPepper', label: 'Black Pepper' },
                        { value: 'Mango', label: 'Mango' },
                        { value: 'Other', label: 'Other' },
                              ]}
                  />
                  <br />
                  <Select
                   label="Crop Variety"
                   name="cropVariety"
                   value={formData.cropVariety}
                   onChange={handleChange}
                    options={[
                        { value: 'Grains', label: 'Grains' },
                        { value: 'Fruits', label: 'Fruits' },
                        { value: 'Cashcrops', label: 'Cash Crops' },
                        { value: 'Spices', label: 'Spices' },
                             ]}
                  />
                      <br />

                      <Input label="Season " name="season" value={formData.season} onChange={handleChange} />
                      <br />

                      <Input label="Sowing Date" type='date' name="sowingDate" value={formData.sowingDate} onChange={handleChange} />
                      <br />
                      <Input label="Harvest Date" type='date' name="harvestDate" value={formData.harvestDate} onChange={handleChange} />
                      
                  </div>

                  {/* Cultivation Details */}
                  <div style={{ flex: 1,fontSize: '16px' }}>
                     <div style= {{ fontSize:'19px', color:'green', fontWeight:'bold'}} > <h4>Cultivation Details</h4></div>
                      
                     <Select
                   label="Type of Farming"
                   name="typeOfFarming"
                   value={formData.typeOfFarming}
                     onChange={handleChange}
                    options={[
                        { value: 'horticulture', label: 'Horticulture' },
                        { value: 'plantation', label: 'Plantation' },
                        { value: 'ricefarming', label: 'Rice Farming' },
                             ]}
                  />
                      <br />
                      <Select
                   label="Irrigation Method"
                   name="irrigationMethod"
                   value={formData.irrigationMethod}
                     onChange={handleChange}
                    options={[
                        { value: 'drip', label: 'Drip' },
                        { value: 'sprinkler', label: 'Sprinkler' },
                        { value: 'raine-fed', label: 'Rain-Fed' },
                             ]}
                      />
                      
                      <br />
                      <Select
                   label="Fertilizers Used"
                   name="fertilizersUsed"
                   value={formData.fertilizersUsed}
                     onChange={handleChange}
                    options={[
                        { value: 'organic', label: 'Organic' },
                        { value: 'inorganic', label: 'Inorganic' },
                        { value: 'mixed', label: 'Mixed' },
                             ]}
                      />
                      <br />

                      <Input label="Pesticides Used" name="pesticidesUsed" value={formData.pesticidesUsed} onChange={handleChange} />
                    
                  </div>

                  {/* Land Details */}
                  <div style={{ width: '70%' }}>
                  <div style={{ fontSize:'19px', color:'green', fontWeight:'bold'}}> <h4>Land Details</h4> </div>

                  <Input label="Land Location" name="landLocation" value={formData.landLocation} onChange={handleChange} 
                  style={{ width: '100%' }} />
                 <br />
                 <Input label="Total Land Area Used" name="totalLandUsed" value={formData.totalLandUsed} onChange={handleChange} 
                  style={{ width: '100%' }} />
                
                  </div>
              </div>

              {/* Buttons */}
              <div style={{ marginTop: '20px', textAlign:'center'}}>
                  <button onClick={handleSubmit} style={{ backgroundColor: 'green', color: 'white', 
                    padding: '10px 20px', marginRight: '10px', borderRadius:'5px', fontWeight:'bold' }}>
                      Add
                  </button>
                  <button onClick={handleCancel} style={{ backgroundColor: 'gold', padding: '10px 20px',color:'white',
                    borderRadius:'5px', fontWeight:'bold' }}>
                      Cancel
                  </button>
              </div>
              </div>
          </>
          );
          };
         
          export default CropsForm;

          const Input = ({ label, name, type = 'text', value, onChange }) => (
            <div className="flex items-center space-x-4">
              <label htmlFor={name} className="w-42">{label}</label>
              <input
                id={name}
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                className="flex-1 border rounded px-2 py-1"
              />
            </div>
          );

  const Select = ({ label, name, value, onChange, options = [] }) => (
  <div className="flex items-center space-x-4">
    <label htmlFor={name} className="w-42">{label}</label>
    <select
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      className="flex-1 border rounded px-2 py-1"
    >
      <option value=""></option>
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  </div>
);
