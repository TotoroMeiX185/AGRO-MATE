import React, { useState } from 'react';

const PriceUpdateModal = ({ price, onClose, onSubmit }) => {
  const [newPrice, setNewPrice] = useState(price.price);

  const handleSubmit = () => {
    onSubmit({ ...price, price: newPrice });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 w-96 shadow-lg">
        <h3 className="text-xl font-semibold mb-4">Update Price for {price.crop}</h3>
        <input
          type="number"
          value={newPrice}
          onChange={(e) => setNewPrice(e.target.value)}
          className="w-full border p-2 mb-4"
        />
        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">Cancel</button>
          <button onClick={handleSubmit} className="px-4 py-2 bg-green-600 text-white rounded">Update</button>
        </div>
      </div>
    </div>
  );
};

export default PriceUpdateModal;
