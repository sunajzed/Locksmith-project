import React, { useState, useEffect } from "react";
import "./ManageLocksmith.css";
import api from '../../api/api';


const ManageLocksmith = () => {
  const [locksmiths, setLocksmiths] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchLocksmiths = async () => {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        setError("Unauthorized access. Please login as an admin.");
        return;
      }
      try {
        const response = await api.get("/api/locksmiths/", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setLocksmiths(response.data);
      } catch (err) {
        setError("Failed to fetch locksmiths.");
      }
    };

    fetchLocksmiths();
  }, []);

  const handleApprove = async (id) => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      setError("Unauthorized access. Please login as an admin.");
      return;
    }

    try {
      await api.put(`/api/locksmiths/${id}/verify_locksmith/`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Update state to reflect approval instantly
      setLocksmiths((prevLocksmiths) =>
        prevLocksmiths.map((locksmith) =>
          locksmith.id === id ? { ...locksmith, is_approved: true } : locksmith
        )
      );
    } catch (err) {
      setError(`Failed to approve locksmith with ID: ${id}`);
    }
  };

  const handleReject = async (id) => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      setError("Unauthorized access. Please login as an admin.");
      return;
    }

    try {
      await api.put(`/api/locksmiths/${id}/reject_locksmith/`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Update state to reflect rejection instantly
      setLocksmiths((prevLocksmiths) =>
        prevLocksmiths.map((locksmith) =>
          locksmith.id === id ? { ...locksmith, is_approved: false } : locksmith
        )
      );
    } catch (err) {
      setError(`Failed to reject locksmith with ID: ${id}`);
    }
  };

  return (
    <div className="locksmith-container">
      <h2>Locksmith Details</h2>
      {error && <p className="error">{error}</p>}
      <table className="locksmith-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Email</th>
            <th>Address</th>
            <th>Contact No</th>
            <th>PCC File</th>
            <th>Licence File</th>
            <th>Photo</th>
            <th>Service Area</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {locksmiths.map((locksmith) => (
            <tr key={locksmith.id}>
              <td>{locksmith.id}</td>
              <td>{locksmith.user.username}</td>
              <td>{locksmith.user.email}</td>
              <td>{locksmith.address}</td>
              <td>{locksmith.contact_number}</td>
              <td>
                {locksmith.pcc_file ? (
                  <a href={locksmith.pcc_file} download>Download</a>
                ) : (
                  "No File"
                )}
              </td>
              <td>
                {locksmith.license_file ? (
                  <a href={locksmith.license_file} download>Download</a>
                ) : (
                  "No File"
                )}
              </td>
              <td>
                <img src={locksmith.photo} alt="Locksmith" className="photo" />
              </td>
              <td>{locksmith.service_area || "N/A"}</td>
              <td>{locksmith.is_approved ? "Approved" : "Pending"}</td>
              <td>
                <button
                  className="approve-btn"
                  onClick={() => handleApprove(locksmith.id)}
                  disabled={locksmith.is_approved}
                >
                  Approve
                </button>
                <button
                  className="remove-btn"
                  onClick={() => handleReject(locksmith.id)}
                  disabled={!locksmith.is_approved}
                >
                  Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageLocksmith;

