import React, { useState, useEffect } from "react";
import api from "../../api/api";
import "./CCTVPreRegistration.css"; // Create this CSS file for styling

const CCTVPreRegistration = () => {
  const [registrations, setRegistrations] = useState([]);
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
      } catch (err) {
        setError("Failed to fetch CCTV pre-registration data.");
      }
    };

    fetchRegistrations();
  }, []);

  return (
    <div className="cctv-pre-registration-container">
      <h2>CCTV Pre-registration Details</h2>
      {error && <p className="error">{error}</p>}
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
          {registrations.map((registration) => (
            <tr key={registration.id}>
              <td>{registration.id}</td>
              <td>{registration.name}</td>
              <td>{registration.email}</td>
              <td>{registration.address}</td>
              <td>{registration.phone}</td>
              <td>{new Date(registration.created_at).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CCTVPreRegistration;