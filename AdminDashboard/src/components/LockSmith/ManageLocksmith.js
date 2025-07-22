import React, { useState, useEffect, useCallback, useMemo } from "react";
import "./ManageLocksmith.css";
import api from "../../api/api";
import { debounce } from "lodash";

const ManageLocksmith = () => {
  const [locksmiths, setLocksmiths] = useState([]);
  const [filteredLocksmiths, setFilteredLocksmiths] = useState([]);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("-user__date_joined");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const fetchLocksmiths = useCallback(
    async (search = "") => {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        setError("Unauthorized access. Please login as an admin.");
        return;
      }

      try {
        setIsLoading(true);
        const response = await api.get("/api/locksmiths/", {
          headers: { Authorization: `Bearer ${token}` },
          params: {
            search: search || undefined,
            ordering: sortOrder,
          },
        });
        setLocksmiths(response.data);
        setFilteredLocksmiths(response.data);
        setError("");
      } catch (err) {
        setError("Failed to fetch locksmiths.");
        console.error("Error fetching locksmiths:", err);
      } finally {
        setIsLoading(false);
      }
    },
    [sortOrder]
  );

  // Memoize the debounced search function
  const debouncedSearch = useMemo(
    () =>
      debounce((term) => {
        fetchLocksmiths(term);
      }, 300),
    [fetchLocksmiths]
  );

  // Cleanup debounce on unmount
  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  // Handle search term changes
  useEffect(() => {
    debouncedSearch(searchTerm);
  }, [searchTerm, debouncedSearch]);

  useEffect(() => {
    fetchLocksmiths();
  }, [fetchLocksmiths]);

  const handleApprove = async (id) => {
    const token = localStorage.getItem("accessToken");
    if (!token) return setError("Unauthorized access. Please login.");

    try {
      await api.put(
        `/api/locksmiths/${id}/verify_locksmith/`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setLocksmiths((prev) =>
        prev.map((l) => (l.id === id ? { ...l, is_approved: true } : l))
      );
    } catch (err) {
      setError(`Failed to approve locksmith with ID: ${id}`);
    }
  };

  const handleReject = async (id) => {
    const token = localStorage.getItem("accessToken");
    if (!token) return setError("Unauthorized access. Please login.");

    try {
      await api.put(
        `/api/locksmiths/${id}/reject_locksmith/`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setLocksmiths((prev) =>
        prev.map((l) => (l.id === id ? { ...l, is_approved: false } : l))
      );
    } catch (err) {
      setError(`Failed to reject locksmith with ID: ${id}`);
    }
  };

  const handleDiscountToggle = async (id) => {
    const token = localStorage.getItem("accessToken");
    if (!token) return setError("Unauthorized access. Please login.");

    const confirmToggle = window.confirm(
      "Are you sure you want to enable the discount for this locksmith?"
    );
    if (!confirmToggle) return;

    try {
      const response = await api.put(
        `/api/locksmiths/${id}/toggle_discount/`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const { is_discounted } = response.data;

      setLocksmiths((prev) =>
        prev.map((l) => (l.id === id ? { ...l, is_discounted } : l))
      );
    } catch (err) {
      setError(`Failed to toggle discount for locksmith ID: ${id}`);
    }
  };

  const handleExportCSV = async () => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      setError("Unauthorized access. Please login as an admin.");
      return;
    }

    try {
      setIsLoading(true);
      const response = await api.get("/api/locksmiths/export-csv/", {
        headers: { Authorization: `Bearer ${token}` },
        responseType: 'blob',
      });

      // Create a blob URL for the file
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'locksmiths_export.csv');
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      setError("Failed to export locksmiths data.");
      console.error("Error exporting locksmiths:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this locksmith? This action cannot be undone.")) {
      return;
    }

    const token = localStorage.getItem("accessToken");
    if (!token) {
      setError("Unauthorized access. Please login as an admin.");
      return;
    }

    try {
      setIsLoading(true);
      await api.delete(`/api/locksmiths/${id}/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      // Refresh the list after successful deletion
      setMessage({ type: "success", text: "Locksmith deleted successfully." });
      fetchLocksmiths(searchTerm);
    } catch (err) {
      setMessage({ type: "danger", text: "Failed to delete locksmith." });
      console.error("Error deleting locksmith:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleSortOrder = () => {
    setSortOrder(prev => prev.startsWith('-') ? 'user__date_joined' : '-user__date_joined');
  };

  return (
    <div className="locksmith-container">
      <div className="locksmith-header">
        <h2>Locksmith Details</h2>
        <div className="locksmith-actions">
          <button 
            className="btn btn-export"
            onClick={handleExportCSV}
            disabled={isLoading}
          >
            {isLoading ? 'Exporting...' : 'Export as CSV'}
          </button>
        </div>
      </div>
      
      <div className="locksmith-controls">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search by username, email, or contact"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          {searchTerm && (
            <button 
              className="clear-search"
              onClick={() => setSearchTerm('')}
              title="Clear search"
            >
              ×
            </button>
          )}
        </div>
        
        <div className="sort-container">
          <span>Sort by: </span>
          <button 
            className={`sort-button ${sortOrder.startsWith('-') ? 'desc' : 'asc'}`}
            onClick={toggleSortOrder}
            disabled={isLoading}
          >
            {sortOrder.startsWith('-') ? 'Newest First' : 'Oldest First'}
          </button>
        </div>
      </div>
      
      {message.text && (
        <div className={`alert alert-${message.type}`}>
          {message.text}
        </div>
      )}
      {error && <p className="error">{error}</p>}
      {isLoading && <div className="loading">Loading...</div>}

      <table className="locksmith-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Email</th>
            <th>Address</th>
            <th>Contact No</th>
            <th>PCC File</th>
            <th>Licence File</th>
            <th>Photo</th>
            <th>Service Area</th>
            <th>Status</th>
            <th>Discount</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredLocksmiths.map((l) => (
            <tr key={l.id}>
              <td>{l.id}</td>
              <td>{l.user.username}</td>
              <td>{l.user.email}</td>
              <td>{l.address}</td>
              <td>{l.contact_number}</td>
              <td>
                {l.pcc_file ? (
                  <a href={l.pcc_file} download>
                    Download
                  </a>
                ) : (
                  "No File"
                )}
              </td>
              <td>
                {l.license_file ? (
                  <a href={l.license_file} download>
                    Download
                  </a>
                ) : (
                  "No File"
                )}
              </td>
              <td>
                <img src={l.photo} alt="Locksmith" className="photo" />
              </td>
              <td>{l.service_area || "N/A"}</td>
              <td>{l.is_approved ? "Approved" : "Pending"}</td>
              <td>
                <div
                  title={
                    l.is_approved
                      ? ""
                      : "Approve the locksmith to enable discount toggle"
                  }
                >
                  <label
                    className={`switch ${
                      !l.is_approved ? "disabled-switch" : ""
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={l.is_discounted || false}
                      onChange={() => handleDiscountToggle(l.id)}
                      disabled={!l.is_approved}
                    />
                    <span className="slider round"></span>
                  </label>
                </div>
              </td>
              <td>
                <div className="action-buttons">
                  <button
                    className="btn-approve"
                    onClick={() => handleApprove(l.id)}
                    disabled={l.is_approved}
                  >
                    {l.is_approved ? "Approved" : "Approve"}
                  </button>
                  <button
                    className="btn-delete"
                    onClick={() => handleDelete(l.id)}
                    disabled={isLoading}
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageLocksmith;
