import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../api/api";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import "./automotivestyle.css";
import debounce from "lodash/debounce";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Autocomplete from '@mui/material/Autocomplete';
import { CiLocationArrow1 } from "react-icons/ci";
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Slider from '@mui/material/Slider';

const SmartLock = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [geoLoading, setGeoLoading] = useState(true);
  const [error, setError] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [selectedService, setSelectedService] = useState(0); // Default to the first service
  const [filterValue, setFilterValue] = useState(""); // Default to the first service name
  const [openModal, setOpenModal] = useState(false);
  const [currentService, setCurrentService] = useState(null);
  const [address, setAddress] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [bookingError, setBookingError] = useState("");
  const [addressSuggestions, setAddressSuggestions] = useState([]);
  const [addressInputValue, setAddressInputValue] = useState("");
  const [isFetchingSuggestions, setIsFetchingSuggestions] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [needMoreKeys, setNeedMoreKeys] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [additionalKeyPrice, setAdditionalKeyPrice] = useState(10);
  const navigate = useNavigate();
  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: { xs: '90%', sm: '80%', md: 500 },
    bgcolor: 'background.paper',
    border: 'none',
    boxShadow: '0px 24px 48px rgba(0, 0, 0, 0.16)',
    p: 4,
    borderRadius: '12px',
    outline: 'none',
    maxHeight: '90vh',
    overflowY: 'auto',
    '&::-webkit-scrollbar': {
      width: '6px',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: 'rgba(0,0,0,0.2)',
      borderRadius: '3px',
    }
  };

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

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const response = await api.get("/api/admin/services/services_to_customer/", {
          params: {
            service_type: "smart_lock",
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

  const handleOpenModal = (service) => {
    if (!localStorage.getItem("accessToken")) {
      alert("Please log in to book a service.");
      navigate("/login");
      return;
    }
    setCurrentService(service);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setBookingError("");
    setImageFile(null);
    setImagePreview(null);
    setNeedMoreKeys(false);
    setQuantity(1);
  };
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleQuantityChange = (event, newValue) => {
    setQuantity(newValue);
  };

  const calculateTotalPrice = () => {
    if (!currentService) return 0;
    const basePrice = parseFloat(currentService.service.total_price);
    if (needMoreKeys) {
      return basePrice + (additionalKeyPrice * (quantity - 1));
    }
    return basePrice;
  };

  const handleBooking = async () => {
    if (!address || !contactNumber) {
      setBookingError("Please fill in all required fields");
      return;
    }

    const isConfirmed = window.confirm("Are you sure you want to book this service?");
    if (!isConfirmed) return;

    const token = localStorage.getItem("accessToken");
    const currentTime = new Date().toISOString();

    const formData = new FormData();
    formData.append("service_request", currentService.service.id);
    formData.append("locksmith", currentService.locksmith_id);
    formData.append("scheduled_time", currentTime);
    formData.append("scheduled_date", currentTime);
    formData.append("locksmith_service", currentService.service.id);
    formData.append("customer_address", address);
    formData.append("customer_contact_number", contactNumber);
    formData.append("need_more_keys", needMoreKeys);
    formData.append("quantity", quantity);
    if (imageFile) {
      formData.append("key_image", imageFile);
    }
    const totalPrice = calculateTotalPrice(); // Calculate the total including additional keys

    try {
      setLoading(true);
      await api.post("/api/bookings/", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      setBookingSuccess(true);
      handleCloseModal();
      setTimeout(() => {
        navigate("/confirm-payment", { 
          state: { 
            service: {
              ...currentService,
              totalPrice, // Pass the calculated total price
              quantity,
              needMoreKeys
            },
            basePrice: currentService.service.total_price, // Pass base price separately
            additionalKeys: needMoreKeys ? quantity - 1 : 0,
            additionalKeyPrice
          } 
        });
      }, 2000);
    } catch (error) {
      console.error("Booking failed:", error);
      setBookingError(error.response?.data?.message || "Booking failed. Please try again.");
    } finally {
      setLoading(false);
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

  const fetchAddressSuggestions = async (query) => {
    if (!query || query.length === 0) {
      setAddressSuggestions([]);
      return;
    }

    setIsFetchingSuggestions(true);
    try {
      const token = localStorage.getItem("accessToken");
      const response = await api.get("/api/get-address-suggestions/", {
        params: { query },
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
      });
      setAddressSuggestions(response.data.predictions || []);
    } catch (error) {
      console.error("Error fetching address suggestions:", error);
      setAddressSuggestions([]);
    } finally {
      setIsFetchingSuggestions(false);
    }
  };

  const debouncedFetchSuggestions = debounce(fetchAddressSuggestions, 300);

  const getApproximateLocation = async (lat, lng) => {
    try {
      setIsFetchingSuggestions(true);
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
      );
      const data = await response.json();
      return data.display_name || `Near coordinates: ${lat.toFixed(4)}, ${lng.toFixed(4)}`;
    } catch (error) {
      console.error("Reverse geocoding error:", error);
      return `Near coordinates: ${lat.toFixed(4)}, ${lng.toFixed(4)}`;
    } finally {
      setIsFetchingSuggestions(false);
    }
  };

  const handleUseCurrentLocation = async () => {
    if (!latitude || !longitude) {
      alert("Location not available. Please enable location services.");
      return;
    }

    const location = await getApproximateLocation(latitude, longitude);
    setAddress(location);
    setAddressInputValue(location);
  };

  return (
    <Box className="residential-container">
      <h2>SmartLock Services</h2>
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
      {/* Booking Modal */}
      <Modal
  open={openModal}
  onClose={handleCloseModal}
  aria-labelledby="premium-booking-modal"
  sx={{
    backdropFilter: 'blur(4px)',
    backgroundColor: 'rgba(0,0,0,0.5)'
  }}
>
  <Box sx={modalStyle}>
    <Box sx={{
      mb: 3,
      borderBottom: '1px solid',
      borderColor: 'divider',
      pb: 2
    }}>
      <Typography
        id="premium-booking-modal"
        variant="h5"
        component="h2"
        sx={{
          fontWeight: 600,
          color: 'text.primary'
        }}
      >
        Complete Your Booking
      </Typography>
      <Typography variant="body2" sx={{ mt: 1, color: 'text.secondary' }}>
        Please provide your details to secure your service
      </Typography>
    </Box>

    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Autocomplete
        freeSolo
        disableClearable
        options={addressSuggestions}
        getOptionLabel={(option) =>
          typeof option === 'string' ? option : option.description
        }
        loading={isFetchingSuggestions}
        value={address}
        onChange={(event, newValue) => {
          setAddress(typeof newValue === 'string' ? newValue : newValue.description);
        }}
        inputValue={addressInputValue}
        onInputChange={(event, newInputValue) => {
          setAddressInputValue(newInputValue);
          debouncedFetchSuggestions(newInputValue);
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Address"
            variant="outlined"
            size="small"
            fullWidth
            required
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '8px',
              }
            }}
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <>
                  {isFetchingSuggestions ? (
                    <CircularProgress color="inherit" size={20} />
                  ) : null}
                  {params.InputProps.endAdornment}
                </>
              ),
            }}
          />
        )}
        renderOption={(props, option) => (
          <li {...props} key={option.place_id}>
            {option.description}
          </li>
        )}
        filterOptions={(x) => x}
      />

      <TextField
        fullWidth
        label="Contact Number"
        variant="outlined"
        size="small"
        value={contactNumber}
        onChange={(e) => setContactNumber(e.target.value)}
        required
        sx={{
          '& .MuiOutlinedInput-root': {
            borderRadius: '8px',
          }
        }}
      />

      <Button
        variant="text"
        onClick={handleUseCurrentLocation}
        disabled={!latitude || !longitude || isFetchingSuggestions}
        sx={{
          textTransform: 'none',
          borderRadius: '8px',
          height: '40px',
          minWidth: 'auto',
          px: 3,
          fontSize: '0.875rem',
          fontWeight: 500,
          color: 'primary.main',
          bgcolor: 'transparent',
          border: '1px solid',
          borderColor: 'primary.main',
          transition: 'all 0.2s ease',
          display: 'inline-flex',
          alignItems: 'center',
          gap: 1.5,
          '&:hover': {
            bgcolor: 'rgba(25, 118, 210, 0.04)',
            boxShadow: '0 2px 8px rgba(25, 118, 210, 0.1)'
          },
          '&:active': {
            bgcolor: 'rgba(25, 118, 210, 0.08)'
          },
          '&:disabled': {
            color: 'text.disabled',
            borderColor: 'action.disabled',
            boxShadow: 'none'
          }
        }}
        startIcon={
          isFetchingSuggestions ? (
            <CircularProgress size={18} thickness={4} color="inherit" />
          ) : (
            <CiLocationArrow1 size={18} style={{ strokeWidth: 1.5 }} />
          )
        }
      >
        {navigator.geolocation ? "Detect My Location" : "Use Nearby Location"}
      </Button>

      {/* Image Upload Section */}
      <Box sx={{ mt: 2 }}>
        <Typography variant="subtitle2" sx={{ mb: 1 }}>
          Upload Key Image (Optional)
        </Typography>
        <input
          accept="image/*"
          style={{ display: 'none' }}
          id="key-image-upload"
          type="file"
          onChange={handleImageUpload}
        />
        <label htmlFor="key-image-upload">
          <Button 
            variant="outlined" 
            component="span"
            sx={{
              textTransform: 'none',
              borderRadius: '8px',
              width: '100%'
            }}
          >
            {imageFile ? 'Change Image' : 'Upload Image'}
          </Button>
        </label>
        {imagePreview && (
          <Box sx={{ mt: 2, textAlign: 'center' }}>
            <img 
              src={imagePreview} 
              alt="Preview" 
              style={{ 
                maxWidth: '100%', 
                maxHeight: '150px',
                borderRadius: '8px'
              }} 
            />
          </Box>
        )}
      </Box>

      {/* Need More Keys Checkbox */}
      <FormControlLabel
        control={
          <Checkbox
            checked={needMoreKeys}
            onChange={(e) => setNeedMoreKeys(e.target.checked)}
            color="primary"
          />
        }
        label="Do you need more keys?"
        sx={{ mt: 1 }}
      />
      
      {/* Quantity Selector (shown only when needMoreKeys is true) */}
      {needMoreKeys && (
        <Box sx={{ mt: 2 }}>
          <Typography variant="subtitle2" sx={{ mb: 1 }}>
            Number of Keys Needed
          </Typography>
          <Slider
            value={quantity}
            onChange={handleQuantityChange}
            aria-labelledby="discrete-slider"
            valueLabelDisplay="auto"
            step={1}
            marks
            min={1}
            max={10}
            sx={{
              color: 'primary.main',
              '& .MuiSlider-valueLabel': {
                backgroundColor: 'primary.main',
                borderRadius: '8px',
              }
            }}
          />
          <Typography variant="body2" sx={{ mt: 1, color: 'text.secondary' }}>
            Additional keys: ${additionalKeyPrice} each
          </Typography>
        </Box>
      )}
      
      {/* Total Price Display */}
      <Box sx={{ 
        mt: 2, 
        p: 2, 
        backgroundColor: 'action.hover', 
        borderRadius: '8px',
        textAlign: 'center'
      }}>
        <Typography variant="h6">
          Total Price: ${calculateTotalPrice().toFixed(2)}
        </Typography>
        {needMoreKeys && quantity > 1 && currentService && (
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            (Base price: ${currentService.service.total_price} + ${additionalKeyPrice} × {quantity - 1})
          </Typography>
        )}
      </Box>

      {bookingError && (
        <Typography color="error" variant="body2" sx={{ mt: 1 }}>
          {bookingError}
        </Typography>
      )}
    </Box>

    <Box sx={{
      display: 'flex',
      justifyContent: 'flex-end',
      gap: 2,
      mt: 4,
      pt: 2,
      borderTop: '1px solid',
      borderColor: 'divider'
    }}>
      <Button
        onClick={handleCloseModal}
        variant="text"
        sx={{
          textTransform: 'none',
          px: 3,
          borderRadius: '8px'
        }}
      >
        Cancel
      </Button>
      <Button
        variant="contained"
        onClick={handleBooking}
        disabled={loading}
        sx={{
          textTransform: 'none',
          px: 3,
          borderRadius: '8px',
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none'
          }
        }}
      >
        {loading ? (
          <>
            <CircularProgress size={20} sx={{ mr: 1 }} />
            Processing...
          </>
        ) : 'Confirm Booking'}
      </Button>
    </Box>
  </Box>
</Modal>
      {/* Services List */}
      <div className="services-list">
        {filteredServices.map((service, index) => (
          <ServiceCard key={index} service={service} onBook={handleOpenModal} />
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
      className={`availability-status ${service.service.is_available ? "available" : "unavailable"
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
    {/* <p className="text-black">
      <strong>Distance:</strong> {service.distance_km} km
    </p> */}
    <p className="details text-black">{service.service.details}</p>
    <button
      className="book-button"
      onClick={() => onBook(service)}  // Changed to pass the whole service object
      disabled={!service.service.is_available}
    >
      {service.service.is_available ? "Book Now" : "Unavailable"}
    </button>
  </div>
);

export default SmartLock;