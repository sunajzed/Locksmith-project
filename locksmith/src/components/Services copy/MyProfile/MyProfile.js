
// import React, { useState, useEffect } from "react";
// import "./MyProfile.css";
// import api from '../../../api/api';

// const MyProfile = () => {
//   const [formData, setFormData] = useState({
//     address: "",
//     contact_number: "",
//     service_area: "",
//     pcc_file: null,
//     license_file: null,
//     photo: null,
//   });

//   const [fileURLs, setFileURLs] = useState({
//     pcc_file: null,
//     license_file: null,
//     photo: null,
//   });

//   const [message, setMessage] = useState(null);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchFormData = async () => {
//       try {
//         const accessToken = localStorage.getItem("accessToken");
//         if (!accessToken) {
//           throw new Error("No access token found. Please login.");
//         }

//         const response = await api.get("/api/locksmiths/locksmithform_val/", {
//           headers: { Authorization: `Bearer ${accessToken}` },
//         });

//         const data = response.data;
//         const baseURL = api.defaults.baseURL; // Get base URL from axios instance

//         setFormData({
//           address: data.address || "",
//           contact_number: data.contact_number || "",
//           service_area: data.service_area || "",
//           pcc_file: null,
//           license_file: null,
//           photo: null,
//         });

//         setFileURLs({
//           pcc_file: data.pcc_file ? `${baseURL}${data.pcc_file}` : null,
//           license_file: data.license_file ? `${baseURL}${data.license_file}` : null,
//           photo: data.photo ? `${baseURL}${data.photo}` : null,
//         });

//       } catch (error) {
//         console.error("Error fetching form data:", error);
//       }
//     };

//     fetchFormData();
//   }, []);

//   const validateFileSize = (file) => {
//     const maxSize = 150 * 1024; // 150KB in bytes
//     if (file.size > maxSize) {
//       return false;
//     }
//     return true;
//   };

//   const handleChange = (e) => {
//     const { name, value, files } = e.target;

//     if (files) {
//       const file = files[0];
//       if (!validateFileSize(file)) {
//         setError(`File size for ${name} must be less than 150KB`);
//         return;
//       }
      
//       setFormData((prevData) => ({
//         ...prevData,
//         [name]: file,
//       }));
//       setError(null); // Clear any previous errors if validation passes
//     } else {
//       setFormData((prevData) => ({
//         ...prevData,
//         [name]: value,
//       }));
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!formData.address || !formData.contact_number || !formData.service_area) {
//       setError("Please fill out all required fields.");
//       return;
//     }

//     // Validate file sizes again before submission
//     const filesToCheck = [
//       { file: formData.pcc_file, name: "PCC File" },
//       { file: formData.license_file, name: "License File" },
//       { file: formData.photo, name: "Photo" }
//     ];

//     for (const item of filesToCheck) {
//       if (item.file && !validateFileSize(item.file)) {
//         setError(`File size for ${item.name} must be less than 150KB`);
//         return;
//       }
//     }

//     const data = new FormData();
//     data.append("address", formData.address);
//     data.append("contact_number", formData.contact_number);
//     data.append("service_area", formData.service_area);

//     if (formData.pcc_file) {
//       data.append("pcc_file", formData.pcc_file);
//     }

//     if (formData.license_file) {
//       data.append("license_file", formData.license_file);
//     }

//     if (formData.photo) {
//       data.append("photo", formData.photo);
//     }

//     try {
//       const accessToken = localStorage.getItem("accessToken");
//       if (!accessToken) {
//         throw new Error("No access token found. Please login.");
//       }

//       const response = await api.put("/locksmith/profile/update/", data, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//           Authorization: `Bearer ${accessToken}`,
//         },
//       });

//       setMessage("Profile updated successfully!");
//       setError(null);
//       console.log("Profile updated successfully", response.data);
//     } catch (error) {
//       setError("Error updating profile. Please try again.");
//       setMessage(null);
//       console.error("Error updating profile:", error);
//       if (error.response) {
//         console.error("Server response:", error.response.data);
//       }
//     }
//   };

//   return (
//     <div className="container locksmith-form-update">
//       <h2 className="text-center mb-4">Locksmith Profile</h2>

//       {message && <div className="alert alert-success">{message}</div>}
//       {error && <div className="alert alert-danger">{error}</div>}

//       <form onSubmit={handleSubmit} encType="multipart/form-data">
//         <div className="form-group">
//           <label>Address</label>
//           <input type="text" name="address" value={formData.address} onChange={handleChange} className="form-control" required />
//         </div>

//         <div className="form-group">
//           <label>Contact Number</label>
//           <input type="text" name="contact_number" value={formData.contact_number} onChange={handleChange} className="form-control" required />
//         </div>

//         <div className="form-group">
//           <label>Service Area</label>
//           <input type="text" name="service_area" value={formData.service_area} onChange={handleChange} className="form-control" required />
//         </div>

//         <div className="form-group">
//           <label>PCC File</label>
//           <input type="file" name="pcc_file" onChange={handleChange} className="form-control-file" accept=".pdf,.jpg,.jpeg,.png" />
//           {fileURLs.pcc_file && !formData.pcc_file && (
//             <a href={fileURLs.pcc_file} target="_blank" rel="noopener noreferrer">
//               View Current PCC File
//             </a>
//           )}
//           <small className="form-text text-muted">Max file size: 150KB</small>
//         </div>

//         <div className="form-group">
//           <label>License File</label>
//           <input type="file" name="license_file" onChange={handleChange} className="form-control-file" accept=".pdf,.jpg,.jpeg,.png" />
//           {fileURLs.license_file && !formData.license_file && (
//             <a href={fileURLs.license_file} target="_blank" rel="noopener noreferrer">
//               View Current License File
//             </a>
//           )}
//           <small className="form-text text-muted">Max file size: 150KB</small>
//         </div>

//         <div className="form-group">
//           <label>Photo</label>
//           <input type="file" name="photo" onChange={handleChange} className="form-control-file" accept=".jpg,.jpeg,.png" />
//           {fileURLs.photo && !formData.photo && (
//             <a href={fileURLs.photo} target="_blank" rel="noopener noreferrer">
//               View Current Photo
//             </a>
//           )}
//           <small className="form-text text-muted">Max file size: 150KB</small>
//         </div>

//         <div className="text-center">
//           <button type="submit" className="btn btn-dark custom-button">
//             Update Profile
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default MyProfile;

import React, { useState, useEffect } from "react";
import "./MyProfile.css";
import api from '../../../api/api';
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

const MyProfile = () => {
  const [formData, setFormData] = useState({
    address: "",
    contact_number: "",
    service_area: "",
    pcc_file: null,
    license_file: null,
    photo: null,
  });

  const [fileURLs, setFileURLs] = useState({
    pcc_file: null,
    license_file: null,
    photo: null,
  });

  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFormData = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        if (!accessToken) {
          throw new Error("No access token found. Please login.");
        }

        const response = await api.get("/api/locksmiths/locksmithform_val/", {
          headers: { Authorization: `Bearer ${accessToken}` },
        });

        const data = response.data;
        const baseURL = api.defaults.baseURL;

        setFormData({
          address: data.address || "",
          contact_number: data.contact_number || "",
          service_area: data.service_area || "",
          pcc_file: null,
          license_file: null,
          photo: null,
        });

        setFileURLs({
          pcc_file: data.pcc_file ? `${baseURL}${data.pcc_file}` : null,
          license_file: data.license_file ? `${baseURL}${data.license_file}` : null,
          photo: data.photo ? `${baseURL}${data.photo}` : null,
        });

      } catch (error) {
        console.error("Error fetching form data:", error);
        setError("Failed to load profile data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchFormData();
  }, []);

  const validateFileSize = (file) => {
    const maxSize = 150 * 1024;
    if (file.size > maxSize) {
      return false;
    }
    return true;
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (files) {
      const file = files[0];
      if (!validateFileSize(file)) {
        setError(`File size for ${name} must be less than 150KB`);
        return;
      }
      
      setFormData((prevData) => ({
        ...prevData,
        [name]: file,
      }));
      setError(null);
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.address || !formData.contact_number || !formData.service_area) {
      setError("Please fill out all required fields.");
      return;
    }

    const filesToCheck = [
      { file: formData.pcc_file, name: "PCC File" },
      { file: formData.license_file, name: "License File" },
      { file: formData.photo, name: "Photo" }
    ];

    for (const item of filesToCheck) {
      if (item.file && !validateFileSize(item.file)) {
        setError(`File size for ${item.name} must be less than 150KB`);
        return;
      }
    }

    const data = new FormData();
    data.append("address", formData.address);
    data.append("contact_number", formData.contact_number);
    data.append("service_area", formData.service_area);

    if (formData.pcc_file) data.append("pcc_file", formData.pcc_file);
    if (formData.license_file) data.append("license_file", formData.license_file);
    if (formData.photo) data.append("photo", formData.photo);

    try {
      const accessToken = localStorage.getItem("accessToken");
      const response = await api.put("/locksmith/profile/update/", data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      setMessage("Profile updated successfully!");
      setError(null);
    } catch (error) {
      setError(error.response?.data?.message || "Error updating profile. Please try again.");
      console.error("Error updating profile:", error);
    }
  };

  if (loading) {
    return (
      <Box sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center', 
        height: '100vh' 
      }}>
        <CircularProgress />
        <p style={{ marginTop: '20px' }}>Loading profile data...</p>
      </Box>
    );
  }

  return (
    <div className="container locksmith-form">
      <h2 className="text-center mb-4">Locksmith Profile</h2>
      
      {message && <div className="alert alert-success">{message}</div>}
      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="form-group">
          <label>Address*</label>
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
          <label>Police Clearance Certificate (Max 150KB)</label>
          <input 
            type="file" 
            name="pcc_file" 
            onChange={handleChange} 
            className="form-control-file" 
            accept=".pdf,.jpg,.jpeg,.png" 
          />
          {fileURLs.pcc_file && !formData.pcc_file && (
            <div className="mt-2">
              <a href={fileURLs.pcc_file} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-outline-secondary">
                View Current PCC
              </a>
            </div>
          )}
        </div>

        <div className="form-group">
          <label>Locksmith License (Max 150KB)</label>
          <input 
            type="file" 
            name="license_file" 
            onChange={handleChange} 
            className="form-control-file" 
            accept=".pdf,.jpg,.jpeg,.png" 
          />
          {fileURLs.license_file && !formData.license_file && (
            <div className="mt-2">
              <a href={fileURLs.license_file} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-outline-secondary">
                View Current License
              </a>
            </div>
          )}
        </div>

        <div className="form-group">
          <label>Profile Photo (Max 150KB)</label>
          <input 
            type="file" 
            name="photo" 
            onChange={handleChange} 
            className="form-control-file" 
            accept=".jpg,.jpeg,.png" 
          />
          {fileURLs.photo && !formData.photo && (
            <div className="mt-2">
              <a href={fileURLs.photo} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-outline-secondary">
                View Current Photo
              </a>
            </div>
          )}
        </div>

        <div className="text-center mt-4">
          <button 
            type="submit" 
            className="btn btn-dark"
            style={{
              minWidth: '120px',
              width: 'auto',
              padding: '0.375rem 1.5rem',
            }}
          >
            Update Profile
          </button>
        </div>
      </form>
    </div>
  );
};

export default MyProfile;