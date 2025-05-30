import React, { useState, useEffect } from "react";
import { Table, Container, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./ApproveService.css"; // Custom CSS file
import api from "./../../api/api";

const ApproveService = () => {    
  const [services, setServices] = useState([]);
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userRole = localStorage.getItem("userRole");
    if (userRole !== "admin") {
      setMessage({ type: "danger", text: "Access Denied! Admins only." });
      setTimeout(() => navigate("/"), 2000);
      return;
    }

    const fetchServices = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        if (!accessToken) {
          setMessage({ type: "danger", text: "Unauthorized. Please log in." });
          return;
        }

        const response = await api.get(
          "/api/admin/services/all_locksmith_services/",
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        );

        const fetchedServices = response.data;
        setServices(fetchedServices);

        // Auto-approve services that meet criteria
        fetchedServices.forEach((service) => {
          if (!service.approved && isValidService(service)) {
            handleApproval(service.id, "approve");
          }
        });
      } catch (error) {
        setMessage({ type: "danger", text: "Failed to fetch services." });
        console.error("Error fetching services:", error);
      }
    };

    fetchServices();
  }, [navigate]);

  // Function to validate if a service can be auto-approved
  const isValidService = (service) => {
    // Example criteria: Ensure required fields are present and valid
    return (
      service.locksmith_name &&
      service.admin_service_name &&
      service.service_type &&
      service.admin_service_id &&
      service.custom_price !== undefined &&
      service.details &&
      (!service.car_key_details || // If car_key_details is optional, or check its fields
        (service.car_key_details.manufacturer &&
         service.car_key_details.model &&
         service.car_key_details.year_from &&
         service.car_key_details.year_to))
    );
  };

  const handleApproval = async (id, action) => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        setMessage({ type: "danger", text: "Unauthorized. Please log in." });
        return;
      }

      await api.post(
        `/api/admin/service-approval/${id}/${action}/`,
        {},
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );

      if (action === "approve") {
        setServices((prevServices) =>
          prevServices.map((service) =>
            service.id === id ? { ...service, approved: true } : service
          )
        );
        setMessage({ type: "success", text: `Service ${id} approved successfully!` });
      } else if (action === "reject") {
        setServices((prevServices) => prevServices.filter((service) => service.id !== id));
        setMessage({ type: "success", text: `Service ${id} rejected and removed successfully!` });
      }
    } catch (error) {
      setMessage({ type: "danger", text: `Failed to update service ${id} status.` });
      console.error(`Error ${action}ing service:`, error);
    }
  };

  return (
    <Container className="approve-service-container">
      <h2 className="text-center">Approve Locksmith Services</h2>
      {message && <Alert variant={message.type}>{message.text}</Alert>}
      <Table bordered responsive className="mt-3 custom-table">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Locksmith Name</th>
            <th>Admin Service Name</th>
            <th>Service Type</th>
            <th>Admin Service ID</th>
            <th>Custom Price ($)</th>
            <th>Additional Key Price ($)</th>
            <th>Total Price ($)</th>
            <th>Details</th>
            <th>Manufacturer</th>
            <th>Model</th>
            <th>Year From</th>
            <th>Year To</th>
            <th>Buttons</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {services.length > 0 ? (
            services.map((service) => (
              <tr key={service.id}>
                <td>{service.id}</td>
                <td>{service.locksmith_name}</td>
                <td>{service.admin_service_name}</td>
                <td>{service.service_type}</td>
                <td>{service.admin_service_id}</td>
                <td>{service.custom_price}</td>
                <td>{service.additional_key_price || "N/A"}</td>
                <td>{service.total_price || "N/A"}</td>
                <td>{service.details}</td>
                <td>{service.car_key_details?.manufacturer || "N/A"}</td>
                <td>{service.car_key_details?.model || "N/A"}</td>
                <td>{service.car_key_details?.year_from || "N/A"}</td>
                <td>{service.car_key_details?.year_to || "N/A"}</td>
                <td>{service.car_key_details?.number_of_buttons || "N/A"}</td>
                <td className={`status ${service.approved ? "approved" : "pending"}`}>
                  {service.approved ? "Approved" : "Pending"}
                </td>
                <td className="d-flex justify-content-center">
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleApproval(service.id, "reject")}
                  >
                    Reject
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="16" className="text-center">
                No locksmith services found.
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </Container>
  );
};

export default ApproveService;