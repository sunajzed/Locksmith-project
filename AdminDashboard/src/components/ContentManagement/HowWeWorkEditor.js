import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, TextField, Typography, Button, Paper, Alert, CircularProgress, IconButton, Grid, MenuItem } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import api from "../../api/api";

function HowWeWorkEditor() {
  const [formData, setFormData] = useState({
    heading: "HOW WE WORK",
    subheading: "Our Process",
    steps: [
      { heading: "1. Make a Booking", text: "Contact us for immediate assistance.", icon: "faCalendarCheck" },
      { heading: "2. Confirm the Details & Payment", text: "Receive a quick estimate and proceed with payment.", icon: "faDollarSign" },
      { heading: "3. Locksmith Arrives", text: "Our expert locksmith reaches your location promptly.", icon: "faUserLock" },
      { heading: "4. Service Execution", text: "Your lock or key issue is resolved efficiently.", icon: "faToolbox" },
      { heading: "5. Review & Feedback", text: "Secure your property and share your experience.", icon: "faCommentDots" },
    ],
  });
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [contentId, setContentId] = useState(null);
  const [isNew, setIsNew] = useState(true);
  const navigate = useNavigate();

  const stepIcons = ["faCalendarCheck", "faDollarSign", "faUserLock", "faToolbox", "faCommentDots"];
  const textLimits = {
    heading: 20,
    subheading: 20,
    step_heading: 40,
    step_text: 60,
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
      const response = await api.get("/api/content/?section=how_we_work");
      if (response.status === 200 && response.data.length > 0) {
        setFormData(response.data[0].content);
        setContentId(response.data[0].id);
        setIsNew(false);
      }
    } catch (error) {
      console.error("Error fetching how we work content:", error);
      setMessage("Failed to load how we work content.");
      setIsError(true);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    if (name.startsWith("step_heading_") || name.startsWith("step_text_") || name.startsWith("step_icon_")) {
      const newSteps = [...formData.steps];
      const idx = parseInt(name.split("_")[2]);
      if (name.startsWith("step_heading_")) {
        newSteps[idx].heading = value.slice(0, textLimits.step_heading);
      } else if (name.startsWith("step_text_")) {
        newSteps[idx].text = value.slice(0, textLimits.step_text);
      } else {
        newSteps[idx].icon = value;
      }
      setFormData((prev) => ({ ...prev, steps: newSteps }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value.slice(0, textLimits[name]) }));
    }
  };

  const addStep = () => {
    setFormData((prev) => ({ ...prev, steps: [...prev.steps, { heading: "", text: "", icon: "" }] }));
  };

  const removeStep = (index) => {
    setFormData((prev) => ({
      ...prev,
      steps: prev.steps.filter((_, i) => i !== index),
    }));
  };

  const validateForm = () => {
    if (!formData.heading || formData.heading.length > textLimits.heading) {
      return `Heading must be between 1 and ${textLimits.heading} characters.`;
    }
    if (!formData.subheading || formData.subheading.length > textLimits.subheading) {
      return `Subheading must be between 1 and ${textLimits.subheading} characters.`;
    }
    for (let i = 0; i < formData.steps.length; i++) {
      const step = formData.steps[i];
      if (!step.heading || step.heading.length > textLimits.step_heading) {
        return `Step ${i + 1} Heading must be between 1 and ${textLimits.step_heading} characters.`;
      }
      if (!step.text || step.text.length > textLimits.step_text) {
        return `Step ${i + 1} Text must be between 1 and ${textLimits.step_text} characters.`;
      }
      if (!step.icon) {
        return `Step ${i + 1} Icon is required.`;
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
      section: "how_we_work",
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
        setMessage("How We Work content created successfully.");
      } else {
        await api.put(`/api/content/${contentId}/`, payload, {
          headers: { Authorization: `Token ${accessToken}`, "Content-Type": "multipart/form-data" },
        });
        setMessage("How We Work content updated successfully.");
      }
      setIsError(false);
    } catch (error) {
      console.error("Error saving how we work content:", error);
      setMessage("Failed to save how we work content. Please try again.");
      setIsError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: "bold", color: "primary.main" }}>
        How We Work Section Editor
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
          {formData.steps.map((step, index) => (
            <Grid container spacing={2} key={index} sx={{ mb: 2 }}>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label={`Step ${index + 1} Heading`}
                  name={`step_heading_${index}`}
                  variant="outlined"
                  value={step.heading}
                  onChange={(e) => handleChange(e, index)}
                  margin="normal"
                  inputProps={{ maxLength: textLimits.step_heading }}
                  helperText={`${step.heading.length}/${textLimits.step_heading} characters`}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label={`Step ${index + 1} Text`}
                  name={`step_text_${index}`}
                  variant="outlined"
                  value={step.text}
                  onChange={(e) => handleChange(e, index)}
                  margin="normal"
                  multiline
                  rows={3}
                  inputProps={{ maxLength: textLimits.step_text }}
                  helperText={`${step.text.length}/${textLimits.step_text} characters`}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  select
                  fullWidth
                  label={`Step ${index + 1} Icon`}
                  name={`step_icon_${index}`}
                  variant="outlined"
                  value={step.icon}
                  onChange={(e) => handleChange(e, index)}
                  margin="normal"
                >
                  {stepIcons.map((icon) => (
                    <MenuItem key={icon} value={icon}>
                      {icon}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12} sm={1} sx={{ display: "flex", alignItems: "center" }}>
                <IconButton onClick={() => removeStep(index)} color="error">
                  <DeleteIcon />
                </IconButton>
              </Grid>
            </Grid>
          ))}
          <Button variant="outlined" startIcon={<AddIcon />} onClick={addStep} sx={{ mb: 2 }}>
            Add Step
          </Button>
          <Button variant="contained" color="primary" startIcon={<SaveIcon />} onClick={handleSave} sx={{ mt: 2 }} disabled={loading}>
            {isNew ? "Create" : "Update"} How We Work Section
          </Button>
        </Box>
      )}
    </Paper>
  );
}

export default HowWeWorkEditor;