import React, { useState, useEffect } from "react";
import "./ManageLocksmith.css";
import api from "../../api/api";

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
    if (!token) return setError("Unauthorized access. Please login.");

    try {
      await api.put(
        `/api/locksmiths/${id}/verify_locksmith/`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setLocksmiths((prev) =>
        prev.map((l) => (l.id === id ? { ...l, is_approved: true } : l))
      );
    } catch (err) {
      setError(`Failed to approve locksmith with ID: ${id}`);
    }
  };

  const handleReject = async (id) => {
    const token = localStorage.getItem("accessToken");
    if (!token) return setError("Unauthorized access. Please login.");

    try {
      await api.put(
        `/api/locksmiths/${id}/reject_locksmith/`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setLocksmiths((prev) =>
        prev.map((l) => (l.id === id ? { ...l, is_approved: false } : l))
      );
    } catch (err) {
      setError(`Failed to reject locksmith with ID: ${id}`);
    }
  };

  const handleDiscountToggle = async (id) => {
    const token = localStorage.getItem("accessToken");
    if (!token) return setError("Unauthorized access. Please login.");

    const confirmToggle = window.confirm(
      "Are you sure you want to enable the discount for this locksmith?"
    );
    if (!confirmToggle) return;

    try {
      const response = await api.put(
        `/api/locksmiths/${id}/toggle_discount/`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const { is_discounted } = response.data;

      setLocksmiths((prev) =>
        prev.map((l) => (l.id === id ? { ...l, is_discounted } : l))
      );
    } catch (err) {
      setError(`Failed to toggle discount for locksmith ID: ${id}`);
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
            <th>Discount</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {locksmiths.map((l) => (
            <tr key={l.id}>
              <td>{l.id}</td>
              <td>{l.user.username}</td>
              <td>{l.user.email}</td>
              <td>{l.address}</td>
              <td>{l.contact_number}</td>
              <td>
                {l.pcc_file ? (
                  <a href={l.pcc_file} download>
                    Download
                  </a>
                ) : (
                  "No File"
                )}
              </td>
              <td>
                {l.license_file ? (
                  <a href={l.license_file} download>
                    Download
                  </a>
                ) : (
                  "No File"
                )}
              </td>
              <td>
                <img src={l.photo} alt="Locksmith" className="photo" />
              </td>
              <td>{l.service_area || "N/A"}</td>
              <td>{l.is_approved ? "Approved" : "Pending"}</td>
              <td>
                <div
                  title={
                    l.is_approved
                      ? ""
                      : "Approve the locksmith to enable discount toggle"
                  }
                >
                  <label
                    className={`switch ${
                      !l.is_approved ? "disabled-switch" : ""
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={l.is_discounted || false}
                      onChange={() => handleDiscountToggle(l.id)}
                      disabled={!l.is_approved}
                    />
                    <span className="slider round"></span>
                  </label>
                </div>
              </td>

              <td>
                <button
                  className="approve-btn"
                  onClick={() => handleApprove(l.id)}
                  disabled={l.is_approved}
                >
                  Approve
                </button>
                <button
                  className="remove-btn"
                  onClick={() => handleReject(l.id)}
                  disabled={!l.is_approved}
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
