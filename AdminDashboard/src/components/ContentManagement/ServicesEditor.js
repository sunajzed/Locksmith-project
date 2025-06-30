import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, TextField, Typography, Button, Paper, Alert, CircularProgress, IconButton, Grid } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import api from "../../api/api";

function ServicesEditor() {
  const [formData, setFormData] = useState({
    heading: "",
    subheading: "",
    description: "",
    services: [{ title: "", text: "" }],
    button_text: "",
  });
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [contentId, setContentId] = useState(null);
  const [isNew, setIsNew] = useState(true);
  const navigate = useNavigate();

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
    if (name.startsWith("service_title_") || name.startsWith("service_text_")) {
      const newServices = [...formData.services];
      const idx = parseInt(name.split("_")[2]);
      if (name.startsWith("service_title_")) {
        newServices[idx].title = value;
      } else {
        newServices[idx].text = value;
      }
      setFormData((prev) => ({ ...prev, services: newServices }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const addService = () => {
    setFormData((prev) => ({ ...prev, services: [...prev.services, { title: "", text: "" }] }));
  };

  const removeService = (index) => {
    setFormData((prev) => ({
      ...prev,
      services: prev.services.filter((_, i) => i !== index),
    }));
  };

  const handleSave = async () => {
    const accessToken = localStorage.getItem("accessToken");
    if (
      !formData.heading ||
      !formData.subheading ||
      !formData.description ||
      !formData.button_text ||
      formData.services.some((service) => service.title === "" || service.text === "")
    ) {
      setMessage("All fields are required.");
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
          <TextField fullWidth label="Heading" name="heading" variant="outlined" value={formData.heading} onChange={handleChange} margin="normal" />
          <TextField
            fullWidth
            label="Subheading"
            name="subheading"
            variant="outlined"
            value={formData.subheading}
            onChange={handleChange}
            margin="normal"
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
          />
          {formData.services.map((service, index) => (
            <Grid container spacing={2} key={index} sx={{ mb: 2 }}>
              <Grid item xs={12} sm={5}>
                <TextField
                  fullWidth
                  label={`Service ${index + 1} Title`}
                  name={`service_title_${index}`}
                  variant="outlined"
                  value={service.title}
                  onChange={(e) => handleChange(e, index)}
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
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
                />
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