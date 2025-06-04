import React, { useState } from "react";
import axios from "axios";
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";


const AdminCropPage = () => {
  const [nic, setNic] = useState("");
  const [crops, setCrops] = useState([]);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    try {
      const response = await axios.get(`/api/crops/${nic}`);
      if (response.data.length === 0) {
        Swal.fire({
        icon: 'info',
        title: 'No Crops Found',
        text: 'No crop records were found for this NIC.',
        confirmButtonColor: '#3085d6'
      });
      setCrops([]);
    } else {
        setCrops(response.data);
         Swal.fire({
        icon: 'success',
        title: 'Crops Found',
        text: `${response.data.length} crop records loaded.`,
        confirmButtonColor: '#28a745'
      });
    }
    setError("");
    } catch (err) {
      Swal.fire({
      icon: 'error',
      title: 'Search Failed',
      text: 'Something went wrong while fetching the data!',
      confirmButtonColor: '#d33'
    });
      setCrops([]);
    }
  };

  const handleDelete = async () => {
    if (!nic){
      Swal.fire({
        icon:'warning',
        title:'Missing NIC',
        text: 'Please enter a NIC to delete.',
        confirmButtonColor: '#3085d6'
      });
      return;
    }

    if (crops.length === 0) {
    Swal.fire({
      icon: 'info',
      title: 'No Crops to Delete',
      text: 'There are no crop records under this NIC.',
      confirmButtonColor: '#3b82f6'
    });
    return;
  }

    const result = await Swal.fire({
    title: 'Are you sure?',
    text: "This will delete all crop data for this farmer!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Yes, delete it!',
    cancelButtonText: 'Cancel',
  });

  if (result.isConfirmed) {
    try {
      await axios.delete(`http://localhost:5000/api/crops/${nic}`);
      setCrops([]);
      setError("");
      Swal.fire({
        icon: 'success',
        title: 'Deleted!',
        text: 'All crop data deleted successfully.',
        confirmButtonColor: '#28a745'
      });
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Failed to delete data. Please try again later.',
        confirmButtonColor: '#d33'
      });
    }
  }
};

  const handleClear = () => {
    setNic("");
    setCrops([]);
    setError("");
  };

  return (
    <>
        <main className="flex-1 p-8 ">
    <div className="p-6 max-w-4xl mx-auto bg-white rounded-xl shadow-md space-y-4">
      <h2 className="text-2xl font-bold text-center " style={{color:'green'}}>Farmer Crop Management</h2>

      <div className="flex flex-col md:flex-row gap-4 items-center">
        <input
         id="nic"
         name="nic"
          type="text"
          placeholder="Enter Farmer NIC"
          value={nic}
          onChange={(e) => setNic(e.target.value)}
          className="p-2 border border-gray-300 rounded w-full md:w-1/2" />
        <button onClick={handleSearch} className="bg-primary text-white px-4 py-2 rounded">
          Search
        </button>
        <button onClick={handleDelete} className="bg-red-500 text-white px-4 py-2 rounded">
          Delete
        </button>
        <button onClick={handleClear} className="bg-yellow-400 text-white px-4 py-2 rounded">
          Clear
        </button>
      </div>

      {error && <div className="text-red-500 text-sm">{error}</div>}

      {crops.length > 0 && (
        <div className="overflow-x-auto">
        <table className="min-w-full border mt-4">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">Crop Name</th>
              <th className="border p-2">Crop Variety</th>
              <th className="border p-2">Season</th>
              <th className="border p-2">Sowing Date</th>
              <th className="border p-2">Expected Harvest Date</th>
              <th className="border p-2">Type of Farming</th>
              <th className="border p-2">Irrigation Method</th>
              <th className="border p-2">Fertilizer Used</th>
              <th className="border p-2">Pesticides Used</th>
              <th className="border p-2">Land Location</th>
              <th className="border p-2">Total Land Area Used</th>
            </tr>
          </thead>
          <tbody>
            {crops.map((crop, index) => (
              <tr key={index}>
                <td className="border p-2">{crop.cropName}</td>
                <td className="border p-2">{crop.cropVariety}</td>
                <td className="border p-2">{crop.season}</td>
                <td className="border p-2">{crop.sowingDate}</td>
                <td className="border p-2">{crop.harvestDate}</td>
                <td className="border p-2">{crop.typeOfFarming}</td>
                <td className="border p-2">{crop.irrigationMethod}</td>
                <td className="border p-2">{crop.fertilizerUsed}</td>
                <td className="border p-2">{crop.pesticidesUsed}</td>
                <td className="border p-2">{crop.landLocation}</td>
                <td className="border p-2">{crop.totalLandUsed}</td>
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

export default AdminCropPage;
