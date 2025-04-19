import React, { useState, useEffect } from "react";
import axios from "axios";

const AdminFarmerPage = () => {
  const [searchNIC, setSearchNIC] = useState("");
  const [farmer, setFarmer] = useState(null);
  const [pendingFarmers, setPendingFarmers] = useState([]);
  const [message, setMessage] = useState(""); // New: To show feedback to admin

  useEffect(() => {
    fetchPendingFarmers();
  }, []);

  const fetchPendingFarmers = async () => {
    try {
      const res = await axios.get("/api/farmers/pending");
      setPendingFarmers(res.data);
    } catch (error) {
      console.error("Error fetching pending farmers:", error);
    }
  };

  const searchFarmer = async () => {
    try {
      const res = await axios.get(`/api/farmers/${searchNIC}`);
      setFarmer(res.data);
    } catch (error) {
      alert("Farmer not found");
      setFarmer(null);
    }
  };

  const handleStatusUpdate = async (nic, action) => {
    try {
      await axios.put(`/api/farmers/${nic}/${action}`);
      setPendingFarmers((prev) => prev.filter((f) => f.nic !== nic));

      // Show notification to admin
      if (action === "approve") {
        setMessage(`Farmer ${nic} approved. Notification sent.`);
      } else {
        setMessage(`Farmer ${nic} rejected.`);
      }

      // Clear message after a few seconds
      setTimeout(() => setMessage(""), 4000);
    } catch (error) {
      console.error(`Failed to ${action} farmer`, error);
    }
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Admin Farmer Management</h1>

      {/* Admin confirmation message */}
      {message && (
        <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-800 rounded">
          {message}
        </div>
      )}

      {/* Search Section */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by NIC"
          value={searchNIC}
          onChange={(e) => setSearchNIC(e.target.value)}
          className="border px-3 py-2 rounded mr-2"
        />
        <button
          onClick={searchFarmer}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Search
        </button>
      </div>

      {/* Searched Farmer Table */}
      {farmer && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Farmer Details</h2>
          <table className="w-full border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 border">Full Name</th>
                <th className="p-2 border">NIC</th>
                <th className="p-2 border">DOB</th>
                <th className="p-2 border">Gender</th>
                <th className="p-2 border">Address</th>
                <th className="p-2 border">Telephone Number</th>
                <th className="p-2 border">E mail</th>
                <th className="p-2 border">Province</th>
                <th className="p-2 border">District</th>
                <th className="p-2 border">Village/Division</th>
                <th className="p-2 border">A government employee? (Yes/No)</th>
                <th className="p-2 border">Does salary exceed Rs. 40,000? (Yes/No)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-2 border">{farmer.fullName}</td>
                <td className="p-2 border">{farmer.nic}</td>
                <td className="p-2 border">{farmer.dob}</td>
                <td className="p-2 border">{farmer.gender}</td>
                <td className="p-2 border">{farmer.address}</td>
                <td className="p-2 border">{farmer.phone}</td>
                <td className="p-2 border">{farmer.email}</td>
                <td className="p-2 border">{farmer.province}</td>
                <td className="p-2 border">{farmer.district}</td>
                <td className="p-2 border">{farmer.village}</td>
                <td className="p-2 border">{farmer.isGovEmployee ? "Yes" : "No"}</td>
                <td className="p-2 border">{farmer.salaryAbove40k ? "Yes" : "No"}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {/* Pending Approvals */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Pending Farmer Registrations</h2>
        {pendingFarmers.length === 0 ? (
          <p>No pending requests.</p>
        ) : (
          <table className="w-full border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 border">Name</th>
                <th className="p-2 border">NIC</th>
                <th className="p-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {pendingFarmers.map((f) => (
                <tr key={f.nic}>
                  <td className="p-2 border">{f.name}</td>
                  <td className="p-2 border">{f.nic}</td>
                  <td className="p-2 border space-x-2">
                    <button
                      className="bg-green-500 text-white px-3 py-1 rounded"
                      onClick={() => handleStatusUpdate(f.nic, "approve")}
                    >
                      Approve
                    </button>
                    <button
                      className="bg-red-500 text-white px-3 py-1 rounded"
                      onClick={() => handleStatusUpdate(f.nic, "reject")}
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AdminFarmerPage;
