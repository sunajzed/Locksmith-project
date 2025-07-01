import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, TextField, Typography, Button, Paper, Alert, CircularProgress } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import api from "../../api/api";

function LockSmithEditor() {
  const [formData, setFormData] = useState({
    heading: "RELIABLE LOCKSMITH",
    subheading: "Securing Access to Your Home and Business",
    description:
      "Your safety is our priority. Whether you need a locked-out-of-house locksmith in Perth, emergency lockout services in Melbourne, or lost house keys replacement in Sydney, we deliver fast and reliable locksmith solutions.",
    button_text: "View More",
  });
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [contentId, setContentId] = useState(null);
  const [isNew, setIsNew] = useState(true);
  const navigate = useNavigate();

  const textLimits = {
    heading: 20,
    subheading: 50,
    description: 250,
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
      const response = await api.get("/api/content/?section=locksmith");
      if (response.status === 200 && response.data.length > 0) {
        setFormData(response.data[0].content);
        setContentId(response.data[0].id);
        setIsNew(false);
      }
    } catch (error) {
      console.error("Error fetching locksmith content:", error);
      setMessage("Failed to load locksmith content.");
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
      section: "locksmith",
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
        setMessage("Locksmith content created successfully.");
      } else {
        await api.put(`/api/content/${contentId}/`, payload, {
          headers: { Authorization: `Token ${accessToken}`, "Content-Type": "multipart/form-data" },
        });
        setMessage("Locksmith content updated successfully.");
      }
      setIsError(false);
    } catch (error) {
      console.error("Error saving locksmith content:", error);
      setMessage("Failed to save locksmith content. Please try again.");
      setIsError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: "bold", color: "primary.main" }}>
        Locksmith Section Editor
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
            {isNew ? "Create" : "Update"} Locksmith Section
          </Button>
        </Box>
      )}
    </Paper>
  );
}

export default LockSmithEditor;