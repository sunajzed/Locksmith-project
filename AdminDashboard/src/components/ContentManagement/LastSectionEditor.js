import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, TextField, Typography, Button, Paper, Alert, CircularProgress } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import api from "../../api/api";

function LastSectionEditor() {
  const [formData, setFormData] = useState({
    heading: "SAFE & SECURE HOUSE",
    subheading: "Need a Locksmith? We Come to You!",
    description:
      "Searching for the best emergency locksmith in Australia or dealing with locked keys inside your house? No matter your location, Lock Quick is here to provide fast, affordable, and reliable locksmith services across Australia.\nGet in touch today – your security is just a click away!",
    button_text: "Contact Us",
  });
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [contentId, setContentId] = useState(null);
  const [isNew, setIsNew] = useState(true);
  const navigate = useNavigate();

  const textLimits = {
    heading: 25,
    subheading: 40,
    description: 320,
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
      const response = await api.get("/api/content/?section=last_section");
      if (response.status === 200 && response.data.length > 0) {
        setFormData(response.data[0].content);
        setContentId(response.data[0].id);
        setIsNew(false);
      }
    } catch (error) {
      console.error("Error fetching last section content:", error);
      setMessage("Failed to load last section content.");
      setIsError(true);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value.slice(0, textLimits[name]) }));
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
      section: "last_section",
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
        setMessage("Last Section content created successfully.");
      } else {
        await api.put(`/api/content/${contentId}/`, payload, {
          headers: { Authorization: `Token ${accessToken}`, "Content-Type": "multipart/form-data" },
        });
        setMessage("Last Section content updated successfully.");
      }
      setIsError(false);
    } catch (error) {
      console.error("Error saving last section content:", error);
      setMessage("Failed to save last section content. Please try again.");
      setIsError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: "bold", color: "primary.main" }}>
        Last Section Editor
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
            {isNew ? "Create" : "Update"} Last Section
          </Button>
        </Box>
      )}
    </Paper>
  );
}

export default LastSectionEditor;