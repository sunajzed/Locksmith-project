import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, TextField, Typography, Button, Paper, Alert, CircularProgress } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import api from "../../api/api"; // Assuming api is configured with REACT_APP_BASE_URL

function HeroSection() {
  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    description: "",
  });
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [contentId, setContentId] = useState(null); // To store the ID of existing content
  const [isNew, setIsNew] = useState(true); // To track if content is new or existing
  const navigate = useNavigate();

  // Check authentication and fetch content on mount
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const userRole = localStorage.getItem("userRole");

    if (!accessToken || userRole !== "admin") {
      navigate("/login");
      return;
    }

    fetchHeroContent();
  }, [navigate]);

  // Fetch existing hero section content
  const fetchHeroContent = async () => {
    setLoading(true);
    try {
      const response = await api.get("/api/content/?section=hero_banner");
      if (response.status === 200 && response.data.length > 0) {
        const heroContent = response.data[0];
        setFormData({
          title: heroContent.content.title || "",
          subtitle: heroContent.content.subtitle || "",
          description: heroContent.content.description || "",
        });
        setContentId(heroContent.id);
        setIsNew(false);
      }
    } catch (error) {
      console.error("Error fetching hero content:", error);
      setMessage("Failed to load hero section content.");
      setIsError(true);
    } finally {
      setLoading(false);
    }
  };

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle save (create or update)
  const handleSave = async () => {
    const accessToken = localStorage.getItem("accessToken");

    // Validate inputs
    if (!formData.title || !formData.subtitle || !formData.description) {
      setMessage("All fields are required.");
      setIsError(true);
      return;
    }

    const payload = {
      section: "hero_banner",
      content: JSON.stringify({
        title: formData.title,
        subtitle: formData.subtitle,
        description: formData.description,
      }),
    };

    setLoading(true);
    try {
      if (isNew) {
        // Create new content
        const response = await api.post("/api/content/", payload, {
          headers: {
            Authorization: `Token ${accessToken}`,
            "Content-Type": "multipart/form-data",
          },
        });
        setContentId(response.data.id);
        setIsNew(false);
        setMessage("Hero section created successfully.");
      } else {
        // Update existing content
        await api.put(`/api/content/${contentId}/`, payload, {
          headers: {
            Authorization: `Token ${accessToken}`,
            "Content-Type": "multipart/form-data",
          },
        });
        setMessage("Hero section updated successfully.");
      }
      setIsError(false);
    } catch (error) {
      console.error("Error saving hero content:", error);
      setMessage("Failed to save hero section content. Please try again.");
      setIsError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
      <Typography
        variant="h5"
        component="h2"
        gutterBottom
        sx={{ fontWeight: "bold", color: "primary.main" }}
      >
        Hero Section Editor
      </Typography>

      {message && (
        <Alert
          severity={isError ? "error" : "success"}
          onClose={() => setMessage("")}
          sx={{ mb: 2 }}
        >
          {message}
        </Alert>
      )}

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", my: 4 }}>
          <CircularProgress />
          <Typography sx={{ ml: 2 }}>Loading...</Typography>
        </Box>
      ) : (
        <Box
          component="form"
          noValidate
          autoComplete="off"
          sx={{ "& .MuiTextField-root": { mb: 2 } }}
        >
          <TextField
            fullWidth
            label="Title"
            name="title"
            variant="outlined"
            value={formData.title}
            onChange={handleChange}
            margin="normal"
          />

          <TextField
            fullWidth
            label="Subtitle"
            name="subtitle"
            variant="outlined"
            value={formData.subtitle}
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

          <Button
            variant="contained"
            color="primary"
            startIcon={<SaveIcon />}
            onClick={handleSave}
            sx={{ mt: 2 }}
            disabled={loading}
          >
            {isNew ? "Create" : "Update"} Hero Section
          </Button>
        </Box>
      )}
    </Paper>
  );
}

export default HeroSection;