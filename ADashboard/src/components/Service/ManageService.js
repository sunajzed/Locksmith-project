
import React, { useState } from "react";
import "./ManageService.css"; // Custom CSS
import { Button, Table, Modal, Form } from "react-bootstrap"; // Bootstrap components

const initialServicesData = [
  {
    id: 1,
    service: "Car Lockout",
    image: "https://via.placeholder.com/50",
    description: "Unlock a car when keys are locked inside.",
    totalAmount: 100,
    locksmithAmount: 100,
    commission: 0,
    commissionPercentage: 0, // Default commission %
  },
  {
    id: 2,
    service: "Home Lock Repair",
    image: "https://via.placeholder.com/50",
    description: "Repair or replace damaged home locks.",
    totalAmount: 150,
    locksmithAmount: 150,
    commission: 0,
    commissionPercentage: 0, // Default commission %
  },
  {
    id: 3,
    service: "Key Duplication",
    image: "https://via.placeholder.com/50",
    description: "Duplicate keys for home or car.",
    totalAmount: 50,
    locksmithAmount: 50,
    commission: 0,
    commissionPercentage: 0, // Default commission %
  },
];

const ManageService = () => {
  const [services, setServices] = useState(initialServicesData);
  const [selectedService, setSelectedService] = useState(null);
  const [newCommission, setNewCommission] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleReject = (id) => {
    console.log(`Service ID ${id} rejected`);
    // Implement rejection logic
  };

  const openModal = (service) => {
    setSelectedService(service);
    setNewCommission(service.commissionPercentage);
    setShowModal(true);
  };

  const handleUpdateCommission = () => {
    if (isNaN(newCommission) || newCommission < 0 || newCommission > 100) {
      alert("Please enter a valid commission percentage between 0 and 100.");
      return;
    }

    setServices((prevServices) =>
      prevServices.map((service) =>
        service.id === selectedService.id
          ? {
              ...service,
              commissionPercentage: parseFloat(newCommission),
              commission: ((newCommission / 100) * service.totalAmount).toFixed(2),
              locksmithAmount: (service.totalAmount - (newCommission / 100) * service.totalAmount).toFixed(2),
            }
          : service
      )
    );

    setShowModal(false);
  };

  return (
    <div className="table-container">
      <h2 className="text-center mb-4">Manage Services</h2>
      <div className="table-responsive">
        <Table bordered hover className="service-table">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Service</th>
              <th>Image</th>
              <th>Description</th>
              <th>Total Amount</th>
              <th>Commission (%)</th>
              <th>Set Commission</th>
              <th>Amount for Locksmith</th>
              <th>Commission Amount</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {services.map((service) => (
              <tr key={service.id}>
                <td>{service.id}</td>
                <td>{service.service}</td>
                <td>
                  <img src={service.image} alt={service.service} className="service-img" />
                </td>
                <td>{service.description}</td>
                <td>${service.totalAmount}</td>
                <td>{service.commissionPercentage}%</td>
                <td>
                  <Button variant="primary" size="sm" onClick={() => openModal(service)}>
                    Set
                  </Button>
                </td>
                <td>${service.locksmithAmount}</td>
                <td>${service.commission}</td>
                <td>
                  <Button variant="danger" size="sm" onClick={() => handleReject(service.id)}>
                    Reject
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      {/* Modal for setting commission */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Set Commission</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Commission Percentage (%)</Form.Label>
              <Form.Control
                type="number"
                value={newCommission}
                onChange={(e) => setNewCommission(e.target.value)}
                min="0"
                max="100"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={handleUpdateCommission}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ManageService;
// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { Table } from "react-bootstrap";
// import axios from "axios";

// const ManageService = () => {
//   const [services, setServices] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const accessToken = localStorage.getItem("accessToken");

//     if (!accessToken) {
//       navigate("/admin-login"); // Redirect to login if not authenticated
//       return;
//     }

//     axios
//       .get("http://192.168.1.7:8000/api/services/", {
//         headers: {
//           Authorization: `Bearer ${accessToken}`, // Include token in header
//         },
//       })
//       .then((response) => {
//         setServices(response.data);
//       })
//       .catch((error) => {
//         console.error("Error fetching services:", error);
//         if (error.response && error.response.status === 401) {
//           localStorage.removeItem("accessToken");
//           navigate("/admin-login"); // Redirect if unauthorized
//         }
//       });
//   }, [navigate]);

//   return (
//     <div className="table-container">
//       <h2 className="text-center mb-4">Manage Services</h2>
//       <div className="table-responsive">
//         <Table bordered hover className="service-table">
//           <thead className="table-dark">
//             <tr>
//               <th>Username</th>
//               <th>Email</th>
//               <th>Service Area</th>
//               <th>Service Type</th>
//               <th>Price</th>
//               <th>Details</th>
//             </tr>
//           </thead>
//           <tbody>
//             {services.map((service) => (
//               <tr key={service.id}>
//                 <td>{service.locksmith.user.username}</td>
//                 <td>{service.locksmith.user.email}</td>
//                 <td>{service.locksmith.service_area}</td>
//                 <td>{service.service_type}</td>
//                 <td>${service.price}</td>
//                 <td>{service.details}</td>
//               </tr>
//             ))}
//           </tbody>
//         </Table>
//       </div>
//     </div>
//   );
// };

// export default ManageService;
