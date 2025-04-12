import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

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

  return (
      <><Header>
        <Sidebar />
        

          <div style={{ maxWidth: '700px', margin: '0 auto', fontFamily: 'Arial' }}>
              <h2>CROPS INFORMATION</h2>
              <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                  {/* Basic Crop Information */}
                  <div style={{ flex: 1 }}>
                      <h4>Basic Crop Information</h4>
                      <select name="cropName" value={formData.cropName} onChange={handleChange}>
                          <option value="">Crop Name</option>
                          {['Rice', 'Corn', 'Finger Millet', 'Banana', 'Papaya', 'Orange', 'Pineapple', 'Coconut', 'Coffee', 'Black Pepper', 'Mango'].map((name) => (
                              <option key={name}>{name}</option>
                          ))}
                      </select>
                      <br />
                      <select name="cropVariety" value={formData.cropVariety} onChange={handleChange}>
                          <option value="">Crop Variety</option>
                          {['Grains', 'Fruits', 'Cash Crops', 'Spices'].map((variety) => (
                              <option key={variety}>{variety}</option>
                          ))}
                      </select>
                      <br />
                      <input type="text" name="season" placeholder="Season" value={formData.season} onChange={handleChange} />
                      <br />
                      <input type="date" name="sowingDate" value={formData.sowingDate} onChange={handleChange} />
                      <br />
                      <input type="date" name="harvestDate" value={formData.harvestDate} onChange={handleChange} />
                  </div>

                  {/* Cultivation Details */}
                  <div style={{ flex: 1 }}>
                      <h4>Cultivation Details</h4>
                      <select name="typeOfFarming" value={formData.typeOfFarming} onChange={handleChange}>
                          <option value="">Type of Farming</option>
                          {['Horticulture', 'Plantation crops', 'Rice Farming'].map((type) => (
                              <option key={type}>{type}</option>
                          ))}
                      </select>
                      <br />
                      <select name="irrigationMethod" value={formData.irrigationMethod} onChange={handleChange}>
                          <option value="">Irrigation Methods</option>
                          {['Drip', 'Sprinkler', 'Rain-fed'].map((method) => (
                              <option key={method}>{method}</option>
                          ))}
                      </select>
                      <br />
                      <select name="fertilizerUsed" value={formData.fertilizerUsed} onChange={handleChange}>
                          <option value="">Fertilizer Used</option>
                          {['Organic', 'Inorganic', 'Mixed'].map((fertilizer) => (
                              <option key={fertilizer}>{fertilizer}</option>
                          ))}
                      </select>
                      <br />
                      <input type="text" name="pesticidesUsed" placeholder="Pesticides Used" value={formData.pesticidesUsed} onChange={handleChange} />
                  </div>

                  {/* Land Details */}
                  <div style={{ width: '100%' }}>
                      <h4>Land Details</h4>
                      <input type="text" name="landLocation" placeholder="Land Location" value={formData.landLocation} onChange={handleChange} style={{ width: '100%' }} />
                      <br />
                      <input type="text" name="totalLandUsed" placeholder="Total Land Area Used" value={formData.totalLandUsed} onChange={handleChange} style={{ width: '100%' }} />
                  </div>
              </div>

              {/* Buttons */}
              <div style={{ marginTop: '20px' }}>
                  <button onClick={handleSubmit} style={{ backgroundColor: 'green', color: 'white', padding: '10px 20px', marginRight: '10px' }}>
                      Add
                  </button>
                  <button onClick={handleCancel} style={{ backgroundColor: 'gold', padding: '10px 20px' }}>
                      Cancel
                  </button>
              </div>
          </div>
          </Header>
          </>
          );
          };
         
          export default CropsForm;
      
