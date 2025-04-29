


import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../api/api";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import "./style.css";

const Emergency = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [geoLoading, setGeoLoading] = useState(true);
  const [error, setError] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [selectedService, setSelectedService] = useState(0); // Default to the first service
  const [filterValue, setFilterValue] = useState(""); // Default to the first service name
  const navigate = useNavigate();

  // Fetch geolocation
  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      setLoading(false);
      setGeoLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
        setGeoLoading(false);
      },
      (error) => {
        console.error("Error getting location:", error);
        setError("Failed to retrieve location. Please enable location services or enter your location manually.");
        setLoading(false);
        setGeoLoading(false);
      }
    );
  }, []);

  // Fetch services based on geolocation
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const response = await api.get("/api/admin/services/services_to_customer/", {
          params: {
            service_type: "emergency",
            latitude,
            longitude,
          },
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        });
        setServices(response.data);
        if (response.data.length > 0) {
          setFilterValue(response.data[0].service.admin_service_name);
        }
      } catch (err) {
        console.error("API Error:", err.response?.data || err.message);
        setError(err.response?.data?.message || "Failed to fetch services");
      } finally {
        setLoading(false);
      }
    };

    const debounceTimer = setTimeout(() => {
      if (latitude !== null && longitude !== null && !geoLoading) {
        fetchServices();
      }
    }, 500); // Debounce for 500ms

    return () => clearTimeout(debounceTimer);
  }, [latitude, longitude, geoLoading]);

  // Handle tab change
  const handleTabChange = (event, newValue) => {
    setSelectedService(newValue);
    setFilterValue(serviceNames[newValue]); // Sync filter dropdown with selected tab
  };

  // Handle filter change
  const handleFilterChange = (event) => {
    const selectedName = event.target.value;
    setFilterValue(selectedName);
    if (selectedName === "") {
      setSelectedService(-1); // Reset selected tab for "All Services"
    } else {
      const index = serviceNames.indexOf(selectedName);
      setSelectedService(index); // Sync selected tab with filter dropdown
    }
  };

  // Handle booking
  const handleBooking = async (service) => {
    if (!localStorage.getItem("accessToken")) {
      alert("Please log in to book a service.");
      navigate("/login");
      return;
    }
  
    const isConfirmed = window.confirm("Are you sure you want to book this service?");
    if (!isConfirmed) return;
  
    const token = localStorage.getItem("accessToken");
    const currentTime = new Date().toISOString();
    const bookingData = {
      service_request: service.id,
      locksmith: service.locksmith_id,
      scheduled_time: currentTime,
      scheduled_date: currentTime,
      locksmith_service: service.id,
    };
  
    try {
      await api.post("/api/bookings/", bookingData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      setBookingSuccess(true);
      setTimeout(() => {
        navigate("/confirm-payment", { state: { service } });
      }, 2000);
    } catch (error) {
      console.error("Booking failed:", error);
      alert("Booking failed. Please try again.");
    }
  };

  // Get unique service names for tabs and dropdown
  const serviceNames = [...new Set(services.map((service) => service.service.admin_service_name))];

  // Filter services based on the selected tab or filter dropdown
  const filteredServices = filterValue === ""
    ? services // Show all services when "All Services" is selected
    : services.filter((service) => service.service.admin_service_name === filterValue);

  if (loading || geoLoading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p className="loading-message">Fetching services near you...</p>
      </div>
    );
  }

  if (error) return <p className="error">{error}</p>;

  if (!loading && !geoLoading && filteredServices.length === 0) {
    return (
      <div className="no-services-message">
        <p>No services available in your area. Please try again later.</p>
      </div>
    );
  }

  return (
    <Box className="residential-container">
      <h2>Emergency Locksmith Services</h2>
      {bookingSuccess && (
        <div className="success-message">
          <p className="text-white">Booking Initialized! Redirecting to confirmation page...</p>
        </div>
      )}

      {/* Filter Dropdown */}
      <div className="filter-container">
        <label htmlFor="service-filter">Filter by Service: </label>
        <select
          id="service-filter"
          value={filterValue}
          onChange={handleFilterChange}
          className="filter-dropdown"
          aria-label="Filter services by name"
        >
          <option value="">All Services</option>
          {serviceNames.map((name, index) => (
            <option key={index} value={name}>
              {name}
            </option>
          ))}
        </select>
      </div>

      {/* Tabs for service names */}
      <Box
  sx={{
    width: "100%", // Ensure the container takes full width
    maxWidth: "1200px", // Limit maximum width for larger screens
    margin: "0 auto", // Center the container
    backgroundColor: "#f5f5f5",
    borderRadius: "10px",
    padding: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    marginBottom: "30px",
  }}
>
  <Tabs
    value={selectedService === -1 ? false : selectedService} // No tab selected for "All Services"
    onChange={handleTabChange}
    variant="scrollable"
    scrollButtons="auto"
    allowScrollButtonsMobile
    aria-label="service tabs"
    sx={{
      width: "100%", // Ensure Tabs take full width of the container
      "& .MuiTab-root": {
        fontSize: "1rem",
        fontWeight: "bold",
        color: "#333",
        textTransform: "none",
        minWidth: "200px", // Set a fixed minimum width for each tab
        flex: 1, // Allow tabs to grow and fill available space
        padding: "6px 8px",
        margin: "0 4px",
        "&:hover": {
          backgroundColor: "#f0f0f0",
        },
      },
      "& .Mui-selected": {
        color: "rgb(240, 178, 131)",
        backgroundColor: "#fff",
        borderRadius: "8px",
      },
      "& .MuiTabs-indicator": {
        backgroundColor: "rgb(240, 178, 131)",
        height: "3px",
      },
    }}
  >
    {serviceNames.map((name, index) => (
      <Tab key={index} label={name} />
    ))}
  </Tabs>
</Box>  

      {/* Services List */}
      <div className="services-list">
        {filteredServices.map((service, index) => (
          <ServiceCard key={index} service={service} onBook={handleBooking} />
        ))}
      </div>
    </Box>
  );
};

// Reusable ServiceCard Component
const ServiceCard = ({ service, onBook }) => (
  <div className="services-card">
    <div className="service-header">
      <h3>{service.service.admin_service_name}</h3>
      <p className="price">${service.service.total_price}</p>
    </div>
    {/* Availability Status */}
    <div
      className={`availability-status ${
        service.service.is_available ? "available" : "unavailable"
      }`}
    >
      {service.service.is_available ? "Open for Service" : "Currently Unavailable"}
    </div>
    {/* <p className="text-black">
      <strong>Locksmith:</strong> {service.locksmith}
    </p> */}
    <p className="text-black">
      <strong>Type:</strong> {service.service.service_type}
    </p>
    <p className="text-black">
      <strong>Distance:</strong> {service.distance_km} km
    </p>
    <p className="details text-black">{service.service.details}</p>
    <button
      className="book-button"
      onClick={() => onBook(service.service)}
      disabled={!service.service.is_available} // Disable button if unavailable
    >
      {service.service.is_available ? "Book Now" : "Unavailable"}
    </button>
  </div>
);
export default Emergency;
