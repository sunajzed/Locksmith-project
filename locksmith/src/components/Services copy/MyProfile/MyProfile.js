import React, { useState, useEffect } from "react";
import "./MyProfile.css";
import api from "../../../api/api";
import {
  Box,
  CircularProgress,
  Grid,
  TextField,
  Button,
  Typography,
  Alert,
  FormControlLabel,
  Checkbox,
} from "@mui/material";

const MyProfile = () => {
  const [formData, setFormData] = useState({
    address: "",
    contact_number: "",
    service_area: "",
    pcc_file: null,
    license_file: null,
    photo: null,
    gst_registered: false,
  });

  const [fileURLs, setFileURLs] = useState({
    pcc_file: null,
    license_file: null,
    photo: null,
  });

  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFormData = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        if (!accessToken) {
          throw new Error("No access token found. Please login.");
        }

        const response = await api.get("/api/locksmiths/locksmithform_val/", {
          headers: { Authorization: `Bearer ${accessToken}` },
        });

        const data = response.data;
        const baseURL = api.defaults.baseURL;

        setFormData({
          address: data.address || "",
          contact_number: data.contact_number || "",
          service_area: data.service_area || "",
          pcc_file: null,
          license_file: null,
          photo: null,
          gst_registered: data.gst_registered || false,
        });

        setFileURLs({
          pcc_file: data.pcc_file ? `${baseURL}${data.pcc_file}` : null,
          license_file: data.license_file ? `${baseURL}${data.license_file}` : null,
          photo: data.photo ? `${baseURL}${data.photo}` : null,
        });
      } catch (error) {
        console.error("Error fetching form data:", error);
        setError("Failed to load profile data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchFormData();
  }, []);

  const validateFileSize = (file) => {
    const maxSize = 150 * 1024; // 150KB
    return file.size <= maxSize;
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (files) {
      const file = files[0];
      if (!validateFileSize(file)) {
        setError(`File size for ${name} must be less than 150KB`);
        return;
      }

      setFormData((prevData) => ({
        ...prevData,
        [name]: file,
      }));
      setFileURLs((prevURLs) => ({
        ...prevURLs,
        [name]: URL.createObjectURL(file),
      }));
      setError(null);
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.address || !formData.contact_number || !formData.service_area) {
      setError("Please fill out all required fields.");
      return;
    }

    const filesToCheck = [
      { file: formData.pcc_file, name: "PCC File" },
      { file: formData.license_file, name: "License File" },
      { file: formData.photo, name: "Photo" },
    ];

    for (const item of filesToCheck) {
      if (item.file && !validateFileSize(item.file)) {
        setError(`File size for ${item.name} must be less than 150KB`);
        return;
      }
    }

    const data = new FormData();
    data.append("address", formData.address);
    data.append("contact_number", formData.contact_number);
    data.append("service_area", formData.service_area);
    if (formData.pcc_file) data.append("pcc_file", formData.pcc_file);
    if (formData.license_file) data.append("license_file", formData.license_file);
    if (formData.photo) data.append("photo", formData.photo);

    try {
      const accessToken = localStorage.getItem("accessToken");
      const response = await api.put("/locksmith/profile/update/", data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      setMessage("Profile updated successfully!");
      setError(null);
    } catch (error) {
      setError(error.response?.data?.message || "Error updating profile. Please try again.");
      console.error("Error updating profile:", error);
    }
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
        <Typography variant="body1" sx={{ mt: 2 }}>
          Loading profile data...
        </Typography>
      </Box>
    );
  }

  return (
    <Box className="my-profile-container">
      <Typography variant="h4" align="center" gutterBottom>
        Locksmith Profile
      </Typography>

      {message && (
        <Alert severity="success" sx={{ mb: 2 }}>
          {message}
        </Alert>
      )}
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              variant="outlined"
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Contact Number"
              name="contact_number"
              type="tel"
              value={formData.contact_number}
              onChange={handleChange}
              required
              variant="outlined"
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Service Area"
              name="service_area"
              value={formData.service_area}
              onChange={handleChange}
              required
              variant="outlined"
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle1" gutterBottom>
              GST Registered
            </Typography>
            <Typography variant="body1">
              {formData.gst_registered ? "Yes" : "Not Applicable"}
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Button
              variant="contained"
              component="label"
              fullWidth
              sx={{ mb: 2 }}
            >
              Upload Profile Photo (Max 150KB)
              <input
                type="file"
                name="photo"
                hidden
                onChange={handleChange}
                accept=".jpg,.jpeg,.png"
              />
            </Button>
            {fileURLs.photo && (
              <Box className="file-preview">
                <img
                  src={fileURLs.photo}
                  alt="Profile Preview"
                  style={{ maxWidth: "100%", maxHeight: "150px", borderRadius: "8px" }}
                />
              </Box>
            )}
          </Grid>
          <Grid item xs={12} md={6}>
            <Button
              variant="contained"
              component="label"
              fullWidth
              sx={{ mb: 2 }}
            >
              Upload PCC File (Max 150KB)
              <input
                type="file"
                name="pcc_file"
                hidden
                onChange={handleChange}
                accept=".pdf,.jpg,.jpeg,.png"
              />
            </Button>
            {fileURLs.pcc_file && (
              <Box className="file-preview">
                <a href={fileURLs.pcc_file} target="_blank" rel="noopener noreferrer">
                  View PCC File
                </a>
              </Box>
            )}
          </Grid>
          <Grid item xs={12} md={6}>
            <Button
              variant="contained"
              component="label"
              fullWidth
              sx={{ mb: 2 }}
            >
              Upload License File (Max 150KB)
              <input
                type="file"
                name="license_file"
                hidden
                onChange={handleChange}
                accept=".pdf,.jpg,.jpeg,.png"
              />
            </Button>
            {fileURLs.license_file && (
              <Box className="file-preview">
                <a href={fileURLs.license_file} target="_blank" rel="noopener noreferrer">
                  View License File
                </a>
              </Box>
            )}
          </Grid>
          <Grid item xs={12} sx={{ textAlign: "center" }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              sx={{ minWidth: "200px" }}
            >
              Update Profile
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default MyProfile;

