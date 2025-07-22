import React, { useState, useEffect } from "react";
import api from "../../api/api";
import "./CCTVPreRegistration.css"; // Create this CSS file for styling

const CCTVPreRegistration = () => {
  const [registrations, setRegistrations] = useState([]);
  const [filteredRegistrations, setFilteredRegistrations] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRegistrations = async () => {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        setError("Unauthorized access. Please login as an admin.");
        return;
      }
      try {
        const response = await api.get("/api/cctv/pre-register/", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setRegistrations(response.data);
        setFilteredRegistrations(response.data);
      } catch (err) {
        setError("Failed to fetch CCTV pre-registration data.");
      }
    };

    fetchRegistrations();
  }, []);

  // Filter registrations based on search term
  useEffect(() => {
    const results = registrations.filter(
      (registration) =>
        registration.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        registration.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        registration.address?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        registration.phone?.includes(searchTerm)
    );
    setFilteredRegistrations(results);
  }, [searchTerm, registrations]);

  // Handle CSV export
  const handleExportCSV = async () => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      setError("Unauthorized access. Please login as an admin.");
      return;
    }
    
    try {
      const response = await api.get("/api/cctv/pre-register/export-csv/", {
        headers: { Authorization: `Bearer ${token}` },
        responseType: 'blob',
      });

      // Create a blob URL for the file
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'cctv_preregistrations.csv');
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    } catch (err) {
      setError("Failed to export CSV file.");
    }
  };

  return (
    <div className="cctv-pre-registration-container">
      <div className="header-container">
        <h2>CCTV Pre-registration Details</h2>
        <button 
          onClick={handleExportCSV} 
          className="export-button"
          title="Export to CSV"
        >
          Export to CSV
        </button>
      </div>
      {error && <p className="error">{error}</p>}
      <div className="search-container">
        <input
          type="text"
          placeholder="Search by name, email, address, or phone..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>
      <table className="cctv-pre-registration-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Address</th>
            <th>Phone</th>
            <th>Created At</th>
          </tr>
        </thead>
        <tbody>
          {filteredRegistrations.length === 0 ? (
            <tr>
              <td colSpan="6" className="no-results">No matching records found</td>
            </tr>
          ) : (
            filteredRegistrations.map((registration) => (
            <tr key={registration.id}>
              <td>{registration.id}</td>
              <td>{registration.name}</td>
              <td>{registration.email}</td>
              <td>{registration.address}</td>
              <td>{registration.phone}</td>
              <td>{new Date(registration.created_at).toLocaleString()}</td>
            </tr>
          )))}
        </tbody>
      </table>
    </div>
  );
};

export default CCTVPreRegistration;