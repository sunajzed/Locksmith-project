import React, { useState, useEffect } from "react";
import { Table, Container, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./ApproveService.css"; // Custom CSS file
import api from "./../../api/api";

const ApproveService = () => {    
  const [services, setServices] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);
  const [message, setMessage] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const fetchServices = async (search = searchTerm) => {
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
          params: search ? { search } : {},
        }
      );

      const fetchedServices = response.data;
      setServices(fetchedServices);
      setFilteredServices(fetchedServices);

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

  useEffect(() => {
    const userRole = localStorage.getItem("userRole");
    if (userRole !== "admin") {
      setMessage({ type: "danger", text: "Access Denied! Admins only." });
      setTimeout(() => navigate("/"), 2000);
      return;
    }

    fetchServices();
  }, [navigate, searchTerm]);

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

  const handleExportCSV = async () => {
    try {
      setIsLoading(true);
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        setMessage({ type: "danger", text: "Unauthorized. Please log in." });
        return;
      }

      const response = await api.get(
        "/api/admin/services/all_locksmith_services/",
        {
          headers: { Authorization: `Bearer ${accessToken}` },
          params: { export: 'csv' },
          responseType: 'blob',
        }
      );

      // Create a blob URL for the file
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'locksmith_services.csv');
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      setMessage({ type: "danger", text: "Failed to export services." });
      console.error("Error exporting services:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchServices(searchTerm);
  };

  const clearSearch = () => {
    setSearchTerm('');
    fetchServices('');
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
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="mb-0">Approve Locksmith Services</h2>
        <Button 
          variant="success" 
          onClick={handleExportCSV}
          disabled={isLoading || services.length === 0}
        >
          {isLoading ? 'Exporting...' : 'Export to CSV'}
        </Button>
      </div>
      
      {message && <Alert variant={message.type}>{message.text}</Alert>}
      
      <div className="search-container mb-3">
        <form onSubmit={handleSearch} className="d-flex gap-2">
          <div className="flex-grow-1">
            <input
              type="text"
              className="form-control"
              placeholder="Search by username, email, contact, or service type..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              disabled={isLoading}
            />
          </div>
          <Button 
            variant="primary" 
            type="submit"
            disabled={isLoading}
          >
            Search
          </Button>
          {searchTerm && (
            <Button 
              variant="outline-secondary" 
              onClick={clearSearch}
              disabled={isLoading}
            >
              Clear
            </Button>
          )}
        </form>
      </div>
      
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
          {isLoading ? (
            <tr>
              <td colSpan="16" className="text-center">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </td>
            </tr>
          ) : filteredServices.length === 0 ? (
            <tr>
              <td colSpan="16" className="text-center">
                {searchTerm ? 'No matching services found' : 'No services available'}
              </td>
            </tr>
          ) : (
            filteredServices.map((service) => (
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
          )}
        </tbody>
      </Table>
    </Container>
  );
};

export default ApproveService;