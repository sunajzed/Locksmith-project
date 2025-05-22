import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../api/api";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import "./style.css";
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

const Residential = () => {
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
  const [openModal, setOpenModal] = useState(false);
  const [currentService, setCurrentService] = useState(null);
  const [contactNumber, setContactNumber] = useState("");
  const [bookingError, setBookingError] = useState("");
  const [address, setAddress] = useState("");
  const [addressSuggestions, setAddressSuggestions] = useState([]);
  const [addressInputValue, setAddressInputValue] = useState("");
  const [isFetchingSuggestions, setIsFetchingSuggestions] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [needMoreKeys, setNeedMoreKeys] = useState(false);
  const [additionalKeys, setAdditionalKeys] = useState(0); // Number of additional keys (excluding the first key)
  const [additionalKeyPrice, setAdditionalKeyPrice] = useState(0);
  const [scheduledDate, setScheduledDate] = useState("");
  const [scheduledTime, setScheduledTime] = useState("");
  const [isEmergency, setIsEmergency] = useState(false);
  const [keyFilter, setKeyFilter] = useState("all");
  const [houseNumber, setHouseNumber] = useState("");
  const navigate = useNavigate();

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
            service_type: "residential",
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
          setAdditionalKeyPrice(response.data[0].service.additional_key_price || 0);
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

  const highlightSearchTerm = (text, term) => {
    if (!term || !text) return text;
    const regex = new RegExp(`(${term})`, 'gi');
    return text.toString().split(regex).map((part, i) => 
      regex.test(part) ? <mark key={i} className="search-highlight">{part}</mark> : part
    );
  };

  const handleTabChange = (event, newValue) => {
    setSelectedService(newValue);
    const serviceNames = [...new Set(services.map((service) => service.service.admin_service_name))];
    setFilterValue(serviceNames[newValue]);
  };

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

  const handleOpenModal = (service) => {
    if (!localStorage.getItem("accessToken")) {
      alert("Please log in to book a service.");
      navigate("/login");
      return;
    }
    setCurrentService(service);
    setAdditionalKeyPrice(service.service.additional_key_price || 0);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setBookingError("");
    setImageFile(null);
    setImagePreview(null);
    setNeedMoreKeys(false);
    setAdditionalKeys(0);
    setIsEmergency(false);
    setScheduledDate("");
    setScheduledTime("");
    setContactNumber("");
    setAddress("");
    setAddressInputValue("");
    setHouseNumber("");
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

  const handleAdditionalKeysChange = (event, newValue) => {
    setAdditionalKeys(newValue);
  };

  const calculateTotalPrice = () => {
    if (!currentService) return 0;
    const basePrice = parseFloat(currentService.service.custom_price || currentService.service.total_price);
    let adjustedBasePrice = basePrice;
    
    if (needMoreKeys && additionalKeys > 0) {
      adjustedBasePrice += additionalKeyPrice * additionalKeys;
    }
    
    const tenPercent = adjustedBasePrice * 0.1;
    const platformFee = 40;
    return adjustedBasePrice + tenPercent + platformFee;
  };

  const handleBooking = async () => {
    if (!address || !contactNumber || !houseNumber) {
      setBookingError("Please fill in all required fields");
      return;
    }

    if (!isEmergency && (!scheduledDate || !scheduledTime)) {
      setBookingError("Please select a date and time for your service");
      return;
    }

    const isConfirmed = window.confirm("Are you sure you want to book this service?");
    if (!isConfirmed) return;

    const token = localStorage.getItem("accessToken");
    if (!token) {
      alert("You need to log in to book a service.");
      navigate("/login");
      return;
    }

    let bookingDateTime;
    if (isEmergency) {
      const now = new Date();
      bookingDateTime = now.toISOString();
    } else {
      bookingDateTime = `${scheduledDate}T${scheduledTime}:00Z`;
      const selectedDateTime = new Date(bookingDateTime);
      const now = new Date();
      if (selectedDateTime < now) {
        setBookingError("Please select a date/time in the future");
        return;
      }
      const maxDate = new Date();
      maxDate.setMonth(maxDate.getMonth() + 3);
      if (selectedDateTime > maxDate) {
        setBookingError("Please select a date within the next 3 months");
        return;
      }
    }

    const totalKeys = needMoreKeys ? 1 + additionalKeys : 1; // Total keys includes the base key
    const additionalKeysCount = needMoreKeys ? additionalKeys : 0; // Number of additional keys

    const formData = new FormData();
    formData.append("locksmith_service", currentService.service.id);
    formData.append("locksmith", currentService.locksmith_id);
    formData.append("scheduled_date", bookingDateTime);
    formData.append("customer_address", address);
    formData.append("customer_contact_number", contactNumber);
    formData.append("emergency", isEmergency);
    formData.append("number_of_keys", additionalKeysCount); // Send only the number of additional keys
    formData.append("total_price", calculateTotalPrice().toFixed(2));
    formData.append("house_number", houseNumber);
    if (imageFile) {
      formData.append("image", imageFile);
    }

    try {
      setLoading(true);
      const response = await api.post("/api/bookings/", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      
      setBookingSuccess(true);
      handleCloseModal();
      
      navigate("/confirm-payment", {
        state: {
          bookingId: response.data.id,
          service: {
            ...currentService,
            totalPrice: calculateTotalPrice(),
            totalKeys: totalKeys, // Total keys for display purposes
            needMoreKeys,
            scheduled_date: bookingDateTime,
            isEmergency,
            customer_address: address,
            customer_contact_number: contactNumber,
            house_number: houseNumber,
          },
          basePrice: currentService.service.custom_price || currentService.service.total_price,
          additionalKeys: additionalKeysCount,
          additionalKeyPrice,
          imageUploaded: !!imageFile
        }
      });
    } catch (error) {
      console.error("Booking failed:", error.response?.data || error.message);
      setBookingError(error.response?.data?.message || "Booking failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const debouncedSearch = debounce(async (query) => {
    if (!query) {
      setSearchResults([]);
      setIsSearching(false);
      return;
    }
    setIsSearching(true);
    try {
      const matchingServices = services.filter((service) => {
        const serviceName = service.service.admin_service_name.toLowerCase();
        const details = service.service.details?.toLowerCase() || "";
        return serviceName.includes(query.toLowerCase()) || details.includes(query.toLowerCase());
      });
      setSearchResults(matchingServices);
    } catch (err) {
      console.error("Search Error:", err.response?.data || err.message);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  }, 500);

  const handleSearchInputChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    debouncedSearch(query);
  };

  const serviceNames = [...new Set(services.map((service) => service.service.admin_service_name))];
  const filteredServices = (filterValue === "" ? services : services.filter(
    (service) => service.service.admin_service_name === filterValue
  )).filter(service => {
    if (keyFilter === "all") return true;
    if (keyFilter === "with") return service.service.additional_key_price > 0;
    if (keyFilter === "without") return service.service.additional_key_price <= 0;
    return true;
  });
  const noResultsFound = searchQuery && searchResults.length === 0 && !isSearching;

  if (loading || geoLoading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p className="loading-message">Fetching services near you...</p>
      </div>
    );
  }

  if (error) return <p className="error">{error}</p>;

  return (
    <Box className="residential-container">
      <h2>Residential Locksmith Services</h2>
      {bookingSuccess && (
        <div className="success-message">
          <p className="text-white">Booking Initialized! Redirecting to confirmation page...</p>
        </div>
      )}
      <div className="search-container">
        <input
          type="text"
          placeholder="Search by service name or description"
          value={searchQuery}
          onChange={handleSearchInputChange}
          className="search-input"
        />
        {isSearching && (
          <div className="search-loading-indicator">
            <CircularProgress size={20} />
          </div>
        )}
      </div>
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
        <label htmlFor="key-filter" style={{ marginLeft: '15px' }}>Filter by Key Option: </label>
        <select
          id="key-filter"
          value={keyFilter}
          onChange={(e) => setKeyFilter(e.target.value)}
          className="filter-dropdown"
          aria-label="Filter services by key option"
        >
          <option value="all">All Key Options</option>
          <option value="with">With Additional Keys</option>
          <option value="without">Without Additional Keys</option>
        </select>
      </div>
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
            <TextField
              fullWidth
              label="House Number"
              variant="outlined"
              size="small"
              value={houseNumber}
              onChange={(e) => setHouseNumber(e.target.value)}
              required
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '8px',
                },
                mt: 2
              }}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={isEmergency}
                  onChange={(e) => {
                    setIsEmergency(e.target.checked);
                    if (e.target.checked) {
                      const now = new Date();
                      setScheduledDate(now.toISOString().split('T')[0]);
                      setScheduledTime(now.toTimeString().substring(0, 5));
                    } else {
                      setScheduledDate("");
                      setScheduledTime("");
                    }
                  }}
                  color="primary"
                />
              }
              label="This is an emergency service (needed immediately)"
              sx={{ mt: 1 }}
            />
            {!isEmergency && (
              <>
                <TextField
                  fullWidth
                  label="Date"
                  type="date"
                  variant="outlined"
                  size="small"
                  value={scheduledDate}
                  onChange={(e) => setScheduledDate(e.target.value)}
                  required={!isEmergency}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '8px',
                    },
                    mt: 2
                  }}
                />
                <TextField
                  fullWidth
                  label="Time"
                  type="time"
                  variant="outlined"
                  size="small"
                  value={scheduledTime}
                  onChange={(e) => setScheduledTime(e.target.value)}
                  required={!isEmergency}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '8px',
                    },
                    mt: 2
                  }}
                />
              </>
            )}
            <Typography variant="body2" sx={{ mt: 1, color: 'text.secondary' }}>
              {isEmergency
                ? "Emergency services will be dispatched immediately"
                : "Please select a convenient date and time for your service"}
            </Typography>
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
            {additionalKeyPrice > 0 && (
              <>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={needMoreKeys}
                      onChange={(e) => setNeedMoreKeys(e.target.checked)}
                      color="primary"
                    />
                  }
                  label="Do you need additional keys?"
                  sx={{ mt: 1 }}
                />
                {needMoreKeys && (
                  <Box sx={{ mt: 2 }}>
                    <Typography variant="subtitle2" sx={{ mb: 1 }}>
                      Number of Additional Keys Needed
                    </Typography>
                    <Slider
                      value={additionalKeys}
                      onChange={handleAdditionalKeysChange}
                      aria-labelledby="discrete-slider"
                      valueLabelDisplay="auto"
                      step={1}
                      marks
                      min={0}
                      max={9}
                      sx={{
                        color: 'primary.main',
                        '& .MuiSlider-valueLabel': {
                          backgroundColor: 'primary.main',
                          borderRadius: '8px',
                        }
                      }}
                    />
                    <Typography variant="body2" sx={{ mt: 1, color: 'text.secondary' }}>
                      Additional keys: ${additionalKeyPrice} each (first key included in base price)
                    </Typography>
                  </Box>
                )}
              </>
            )}
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
              {needMoreKeys && additionalKeys > 0 && currentService && (
                <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                  (Base price: ${currentService.service.custom_price || currentService.service.total_price} + ${additionalKeyPrice} × {additionalKeys} + 10% fee + $40 platform fee)
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
      {noResultsFound && (
        <div className="no-results-message">
          <p>No results found for "{searchQuery}". Try different keywords.</p>
        </div>
      )}
      <div className="services-list">
        {filteredServices.length > 0 ? (
          filteredServices.map((service, index) => (
            <ServiceCard 
              key={index} 
              service={service} 
              onBook={handleOpenModal} 
              searchQuery={searchQuery} 
              highlightSearchTerm={highlightSearchTerm}
            />
          ))
        ) : (
          <div className="no-services-message" style={{
            width: '100%',
            textAlign: 'center',
            padding: '40px 20px',
            backgroundColor: '#f8f9fa',
            borderRadius: '8px',
            marginTop: '20px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}>
            <Typography variant="h6" color="textSecondary" gutterBottom>
              No services available
            </Typography>
            <Typography variant="body1" color="textSecondary">
              {keyFilter !== "all" || filterValue !== "" 
                ? "No services match your current filters. Please try different filters."
                : "No services available in your area. Please try again later."}
            </Typography>
            {(keyFilter !== "all" || filterValue !== "") && (
              <Button 
                variant="outlined" 
                color="primary" 
                onClick={() => {
                  setFilterValue("");
                  setKeyFilter("all");
                }}
                style={{ marginTop: '16px' }}
              >
                Clear Filters
              </Button>
            )}
          </div>
        )}
      </div>
    </Box>
  );
};

const ServiceCard = ({ service, onBook, searchQuery, highlightSearchTerm }) => (
  <div className="services-card">
    <div className="service-header">
      <h3>{highlightSearchTerm(service.service.admin_service_name, searchQuery)}</h3>
      <p className="price">${service.service.total_price}</p>
    </div>
    <div
      className={`availability-status ${service.service.is_available ? "available" : "unavailable"}`}
    >
      {service.service.is_available ? "Open for Service" : "Currently Unavailable"}
    </div>
    <p className="text-black">
      <strong>Type:</strong> {service.service.service_type}
    </p>
    <p className="details text-black">{highlightSearchTerm(service.service.details, searchQuery)}</p>
    <button
      className="book-button"
      onClick={() => onBook(service)}
      disabled={!service.service.is_available}
    >
      {service.service.is_available ? "Book Now" : "Unavailable"}
    </button>
  </div>
);

export default Residential;