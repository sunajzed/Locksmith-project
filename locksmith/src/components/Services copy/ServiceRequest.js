import React, { useState, useEffect } from "react";
import { Button, Table, Modal, Form, Row, Col } from "react-bootstrap";
import api from "./../../api/api";
import "./ServiceRequest.css";

const ServiceRequest = () => {
  const [requests, setRequests] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [decision, setDecision] = useState("");

  // Filters
  const [filterDate, setFilterDate] = useState("");
  const [filterServiceType, setFilterServiceType] = useState("");
  const [filterEmergency, setFilterEmergency] = useState(false);
  const [filterPaid, setFilterPaid] = useState(false);

  useEffect(() => {
    fetchRequests();
  }, [filterEmergency, filterPaid]); // Re-fetch when emergency or paid filters change

  useEffect(() => {
    applyFilters();
  }, [requests, filterDate, filterServiceType]);

  const fetchRequests = async () => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      setError("Unauthorized. Please log in as a locksmith.");
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      // Build query params depending on filters
      let url = "/api/bookings/";
      const params = new URLSearchParams();

      if (filterEmergency) {
        params.append("emergency", "true");
        if (filterPaid) {
          params.append("payment_status", "paid");
        }
      }

      const queryString = params.toString();
      if (queryString) url += `?${queryString}`;

      const response = await api.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setRequests(response.data);
      setError("");
    } catch (err) {
      setError(
        `Failed to fetch service requests: ${
          err.response?.data?.message || err.message
        }`
      );
      setRequests([]);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...requests];

    if (filterDate) {
      filtered = filtered.filter((req) =>
        req.scheduled_date?.startsWith(filterDate)
      );
    }

    if (filterServiceType) {
      filtered = filtered.filter((req) =>
        req.locksmith_service_type
          ?.toLowerCase()
          .includes(filterServiceType.toLowerCase())
      );
    }

    setFilteredRequests(filtered);
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
      alert("Failed to complete the booking.");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="table-container">
      <h2 className="text-center mb-4">Service Request Management</h2>

      {/* Filter Section */}
      <Form className="mb-3">
        <Row>
          <Col md={3}>
            <Form.Group controlId="filterDate">
              <Form.Label>Filter by Date</Form.Label>
              <Form.Control
                type="date"
                value={filterDate}
                onChange={(e) => setFilterDate(e.target.value)}
                disabled={filterEmergency} // Disable when Emergency ON
              />
            </Form.Group>
          </Col>

          <Col md={3}>
            <Form.Group controlId="filterServiceType">
              <Form.Label>Filter by Service Type</Form.Label>
              <Form.Select
                value={filterServiceType}
                onChange={(e) => setFilterServiceType(e.target.value)}
                disabled={filterEmergency} // Disable when Emergency ON
              >
                <option value="">All Types</option>
                <option value="Automotive">Automotive</option>
                <option value="Residential">Residential</option>
                <option value="Commercial">Commercial</option>
                <option value="Emergency">Emergency</option>
              </Form.Select>
            </Form.Group>
          </Col>

          <Col md={3} className="d-flex align-items-center">
            <Form.Check
              type="checkbox"
              id="filterEmergency"
              label="Show Emergency Only"
              checked={filterEmergency}
              onChange={(e) => {
                setFilterEmergency(e.target.checked);
                if (e.target.checked) {
                  setFilterDate("");
                  setFilterServiceType("");
                } else {
                  setFilterPaid(false); // reset paid when emergency off
                }
              }}
            />
          </Col>

          <Col md={3} className="d-flex align-items-center">
            <Form.Check
              type="checkbox"
              id="filterPaid"
              label="Show Paid Only"
              checked={filterPaid}
              disabled={!filterEmergency} // only enabled if emergency ON
              onChange={(e) => setFilterPaid(e.target.checked)}
            />
          </Col>
        </Row>
      </Form>

      {/* Table */}
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
            {filteredRequests.map((req) => (
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
                          e.target.src = "/fallback.jpg";
                        }}
                      />
                    </a>
                  ) : (
                    "No Image"
                  )}
                </td>
                <td>{req.number_of_keys ?? "N/A"}</td>
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

      {/* Approve/Reject Modal */}
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
