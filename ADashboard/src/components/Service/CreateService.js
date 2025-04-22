// import React, { useState } from "react";
// import "./CreateService.css";

// const CreateService = () => {
//   const [serviceName, setServiceName] = useState("");
//   const [amount, setAmount] = useState("");

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("Service Created:", { serviceName, amount });
//     setServiceName("");
//     setAmount("");
//   };

//   return (
//     <div className="create-service-container">
//       <form className="create-service-form" onSubmit={handleSubmit}>
//         <h2>Create Service</h2>
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
//           <label>Amount ($)</label>
//           <input
//             type="number"
//             value={amount}
//             onChange={(e) => setAmount(e.target.value)}
//             placeholder="Enter amount"
//             required
//           />
//         </div>
//         <button type="submit" className="create-button">Create Service</button>
//       </form>
//     </div>
//   );
// };

// export default CreateService;
import React, { useState } from "react";
import axios from "axios";
import "./CreateService.css";
import api from './../../api/api';

const CreateService = () => {
  const [serviceName, setServiceName] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const token = localStorage.getItem("accessToken");
    if (!token) {
      setError("Authentication token missing. Please log in.");
      return;
    }

    const serviceData = {
      name: serviceName,
      description: description,
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
      setDescription("");
    } catch (err) {
      setError("Failed to create service. Please try again.");
    }
  };

  return (
    <div className="create-service-container">
      <form className="create-service-form" onSubmit={handleSubmit}>
        <h2>Create Service</h2>
        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}
        <div className="form-group">
          <label>Service Name</label>
          <input
            type="text"
            value={serviceName}
            onChange={(e) => setServiceName(e.target.value)}
            placeholder="Enter service name"
            required
          />
        </div>
        
        <div className="form-group">
          <label>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter service description"
            required
          ></textarea>
        </div>
        <button type="submit" className="create-button">Create Service</button>
      </form>
    </div>
  );
};

export default CreateService;
