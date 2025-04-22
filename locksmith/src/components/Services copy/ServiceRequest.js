// import React, { useState } from "react";
// import { Button, Table, Modal } from "react-bootstrap";
// import "./ServiceRequest.css"; // Custom CSS for styling

// const initialRequests = [
//   {
//     id: 1,
//     service: "Car Key Replacement",
//     customer: "John Doe",
//     location: "New York, NY",
//     status: "Pending",
//     proximity: 5, // Distance in miles
//   },
//   {
//     id: 2,
//     service: "Home Lock Repair",
//     customer: "Alice Smith",
//     location: "Brooklyn, NY",
//     status: "Pending",
//     proximity: 12,
//   },
//   {
//     id: 3,
//     service: "Door Lock Installation",
//     customer: "Michael Johnson",
//     location: "Queens, NY",
//     status: "Pending",
//     proximity: 8,
//   },
// ];

// const ServiceRequest = () => {
//   const [requests, setRequests] = useState(initialRequests);
//   const [showModal, setShowModal] = useState(false);
//   const [selectedRequest, setSelectedRequest] = useState(null);
//   const [decision, setDecision] = useState("");

//   const openModal = (request, action) => {
//     setSelectedRequest(request);
//     setDecision(action);
//     setShowModal(true);
//   };

//   const handleDecision = () => {
//     if (!selectedRequest) return;

//     setRequests((prevRequests) =>
//       prevRequests.map((req) =>
//         req.id === selectedRequest.id
//           ? { ...req, status: decision === "approve" ? "Approved" : "Rejected" }
//           : req
//       )
//     );

//     setShowModal(false);
//   };

//   return (
//     <div className="table-container">
//       <h2 className="text-center mb-4">Service Request Management</h2>
//       <div className="table-responsive">
//         <Table bordered hover className="requests-table">
//           <thead className="table-dark">
//             <tr>
//               <th>ID</th>
//               <th>Service</th>
//               <th>Customer</th>
//               <th>Location</th>
//               <th>Status</th>
//               <th>Proximity (miles)</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {requests.map((req) => (
//               <tr key={req.id} className={req.status === "Approved" ? "table-success" : req.status === "Rejected" ? "table-danger" : ""}>
//                 <td>{req.id}</td>
//                 <td>{req.service}</td>
//                 <td>{req.customer}</td>
//                 <td>{req.location}</td>
//                 <td>{req.status}</td>
//                 <td>{req.proximity} miles</td>
//                 <td>
//                   {req.status === "Pending" ? (
//                     <>
//                       <Button variant="success" size="sm" onClick={() => openModal(req, "approve")}>
//                         Approve
//                       </Button>{" "}
//                       <Button variant="danger" size="sm" onClick={() => openModal(req, "reject")}>
//                         Reject
//                       </Button>
//                     </>
//                   ) : (
//                     <span className="text-muted">No Actions</span>
//                   )}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </Table>
//       </div>

//       {/* Modal for Approving/Rejecting Requests */}
//       <Modal show={showModal} onHide={() => setShowModal(false)} centered>
//         <Modal.Header closeButton>
//           <Modal.Title>
//             {decision === "approve" ? "Approve Request" : "Reject Request"}
//           </Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           Are you sure you want to {decision} the service request for{" "}
//           <strong>{selectedRequest?.service}</strong> requested by{" "}
//           <strong>{selectedRequest?.customer}</strong> in{" "}
//           <strong>{selectedRequest?.location}</strong>?
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant={decision === "approve" ? "success" : "danger"} onClick={handleDecision}>
//             {decision === "approve" ? "Approve" : "Reject"}
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </div>
//   );
// };

// export default ServiceRequest;
import React, { useState, useEffect } from "react";
import { Button, Table, Modal } from "react-bootstrap";
import axios from "axios";
import api from './../../api/api';

import "./ServiceRequest.css";

const ServiceRequest = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [decision, setDecision] = useState("");

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    const token = localStorage.getItem("accessToken"); // Get auth token

    if (!token) {
      setError("Unauthorized. Please log in as a locksmith.");
      setLoading(false);
      return;
    }

    try {
      const response = await api.get("/api/bookings/", {
        headers: { Authorization: `Bearer ${token}` }, // Attach token
      });

      setRequests(response.data); // Assuming API returns an array of requests
    } catch (err) {
      setError("Failed to fetch service requests.");
    } finally {
      setLoading(false);
    }
  };

  const openModal = (request, action) => {
    setSelectedRequest(request);
    setDecision(action);
    setShowModal(true);
  };

  const handleDecision = async () => {
    if (!selectedRequest) return;
    const token = localStorage.getItem("accessToken");

    try {
      const updatedStatus = decision === "approve" ? "Approved" : "Rejected";

      await api.patch(
        `/api/bookings/${selectedRequest.id}/`,
        { status: updatedStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setRequests((prevRequests) =>
        prevRequests.map((req) =>
          req.id === selectedRequest.id ? { ...req, status: updatedStatus } : req
        )
      );

      setShowModal(false);
    } catch (err) {
      setError("Failed to update request status.");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="table-container">
      <h2 className="text-center mb-4">Service Request Management</h2>
      <div className="table-responsive">
        <Table bordered hover className="requests-table">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Customer</th>
              <th>Email</th>
              <th>Service Type</th>
              <th>Locksmith Service</th>
              <th>Payment Intent</th>
              <th>Scheduled Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((req) => (
              <tr
                key={req.id}
                className={
                  req.status === "Approved"
                    ? "table-success"
                    : req.status === "Rejected"
                    ? "table-danger"
                    : ""
                }
              >
                <td>{req.id}</td>
                <td>{req.customer.username}</td>
                <td>{req.customer.email}</td>
                <td>{req.locksmith_service_type}</td>
                <td>{req.locksmith_service}</td>
                <td>{req.payment_intent_id}</td>
                <td>{new Date(req.scheduled_date).toLocaleString()}</td>
                <td>{req.status}</td>
                <td>
                  {req.status === "Pending" ? (
                    <>
                      <Button
                        variant="success"
                        size="sm"
                        onClick={() => openModal(req, "approve")}
                      >
                        Approve
                      </Button>{" "}
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => openModal(req, "reject")}
                      >
                        Reject
                      </Button>
                    </>
                  ) : (
                    <span className="text-muted">No Actions</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      {/* Modal for Approving/Rejecting Requests */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            {decision === "approve" ? "Approve Request" : "Reject Request"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to {decision} the service request for{" "}
          <strong>{selectedRequest?.locksmith_service}</strong> requested by{" "}
          <strong>{selectedRequest?.customer?.username}</strong>?
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant={decision === "approve" ? "success" : "danger"}
            onClick={handleDecision}
          >
            {decision === "approve" ? "Approve" : "Reject"}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ServiceRequest;
