import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, TextField, Typography, Button, Paper, Alert, CircularProgress, IconButton } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import api from "../../api/api";

function UnlockYourFutureEditor() {
  const [formData, setFormData] = useState({
    heading: "UNLOCK YOUR FUTURE – BECOME A LOCKSMITH WITH US!",
    subheading: "Are You a Skilled Locksmith Looking for More Jobs?",
    description: "Join our Australia-wide locksmith network and start receiving high-paying service requests today!",
    benefits: [
      { text: "Guaranteed Work Opportunities – Residential, Commercial & Automotive Locksmith Jobs" },
      { text: "Flexible Schedule – Work in Sydney, Melbourne, Brisbane, Perth, Adelaide & Beyond" },
      { text: "Instant Job Assignments – No more waiting! Start getting locksmith service requests immediately." },
      { text: "Work Independently or with a Team – Choose your preferred work style" },
      { text: "Free Sign-Up & Quick Approval – Fast-track your locksmith career now!" },
    ],
    button_text: "Start Earning!",
  });
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [contentId, setContentId] = useState(null);
  const [isNew, setIsNew] = useState(true);
  const navigate = useNavigate();

  const textLimits = {
    heading: 60,
    subheading: 60,
    description: 120,
    benefit_text: 100,
    button_text: 12,
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
      const response = await api.get("/api/content/?section=unlock_your_future");
      if (response.status === 200 && response.data.length > 0) {
        setFormData(response.data[0].content);
        setContentId(response.data[0].id);
        setIsNew(false);
      }
    } catch (error) {
      console.error("Error fetching unlock your future content:", error);
      setMessage("Failed to load unlock your future content.");
      setIsError(true);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    if (name.startsWith("benefit_")) {
      const newBenefits = [...formData.benefits];
      newBenefits[index].text = value.slice(0, textLimits.benefit_text);
      setFormData((prev) => ({ ...prev, benefits: newBenefits }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value.slice(0, textLimits[name]) }));
    }
  };

  const addBenefit = () => {
    setFormData((prev) => ({ ...prev, benefits: [...prev.benefits, { text: "" }] }));
  };

  const removeBenefit = (index) => {
    setFormData((prev) => ({
      ...prev,
      benefits: prev.benefits.filter((_, i) => i !== index),
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
    for (let i = 0; i < formData.benefits.length; i++) {
      if (!formData.benefits[i].text || formData.benefits[i].text.length > textLimits.benefit_text) {
        return `Benefit ${i + 1} must be between 1 and ${textLimits.benefit_text} characters.`;
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
      section: "unlock_your_future",
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
        setMessage("Unlock Your Future content created successfully.");
      } else {
        await api.put(`/api/content/${contentId}/`, payload, {
          headers: { Authorization: `Token ${accessToken}`, "Content-Type": "multipart/form-data" },
        });
        setMessage("Unlock Your Future content updated successfully.");
      }
      setIsError(false);
    } catch (error) {
      console.error("Error saving unlock your future content:", error);
      setMessage("Failed to save unlock your future content. Please try again.");
      setIsError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: "bold", color: "primary.main" }}>
        Unlock Your Future Section Editor
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
          {formData.benefits.map((benefit, index) => (
            <Box key={index} sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <TextField
                fullWidth
                label={`Benefit ${index + 1}`}
                name={`benefit_${index}`}
                variant="outlined"
                value={benefit.text}
                onChange={(e) => handleChange(e, index)}
                margin="normal"
                inputProps={{ maxLength: textLimits.benefit_text }}
                helperText={`${benefit.text.length}/${textLimits.benefit_text} characters`}
              />
              <IconButton onClick={() => removeBenefit(index)} color="error" sx={{ ml: 1 }}>
                <DeleteIcon />
              </IconButton>
            </Box>
          ))}
          <Button variant="outlined" startIcon={<AddIcon />} onClick={addBenefit} sx={{ mb: 2 }}>
            Add Benefit
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
            {isNew ? "Create" : "Update"} Unlock Your Future Section
          </Button>
        </Box>
      )}
    </Paper>
  );
}

export default UnlockYourFutureEditor;