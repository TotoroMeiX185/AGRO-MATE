import React, { useEffect, useState } from 'react';
import Pricetable from '../Acomponents/Pricetable';
import Updatemodal from '../Acomponents/Updatemodal';
import axios from 'axios';


const AdminMarketPage = () => {
  const [prices, setPrices] = useState([]);
  const [selectedPrice, setSelectedPrice] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    fetchPrices();
  }, []);

  const fetchPrices = async () => {
    const res = await axios.get('/api/market/prices');
    setPrices(res.data);
  };

  const handleEdit = (price) => {
    setSelectedPrice(price);
    setModalOpen(true);
  };

  const handleClear = async (id) => {
    await axios.delete(`/api/market/prices/${id}`);
    await axios.post('/api/notifications', {
      message: `Market price entry was removed.`,
    });
    fetchPrices();
  };

  const handleUpdate = async (updatedPrice) => {
    await axios.put(`/api/market/prices/${updatedPrice._id}`, updatedPrice);
    await axios.post('/api/notifications', {
      message: `Price for ${updatedPrice.crop} updated to ₹${updatedPrice.price}`,
    });
    setModalOpen(false);
    fetchPrices();
  };

  return (
    <>
        <main className="flex-1 p-8 ">
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4" style={{color:'green', textAlign:'center'}}>Market Price Management</h2>
      <Pricetable prices={prices} onEdit={handleEdit} onClear={handleClear} />
      {modalOpen && (
        <Updatemodal
          price={selectedPrice}
          onClose={() => setModalOpen(false)}
          onSubmit={handleUpdate} />
      )}
    </div>
    </main>
    </>
  );
};

export default AdminMarketPage;
