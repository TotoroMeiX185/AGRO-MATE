import { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

//import { Button } from '@/components/ui/button';

const AdminFinancePage = () => {
  const [nic, setNic] = useState('');
  const [financeData, setFinanceData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    try {
      setLoading(true);
      setError(null);
    const token = localStorage.getItem('token');

      const res = await axios.get(`/api/finance/${nic}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (res.data && res.data.length > 0) {
        setFinanceData(res.data);
      } else {
        setFinanceData([]);
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
      const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'This will permanently delete the finance record!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    });
      if (result.isConfirmed) {
      await axios.delete(`/api/finance/${nic}`);
      setFinanceData(null);
      setNic('');

      Swal.fire({
        title: 'Deleted!',
        text: 'Finance record has been deleted.',
        icon: 'success',
        timer: 2000,
        showConfirmButton: false,
      });
    }

    } catch (err) {
       Swal.fire({
      title: 'Error!',
      text: 'There was a problem deleting the finance record.',
      icon: 'error',
      confirmButtonText: 'OK'
    });
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
      <h2 className="text-2xl font-bold mb-4" style={{color:'green', fontWeight:'bold', textAlign:'center',marginTop:'5px'}}>Farmer Finance Management</h2>

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
        <div className="mt-4 rounded-lg p-4 overflow-scroll">
          <table className="w-full table-auto border-collapse ">
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
                <th className="p-2 border">Transpotation Cost (Rs.)</th>
                <th className="p-2 border">Other Expenses (Rs.)</th>
              </tr>
            </thead>
            <tbody>
              {financeData.map((item, index)=> (
                <tr key={index}>
                  <td className="p-2 border">{item.cropSale }</td>
                  <td className="p-2 border">{item.moneySubsidies}</td>
                  <td className="p-2 border">{item.fertilizerSubsidies}</td>
                  <td className="p-2 border">{item.loan}</td>
                  <td className="p-2 border">{item.otherIncome}</td>
                  <td className="p-2 border">{item.seedCost}</td>
                  <td className="p-2 border">{item.fertilizerCost}</td>
                  <td className="p-2 border">{item.laborCost}</td>
                  <td className="p-2 border">{item.transportationCost}</td>
                  <td className="p-2 border">{item.otherExpenses}</td>
                </tr>
              ))}
              
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
