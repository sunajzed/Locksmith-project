import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  TextField,
  Typography,
  Button,
  Paper,
  Alert,
  CircularProgress,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import api from "../../api/api";

function HeroSection() {
  const [formData, setFormData] = useState({
    title: "LOCK QUICK – Fast & Reliable Locksmith Services in Australia",
    subtitle: "24/7 Emergency Locksmith Services – Anytime, Anywhere!",
    description:
      "LOCK QUICK IS AN ONLINE-ONLY MARKETPLACE CONNECTING CUSTOMERS WITH TRUSTED LOCKSMITHS ACROSS AUSTRALIA\nWhether you're locked out or need urgent repairs, we offer fast, affordable, and 24/7 locksmith services—anytime, anywhere.",
  });
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [contentId, setContentId] = useState(null);
  const [isNew, setIsNew] = useState(true);
  const navigate = useNavigate();

  const textLimits = {
    title: 60,
    subtitle: 40,
    description: 200,
  };

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const userRole = localStorage.getItem("userRole");

    if (!accessToken || userRole !== "admin") {
      navigate("/login");
      return;
    }

    fetchHeroContent();
  }, [navigate]);

  const fetchHeroContent = async () => {
    setLoading(true);
    try {
      const response = await api.get("/api/content/?section=hero_banner");
      if (response.status === 200 && response.data.length > 0) {
        const heroContent = response.data[0].content;
        setFormData({
          title: heroContent.title.slice(0, textLimits.title),
          subtitle: heroContent.subtitle.slice(0, textLimits.subtitle),
          description: heroContent.description.slice(0, textLimits.description),
        });
        setContentId(response.data[0].id);
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value.slice(0, textLimits[name]),
    }));
  };

  const validateForm = () => {
    if (!formData.title || formData.title.length > textLimits.title) {
      return `Title must be between 1 and ${textLimits.title} characters.`;
    }
    if (!formData.subtitle || formData.subtitle.length > textLimits.subtitle) {
      return `Subtitle must be between 1 and ${textLimits.subtitle} characters.`;
    }
    if (
      !formData.description ||
      formData.description.length > textLimits.description
    ) {
      return `Description must be between 1 and ${textLimits.description} characters.`;
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
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            my: 4,
          }}
        >
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
            inputProps={{ maxLength: textLimits.title }}
            helperText={`${formData.title.length}/${textLimits.title} characters`}
          />

          <TextField
            fullWidth
            label="Subtitle"
            name="subtitle"
            variant="outlined"
            value={formData.subtitle}
            onChange={handleChange}
            margin="normal"
            inputProps={{ maxLength: textLimits.subtitle }}
            helperText={`${formData.subtitle.length}/${textLimits.subtitle} characters`}
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
