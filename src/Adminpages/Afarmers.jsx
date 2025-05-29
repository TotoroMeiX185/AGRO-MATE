import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const AdminFarmerPage = () => {
  const [searchNIC, setSearchNIC] = useState("");
  const [farmer, setFarmer] = useState(null);
  const [pendingFarmers, setPendingFarmers] = useState([]);
  const [message, setMessage] = useState(""); // New: To show feedback to admin
  const [searchError, setSearchError] = useState("");

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

    if (!searchNIC || searchNIC.trim() === '') {
    Swal.fire({
      icon: 'warning',
      title: 'Empty Search',
      text: 'Please enter a NIC number before searching.',
      confirmButtonColor: '#f0ad4e',
      background: '#fffbea',
    });
    return;
  }

    try {
      const res = await axios.get(`/api/farmers/${searchNIC}`);
      setFarmer(res.data);
  
    } catch (error) {
       Swal.fire({
      icon: 'error',
      title: 'Search Failed',
      text: `No farmer found with NIC ${searchNIC}.`,
      confirmButtonColor: '#d33',
    });
      setFarmer(null);
    }
  };

 const clearSearch = () => {
    setSearchNIC("");
    setFarmer(null);
  };

  const deleteFarmer = async () => {

    if (!farmer) {
    // Show colorful error message if no farmer is selected
    Swal.fire({
      icon: 'warning',
      title: 'No Farmer Selected',
      text: 'Please search and select a farmer before attempting to delete.',
      confirmButtonColor: '#f27474',
    });
    return;
  }
  
  const result = await Swal.fire({
    title: 'Are you sure?',
    text: `Do you want to delete farmer ${farmer.fullName} 
    (${farmer.nic})?`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Yes, delete it!'
  });

  if (result.isConfirmed) {
  try {
    await axios.delete(`/api/farmers/${farmer.nic}`);
    setFarmer(null); // clear the table

    await Swal.fire(
      'Deleted!',
      `Farmer ${farmer.fullName} has been deleted.`,
      'success'
    );
  } catch (error) {
    console.error("Error deleting farmer:", error);
    await Swal.fire(
      'Error!',
      'Failed to delete the farmer. Please try again.',
      'error'
    );
  }
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
    <>

          <main className="flex-1 p-8 ">
    <div className="p-6 max-w-4xl mx-auto bg-white rounded-xl shadow-md space-y-4">
      <h1 className="text-2xl font-bold mb-4 text-primary text-center">Farmer Management</h1>

      {/* Admin confirmation message */}
      {message && (
        <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-800 rounded">
          {message}
        </div>
      )}

      {/* Search Section */}
      <div className="mb-6 space-y-4">

      {searchError && (
      <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-800 rounded">
       {searchError}
         </div>
             )}

        <input
          type="text"
          name = "nic"
          id="nic"
          placeholder="Search by NIC"
          value={searchNIC}
          onChange={(e) => setSearchNIC(e.target.value)}
          className="border px-3 py-2 rounded mr-2" 
          />
          <div className="inline-flex gap-2">
        <button
          onClick={searchFarmer}
          className="bg-primary text-white px-4 py-2 rounded"
          style={{textAlign:"right"}}
        >
          Search
        </button> 
        <button
          onClick={clearSearch}
          className="bg-yellow-400 text-white px-4 py-2 rounded"
          style={{textAlign:"right"}}
        >
          Clear
        </button> 
        <button
    onClick={deleteFarmer}
    className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
  >
    Delete
  </button>
        </div>
      </div>

      {/* Searched Farmer Table */}
      {farmer && (
        <div className="mb-8 overflow-auto">
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
        <h2 className="text-xl font-semibold mb-2"
            style={{fontSize:'20px',color:'green', fontWeight:'bold'}}>
              Pending Farmer Registrations</h2>
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
    <div/>
  </main>
    
    </>
  );
};

export default AdminFarmerPage;
