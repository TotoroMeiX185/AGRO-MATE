import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useAuth } from '../contexts/AuthContext';

const CropsForm = () => {
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
    totalLandUsed: ''
  };

  

  const [formData, setFormData] = useState(initialState);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCancel = () => {
    setFormData(initialState);
  };

  const handleSubmit = async () => {
    try {
      // Replace this URL with your backend API
      const response = await fetch('https://your-backend-api.com/crops', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        alert('Crop information added successfully!');
        setFormData(initialState);
      } else {
        alert('Failed to add crop information');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error submitting data');
    }
  };
  const [cropname, setCropname] = useState('');
  const [cropVariety, setCropVariety] = useState('');
  const [typeOfFarming, setTypeofFarming] = useState('');
  const [irrigationMethod, setIrrigationMethod] = useState('');
  const [fertilizersUsed, setFertilizersUsed] = useState(' ');
  //const { currentUser } = useAuth();


  return (
      <>
      <Navbar/>
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
                   name="cropname"
                   value={formData.cropname}
                     onChange={(e) =>setCropname (e.target.value)}
                    options={[
                        { value: 'rice', label: 'Rice' },
                        { value: 'corn', label: 'Corn' },
                        { value: 'fingerMillet', label: 'Finger Millet' },
                        { value: 'corn', label: 'Corn' },
                        { value: 'banana', label: 'Banana' },
                        { value: 'papaya', label: 'Papaya' },
                        { value: 'orange', label: 'Orange' },
                        { value: 'pineapple', label: 'Pineapple' },
                        { value: 'coconut', label: 'Coconut' },
                        { value: 'coffee', label: 'Coffee' },
                        { value: 'blackPepper', label: 'Black Pepper' },
                        { value: 'mango', label: 'Mango' },
                        { value: 'other', label: 'Other' },
                              ]}
                  />
                  <br />
                  <Select
                   label="Crop Variety"
                   name="cropVariety"
                   value={formData.cropVariety}
                   onChange={(e) => setCropVariety(e.target.value)}
                    options={[
                        { value: 'grains', label: 'Grains' },
                        { value: 'fruits', label: 'Fruits' },
                        { value: 'cashcrops', label: 'Cash Crops' },
                        { value: 'spices', label: 'Spices' },
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
                     onChange={(e) => setTypeofFarming(e.target.value)}
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
                     onChange={(e) =>setIrrigationMethod(e.target.value)}
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
                   value={formData.fertilizerUsed}
                     onChange={(e) =>setFertilizersUsed(e.target.value)}
                    options={[
                        { value: 'organic', label: 'Organic' },
                        { value: 'inorganic', label: 'Sprinkler' },
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
        
      
          <Footer/>
          </>
          );
          };
         
          export default CropsForm;

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

  const Select = ({ label, name, value, onChange, options = [] }) => (
  <div className="flex items-center space-x-4">
    <label className="w-42">{label}</label>
    <select
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
