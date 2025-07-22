import { useState, useEffect } from "react";
import api from "../../api/api";
import "./ManageCarKeyDetails.css";

const ManageCarKeyDetails = () => {
  const [carKeyDetails, setCarKeyDetails] = useState([]);
  const [formData, setFormData] = useState({
    manufacturer: "",
    model: "",
    year_from: "",
    year_to: "",
    number_of_buttons: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch all car key details on component mount
  useEffect(() => {
    fetchCarKeyDetails();
  }, []);

  const fetchCarKeyDetails = async (search = "") => {
    setIsLoading(true);
    try {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        setError("No access token found. Please log in again.");
        return;
      }

      const params = {};
      if (search) {
        params.search = search;
      }

      const response = await api.get("/api/carkeydetails/", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params,
      });

      setCarKeyDetails(response.data);
    } catch (err) {
      console.error("Error fetching car key details:", err);
      setError(
        err.response?.data?.detail ||
          err.response?.data?.message ||
          "Failed to fetch car key details. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    if (
      !formData.manufacturer ||
      !formData.model ||
      !formData.year_from ||
      !formData.year_to ||
      !formData.number_of_buttons
    ) {
      setError("All fields are required");
      return false;
    }

    const yearFrom = parseInt(formData.year_from);
    const yearTo = parseInt(formData.year_to);
    if (isNaN(yearFrom) || isNaN(yearTo)) {
      setError("Years must be valid numbers");
      return false;
    }
    if (yearFrom > yearTo) {
      setError("Year From cannot be greater than Year To");
      return false;
    }
    if (yearFrom < 1900 || yearTo > new Date().getFullYear() + 1) {
      setError("Years must be realistic");
      return false;
    }

    const numButtons = parseInt(formData.number_of_buttons);
    if (isNaN(numButtons) || numButtons < 0) {
      setError("Number of buttons must be a valid non-negative number");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!validateForm()) return;

    try {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        setError("No access token found. Please log in again.");
        return;
      }

      const payload = {
        manufacturer: formData.manufacturer,
        model: formData.model,
        year_from: parseInt(formData.year_from),
        year_to: parseInt(formData.year_to),
        number_of_buttons: parseInt(formData.number_of_buttons),
      };

      if (editingId) {
        // Update existing
        await api.put(`/api/carkeydetails/${editingId}/`, payload, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setSuccess("Car key details updated successfully!");
      } else {
        // Create new
        await api.post("/api/car-key-details/", payload, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setSuccess("Car key details added successfully!");
      }

      // Refresh the list and reset form
      fetchCarKeyDetails();
      resetForm();
    } catch (err) {
      console.error("Error saving car key details:", err);
      setError(
        err.response?.data?.detail ||
          err.response?.data?.message ||
          "Failed to save car key details. Please try again."
      );
    }
  };

  const handleEdit = (detail) => {
    setFormData({
      manufacturer: detail.manufacturer,
      model: detail.model,
      year_from: detail.year_from.toString(),
      year_to: detail.year_to.toString(),
      number_of_buttons: detail.number_of_buttons.toString(),
    });
    setEditingId(detail.id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this car key detail?")) {
      return;
    }

    try {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        setError("No access token found. Please log in again.");
        return;
      }

      await api.delete(`/api/carkeydetails/${id}/`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      setSuccess("Car key detail deleted successfully!");
      fetchCarKeyDetails();
    } catch (err) {
      console.error("Error deleting car key detail:", err);
      setError(
        err.response?.data?.detail ||
          err.response?.data?.message ||
          "Failed to delete car key detail. Please try again."
      );
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchCarKeyDetails(searchTerm);
  };

  const handleExportCSV = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        setError("No access token found. Please log in again.");
        return;
      }

      const response = await api.get("/api/carkeydetails/", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: { export: 'csv' },
        responseType: 'blob',
      });

      // Create a blob URL for the file
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'car_key_details.csv');
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Error exporting CSV:", err);
      setError(
        err.response?.data?.detail ||
          err.response?.data?.message ||
          "Failed to export car key details. Please try again."
      );
    }
  };

  const resetForm = () => {
    setFormData({
      manufacturer: "",
      model: "",
      year_from: "",
      year_to: "",
      number_of_buttons: "",
    });
    setEditingId(null);
  };

  return (
    <div className="manage-car-key-details">
      <div className="header-container">
        <h2>Manage Car Key Details</h2>
        <button 
          onClick={handleExportCSV} 
          className="export-button"
          title="Export to CSV"
          disabled={isLoading || carKeyDetails.length === 0}
        >
          {isLoading ? 'Exporting...' : 'Export to CSV'}
        </button>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      <div className="search-container">
        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            placeholder="Search by manufacturer, model, or year..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
            disabled={isLoading}
          />
          <button 
            type="submit" 
            className="search-button"
            disabled={isLoading}
          >
            Search
          </button>
          {searchTerm && (
            <button
              type="button"
              className="clear-search"
              onClick={() => {
                setSearchTerm("");
                fetchCarKeyDetails();
              }}
              disabled={isLoading}
            >
              Clear
            </button>
          )}
        </form>
      </div>

      <form onSubmit={handleSubmit} className="car-key-form mb-5">
        <h3>{editingId ? "Edit" : "Add New"} Car Key Details</h3>
        
        <div className="form-group">
          <label htmlFor="manufacturer">Manufacturer</label>
          <input
            type="text"
            id="manufacturer"
            name="manufacturer"
            value={formData.manufacturer}
            onChange={handleChange}
            className="form-control"
            placeholder="e.g., Toyota"
          />
        </div>

        <div className="form-group">
          <label htmlFor="model">Model</label>
          <input
            type="text"
            id="model"
            name="model"
            value={formData.model}
            onChange={handleChange}
            className="form-control"
            placeholder="e.g., Corolla"
          />
        </div>

        <div className="form-group">
          <label htmlFor="year_from">Year From</label>
          <input
            type="number"
            id="year_from"
            name="year_from"
            value={formData.year_from}
            onChange={handleChange}
            className="form-control"
            placeholder="e.g., 2018"
          />
        </div>

        <div className="form-group">
          <label htmlFor="year_to">Year To</label>
          <input
            type="number"
            id="year_to"
            name="year_to"
            value={formData.year_to}
            onChange={handleChange}
            className="form-control"
            placeholder="e.g., 2025"
          />
        </div>

        <div className="form-group">
          <label htmlFor="number_of_buttons">Number of Buttons</label>
          <input
            type="number"
            id="number_of_buttons"
            name="number_of_buttons"
            value={formData.number_of_buttons}
            onChange={handleChange}
            className="form-control"
            placeholder="e.g., 3"
            min="0"
          />
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn-primary">
            {editingId ? "Update" : "Create"}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={resetForm}
              className="btn btn-secondary ml-2"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <h3>Existing Car Key Details</h3>
      {isLoading ? (
        <div className="text-center">Loading...</div>
      ) : carKeyDetails.length === 0 ? (
        <div className="alert alert-info">No car key details found.</div>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Manufacturer</th>
                <th>Model</th>
                <th>Year Range</th>
                <th>Buttons</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {carKeyDetails.map((detail) => (
                <tr key={detail.id}>
                  <td>{detail.manufacturer}</td>
                  <td>{detail.model}</td>
                  <td>
                    {detail.year_from} - {detail.year_to}
                  </td>
                  <td>{detail.number_of_buttons}</td>
                  <td>
                    <button
                      onClick={() => handleEdit(detail)}
                      className="btn btn-sm btn-outline-primary mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(detail.id)}
                      className="btn btn-sm btn-outline-danger"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ManageCarKeyDetails;
