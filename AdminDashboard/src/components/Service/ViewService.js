import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Table, Container, Alert } from "react-bootstrap";
import api from './../../api/api';
import "./ViewService.css"; // Import CSS

const ViewServices = () => {
  const [services, setServices] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchServices = async () => {
      try {
        // Fetch services from the API
        const response = await api.get("/api/admin/services/");
        setServices(response.data);
      } catch (error) {
        console.error("Error fetching services:", error);
        setError("Failed to fetch services. Please try again.");

        // Handle 401 Unauthorized errors (token expired or invalid)
        if (error.response && error.response.status === 401) {
          // Clear local storage and redirect to login
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          localStorage.removeItem("userRole");
          localStorage.removeItem("username");
          navigate("/"); // Redirect to login page
        }
      }
    };

    fetchServices();
  }, [navigate]);

  return (
    <Container className="table-container">
      <h2 className="text-center mb-4">View Services</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <div className="table-responsive">
        <Table bordered hover className="service-table">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Service Name</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {services.map((service) => (
              <tr key={service.id}>
                <td>{service.id}</td>
                <td>{service.name}</td>
                <td>{service.description}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </Container>
  );
};

export default ViewServices;