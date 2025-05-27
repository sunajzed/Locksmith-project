import React, { useState, useEffect } from "react";
import api from './../../api/api';
import "./ViewService.css";

const ViewService = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedServices, setSelectedServices] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        if (!token) {
          setError("Authentication token missing. Please log in.");
          return;
        }

        const response = await api.get("/api/admin/services/available_services/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setServices(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch services. Please try again.");
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedServices(services.map((service) => service.id));
    } else {
      setSelectedServices([]);
    }
  };

  const handleSelectService = (id) => {
    setSelectedServices((prev) =>
      prev.includes(id) ? prev.filter((sid) => sid !== id) : [...prev, id]
    );
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this service?")) {
      return;
    }

    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        setError("Authentication token missing. Please log in.");
        return;
      }

      await api.delete(`/api/admin/services/${id}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setServices(services.filter((service) => service.id !== id));
      setSelectedServices(selectedServices.filter((sid) => sid !== id));
    } catch (err) {
      setError("Failed to delete service. Please try again.");
    }
  };

  const handleBulkDelete = async () => {
    if (selectedServices.length === 0) {
      setError("No services selected for deletion.");
      return;
    }

    if (!window.confirm(`Are you sure you want to delete ${selectedServices.length} service(s)?`)) {
      return;
    }

    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        setError("Authentication token missing. Please log in.");
        return;
      }

      const deletePromises = selectedServices.map((id) =>
        api.delete(`/api/admin/services/${id}/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
      );

      await Promise.all(deletePromises);

      setServices(services.filter((service) => !selectedServices.includes(service.id)));
      setSelectedServices([]);
    } catch (err) {
      setError("Failed to delete some or all services. Please try again.");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="view-service-container">
      <h2>Available Services</h2>
      <div className="bulk-actions">
        <button
          className="bulk-delete-button"
          onClick={handleBulkDelete}
          disabled={selectedServices.length === 0}
        >
          Delete Selected ({selectedServices.length})
        </button>
      </div>
      <table className="services-table">
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                checked={services.length > 0 && selectedServices.length === services.length}
                onChange={handleSelectAll}
              />
            </th>
            <th>ID</th>
            <th>Service Name</th>
            <th>Service Type</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {services.map((service) => (
            <tr key={service.id}>
              <td>
                <input
                  type="checkbox"
                  checked={selectedServices.includes(service.id)}
                  onChange={() => handleSelectService(service.id)}
                />
              </td>
              <td>{service.id}</td>
              <td>{service.name}</td>
              <td>{service.service_type || "N/A"}</td>
              <td>
                <button
                  className="delete-button"
                  onClick={() => handleDelete(service.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewService;