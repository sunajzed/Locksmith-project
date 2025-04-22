import React, { useState, useEffect } from "react"; 
import axios from "axios";
import "./LockSmithForm.css";
import { useNavigate } from "react-router-dom";

const MyProfile = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    address: "",
    contact_number: "",
    service_area: "",
    longitude: "",
    latitude: "",
    pcc_file: null,
    license_file: null,
    photo: null,
  });

  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  // Fetch existing form data on component mount
  useEffect(() => {
    const fetchFormData = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        if (!accessToken) {
          throw new Error("No access token found. Please login.");
        }

        const response = await axios.get("http://192.168.1.8:8000/api/locksmiths/locksmithform_val/", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        const data = response.data;
        if (data && (data.address || data.contact_number || data.service_area || data.longitude || data.latitude)) {
          console.log("Fields are already filled, navigating...");
          navigate("/waiting-for-approval", { state: { token: accessToken } });
        } else {
          setFormData({
            address: data.address || "",
            contact_number: data.contact_number || "",
            service_area: data.service_area || "",
            longitude: data.longitude || "",
            latitude: data.latitude || "",
            pcc_file: null,
            license_file: null,
            photo: null,
          });
        }
      } catch (error) {
        console.error("Error fetching form data:", error);
      }
    };

    fetchFormData();
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: files ? files[0] : value, // For file inputs, set the first file
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      if (formData[key]) {
        data.append(key, formData[key]);
      }
    });

    try {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        throw new Error("No access token found. Please login.");
      }

      const response = await axios.put("http://192.168.1.8:8000/locksmith/profile/update/", data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      setMessage("Profile updated successfully!");
      setError(null);
      console.log("Profile updated successfully", response.data);

      // Navigate after updating
      navigate("/waiting-for-approval", { state: { token: accessToken } });

    } catch (error) {
      setError("Error updating profile. Please try again.");
      setMessage(null);
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div className="container locksmith-form">
      <h2 className="text-center mb-4">Locksmith Dashboard</h2>

      {message && <div className="alert alert-success">{message}</div>}
      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="form-group">
          <label>Address</label>
          <input type="text" name="address" value={formData.address} onChange={handleChange} className="form-control" />
        </div>

        <div className="form-group">
          <label>Contact Number</label>
          <input type="text" name="contact_number" value={formData.contact_number} onChange={handleChange} className="form-control" />
        </div>

        <div className="form-group">
          <label>Service Area</label>
          <input type="text" name="service_area" value={formData.serviceArea} onChange={handleChange} className="form-control" />
        </div>

        <div className="form-group">
          <label>Longitude</label>
          <input type="text" name="longitude" value={formData.longitude} onChange={handleChange} className="form-control" />
        </div>

        <div className="form-group">
          <label>Latitude</label>
          <input type="text" name="latitude" value={formData.latitude} onChange={handleChange} className="form-control" />
        </div>

        <div className="form-group">
          <label>PCC File </label>
          <input type="file" name="pcc_file" onChange={handleChange} className="form-control-file" />
        </div>

        <div className="form-group">
          <label>License File </label>
          <input type="file" name="license_file" onChange={handleChange} className="form-control-file" />
        </div>

        <div className="form-group">
          <label>Photo </label>
          <input type="file" name="photo" onChange={handleChange} className="form-control-file" />
        </div>

        <div className="text-center">
          <button type="submit" className="btn btn-primary">Update Profile</button>
        </div>
      </form>
    </div>
  );
};

export default MyProfile;