import React from 'react';

const MarketPricesTable = ({ prices, onEdit, onClear }) => {
  return (
    <table className="w-full border rounded-md">
      <thead className="bg-gray-100">
        <tr>
          <th className="p-2">Crop</th>
          <th className="p-2">Price (₹)</th>
          <th className="p-2">Last Updated</th>
          <th className="p-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {prices.map((item) => (
          <tr key={item._id} className="text-center">
            <td className="p-2">{item.crop}</td>
            <td className="p-2">₹{item.price}</td>
            <td className="p-2">{new Date(item.updatedAt).toLocaleDateString()}</td>
            <td className="p-2">
              <button onClick={() => onEdit(item)} className="px-2 py-1 bg-blue-500 text-white rounded mr-2">
                Edit
              </button>
              <button onClick={() => onClear(item._id)} className="px-2 py-1 bg-red-500 text-white rounded">
                Clear
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default MarketPricesTable;
