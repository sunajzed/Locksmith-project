import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, TextField, Typography, Button, Paper, Alert, CircularProgress, IconButton, Grid, MenuItem } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import api from "../../api/api";

function ServicesEditor() {
  const [formData, setFormData] = useState({
    heading: "OUR SERVICES",
    subheading: "Trusted Locksmith Solutions for Homes, Businesses & Vehicles",
    description:
      "Security is our top priority. We provide expert locksmith services tailored to meet your needs—whether it’s securing your home, protecting your business, or assisting with automotive lock issues. Our skilled locksmiths ensure fast, reliable, and affordable solutions.",
    services: [
      {
        title: "Residential Locksmith Services",
        text: "Secure your home with expert lock installations, repairs, rekeying, and smart lock upgrades. Fast and reliable emergency lockout assistance available.",
        icon: "GiHouseKeys",
      },
      {
        title: "Automotive Locksmith Services",
        text: "Lost your keys or locked out? We provide car lockouts, ignition repairs, and key replacements for all vehicle makes and models.",
        icon: "GiCarKey",
      },
      {
        title: "Commercial Locksmith Services",
        text: "Protect your business with high-security locks, access control systems, and master key solutions for offices, warehouses, and retail spaces.",
        icon: "FaBuildingLock",
      },
      {
        title: "Emergency Locksmith Services",
        text: "24/7 emergency locksmith services for home, office, and car lockouts, broken locks, or urgent security needs with fast response times.",
        icon: "GiSiren",
      },
      {
        title: "Smart Lock Solutions",
        text: "Upgrade to smart locks, keyless entry, and biometric security systems for enhanced safety and convenient remote access.",
        icon: "FaFingerprint",
      },
    ],
    button_text: "Explore",
  });
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [contentId, setContentId] = useState(null);
  const [isNew, setIsNew] = useState(true);
  const navigate = useNavigate();

  const serviceIcons = ["GiHouseKeys", "GiCarKey", "FaBuildingLock", "GiSiren", "FaFingerprint"];
  const textLimits = {
    heading: 20,
    subheading: 70,
    description: 300,
    service_title: 40,
    service_text: 150,
    button_text: 15,
  };

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const userRole = localStorage.getItem("userRole");

    if (!accessToken || userRole !== "admin") {
      navigate("/login");
      return;
    }

    fetchContent();
  }, [navigate]);

  const fetchContent = async () => {
    setLoading(true);
    try {
      const response = await api.get("/api/content/?section=services");
      if (response.status === 200 && response.data.length > 0) {
        setFormData(response.data[0].content);
        setContentId(response.data[0].id);
        setIsNew(false);
      }
    } catch (error) {
      console.error("Error fetching services content:", error);
      setMessage("Failed to load services content.");
      setIsError(true);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    if (name.startsWith("service_title_") || name.startsWith("service_text_") || name.startsWith("service_icon_")) {
      const newServices = [...formData.services];
      const idx = parseInt(name.split("_")[2]);
      if (name.startsWith("service_title_")) {
        newServices[idx].title = value.slice(0, textLimits.service_title);
      } else if (name.startsWith("service_text_")) {
        newServices[idx].text = value.slice(0, textLimits.service_text);
      } else {
        newServices[idx].icon = value;
      }
      setFormData((prev) => ({ ...prev, services: newServices }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value.slice(0, textLimits[name]) }));
    }
  };

  const addService = () => {
    setFormData((prev) => ({ ...prev, services: [...prev.services, { title: "", text: "", icon: "" }] }));
  };

  const removeService = (index) => {
    setFormData((prev) => ({
      ...prev,
      services: prev.services.filter((_, i) => i !== index),
    }));
  };

  const validateForm = () => {
    if (!formData.heading || formData.heading.length > textLimits.heading) {
      return `Heading must be between 1 and ${textLimits.heading} characters.`;
    }
    if (!formData.subheading || formData.subheading.length > textLimits.subheading) {
      return `Subheading must be between 1 and ${textLimits.subheading} characters.`;
    }
    if (!formData.description || formData.description.length > textLimits.description) {
      return `Description must be between 1 and ${textLimits.description} characters.`;
    }
    if (!formData.button_text || formData.button_text.length > textLimits.button_text) {
      return `Button Text must be between 1 and ${textLimits.button_text} characters.`;
    }
    for (let i = 0; i < formData.services.length; i++) {
      const service = formData.services[i];
      if (!service.title || service.title.length > textLimits.service_title) {
        return `Service ${i + 1} Title must be between 1 and ${textLimits.service_title} characters.`;
      }
      if (!service.text || service.text.length > textLimits.service_text) {
        return `Service ${i + 1} Description must be between 1 and ${textLimits.service_text} characters.`;
      }
      if (!service.icon) {
        return `Service ${i + 1} Icon is required.`;
      }
    }
    return null;
  };

  const handleSave = async () => {
    const accessToken = localStorage.getItem("accessToken");
    const validationError = validateForm();
    if (validationError) {
      setMessage(validationError);
      setIsError(true);
      return;
    }

    const payload = {
      section: "services",
      content: JSON.stringify(formData),
    };

    setLoading(true);
    try {
      if (isNew) {
        const response = await api.post("/api/content/", payload, {
          headers: { Authorization: `Token ${accessToken}`, "Content-Type": "multipart/form-data" },
        });
        setContentId(response.data.id);
        setIsNew(false);
        setMessage("Services content created successfully.");
      } else {
        await api.put(`/api/content/${contentId}/`, payload, {
          headers: { Authorization: `Token ${accessToken}`, "Content-Type": "multipart/form-data" },
        });
        setMessage("Services content updated successfully.");
      }
      setIsError(false);
    } catch (error) {
      console.error("Error saving services content:", error);
      setMessage("Failed to save services content. Please try again.");
      setIsError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: "bold", color: "primary.main" }}>
        Services Section Editor
      </Typography>
      {message && (
        <Alert severity={isError ? "error" : "success"} onClose={() => setMessage("")} sx={{ mb: 2 }}>
          {message}
        </Alert>
      )}
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", my: 4 }}>
          <CircularProgress />
          <Typography sx={{ ml: 2 }}>Loading...</Typography>
        </Box>
      ) : (
        <Box component="form" noValidate autoComplete="off" sx={{ "& .MuiTextField-root": { mb: 2 } }}>
          <TextField
            fullWidth
            label="Heading"
            name="heading"
            variant="outlined"
            value={formData.heading}
            onChange={handleChange}
            margin="normal"
            inputProps={{ maxLength: textLimits.heading }}
            helperText={`${formData.heading.length}/${textLimits.heading} characters`}
          />
          <TextField
            fullWidth
            label="Subheading"
            name="subheading"
            variant="outlined"
            value={formData.subheading}
            onChange={handleChange}
            margin="normal"
            inputProps={{ maxLength: textLimits.subheading }}
            helperText={`${formData.subheading.length}/${textLimits.subheading} characters`}
          />
          <TextField
            fullWidth
            label="Description"
            name="description"
            variant="outlined"
            value={formData.description}
            onChange={handleChange}
            margin="normal"
            multiline
            rows={4}
            inputProps={{ maxLength: textLimits.description }}
            helperText={`${formData.description.length}/${textLimits.description} characters`}
          />
          {formData.services.map((service, index) => (
            <Grid container spacing={2} key={index} sx={{ mb: 2 }}>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label={`Service ${index + 1} Title`}
                  name={`service_title_${index}`}
                  variant="outlined"
                  value={service.title}
                  onChange={(e) => handleChange(e, index)}
                  margin="normal"
                  inputProps={{ maxLength: textLimits.service_title }}
                  helperText={`${service.title.length}/${textLimits.service_title} characters`}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label={`Service ${index + 1} Description`}
                  name={`service_text_${index}`}
                  variant="outlined"
                  value={service.text}
                  onChange={(e) => handleChange(e, index)}
                  margin="normal"
                  multiline
                  rows={3}
                  inputProps={{ maxLength: textLimits.service_text }}
                  helperText={`${service.text.length}/${textLimits.service_text} characters`}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  select
                  fullWidth
                  label={`Service ${index + 1} Icon`}
                  name={`service_icon_${index}`}
                  variant="outlined"
                  value={service.icon}
                  onChange={(e) => handleChange(e, index)}
                  margin="normal"
                >
                  {serviceIcons.map((icon) => (
                    <MenuItem key={icon} value={icon}>
                      {icon}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12} sm={1} sx={{ display: "flex", alignItems: "center" }}>
                <IconButton onClick={() => removeService(index)} color="error">
                  <DeleteIcon />
                </IconButton>
              </Grid>
            </Grid>
          ))}
          <Button variant="outlined" startIcon={<AddIcon />} onClick={addService} sx={{ mb: 2 }}>
            Add Service
          </Button>
          <TextField
            fullWidth
            label="Button Text"
            name="button_text"
            variant="outlined"
            value={formData.button_text}
            onChange={handleChange}
            margin="normal"
            inputProps={{ maxLength: textLimits.button_text }}
            helperText={`${formData.button_text.length}/${textLimits.button_text} characters`}
          />
          <Button variant="contained" color="primary" startIcon={<SaveIcon />} onClick={handleSave} sx={{ mt: 2 }} disabled={loading}>
            {isNew ? "Create" : "Update"} Services Section
          </Button>
        </Box>
      )}
    </Paper>
  );
}

export default ServicesEditor;