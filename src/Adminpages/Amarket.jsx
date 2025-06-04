import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';

const AdminMarketPage = () => {
  const [prices, setPrices] = useState([]);
  const [formData, setFormData] = useState({ crop: '', sinhala: '', price: '', category: '' });
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const [lastUpdated, setLastUpdated] = useState('');
  const [category, setCategory] = useState('');

  useEffect(() => {
    fetchPrices();
  }, []);

  const fetchPrices = async () => {
    try {
    const res = await axios.get('/api/market/prices');
    console.log("Fetched prices:", res.data);
    setPrices(res.data);
    if (res.data.length > 0) {
      const lastDate = new Date(res.data[res.data.length - 1].updatedAt);
      setLastUpdated(lastDate.toLocaleString());
    }
  } catch (error) {
    console.error("Failed to fetch prices:", error);
    alert("Failed to fetch prices. Are you logged in as an admin?");
  }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleClear = () => {
    setFormData({ crop: '', sinhala: '', price: '', category: '' });
  };

  const handleSubmit = async () => {

    const { crop, sinhala, price, category } = formData;


    if (!crop || !sinhala || !price || !category) {
    Swal.fire({
      icon: 'warning',
      title: 'Incomplete Fields',
      text: 'Please fill in all fields before submitting.',
    });
    return;
  }

    try{
    const token = localStorage.getItem('token');
    if(!token) {
      alert('No token found. Please log in as an admin.');
      return;
    }

    const existing = prices.find(
      (p) => p.crop.toLowerCase() === formData.crop.toLowerCase());
    
      let change = 0;
    let trend = "stable";

    if (existing) {
      change = Number(formData.price) - Number(existing.price);
      trend = change > 0 ? "up" : change < 0 ? "down" : "stable";
    }

    const newPrice = {
      crop: formData.crop,
      sinhala: formData.sinhala,
      price: Number(formData.price),
      unit: "1 Kg",
      category: formData.category,
      trend,
      change,
    };

    
    await axios.post('/api/market/prices', newPrice, {
      headers:{
        Authorization:`Bearer ${token}`
      }
    });

    toast.success(`Price for ${newPrice.crop} updated successfully!`);
  
    handleClear();
    fetchPrices();

  } catch (error) {
    console.error("Submit failed:", error);
    Swal.fire({
    icon: 'error',
    title: 'Update Failed',
    text: 'Failed to update price. Are you logged in as an admin?',
});

  }
  };

  const handleSearch = () => {

    console.log("Search query:", searchQuery);
    console.log("Prices:", prices);
   
    const found = prices.find((p) => p.crop.trim().toLowerCase() === searchQuery.trim().toLowerCase() || 
    p.sinhala?.trim().toLowerCase() === searchQuery.trim().toLowerCase());
    
    console.log("Found:", found);
    setSearchResult(found || null);

    if (!found) {
    Swal.fire({
      icon: 'info',
      title: 'No Results',
      text: 'No crop found matching your search.',
    });
  }
  };

  const handleExpire = async () => {
    if (!searchResult) return;
    try{
    await axios.put(`/api/market/prices/${searchResult._id}`, { status: 'Expired' });
    fetchPrices();
    setSearchResult(null);
    setSearchQuery('');

    Swal.fire({
      icon: 'success',
      title: 'Marked as Expired',
      text: `${searchResult.crop} price has been marked as expired.`,
    });
  }catch (error) {
    console.error("Expire failed:", error);
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Failed to mark the price as expired.',
    });
  }
  };

  const handleDelete = async () => {
    if (!searchResult) return;

    const confirmResult = await Swal.fire({
    title: 'Are you sure?',
    text: `Do you want to delete ${searchResult.crop}'s price permanently?`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Yes, delete it!'
  });

    if (confirmResult.isConfirmed) {
try{
    await axios.delete(`/api/market/prices/${searchResult._id}`);
    fetchPrices();
    setSearchResult(null);
    setSearchQuery('');

    Swal.fire({
        icon: 'success',
        title: 'Deleted!',
        text: `${searchResult.crop}'s price has been deleted.`,
      });
    } catch (error) {
    console.error("Delete failed:", error);
    Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to delete the price. Please try again.',
      });
    }
  }
  };

  
  return (
    <main className="flex-1 p-8">
      <div className="p-6 max-w-4xl mx-auto bg-white rounded-xl shadow-md space-y-4">
        <h2 className="text-2xl font-bold mb-4 text-center text-primary">Market Price Management</h2>

        {/* Add New Price */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-4">
          <input 
          id='crop'
          name="crop" 
          value={formData.crop} 
          onChange={handleChange} 
          placeholder="Product Name" 
          className="border p-2 rounded-lg border-gray-300"
          />
          <input 
          id='sinhala'
          name="sinhala" 
          value={formData.sinhala} 
          onChange={handleChange} 
          placeholder="Sinhala Name" 
          className="border p-2 rounded-lg border-gray-300" 
          />
          <input 
          id='price'
          name="price" 
          value={formData.price} 
          onChange={handleChange} 
          placeholder="Price (Rs.)" 
          type="number" 
          className="border p-2 rounded-lg border-gray-300" 
          />

          <select 
          name='category'
          value={formData.category || ''}
          className="border p-2 rounded-lg border-gray-300"
          onChange={handleChange}
          >
            <option value=""></option>
            <option value="cashcrops">Cash Crops</option>
            <option value="fruits">Fruits</option>
            <option value="grains">Grains</option>
            <option value="spices">Spices</option>
            </select>

          
          <div className="flex space-x-2">
            <button onClick={handleSubmit} className="bg-blue-600 text-white px-4 py-2 rounded">Update</button>
            <button onClick={handleClear} className="bg-gray-400 text-white px-4 py-2 rounded">Cancel</button>
          </div>
        </div>

        {/* Search Section */}
        <div className="flex items-center space-x-2 mb-4">
          <input
            id='search'
            name='search'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value.toLowerCase())}
            placeholder="Search by Crop Name"
            className="border p-2 flex-1 rounded-lg border-gray-300"
          />
          <button onClick={handleSearch} className="bg-primary text-white px-4 py-2 rounded">Search</button>
        </div>

        {searchResult && (
          <div className="bg-yellow-100 p-4 mb-4 rounded">
            <p><strong>Crop:</strong> {searchResult.crop}</p>
            <p><strong>Price:</strong> Rs. {searchResult.price}</p>
            <p><strong>Trend:</strong> {searchResult.trend}</p>
            <div className="mt-2 space-x-2">
              <button onClick={handleExpire} className="bg-orange-500 text-white px-4 py-1 rounded">Expire</button>
              <button onClick={handleDelete} className="bg-red-500 text-white px-4 py-1 rounded">Delete</button>
            </div>
          </div>
        )}
 
        {/* Last Updated */}
        <p className="text-right text-sm text-gray-500 mt-6">Last updated: {lastUpdated}</p>
      </div>
        <ToastContainer/>
    </main>
  );
};

export default AdminMarketPage;
