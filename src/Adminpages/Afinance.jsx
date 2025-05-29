import React, { useState } from 'react';
import axios from 'axios';
//import { Button } from '@/components/ui/button';

const AdminFinancePage = () => {
  const [nic, setNic] = useState('');
  const [financeData, setFinanceData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.get(`/api/finance/${nic}`);
      if (response.data) {
        setFinanceData(response.data);
      } else {
        setFinanceData(null);
        setError('No finance data found for this NIC');
      }
    } catch (err) {
      setError('Error fetching finance data');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`/api/finance/${nic}`);
      setFinanceData(null);
      setNic('');
      alert('Finance record deleted successfully.');
    } catch (err) {
      alert('Error deleting finance record.');
    }
  };

  const handleClear = () => {
    setNic('');
    setFinanceData(null);
    setError('');
  };

  return (
    <>
    
        <main className="flex-1 p-8 ">
    <div className="p-6 max-w-4xl mx-auto bg-white rounded-xl shadow-md space-y-4">
      <h2 className="text-xl font-bold mb-4" style={{color:'green', fontWeight:'bold', textAlign:'center',marginTop:'5px'}}>Farmer Finance Management</h2>

      <div className="flex gap-2 mb-4">
        <input
          id='text'
          type="text"
          value={nic}
          onChange={(e) => setNic(e.target.value)}
          placeholder="Enter Farmer NIC"
          className="border p-2 rounded w-full"
        />
         <button onClick={handleSearch} className="bg-primary text-white px-4 py-2 rounded">
          Search
        </button>
        <button onClick={handleDelete} className="bg-red-600 text-white px-4 py-2 rounded">
          Delete
        </button>
        <button onClick={handleClear} className="bg-yellow-400 text-white px-4 py-2 rounded">
          Clear
        </button>
      </div>

      {error && <p className="text-red-500 mb-2">{error}</p>}

      {financeData && (
        <div className="mt-4 border rounded-lg p-4 bg-gray-50 shadow">
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-2 border">Crop Sales (Rs.)</th>
                <th className="p-2 border">Money Subsidies (Rs.)</th>
                <th className="p-2 border">Fertilizer Subsidies (Rs.)</th>
                <th className="p-2 border">Loan (Rs.)</th>
                <th className="p-2 border">Other Incomes (Rs.)</th>
                <th className="p-2 border">Seed Cost (Rs.)</th>
                <th className="p-2 border">Fertilizer Cost (Rs.)</th>
                <th className="p-2 border">Labor Cost (Rs.)</th>
                <th className="p-2 border">Transpotaion Cost (Rs.)</th>
                <th className="p-2 border">Other Expences (Rs.)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-2 border">{financeData.cropSales}</td>
                <td className="p-2 border">{financeData.moneySubsidies}</td>
                <td className="p-2 border">{financeData.fertilizerSubsidies}</td>
                <td className="p-2 border">{financeData.loan}</td>
                <td className="p-2 border">{financeData.otherIncomes}</td>
                <td className="p-2 border">{financeData.seedCost}</td>
                <td className="p-2 border">{financeData.fertilizerCost}</td>
                <td className="p-2 border">{financeData.laborCost}</td>
                <td className="p-2 border">{financeData.transportationCost}</td>
                <td className="p-2 border">{financeData.otherExpenses}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
    </main>

    </>
  );
};

export default AdminFinancePage;
