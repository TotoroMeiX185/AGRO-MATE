import React, { useState } from "react";
import axios from "axios";

const AdminCropPage = () => {
  const [nic, setNic] = useState("");
  const [crops, setCrops] = useState([]);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    try {
      const response = await axios.get(`/api/crops/${nic}`);
      setCrops(response.data);
      setError("");
    } catch (err) {
      setError("No data found or something went wrong.");
      setCrops([]);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`/api/crops/${nic}`);
      setCrops([]);
      setError("");
      alert("Crop data deleted successfully.");
    } catch (err) {
      setError("Failed to delete data.");
    }
  };

  const handleClear = () => {
    setNic("");
    setCrops([]);
    setError("");
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white rounded-xl shadow-md space-y-4">
      <h2 className="text-2xl font-bold text-center">Farmer Crop Management</h2>

      <div className="flex flex-col md:flex-row gap-4 items-center">
        <input
          type="text"
          placeholder="Enter Farmer NIC"
          value={nic}
          onChange={(e) => setNic(e.target.value)}
          className="p-2 border border-gray-300 rounded w-full md:w-1/2"
        />
        <button onClick={handleSearch} className="bg-blue-600 text-white px-4 py-2 rounded">
          Search
        </button>
        <button onClick={handleDelete} className="bg-red-600 text-white px-4 py-2 rounded">
          Delete
        </button>
        <button onClick={handleClear} className="bg-gray-400 text-white px-4 py-2 rounded">
          Clear
        </button>
      </div>

      {error && <div className="text-red-500 text-sm">{error}</div>}

      {crops.length > 0 && (
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
                <td className="border p-2">{crop.cropname}</td>
                <td className="border p-2">{crop.cropVariety}</td>
                <td className="border p-2">{crop.season}</td>
                <td className="border p-2">{crop.sowingDate}</td>
                <td className="border p-2">{crop.harvestDate}</td>
                <td className="border p-2">{crop.typeOfFarming}</td>
                <td className="border p-2">{crop.irrigationMethod}</td>
                <td className="border p-2">{crop.fertilizersUsed}</td>
                <td className="border p-2">{crop.pesticidesUsed}</td>
                <td className="border p-2">{crop.landLocation}</td>
                <td className="border p-2">{crop.totalLandUsed}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminCropPage;
