import { useState, useEffect } from "react";
import api from "../../api/api";
import "./ManageSuggestedServices.css";

const ManageSuggestedServices = () => {
  const [suggestions, setSuggestions] = useState([]);
  const [filteredStatus, setFilteredStatus] = useState("pending");
  const [editSuggestion, setEditSuggestion] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    service_type: "",
    price: "",
    additional_key_price: "",
    supported_vehicles: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const serviceTypes = ["smart_lock", "automotive", "commercial", "residential"];

  useEffect(() => {
    const fetchSuggestions = async () => {
      try {
        const response = await api.get("/api/suggested-services/");
        setSuggestions(response.data);
      } catch (error) {
        setError("Failed to fetch service suggestions.");
        console.error(error);
      }
    };
    fetchSuggestions();
  }, []);

  const handleApprove = (suggestion) => {
    setError("");
    setSuccess("");
    setEditSuggestion(suggestion);
    setFormData({
      name: suggestion.name,
      service_type: suggestion.service_type,
      price: parseFloat(suggestion.price).toFixed(2),
      additional_key_price: parseFloat(suggestion.additional_key_price).toFixed(2),
      supported_vehicles: suggestion.supported_vehicles || "",
    });
  };

  const handleConfirmApprove = async () => {
    try {
      const payload = {
        name: formData.name,
        service_type: formData.service_type,
        price: parseFloat(formData.price).toFixed(2),
        additional_key_price: parseFloat(formData.additional_key_price).toFixed(2),
        ...(formData.service_type === "automotive" && {
          supported_vehicles: formData.supported_vehicles,
          car_key_details: editSuggestion.car_key_details,
        }),
      };
      await api.post(`/api/suggested-services/${editSuggestion.id}/confirm_and_add/`, payload);
      setSuccess("Service approved and added successfully!");
      setSuggestions(suggestions.filter((s) => s.id !== editSuggestion.id));
      setEditSuggestion(null);
      // Refresh suggestions after approval
      const response = await api.get("/api/suggested-services/");
      setSuggestions(response.data);
    } catch (error) {
      setError(
        error.response?.data?.non_field_errors?.[0] ||
          error.response?.data?.error ||
          "Failed to approve service suggestion."
      );
    }
  };

  const handleReject = async (id) => {
    setError("");
    setSuccess("");
    try {
      await api.post(`/api/suggested-services/${id}/reject_suggestion/`);
      setSuccess("Suggestion rejected successfully!");
      setSuggestions(suggestions.filter((s) => s.id !== id));
      // Refresh suggestions after rejection
      const response = await api.get("/api/suggested-services/");
      setSuggestions(response.data);
    } catch (error) {
      setError("Failed to reject service suggestion.");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleStatusFilter = (status) => {
    setFilteredStatus(status);
    setEditSuggestion(null);
  };

  const filteredSuggestions = suggestions.filter(
    (s) => filteredStatus === "all" || s.status === filteredStatus
  );

  return (
    <div className="manage-suggested-services">
      <h2>Manage Suggested Services</h2>
      <div className="status-filter">
        <button
          className={`btn btn-outline-primary ${filteredStatus === "pending" ? "active" : ""}`}
          onClick={() => handleStatusFilter("pending")}
        >
          Pending
        </button>
        <button
          className={`btn btn-outline-primary ${filteredStatus === "approved" ? "active" : ""}`}
          onClick={() => handleStatusFilter("approved")}
        >
          Approved
        </button>
        <button
          className={`btn btn-outline-primary ${filteredStatus === "rejected" ? "active" : ""}`}
          onClick={() => handleStatusFilter("rejected")}
        >
          Rejected
        </button>
        <button
          className={`btn btn-outline-primary ${filteredStatus === "all" ? "active" : ""}`}
          onClick={() => handleStatusFilter("all")}
        >
          All
        </button>
      </div>
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Service Type</th>
            <th>Price</th>
            <th>Additional Key Price</th>
            <th>Supported Vehicles</th>
            <th>Car Key Details</th>
            <th>Created At</th>
            <th>Suggested By</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredSuggestions.map((suggestion) => (
            <tr key={suggestion.id}>
              <td>{suggestion.id}</td>
              <td>{suggestion.name}</td>
              <td>{suggestion.service_type}</td>
              <td>${parseFloat(suggestion.price).toFixed(2)}</td>
              <td>${parseFloat(suggestion.additional_key_price).toFixed(2)}</td>
              <td>{suggestion.supported_vehicles || "N/A"}</td>
              <td>
                {suggestion.car_key_details ? (
                  <ul>
                    {suggestion.car_key_details.map((detail, index) => (
                      <li key={index}>
                        {detail.manufacturer} {detail.model} ({detail.year_from}-
                        {detail.year_to}, {detail.number_of_buttons} buttons)
                      </li>
                    ))}
                  </ul>
                ) : (
                  "N/A"
                )}
              </td>
              <td>{new Date(suggestion.created_at).toLocaleDateString()}</td>
              <td>{suggestion.suggested_by}</td>
              <td>
                <span className={`status-badge status-${suggestion.status}`}>
                  {suggestion.status.charAt(0).toUpperCase() + suggestion.status.slice(1)}
                </span>
              </td>
              <td>
                {suggestion.status === "pending" ? (
                  <>
                    <button
                      className="btn btn-success btn-sm"
                      onClick={() => handleApprove(suggestion)}
                    >
                      Approve
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleReject(suggestion.id)}
                    >
                      Reject
                    </button>
                  </>
                ) : (
                  "N/A"
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editSuggestion && (
        <div className="approve-form">
          <h3>Approve Service: {editSuggestion.name}</h3>
          <form onSubmit={(e) => { e.preventDefault(); handleConfirmApprove(); }}>
            <div className="form-group">
              <label htmlFor="name">Service Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="service_type">Service Type</label>
              <select
                className="form-control"
                id="service_type"
                name="service_type"
                value={formData.service_type}
                onChange={handleInputChange}
              >
                {serviceTypes.map((type) => (
                  <option key={type} value={type}>
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="price">Price ($)</label>
              <input
                type="number"
                className="form-control"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                step="0.01"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="additional_key_price">Additional Key Price ($)</label>
              <input
                type="number"
                className="form-control"
                id="additional_key_price"
                name="additional_key_price"
                value={formData.additional_key_price}
                onChange={handleInputChange}
                step="0.01"
                required
              />
            </div>
            {formData.service_type === "automotive" && (
              <>
                <div className="form-group">
                  <label htmlFor="supported_vehicles">Supported Vehicles</label>
                  <input
                    type="text"
                    className="form-control"
                    id="supported_vehicles"
                    name="supported_vehicles"
                    value={formData.supported_vehicles}
                    onChange={handleInputChange}
                    placeholder="e.g., Toyota, Honda, Ford"
                  />
                </div>
                <div className="form-group">
                  <label>Car Key Details (Read-Only)</label>
                  {editSuggestion.car_key_details ? (
                    <ul className="car-key-details">
                      {editSuggestion.car_key_details.map((detail, index) => (
                        <li key={index}>
                          {detail.manufacturer} {detail.model} ({detail.year_from}-
                          {detail.year_to}, {detail.number_of_buttons} buttons)
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p>No car key details provided.</p>
                  )}
                </div>
              </>
            )}
            <button type="submit" className="btn btn-primary">
              Confirm Approval
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => setEditSuggestion(null)}
            >
              Cancel
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ManageSuggestedServices;