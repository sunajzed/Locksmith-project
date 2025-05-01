import React, { useState, useEffect } from "react";
import api from '../../api/api';
import "./UserProfile.css";

export default function UserProfile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updatedProfile, setUpdatedProfile] = useState({
    id: "",
    username: "",
    address: "",
    contact_number: "",
    // latitude: "",
    // longitude: "",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("accessToken");

      if (!token) {
        setError("You must be logged in to view your profile.");
        setLoading(false);
        return;
      }

      try {
        const response = await api.get("/api/customer-profile/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (Array.isArray(response.data) && response.data.length > 0) {
          const userData = response.data[0]; 
          setProfile(userData);
          setUpdatedProfile({
            id: userData.id || "",
            username: userData.username || "", 
            address: userData.address || "",
            contact_number: userData.contact_number || "",
            // latitude: userData.latitude || "",
            // longitude: userData.longitude || "",
          });
        } else {
          setError("No profile data found.");
        }
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch profile.");
      }
      setLoading(false);
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setError("");

    const token = localStorage.getItem("accessToken");
    if (!token) {
      setError("You must be logged in to update your profile.");
      return;
    }

    try {
      await api.patch(`/api/customer-profile/${updatedProfile.id}/`, updatedProfile, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      alert("Profile updated successfully!");
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Failed to update profile.";
      setError(errorMessage);
      alert(errorMessage);
    }
  };

  if (loading) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-dark" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return <p className="text-danger text-center">{error}</p>;
  }

  return (
    <div className="profile-container">
      <h2 className="profile-title">Customer Profile</h2>
      <div className="card shadow p-4">
        {error && <p className="profile-error">{error}</p>}

        <form onSubmit={handleUpdate} className="profile-form">
          <div className="mb-3">
            <label><strong>ID:</strong></label>
            <input type="text" name="id" value={updatedProfile.id} readOnly />
          </div>

          <div className="mb-3">
            <label><strong>Username:</strong></label>
            <input type="text" name="username" value={updatedProfile.username} onChange={handleChange} required />
          </div>

          <div className="mb-3">
            <label><strong>Address:</strong></label>
            <input type="text" name="address" value={updatedProfile.address} onChange={handleChange} required />
          </div>

          <div className="mb-3">
            <label><strong>Contact Number:</strong></label>
            <input type="text" name="contact_number" value={updatedProfile.contact_number} onChange={handleChange} required />
          </div>

          {/* <div className="mb-3">
            <label><strong>Latitude:</strong></label>
            <input type="text" name="latitude" value={updatedProfile.latitude} onChange={handleChange} />
          </div>

          <div className="mb-3">
            <label><strong>Longitude:</strong></label>
            <input type="text" name="longitude" value={updatedProfile.longitude} onChange={handleChange} />
          </div> */}

          <button type="submit" className="profile-update-btn">Update Profile</button>
        </form>
      </div>
    </div>
  );
}
