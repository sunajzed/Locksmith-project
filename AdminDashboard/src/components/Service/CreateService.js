// import React, { useState } from "react";
// import axios from "axios";
// import "./CreateService.css";
// import api from './../../api/api';

// const CreateService = () => {
//   const [serviceName, setServiceName] = useState("");
//   const [description, setDescription] = useState("");
//   const [error, setError] = useState(null);
//   const [success, setSuccess] = useState(null);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError(null);
//     setSuccess(null);

//     const token = localStorage.getItem("accessToken");
//     if (!token) {
//       setError("Authentication token missing. Please log in.");
//       return;
//     }

//     const serviceData = {
//       name: serviceName,
//       description: description,
//     };

//     try {
//       const response = await api.post("/api/admin/services/", serviceData, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//       });
//       setSuccess("Service created successfully!");
//       setServiceName("");
//       setDescription("");
//     } catch (err) {
//       setError("Failed to create service. Please try again.");
//     }
//   };

//   return (
//     <div className="create-service-container">
//       <form className="create-service-form" onSubmit={handleSubmit}>
//         <h2>Create Service</h2>
//         {error && <p className="error-message">{error}</p>}
//         {success && <p className="success-message">{success}</p>}
//         <div className="form-group">
//           <label>Service Name</label>
//           <input
//             type="text"
//             value={serviceName}
//             onChange={(e) => setServiceName(e.target.value)}
//             placeholder="Enter service name"
//             required
//           />
//         </div>
        
//         <div className="form-group">
//           <label>Description</label>
//           <textarea
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//             placeholder="Enter service description"
//             required
//           ></textarea>
//         </div>
//         <button type="submit" className="create-button">Create Service</button>
//       </form>
//     </div>
//   );
// };

// export default CreateService;


import React, { useState } from "react";
import api from './../../api/api';
import "./CreateService.css";

const CreateService = () => {
  const [serviceName, setServiceName] = useState("");
  const [serviceType, setServiceType] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Predefined service types
  const serviceTypes = [
    { value: "", label: "Select a service type" },
    { value: "automotive", label: "Automotive" },
    { value: "residential", label: "Residential" },
    { value: "commercial", label: "Commercial" },
    { value: "emergency", label: "Emergency" },
    { value: "smart_lock", label: "Smart Lock" }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setIsSubmitting(true);

    const token = localStorage.getItem("accessToken");
    if (!token) {
      setError("Authentication token missing. Please log in.");
      setIsSubmitting(false);
      return;
    }

    if (!serviceName.trim()) {
      setError("Service name is required");
      setIsSubmitting(false);
      return;
    }

    const serviceData = {
      name: serviceName.trim(),
      service_type: serviceType || null,
    };

    try {
      const response = await api.post("/api/admin/services/", serviceData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      
      setSuccess("Service created successfully!");
      setServiceName("");
      setServiceType("");
    } catch (err) {
      let errorMessage = "Failed to create service. Please try again.";
      
      if (err.response) {
        if (err.response.status === 400) {
          errorMessage = "Validation error: " + 
            (err.response.data?.detail || JSON.stringify(err.response.data));
        } else if (err.response.status === 401) {
          errorMessage = "Unauthorized. Please log in again.";
        } else if (err.response.status === 403) {
          errorMessage = "You don't have permission to perform this action.";
        } else if (err.response.data?.detail) {
          errorMessage = err.response.data.detail;
        }
      } else if (err.request) {
        errorMessage = "No response from server. Please check your connection.";
      }
      
      setError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="create-service-container">
      <form className="create-service-form" onSubmit={handleSubmit}>
        <h2>Create Service</h2>
        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}
        
        <div className="form-group">
          <label>Service Name *</label>
          <input
            type="text"
            value={serviceName}
            onChange={(e) => setServiceName(e.target.value)}
            placeholder="Enter service name"
            required
            disabled={isSubmitting}
          />
        </div>

        <div className="form-group">
          <label>Service Type</label>
          <select
            value={serviceType}
            onChange={(e) => setServiceType(e.target.value)}
            disabled={isSubmitting}
            className="service-type-select"
          >
            {serviceTypes.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>
        
        <button 
          type="submit" 
          className="create-button"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Creating..." : "Create Service"}
        </button>
      </form>
    </div>
  );
};

export default CreateService;
