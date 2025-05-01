// import React, { useState, useEffect } from "react";
// import { Button, Table, Modal } from "react-bootstrap";
// import axios from "axios";
// import api from './../../api/api';
// import "./ServiceRequest.css";

// const ServiceRequest = () => {
//   const [requests, setRequests] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [showModal, setShowModal] = useState(false);
//   const [selectedRequest, setSelectedRequest] = useState(null);
//   const [decision, setDecision] = useState("");

//   useEffect(() => {
//     fetchRequests();
//   }, []);

//   const fetchRequests = async () => {
//     const token = localStorage.getItem("accessToken"); // Get auth token

//     if (!token) {
//       setError("Unauthorized. Please log in as a locksmith.");
//       setLoading(false);
//       return;
//     }

//     try {
//       const response = await api.get("/api/bookings/", {
//         headers: { Authorization: `Bearer ${token}` }, // Attach token
//       });

//       setRequests(response.data); // Assuming API returns an array of requests
//     } catch (err) {
//       setError("Failed to fetch service requests.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const openModal = (request, action) => {
//     setSelectedRequest(request);
//     setDecision(action);
//     setShowModal(true);
//   };

//   const handleDecision = async () => {
//     if (!selectedRequest) return;
//     const token = localStorage.getItem("accessToken");

//     try {
//       const updatedStatus = decision === "approve" ? "Approved" : "Rejected";

//       await api.patch(
//         `/api/bookings/${selectedRequest.id}/`,
//         { status: updatedStatus },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       setRequests((prevRequests) =>
//         prevRequests.map((req) =>
//           req.id === selectedRequest.id ? { ...req, status: updatedStatus } : req
//         )
//       );

//       setShowModal(false);
//     } catch (err) {
//       setError("Failed to update request status.");
//     }
//   };

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p className="error">{error}</p>;

//   return (
//     <div className="table-container">
//       <h2 className="text-center mb-4">Service Request Management</h2>
//       <div className="table-responsive">
//         <Table bordered hover className="requests-table">
//           <thead className="table-dark">
//             <tr>
//               <th>ID</th>
//               <th>Customer</th>
//               <th>Email</th>
//               <th>Service Type</th>
//               <th>Locksmith Service</th>
//               <th>Payment Intent</th>
//               <th>Scheduled Date</th>
//               <th>Status</th>
//               <th>Customer Address</th>
//               <th>Contact Number</th>
//               <th>House Number</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {requests.map((req) => (
//               <tr
//                 key={req.id}
//                 className={
//                   req.status === "Approved"
//                     ? "table-success"
//                     : req.status === "Rejected"
//                     ? "table-danger"
//                     : ""
//                 }
//               >
//                 <td>{req.id}</td>
//                 <td>{req.customer.username}</td>
//                 <td>{req.customer.email}</td>
//                 <td>{req.locksmith_service_type}</td>
//                 <td>{req.locksmith_service}</td>
//                 <td>{req.payment_intent_id}</td>
//                 <td>{new Date(req.scheduled_date).toLocaleString()}</td>
//                 <td>{req.status}</td>
//                 <td>{req.customer_address}</td>
//                 <td>{req.customer_contact_number}</td>
//                 <td>{req.house_number}</td>
//                 <td>
//                   {req.status === "Pending" ? (
//                     <>
//                       <Button
//                         variant="success"
//                         size="sm"
//                         onClick={() => openModal(req, "approve")}
//                       >
//                         Approve
//                       </Button>{" "}
//                       <Button
//                         variant="danger"
//                         size="sm"
//                         onClick={() => openModal(req, "reject")}
//                       >
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
//           <strong>{selectedRequest?.locksmith_service}</strong> requested by{" "}
//           <strong>{selectedRequest?.customer?.username}</strong>?
//         </Modal.Body>
//         <Modal.Footer>
//           <Button
//             variant={decision === "approve" ? "success" : "danger"}
//             onClick={handleDecision}
//           >
//             {decision === "approve" ? "Approve" : "Reject"}
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </div>
//   );
// };

// export default ServiceRequest;


import React, { useState, useEffect } from "react";
import { Button, Table, Alert, Spinner } from "react-bootstrap";
import api from './../../api/api';
import "./ServiceRequest.css";

const ServiceRequest = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [completingId, setCompletingId] = useState(null);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      setError("Unauthorized. Please log in as a locksmith.");
      setLoading(false);
      return;
    }

    try {
      const response = await api.get("/api/bookings/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRequests(response.data);
    } catch (err) {
      setError(`Failed to fetch service requests: ${err.response?.data?.message || err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleComplete = async (id) => {
    setCompletingId(id);
    const token = localStorage.getItem("accessToken");
    
    try {
      await api.post(
        `/api/bookings/${id}/complete/`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setRequests(prevRequests =>
        prevRequests.map(req =>
          req.id === id ? { ...req, status: "Completed" } : req
        )
      );
      
      setSuccessMessage(`Service #${id} completed!`);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (err) {
      setError(`Failed to complete #${id}: ${err.response?.data?.detail || "Server error"}`);
    } finally {
      setCompletingId(null);
    }
  };

  if (loading) return (
    <div className="text-center mt-5">
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  );

  if (error) return (
    <Alert variant="danger" className="m-3">
      {error}
      <Button variant="link" onClick={() => setError("")}>Dismiss</Button>
    </Alert>
  );

  return (
    <div className="table-container p-3">
      <h2 className="text-center mb-4">Service Request Management</h2>
      
      {showSuccess && (
        <Alert variant="success" onClose={() => setShowSuccess(false)} dismissible>
          {successMessage}
        </Alert>
      )}
      
      <div className="table-responsive">
        <Table bordered hover className="requests-table">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Customer</th>
              <th>Email</th>
              <th>Service Type</th>
              <th>Service</th>
              <th>Payment ID</th>
              <th>Scheduled Date</th>
              <th>Status</th>
              <th>Address</th>
              <th>Contact</th>
              <th>House No.</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((req) => (
              <tr key={req.id} className={req.status === "Completed" ? "table-success" : ""}>
                <td>{req.id}</td>
                <td>{req.customer.username}</td>
                <td>{req.customer.email}</td>
                <td>{req.locksmith_service_type}</td>
                <td>{req.locksmith_service}</td>
                <td className="text-truncate" style={{maxWidth: "120px"}}>
                  {req.payment_intent_id}
                </td>
                <td>{new Date(req.scheduled_date).toLocaleString()}</td>
                <td>
                  <span className={`badge ${
                    req.status === "Completed" ? "bg-success" : 
                    req.status === "Approved" ? "bg-primary" : "bg-warning"
                  }`}>
                    {req.status}
                  </span>
                </td>
                <td>{req.customer_address}</td>
                <td>{req.customer_contact_number}</td>
                <td>{req.house_number}</td>
                <td>
                  {req.status !== "Completed" ? (
                    <Button
                      variant={req.status === "Approved" ? "success" : "primary"}
                      size="sm"
                      onClick={() => handleComplete(req.id)}
                      disabled={completingId === req.id}
                    >
                      {completingId === req.id ? (
                        <>
                          <Spinner as="span" animation="border" size="sm" />
                          <span className="visually-hidden">Processing...</span>
                        </>
                      ) : (
                        "Complete"
                      )}
                    </Button>
                  ) : (
                    <span className="text-success fw-bold">Done</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default ServiceRequest;