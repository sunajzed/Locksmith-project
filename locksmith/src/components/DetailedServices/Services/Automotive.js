// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import api from "../../../api/api";
// import Box from "@mui/material/Box";
// import Tabs from "@mui/material/Tabs";
// import Tab from "@mui/material/Tab";
// import "./automotivestyle.css";

// const Automotive = () => {
//   const [services, setServices] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [geoLoading, setGeoLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [latitude, setLatitude] = useState(null);
//   const [longitude, setLongitude] = useState(null);
//   const [bookingSuccess, setBookingSuccess] = useState(false);
//   const [selectedService, setSelectedService] = useState(0);
//   const [filterValue, setFilterValue] = useState("");
//   const navigate = useNavigate();

//   // Fetch geolocation
//   useEffect(() => {
//     if (!navigator.geolocation) {
//       setError("Geolocation is not supported by your browser.");
//       setLoading(false);
//       setGeoLoading(false);
//       return;
//     }

//     navigator.geolocation.getCurrentPosition(
//       (position) => {
//         setLatitude(position.coords.latitude);
//         setLongitude(position.coords.longitude);
//         setGeoLoading(false);
//       },
//       (error) => {
//         console.error("Error getting location:", error);
//         setError("Failed to retrieve location. Please enable location services or enter your location manually.");
//         setLoading(false);
//         setGeoLoading(false);
//       }
//     );
//   }, []);

//   // Fetch services based on geolocation
//   useEffect(() => {
//     const fetchServices = async () => {
//       try {
//         const token = localStorage.getItem("accessToken");
//         const response = await api.get("/api/admin/services/services_to_customer/", {
//           params: {
//             service_type: "automotive",
//             latitude,
//             longitude,
//           },
//           headers: {
//             Authorization: token ? `Bearer ${token}` : "",
//           },
//         });
//         console.log('API Response:', response.data); // Debugging log
//         setServices(response.data);
//         if (response.data.length > 0) {
//           setFilterValue(response.data[0].service.admin_service_name);
//         }
//       } catch (err) {
//         console.error("API Error:", err.response?.data || err.message);
//         setError(err.response?.data?.message || "Failed to fetch services");
//       } finally {
//         setLoading(false);
//       }
//     };

//     const debounceTimer = setTimeout(() => {
//       if (latitude !== null && longitude !== null && !geoLoading) {
//         fetchServices();
//       }
//     }, 500);

//     return () => clearTimeout(debounceTimer);
//   }, [latitude, longitude, geoLoading]);

//   // Handle tab change
//   const handleTabChange = (event, newValue) => {
//     setSelectedService(newValue);
//     const serviceNames = [...new Set(services.map((service) => service.service.admin_service_name))];
//     setFilterValue(serviceNames[newValue]);
//   };

//   // Handle filter change
//   const handleFilterChange = (event) => {
//     const selectedName = event.target.value;
//     setFilterValue(selectedName);
//     if (selectedName === "") {
//       setSelectedService(-1);
//     } else {
//       const serviceNames = [...new Set(services.map((service) => service.service.admin_service_name))];
//       const index = serviceNames.indexOf(selectedName);
//       setSelectedService(index);
//     }
//   };

//   // Handle booking
//   const handleBooking = async (service) => {
//     if (!localStorage.getItem("accessToken")) {
//       alert("Please log in to book a service.");
//       navigate("/login");
//       return;
//     }
  
//     const isConfirmed = window.confirm("Are you sure you want to book this service?");
//     if (!isConfirmed) return;
  
//     const token = localStorage.getItem("accessToken");
//     const currentTime = new Date().toISOString();
//     const bookingData = {
//       service_request: service.id,
//       locksmith: service.locksmith_id,
//       scheduled_time: currentTime,
//       scheduled_date: currentTime,
//       locksmith_service: service.id,
//     };
  
//     try {
//       await api.post("/api/bookings/", bookingData, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//       });
//       setBookingSuccess(true);
//       setTimeout(() => {
//         navigate("/confirm-payment", { state: { service } });
//       }, 2000);
//     } catch (error) {
//       console.error("Booking failed:", error);
//       alert("Booking failed. Please try again.");
//     }
//   };

//   // Get unique service names for tabs and dropdown
//   const serviceNames = [...new Set(services.map((service) => service.service.admin_service_name))];

//   // Filter services based on the selected tab or filter dropdown
//   const filteredServices = filterValue === ""
//     ? services
//     : services.filter((service) => service.service.admin_service_name === filterValue);

//   if (loading || geoLoading) {
//     return (
//       <div className="loading-container">
//         <div className="loading-spinner"></div>
//         <p className="loading-message">Fetching services near you...</p>
//       </div>
//     );
//   }

//   if (error) return <p className="error">{error}</p>;

//   if (!loading && !geoLoading && filteredServices.length === 0) {
//     return (
//       <div className="no-services-message">
//         <p>No services available in your area. Please try again later.</p>
//       </div>
//     );
//   }

//   return (
//     <Box className="residential-container">
//       <h2>Automotive Locksmith Services</h2>
//       {bookingSuccess && (
//         <div className="success-message">
//           <p className="text-white">Booking Initialized! Redirecting to confirmation page...</p>
//         </div>
//       )}

//       {/* Filter Dropdown */}
//       <div className="filter-container">
//         <label htmlFor="service-filter">Filter by Service: </label>
//         <select
//           id="service-filter"
//           value={filterValue}
//           onChange={handleFilterChange}
//           className="filter-dropdown"
//           aria-label="Filter services by name"
//         >
//           <option value="">All Services</option>
//           {serviceNames.map((name, index) => (
//             <option key={index} value={name}>
//               {name}
//             </option>
//           ))}
//         </select>
//       </div>

//       {/* Tabs for service names */}
//       <Box
//         sx={{
//           width: "100%",
//           maxWidth: "1200px",
//           margin: "0 auto",
//           backgroundColor: "#f5f5f5",
//           borderRadius: "10px",
//           padding: "10px",
//           boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
//           marginBottom: "30px",
//         }}
//       >
//         <Tabs
//           value={selectedService === -1 ? false : selectedService}
//           onChange={handleTabChange}
//           variant="scrollable"
//           scrollButtons="auto"
//           allowScrollButtonsMobile
//           aria-label="service tabs"
//           sx={{
//             width: "100%",
//             "& .MuiTab-root": {
//               fontSize: "1rem",
//               fontWeight: "bold",
//               color: "#333",
//               textTransform: "none",
//               minWidth: "200px",
//               flex: 1,
//               padding: "6px 8px",
//               margin: "0 4px",
//               "&:hover": {
//                 backgroundColor: "#f0f0f0",
//               },
//             },
//             "& .Mui-selected": {
//               color: "rgb(240, 178, 131)",
//               backgroundColor: "#fff",
//               borderRadius: "8px",
//             },
//             "& .MuiTabs-indicator": {
//               backgroundColor: "rgb(240, 178, 131)",
//               height: "3px",
//             },
//           }}
//         >
//           {serviceNames.map((name, index) => (
//             <Tab key={index} label={name} />
//           ))}
//         </Tabs>
//       </Box>

//       {/* Services List */}
//       <div className="services-list">
//         {filteredServices.map((service, index) => (
//           <ServiceCard key={index} service={service} onBook={handleBooking} />
//         ))}
//       </div>
//     </Box>
//   );
// };

// const ServiceCard = ({ service, onBook }) => {
//   const carKeyDetails = service.car_key_details || service.service?.car_key_details || {};

//   return (
//     <div className="services-card">
//       <div className="service-header">
//         <h3 className="service-title">{service.service.admin_service_name}</h3>
//         <p className="price">${service.service.total_price}</p>
//       </div>

//       <div className={`availability-status ${service.service.is_available ? "available" : "unavailable"}`}>
//         {service.service.is_available ? "Available Now" : "Currently Unavailable"}
//       </div>

//       {/* Improved Car Key Details Section */}
//       <div className="car-key-details-section">
//         <h4 className="section-title">Key Specifications</h4>
//         <div className="specs-grid">
//           <div className="spec-item">
//             <span className="spec-label">Make:</span>
//             <span className="spec-value">{carKeyDetails.manufacturer || "N/A"}</span>
//           </div>
//           <div className="spec-item">
//             <span className="spec-label">Model:</span>
//             <span className="spec-value">{carKeyDetails.model || "N/A"}</span>
//           </div>
//           <div className="spec-item">
//             <span className="spec-label">Year:</span>
//             <span className="spec-value">{carKeyDetails.year || "N/A"}</span>
//           </div>
//           <div className="spec-item">
//             <span className="spec-label">Buttons:</span>
//             <span className="spec-value">{carKeyDetails.number_of_buttons || "N/A"}</span>
//           </div>
//         </div>
//       </div>

//       <div className="service-meta">
//         <div className="meta-item">
//           <span className="meta-label">Locksmith:</span>
//           <span className="meta-value">{service.locksmith}</span>
//         </div>
//         <div className="meta-item">
//           <span className="meta-label">Distance:</span>
//           <span className="meta-value">{service.distance_km} km</span>
//         </div>
//       </div>

//       <p className="service-description">{service.service.details}</p>

//       <button
//         className={`book-button ${service.service.is_available ? "" : "disabled"}`}
//         onClick={() => onBook(service)} 
//         disabled={!service.service.is_available}
//       >
//         {service.service.is_available ? "Book Now" : "Unavailable"}
//       </button>
//     </div>
//   );
// };

// export default Automotive;


import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../api/api";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import "./automotivestyle.css";
import debounce from "lodash/debounce";

const Automotive = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [geoLoading, setGeoLoading] = useState(true);
  const [error, setError] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [selectedService, setSelectedService] = useState(0);
  const [filterValue, setFilterValue] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
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
            service_type: "automotive",
            latitude,
            longitude,
          },
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        });
        console.log('API Response:', response.data);
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
    }, 500);

    return () => clearTimeout(debounceTimer);
  }, [latitude, longitude, geoLoading]);

  // Handle tab change
  const handleTabChange = (event, newValue) => {
    setSelectedService(newValue);
    const serviceNames = [...new Set(services.map((service) => service.service.admin_service_name))];
    setFilterValue(serviceNames[newValue]);
  };

  // Handle filter change
  const handleFilterChange = (event) => {
    const selectedName = event.target.value;
    setFilterValue(selectedName);
    if (selectedName === "") {
      setSelectedService(-1);
    } else {
      const serviceNames = [...new Set(services.map((service) => service.service.admin_service_name))];
      const index = serviceNames.indexOf(selectedName);
      setSelectedService(index);
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

  // Debounced search handler
  const debouncedSearch = debounce(async (query) => {
    if (!query) {
      setSearchResults([]);
      return;
    }
    setIsSearching(true);
    try {
      const token = localStorage.getItem("accessToken");
      const response = await api.get("/api/car-key-details/", {
        params: { search: query },
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
      });
      console.log('Search API Response:', response.data);

      const matchingServices = services.filter((service) => {
        const carKey = service.car_key_details || service.service?.car_key_details || {};
        return (
          (carKey.model && carKey.model.toLowerCase().includes(query.toLowerCase())) ||
          (carKey.manufacturer && carKey.manufacturer.toLowerCase().includes(query.toLowerCase())) ||
          (carKey.year && carKey.year.toString().includes(query)) ||
          (carKey.number_of_buttons && carKey.number_of_buttons.toString().includes(query))
        );
      });

      setSearchResults(matchingServices);
    } catch (err) {
      console.error("Search API Error:", err.response?.data || err.message);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  }, 500);  // debounce delay of 500ms

  const handleSearchInputChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    debouncedSearch(query);
  };

  const serviceNames = [...new Set(services.map((service) => service.service.admin_service_name))];

  const filteredServices = filterValue === ""
    ? services
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

  if (!loading && !geoLoading && services.length === 0) {
    return (
      <div className="no-services-message">
        <p>No services available in your area. Please try again later.</p>
      </div>
    );
  }

  // Check if no results are found
  const noResultsFound = searchQuery && searchResults.length === 0;

  return (
    <Box className="residential-container">
      <h2>Automotive Locksmith Services</h2>
      {bookingSuccess && (
        <div className="success-message">
          <p className="text-white">Booking Initialized! Redirecting to confirmation page...</p>
        </div>
      )}

      {/* Search Input */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Search by model, manufacturer, year, or number of buttons"
          value={searchQuery}
          onChange={handleSearchInputChange}
          className="search-input"
        />
      </div>

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

      {/* Tabs */}
      <Box
        sx={{
          width: "100%",
          maxWidth: "1200px",
          margin: "0 auto",
          backgroundColor: "#f5f5f5",
          borderRadius: "10px",
          padding: "10px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          marginBottom: "30px",
        }}
      >
        <Tabs
          value={selectedService === -1 ? false : selectedService}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
          allowScrollButtonsMobile
          aria-label="service tabs"
          sx={{
            width: "100%",
            "& .MuiTab-root": {
              fontSize: "1rem",
              fontWeight: "bold",
              color: "#333",
              textTransform: "none",
              minWidth: "200px",
              flex: 1,
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

      {/* No Results Found Message */}
      {noResultsFound && (
        <div className="no-results-message">
          <p>No results found. Try searching with different keywords.</p>
        </div>
      )}

      {/* Services List */}
      <div className="services-list">
        {(searchQuery && searchResults.length > 0 ? searchResults : filteredServices).map((service, index) => (
          <ServiceCard key={index} service={service} onBook={handleBooking} />
        ))}
      </div>
    </Box>
  );
};

const ServiceCard = ({ service, onBook }) => {
  const carKeyDetails = service.car_key_details || service.service?.car_key_details || {};

  return (
    <div className="services-card">
      <div className="service-header">
        <h3 className="service-title">{service.service.admin_service_name}</h3>
        <p className="price">${service.service.total_price}</p>
      </div>

      <div className={`availability-status ${service.service.is_available ? "available" : "unavailable"}`}>
        {service.service.is_available ? "Available Now" : "Currently Unavailable"}
      </div>

      <div className="car-key-details-section">
        <h4 className="section-title">Key Specifications</h4>
        <div className="specs-grid">
          <div className="spec-item">
            <span className="spec-label">Make:</span>
            <span className="spec-value">{carKeyDetails.manufacturer || "N/A"}</span>
          </div>
          <div className="spec-item">
            <span className="spec-label">Model:</span>
            <span className="spec-value">{carKeyDetails.model || "N/A"}</span>
          </div>
          <div className="spec-item">
            <span className="spec-label">Year:</span>
            <span className="spec-value">{carKeyDetails.year || "N/A"}</span>
          </div>
          <div className="spec-item">
            <span className="spec-label">Buttons:</span>
            <span className="spec-value">{carKeyDetails.number_of_buttons || "N/A"}</span>
          </div>
        </div>
      </div>

      <div className="service-meta">
        {/* <div className="meta-item">
          <span className="meta-label">Locksmith:</span>
          <span className="meta-value">{service.locksmith}</span>
        </div> */}
        <div className="meta-item">
          <span className="meta-label">Distance:</span>
          <span className="meta-value">{service.distance_km} km</span>
        </div>
      </div>

      <p className="service-description">{service.service.details}</p>

      <button
        className={`book-button ${service.service.is_available ? "" : "disabled"}`}
        onClick={() => onBook(service)}
        disabled={!service.service.is_available}
      >
        {service.service.is_available ? "Book Now" : "Unavailable"}
      </button>
    </div>
  );
};

export default Automotive;
