import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./LockSmithForm.css";
import api from "../../api/api";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import CircularProgress from "@mui/material/CircularProgress";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputAdornment from "@mui/material/InputAdornment";

const LockSmithForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    address: "",
    contact_number: "",
    service_area: "",
    longitude: "",
    latitude: "",
    pcc_file: null,
    license_file: null,
    photo: null,
    gst_registered: "",
    country_code: "+61", // Default to Australia country code
  });

  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [fileError, setFileError] = useState(null);
  const [addressInput, setAddressInput] = useState("");
  const [addressOptions, setAddressOptions] = useState([]);
  const [loadingAddress, setLoadingAddress] = useState(false);
  const [fileFieldErrors, setFileFieldErrors] = useState({});
  const [phoneError, setPhoneError] = useState(null);

  const countryCodeOptions = [
    { label: "+61 (Australia)", value: "+61" },
  ];

  const debounce = (func, delay) => {
    let timer;
    return function (...args) {
      clearTimeout(timer);
      timer = setTimeout(() => func.apply(this, args), delay);
    };
  };

  // Fetch address suggestions (unchanged)
  const fetchAddressSuggestions = async (query) => {
    if (!query || query.trim().length === 0) {
      setAddressOptions([]);
      return;
    }

    setLoadingAddress(true);
    try {
      const token = localStorage.getItem("accessToken");
      const response = await api.get("/api/get-address-suggestions/", {
        params: { query },
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
      });

      let suggestions = [];
      if (response.data.predictions) {
        suggestions = response.data.predictions.map((prediction) => ({
          label: prediction.description,
          value: prediction.description,
          id: prediction.place_id,
        }));
      } else if (Array.isArray(response.data)) {
        suggestions = response.data.map((item) => ({
          label: item,
          value: item,
        }));
      }

      setAddressOptions(suggestions);
    } catch (error) {
      console.error("Error fetching address suggestions:", error);
      setAddressOptions([]);
    } finally {
      setLoadingAddress(false);
    }
  };

  const debouncedFetch = debounce(fetchAddressSuggestions, 500);

  const handleAddressChange = (event, newValue) => {
    if (typeof newValue === "string") {
      setFormData((prev) => ({
        ...prev,
        address: newValue,
      }));
    } else if (newValue && newValue.value) {
      setFormData((prev) => ({
        ...prev,
        address: newValue.value,
      }));
    }
  };

  const handleInputChange = (event, newInputValue) => {
    setAddressInput(newInputValue);
    debouncedFetch(newInputValue);
  };

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const userRole = localStorage.getItem("userRole");

    if (!accessToken || userRole !== "locksmith") {
      navigate("/login?role=locksmith");
      return;
    }

    const fetchFormData = async () => {
      try {
        const response = await api.get("api/locksmiths/locksmithform_val/", {
          headers: { Authorization: `Bearer ${accessToken}` },
        });

        const data = response.data;
        if (
          data &&
          (data.address || data.contact_number || data.service_area)
        ) {
          navigate("/waiting-for-approval", { state: { token: accessToken } });
        } else {
          setFormData((prev) => ({
            ...prev,
            address: data.address || "",
            contact_number: data.contact_number || "",
            service_area: data.service_area || "",
            longitude: data.longitude || "",
            latitude: data.latitude || "",
            gst_registered: data.gst_registered || "",
            country_code: data.country_code || "+61",
          }));
        }
      } catch (error) {
        console.error("Error fetching form data:", error);
      }
    };

    fetchFormData();

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFormData((prevData) => ({
            ...prevData,
            latitude: prevData.latitude || position.coords.latitude.toString(),
            longitude:
              prevData.longitude || position.coords.longitude.toString(),
          }));
        },
        (err) => {
          console.error("Error getting location:", err);
        }
      );
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (files && files.length > 0) {
      const file = files[0];
      if (file.size > 150 * 1024) {
        setFileFieldErrors((prev) => ({
          ...prev,
          [name]: "❌ File size exceeds 150KB. Please upload a smaller file.",
        }));
        setFormData((prev) => ({
          ...prev,
          [name]: null,
        }));
        e.target.value = "";
      } else {
        setFileFieldErrors((prev) => ({
          ...prev,
          [name]: null,
        }));
        setFormData((prev) => ({
          ...prev,
          [name]: file,
        }));
      }
    } else {
      if (name === "contact_number") {
        // Normalize the input by removing spaces and non-digit characters (except + for country code)
        let normalizedValue = value.replace(/[^0-9+]/g, "");
        // Remove +61 if present to validate the core number
        if (normalizedValue.startsWith("+61")) {
          normalizedValue = normalizedValue.replace("+61", "0");
        }
        // Validate Australian phone number (10 digits, starting with 0[0-9])
        const phoneRegex = /^0[0-9]\d{8}$/;
        if (normalizedValue && !phoneRegex.test(normalizedValue)) {
          setPhoneError(
            "Please enter a valid Australian phone number (e.g., 04xxxxxxxx or +614xxxxxxxx)."
          );
        } else {
          setPhoneError(null);
        }
        setFormData((prev) => ({
          ...prev,
          [name]: normalizedValue, // Store normalized value without +61
        }));
      } else {
        setFormData((prev) => ({
          ...prev,
          [name]: value,
        }));
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (fileError || phoneError) return;

    const requiredFields = [
      "address",
      "contact_number",
      "service_area",
      "longitude",
      "latitude",
      "pcc_file",
      "license_file",
      "photo",
      "gst_registered",
      "country_code",
    ];
    const isFormValid = requiredFields.every(
      (field) => formData[field] !== null && formData[field] !== ""
    );

    if (!isFormValid) {
      setError("Please fill all the required fields to update your profile.");
      return;
    }

    const data = new FormData();
    // Combine country_code and contact_number for submission
    const fullPhoneNumber = `${formData.country_code}${formData.contact_number.replace(/^0/, "")}`;
    Object.keys(formData).forEach((key) => {
      if (key === "contact_number") {
        data.append("contact_number", fullPhoneNumber);
      } else if (formData[key]) {
        data.append(key, formData[key]);
      }
    });

    try {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        throw new Error("No access token found. Please login.");
      }

      await api.post("/locksmith/profile/update/", data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      setMessage("Profile updated successfully!");
      setError(null);
      navigate("/waiting-for-approval", { state: { token: accessToken } });
    } catch (error) {
      setError("Error updating profile. Please try again.");
      setMessage(null);
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div className="container locksmith-form">
      <h2 className="text-center mb-4">Locksmith Dashboard</h2>

      {message && <div className="alert alert-success">{message}</div>}
      {error && <div className="alert alert-danger">{error}</div>}
      {fileError && <div className="alert alert-warning">{fileError}</div>}

      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="form-group">
          <label>Address</label>
          <Autocomplete
            freeSolo
            options={addressOptions}
            getOptionLabel={(option) => option.label || option}
            loading={loadingAddress}
            value={formData.address}
            onChange={handleAddressChange}
            inputValue={addressInput}
            onInputChange={handleInputChange}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                size="small"
                fullWidth
                required
                className="form-control"
                placeholder="Start typing your address..."
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <>
                      {loadingAddress ? (
                        <CircularProgress color="inherit" size={20} />
                      ) : null}
                      {params.InputProps.endAdornment}
                    </>
                  ),
                }}
              />
            )}
            renderOption={(props, option) => (
              <li {...props} key={option.id || option.value}>
                {option.label}
              </li>
            )}
            filterOptions={(x) => x}
          />
        </div>

        <div className="form-group">
          <label>Contact Number</label>
          {phoneError && (
            <div className="text-danger warning-message">{phoneError}</div>
          )}
          <div style={{ display: "flex", gap: "10px" }}>
            <Select
              name="country_code"
              value={formData.country_code}
              onChange={handleChange}
              variant="outlined"
              size="small"
              style={{ width: "120px" }}
              className="form-control"
              required
            >
              {countryCodeOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
            <TextField
              type="text"
              name="contact_number"
              value={formData.contact_number}
              onChange={handleChange}
              variant="outlined"
              size="small"
              fullWidth
              required
              className="form-control"
              placeholder="04xxxxxxxx or +614xxxxxxxx"
              error={!!phoneError}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    {formData.country_code}
                  </InputAdornment>
                ),
              }}
            />
          </div>
        </div>

        <div className="form-group">
          <label>Service Area</label>
          <input
            type="text"
            name="service_area"
            value={formData.service_area}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="form-group">
          <label>GST Registered?</label>
          <Select
            name="gst_registered"
            value={formData.gst_registered}
            onChange={handleChange}
            variant="outlined"
            size="small"
            fullWidth
            displayEmpty
            className="form-control"
            required
          >
            <MenuItem value="" disabled>
              Select an option
            </MenuItem>
            <MenuItem value="Yes">Yes</MenuItem>
            <MenuItem value="No">No</MenuItem>
          </Select>
        </div>

        <div className="form-group">
          <label>PCC File (Max 150KB)</label>
          {fileFieldErrors.pcc_file && (
            <div className="text-danger warning-message">
              {fileFieldErrors.pcc_file}
            </div>
          )}
          <input
            type="file"
            name="pcc_file"
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={handleChange}
            className={`form-control-file ${
              fileFieldErrors.pcc_file ? "is-invalid" : ""
            }`}
            required
          />
        </div>

        <div className="form-group">
          <label>License File (Max 150KB)</label>
          {fileFieldErrors.license_file && (
            <div className="text-danger warning-message">
              {fileFieldErrors.license_file}
            </div>
          )}
          <input
            type="file"
            name="license_file"
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={handleChange}
            className={`form-control-file ${
              fileFieldErrors.license_file ? "is-invalid" : ""
            }`}
            required
          />
        </div>

        <div className="form-group">
          <label>Photo (Max 150KB)</label>
          {fileFieldErrors.photo && (
            <div className="text-danger warning-message">
              {fileFieldErrors.photo}
            </div>
          )}
          <input
            type="file"
            name="photo"
            accept=".jpg,.jpeg,.png"
            onChange={handleChange}
            className={`form-control-file ${
              fileFieldErrors.photo ? "is-invalid" : ""
            }`}
            required
          />
        </div>

        <div className="text-center">
          <button type="submit" className="btn btn-primary">
            Update Profile
          </button>
        </div>
      </form>
    </div>
  );
};

export default LockSmithForm;