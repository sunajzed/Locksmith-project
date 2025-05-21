// import React, { useState, useEffect } from "react";
// import { Button, Table, Modal } from "react-bootstrap";
// import api from "./../../api/api";
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
//     const token = localStorage.getItem("accessToken");

//     if (!token) {
//       setError("Unauthorized. Please log in as a locksmith.");
//       setLoading(false);
//       return;
//     }

//     try {
//       const response = await api.get("/api/bookings/", {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       setRequests(response.data);
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
//           req.id === selectedRequest.id
//             ? { ...req, status: updatedStatus }
//             : req
//         )
//       );

//       setShowModal(false);
//     } catch (err) {
//       setError("Failed to update request status.");
//     }
//   };

//   const markComplete = async (id) => {
//     const token = localStorage.getItem("accessToken");

//     try {
//       await api.post(
//         `/api/bookings/${id}/complete/`,
//         { status: "Booking completed" },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       alert("Booking marked as completed!");

//       setRequests((prevRequests) =>
//         prevRequests.map((req) =>
//           req.id === id ? { ...req, status: "Booking completed" } : req
//         )
//       );
//     } catch (err) {
//       console.error("Error completing booking:", err);
//       alert("Failed to complete the booking.");
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
//               <th>Image</th>
//               <th>Additional Keys</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {requests.map((req) => (
//               <tr
//                 key={req.id}
//                 className={
//                   req.status === "Booking completed" ? "table-success" : ""
//                 }
//               >
//                 <td>{req.id}</td>
//                 <td>{req.customer?.username || "N/A"}</td>
//                 <td>{req.customer?.email || "N/A"}</td>
//                 <td>{req.locksmith_service_type || "N/A"}</td>
//                 <td>{req.locksmith_service || "N/A"}</td>
//                 <td>{req.payment_intent_id || "N/A"}</td>
//                 <td>
//                   {req.scheduled_date
//                     ? new Date(req.scheduled_date).toLocaleString()
//                     : "N/A"}
//                 </td>
//                 <td>{req.status || "Pending"}</td>
//                 <td>{req.customer_address || "N/A"}</td>
//                 <td>{req.customer_contact_number || "N/A"}</td>
//                 <td>{req.house_number || "N/A"}</td>
//                 <td>
//                   {req.image ? (
//                     <a
//                       href={req.image}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                     >
//                       <img
//                         src={req.image}
//                         alt="Service"
//                         style={{
//                           width: "60px",
//                           height: "60px",
//                           objectFit: "cover",
//                         }}
//                       />
//                     </a>
//                   ) : (
//                     "No Image"
//                   )}
//                 </td>
//                 <td>{req.number_of_keys > 1 ? req.number_of_keys - 1 : "N/A"}</td>
//                 <td>
//                   <Button
//                     variant="primary"
//                     size="sm"
//                     disabled={req.status === "Booking completed"}
//                     onClick={() => markComplete(req.id)}
//                   >
//                     {req.status === "Booking completed"
//                       ? "Completed"
//                       : "Complete"}
//                   </Button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </Table>
//       </div>

//       <Modal show={showModal} onHide={() => setShowModal(false)} centered>
//         <Modal.Header closeButton>
//           <Modal.Title>
//             {decision === "approve" ? "Approve Request" : "Reject Request"}
//           </Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           Are you sure you want to {decision} the service request for{" "}
//           <strong>{selectedRequest?.locksmith_service || "N/A"}</strong>{" "}
//           requested by{" "}
//           <strong>{selectedRequest?.customer?.username || "N/A"}</strong>?
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
import { Button, Table, Modal } from "react-bootstrap";
import api from "./../../api/api";
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
      console.log("Fetched Bookings:", response.data);
      setRequests(response.data);
    } catch (err) {
      setError(`Failed to fetch service requests: ${err.response?.data?.message || err.message}`);
      console.error("Fetch error:", err);
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
          req.id === selectedRequest.id
            ? { ...req, status: updatedStatus }
            : req
        )
      );
      setShowModal(false);
    } catch (err) {
      setError("Failed to update request status.");
      console.error("Decision error:", err);
    }
  };

  const markComplete = async (id) => {
    const token = localStorage.getItem("accessToken");

    try {
      await api.post(
        `/api/bookings/${id}/complete/`,
        { status: "Booking completed" },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Booking marked as completed!");
      setRequests((prevRequests) =>
        prevRequests.map((req) =>
          req.id === id ? { ...req, status: "Booking completed" } : req
        )
      );
    } catch (err) {
      console.error("Error completing booking:", err);
      alert("Failed to complete the booking.");
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
              <th>Customer Address</th>
              <th>Contact Number</th>
              <th>House Number</th>
              <th>Image</th>
              <th>Additional Keys</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((req) => (
              <tr
                key={req.id}
                className={
                  req.status === "Booking completed" ? "table-success" : ""
                }
              >
                <td>{req.id}</td>
                <td>{req.customer?.username || "N/A"}</td>
                <td>{req.customer?.email || "N/A"}</td>
                <td>{req.locksmith_service_type || "N/A"}</td>
                <td>{req.locksmith_service || "N/A"}</td>
                <td>{req.payment_intent_id || "N/A"}</td>
                <td>
                  {req.scheduled_date
                    ? new Date(req.scheduled_date).toLocaleString()
                    : "N/A"}
                </td>
                <td>{req.status || "Pending"}</td>
                <td>{req.customer_address || "N/A"}</td>
                <td>{req.customer_contact_number || "N/A"}</td>
                <td>{req.house_number || "N/A"}</td>
                <td>
                  {req.image ? (
                    <a
                      href={req.image}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img
                        src={req.image}
                        alt="Service"
                        style={{
                          width: "60px",
                          height: "60px",
                          objectFit: "cover",
                        }}
                        onError={(e) => {
                          console.error("Image failed to load:", req.image);
                          e.target.src = "/path/to/fallback-image.jpg";
                        }}
                      />
                    </a>
                  ) : (
                    "No Image"
                  )}
                </td>
                <td>
                  {req.number_of_keys !== undefined &&
                  req.number_of_keys !== null
                    ? req.number_of_keys > 1
                      ? req.number_of_keys - 1
                      : "None"
                    : "N/A"}
                </td>
                <td>
                  <Button
                    variant="primary"
                    size="sm"
                    disabled={req.status === "Booking completed"}
                    onClick={() => markComplete(req.id)}
                  >
                    {req.status === "Booking completed"
                      ? "Completed"
                      : "Complete"}
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            {decision === "approve" ? "Approve Request" : "Reject Request"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to {decision} the service request for{" "}
          <strong>{selectedRequest?.locksmith_service || "N/A"}</strong>{" "}
          requested by{" "}
          <strong>{selectedRequest?.customer?.username || "N/A"}</strong>?
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
