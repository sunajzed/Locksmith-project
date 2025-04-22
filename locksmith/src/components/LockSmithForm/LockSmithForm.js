
// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import "./LockSmithForm.css";
// import api from "../../api/api";

// const LockSmithForm = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     address: "",
//     contact_number: "",
//     service_area: "",
//     longitude: "",
//     latitude: "",
//     pcc_file: null,
//     license_file: null,
//     photo: null,
//   });

//   const [message, setMessage] = useState(null);
//   const [error, setError] = useState(null);
//   const [fileError, setFileError] = useState(null);

//   useEffect(() => {
//     const accessToken = localStorage.getItem("accessToken");
//     const userRole = localStorage.getItem("userRole");

//     if (!accessToken || userRole !== "locksmith") {
//       navigate("/login?role=locksmith");
//       return;
//     }

//     const fetchFormData = async () => {
//       try {
//         const response = await api.get("api/locksmiths/locksmithform_val/", {
//           headers: { Authorization: `Bearer ${accessToken}` },
//         });

//         const data = response.data;
//         if (data && (data.address || data.contact_number || data.service_area)) {
//           navigate("/waiting-for-approval", { state: { token: accessToken } });
//         } else {
//           setFormData({
//             address: data.address || "",
//             contact_number: data.contact_number || "",
//             service_area: data.service_area || "",
//             longitude: data.longitude || "",
//             latitude: data.latitude || "",
//             pcc_file: null,
//             license_file: null,
//             photo: null,
//           });
//         }
//       } catch (error) {
//         console.error("Error fetching form data:", error);
//       }
//     };

//     fetchFormData();
//   }, [navigate]);

//   const handleChange = (e) => {
//     const { name, value, files } = e.target;

//     if (files) {
//       const file = files[0];
//       if (file && file.size > 150 * 1024) {
//         setFileError("File size should be less than 150KB.");
//         return;
//       } else {
//         setFileError(null);
//       }
//     }

//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: files ? files[0] : value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (fileError) return;

//     const data = new FormData();
//     Object.keys(formData).forEach((key) => {
//       if (formData[key]) {
//         data.append(key, formData[key]);
//       }
//     });

//     try {
//       const accessToken = localStorage.getItem("accessToken");
//       if (!accessToken) {
//         throw new Error("No access token found. Please login.");
//       }

//       await api.post("/locksmith/profile/update/", data, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//           Authorization: `Bearer ${accessToken}`,
//         },
//       });

//       setMessage("Profile updated successfully!");
//       setError(null);
//       navigate("/waiting-for-approval", { state: { token: accessToken } });
//     } catch (error) {
//       setError("Error updating profile. Please try again.");
//       setMessage(null);
//       console.error("Error updating profile:", error);
//     }
//   };

//   return (
//     <div className="container locksmith-form">
//       <h2 className="text-center mb-4">Locksmith Dashboard</h2>

//       {message && <div className="alert alert-success">{message}</div>}
//       {error && <div className="alert alert-danger">{error}</div>}
//       {fileError && <div className="alert alert-warning">{fileError}</div>}

//       <form onSubmit={handleSubmit} encType="multipart/form-data">
//         <div className="form-group">
//           <label>Address</label>
//           <input type="text" name="address" value={formData.address} onChange={handleChange} className="form-control" />
//         </div>

//         <div className="form-group">
//           <label>Contact Number</label>
//           <input type="text" name="contact_number" value={formData.contact_number} onChange={handleChange} className="form-control" />
//         </div>

//         <div className="form-group">
//           <label>Service Area</label>
//           <input type="text" name="service_area" value={formData.service_area} onChange={handleChange} className="form-control" />
//         </div>

//         <div className="form-group">
//           <label>Longitude</label>
//           <input type="text" name="longitude" value={formData.longitude} onChange={handleChange} className="form-control" />
//         </div>

//         <div className="form-group">
//           <label>Latitude</label>
//           <input type="text" name="latitude" value={formData.latitude} onChange={handleChange} className="form-control" />
//         </div>

//         <div className="form-group">
//           <label>PCC File (Max 150KB)</label>
//           <input type="file" name="pcc_file" onChange={handleChange} className="form-control-file" />
//         </div>

//         <div className="form-group">
//           <label>License File (Max 150KB)</label>
//           <input type="file" name="license_file" onChange={handleChange} className="form-control-file" />
//         </div>

//         <div className="form-group">
//           <label>Photo (Max 150KB)</label>
//           <input type="file" name="photo" onChange={handleChange} className="form-control-file" />
//         </div>

//         <div className="text-center">
//           <button type="submit" className="btn btn-primary">Update Profile</button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default LockSmithForm;
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./LockSmithForm.css";
import api from "../../api/api";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

const LockSmithForm = () => {
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
  const [fileError, setFileError] = useState(null);
  const [geoLoading, setGeoLoading] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const userRole = localStorage.getItem("userRole");

    if (!accessToken || userRole !== "locksmith") {
      navigate("/login?role=locksmith");
      return;
    }

    // Fetch geolocation first
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      setGeoLoading(false);
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setFormData(prev => ({
          ...prev,
          longitude: position.coords.longitude.toString(),
          latitude: position.coords.latitude.toString()
        }));
        setGeoLoading(false);
        fetchFormData(accessToken);
      },
      (error) => {
        console.error("Error getting location:", error);
        setError("Failed to retrieve location. Please turn on device location.");
        setGeoLoading(false);
        setLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      }
    );
  }, [navigate]);

  const fetchFormData = async (accessToken) => {
    try {
      const response = await api.get("api/locksmiths/locksmithform_val/", {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      const data = response.data;
      if (data && (data.address || data.contact_number || data.service_area)) {
        navigate("/waiting-for-approval", { state: { token: accessToken } });
      } else {
        setFormData(prev => ({
          ...prev,
          address: data.address || "",
          contact_number: data.contact_number || "",
          service_area: data.service_area || "",
        }));
      }
    } catch (error) {
      console.error("Error fetching form data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (files) {
      const file = files[0];
      if (file && file.size > 150 * 1024) {
        setFileError("File size should be less than 150KB.");
        return;
      } else {
        setFileError(null);
      }
    }

    setFormData((prevData) => ({
      ...prevData,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (fileError) return;
    if (!formData.longitude || !formData.latitude) {
      setError("Location coordinates are required");
      return;
    }

    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      if (formData[key]) {
        data.append(key, formData[key]);
      }
    });

    try {
      const accessToken = localStorage.getItem("accessToken");
      await api.post("/locksmith/profile/update/", data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      setMessage("Profile updated successfully!");
      setError(null);
      navigate("/waiting-for-approval", { state: { token: accessToken } });
    } catch (error) {
      setError(error.response?.data?.message || "Error updating profile");
      console.error("Error:", error);
    }
  };

  const requestLocationAgain = () => {
    setGeoLoading(true);
    setError(null);
    window.location.reload();
  };

  if (loading || geoLoading) {
    return (
      <Box sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center', 
        height: '100vh' 
      }}>
        <CircularProgress />
        <p style={{ marginTop: '20px' }}>
          {geoLoading ? "Fetching your location..." : "Loading form data..."}
        </p>
      </Box>
    );
  }

  if (error) {
    return (
      <div className="container text-center mt-5">
        <div className="alert alert-warning">
          <h4>Location Required</h4>
          <p>{error}</p>
          <button 
            className="btn btn-dark mt-3"
            onClick={requestLocationAgain}
            style={{
              width: '120px', // Reduced width
              padding: '8px 16px' // Adjusted padding
            }}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container locksmith-form">
      <h2 className="text-center mb-4">Locksmith Registration</h2>
      <div className="alert alert-info">
        <i className="fas fa-info-circle mr-2"></i>
        Your current location has been automatically detected for service area verification.
      </div>

      {message && <div className="alert alert-success">{message}</div>}
      {error && <div className="alert alert-danger">{error}</div>}
      {fileError && <div className="alert alert-warning">{fileError}</div>}

      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="form-group">
          <label>Business Address*</label>
          <input 
            type="text" 
            name="address" 
            value={formData.address} 
            onChange={handleChange} 
            className="form-control" 
            required 
          />
        </div>

        <div className="form-group">
          <label>Contact Number*</label>
          <input 
            type="tel" 
            name="contact_number" 
            value={formData.contact_number} 
            onChange={handleChange} 
            className="form-control" 
            required 
          />
        </div>

        <div className="form-group">
          <label>Service Area*</label>
          <input 
            type="text" 
            name="service_area" 
            value={formData.service_area} 
            onChange={handleChange} 
            className="form-control" 
            required 
          />
        </div>

        <div className="form-group">
          <label>Longitude*</label>
          <input 
            type="text" 
            name="longitude" 
            value={formData.longitude} 
            className="form-control" 
            readOnly 
          />
        </div>

        <div className="form-group">
          <label>Latitude*</label>
          <input 
            type="text" 
            name="latitude" 
            value={formData.latitude} 
            className="form-control" 
            readOnly 
          />
        </div>

        <div className="form-group">
          <label>Police Clearance Certificate* (Max 150KB)</label>
          <input 
            type="file" 
            name="pcc_file" 
            onChange={handleChange} 
            className="form-control-file" 
            accept=".pdf,.jpg,.jpeg,.png" 
            required 
          />
        </div>

        <div className="form-group">
          <label>Locksmith License* (Max 150KB)</label>
          <input 
            type="file" 
            name="license_file" 
            onChange={handleChange} 
            className="form-control-file" 
            accept=".pdf,.jpg,.jpeg,.png" 
            required 
          />
        </div>

        <div className="form-group">
          <label>Profile Photo* (Max 150KB)</label>
          <input 
            type="file" 
            name="photo" 
            onChange={handleChange} 
            className="form-control-file" 
            accept=".jpg,.jpeg,.png" 
            required 
          />
        </div>

        <div className="text-center mt-4">
        <button 
  type="submit" 
  className="btn btn-dark btn-sm" 
  style={{ width: '100px' }}
>
  Submit
</button>
        </div>
      </form>
    </div>
  );
};

export default LockSmithForm;