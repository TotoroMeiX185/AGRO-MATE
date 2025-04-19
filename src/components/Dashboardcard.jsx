import React from 'react';

const DashboardCard = ({ title, value, extra }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6 w-full md:w-[22%]">
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <p className="text-3xl font-bold text-blue-600">{value}</p>
      {extra && <div className="text-sm mt-2 text-gray-600">{extra}</div>}
    </div>
  );
};

export default DashboardCard;
