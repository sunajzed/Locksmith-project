import React, { useState, useEffect } from "react";
import { Button, Table, Form, Row, Col } from "react-bootstrap";
import api from "./../../api/api";
import "./ServiceRequest.css";
import { AiOutlineEyeInvisible } from "react-icons/ai";
import { FaFileExport } from "react-icons/fa";

const ServiceRequest = () => {
  const [requests, setRequests] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Filters
  const [filterDate, setFilterDate] = useState("");
  const [filterServiceType, setFilterServiceType] = useState("");
  const [filterEmergency, setFilterEmergency] = useState(false);
  const [exportLoading, setExportLoading] = useState(false);

  useEffect(() => {
    fetchRequests();
  }, [filterEmergency]);

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
      let url = "/api/bookings/";
      const params = new URLSearchParams();

      if (filterEmergency) {
        params.append("emergency", "true");
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

    // Filter out requests without a payment_intent_id
    filtered = filtered.filter((req) => req.payment_intent_id);

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

  const handleBookingDecision = async (id, action) => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      alert("Unauthorized");
      return;
    }

    const endpoint =
      action === "approve"
        ? `/api/bookings/${id}/approve_booking/`
        : `/api/bookings/${id}/deny_booking/`;

    try {
      await api.post(
        endpoint,
        {},
        {
          headers: {
            Authorization: `Token ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setRequests((prev) =>
        prev.map((req) =>
          req.id === id
            ? {
                ...req,
                locksmith_status: action === "approve" ? "APPROVED" : "DENIED",
              }
            : req
        )
      );

      alert(
        action === "approve"
          ? "Booking approved successfully"
          : "Booking denied successfully"
      );
    } catch (err) {
      alert("Failed to update booking status");
    }
  };

  const handleExportCSV = async () => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      alert("Please log in to export data");
      return;
    }

    setExportLoading(true);
    try {
      const response = await api.get("/api/bookings/", {
        params: { export: 'csv' },
        responseType: 'blob',
        headers: { Authorization: `Bearer ${token}` }
      });

      // Create a blob URL for the file
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `service_requests_${new Date().toISOString().split('T')[0]}.csv`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      alert(`Failed to export data: ${err.response?.data?.message || err.message}`);
      console.error('Export error:', err);
    } finally {
      setExportLoading(false);
    }
  };

  const markComplete = async (id) => {
    const token = localStorage.getItem("accessToken");

    try {
      const res = await api.post(
        `/api/bookings/${id}/complete/`,
        {}, // 👈 send empty body
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("Booking marked as completed!");

      console.log("Server response:", res.data); // to view all financial breakdown info if needed

      setRequests((prevRequests) =>
        prevRequests.map((req) =>
          req.id === id ? { ...req, status: "Completed" } : req
        )
      );
    } catch (err) {
      alert("Failed to complete the booking.");
      console.error("Error:", err.response?.data || err.message);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="table-container">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">Service Request Management</h2>
        <div className="export-container">
          <Button 
            variant="outline-primary" 
            size="sm"
            onClick={handleExportCSV}
            disabled={exportLoading}
            className="export-btn"
            title="Export to CSV"
          >
            <FaFileExport className="me-1" />
            {exportLoading ? 'Exporting...' : 'CSV'}
          </Button>
        </div>
      </div>

      {/* Filter Section */}
      <Form className="mb-3">
        <Row>
          <Col md={4}>
            <Form.Group controlId="filterDate">
              <Form.Label>Filter by Date</Form.Label>
              <Form.Control
                type="date"
                value={filterDate}
                onChange={(e) => setFilterDate(e.target.value)}
                disabled={filterEmergency}
              />
            </Form.Group>
          </Col>

          <Col md={4}>
            <Form.Group controlId="filterServiceType">
              <Form.Label>Filter by Service Type</Form.Label>
              <Form.Select
                value={filterServiceType}
                onChange={(e) => setFilterServiceType(e.target.value)}
                disabled={filterEmergency}
              >
                <option value="">All Types</option>
                <option value="Automotive">Automotive</option>
                <option value="Residential">Residential</option>
                <option value="Commercial">Commercial</option>
                <option value="Emergency">Emergency</option>
              </Form.Select>
            </Form.Group>
          </Col>

          <Col md={4} className="d-flex align-items-center">
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
                }
              }}
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
                className={req.status === "Completed" ? "table-success" : ""}
              >
                <td>{req.id}</td>
                <td>{req.customer?.username || "N/A"}</td>
                <td>
                  {req.locksmith_status === "APPROVED"
                    ? req.customer?.email
                    : "Hidden"}
                </td>
                <td>{req.locksmith_service_type || "N/A"}</td>
                <td>{req.locksmith_service || "N/A"}</td>
                <td>{req.payment_intent_id || "N/A"}</td>
                <td>
                  {req.scheduled_date
                    ? new Date(req.scheduled_date).toLocaleString()
                    : "N/A"}
                </td>
                <td>{req.status || "Scheduled"}</td>
                <td>
                  {req.locksmith_status === "APPROVED"
                    ? req.customer_address
                    : "Hidden"}
                </td>
                <td>
                  {req.locksmith_status === "APPROVED"
                    ? req.customer_contact_number
                    : "Hidden"}
                </td>
                <td>
                  {req.locksmith_status === "APPROVED"
                    ? req.house_number
                    : "Hidden"}
                </td>
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
                  {req.locksmith_status === "PENDING" && (
                    <>
                      <Button
                        variant="success"
                        size="sm"
                        className="me-1"
                        onClick={() => handleBookingDecision(req.id, "approve")}
                      >
                        Accept
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleBookingDecision(req.id, "reject")}
                      >
                        Reject
                      </Button>
                    </>
                  )}
                  {req.locksmith_status === "APPROVED" &&
                    req.status !== "Completed" && (
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => markComplete(req.id)}
                      >
                        Complete
                      </Button>
                    )}
                  {req.locksmith_status === "APPROVED" &&
                    req.status === "Completed" && (
                      <span className="text-success fw-bold">✓ Completed</span>
                    )}
                  {req.locksmith_status === "DENIED" && (
                    <span className="text-danger fw-bold">✗ Rejected</span>
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
