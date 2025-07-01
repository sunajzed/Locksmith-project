import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, TextField, Typography, Button, Paper, Alert, CircularProgress, IconButton, Grid, MenuItem } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import api from "../../api/api";

function FooterEditor() {
  const [formData, setFormData] = useState({
    abn: "24 684 285 050",
    description:
      "Lock Quick is an online-only marketplace connecting customers with trusted locksmiths across Australia. We offer fast, reliable locksmith services—from lock repairs to emergency lockouts—available 24/7 to keep you secure, wherever you are.",
    get_in_touch: "Questions or feedback? We'd love to hear from you.",
    social_links: [
      { platform: "Facebook", url: "https://www.facebook.com/profile.php?id=61577346733921" },
      {
        platform: "Instagram",
        url: "https://www.instagram.com/lockquick/?fbclid=IwY2xjawLIgkhleHRuA2FlbQIxMQBicmlkETFBdzk4Z1Q4SWMzeVd1M1N2AR4alkyfLtJ3r5f2n0vI2RfhorvIOxfP3ntWVbGmpbyaWyq5K7gY_guBaxHpzQ_aem_O7-r-PxR50El-cGtj4vghw",
      },
      { platform: "LinkedIn", url: "https://www.linkedin.com/company/lockquick/?viewAsMember=true" },
    ],
  });
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [contentId, setContentId] = useState(null);
  const [isNew, setIsNew] = useState(true);
  const navigate = useNavigate();

  const socialPlatforms = ["Facebook", "Instagram", "LinkedIn"];
  const textLimits = {
    abn: 20,
    description: 280,
    get_in_touch: 60,
    social_platform: 15,
    social_url: 150,
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
      const response = await api.get("/api/content/?section=footer");
      if (response.status === 200 && response.data.length > 0) {
        setFormData(response.data[0].content);
        setContentId(response.data[0].id);
        setIsNew(false);
      }
    } catch (error) {
      console.error("Error fetching footer content:", error);
      setMessage("Failed to load footer content.");
      setIsError(true);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    if (name.startsWith("social_platform_") || name.startsWith("social_url_")) {
      const newSocialLinks = [...formData.social_links];
      const idx = parseInt(name.split("_")[2]);
      if (name.startsWith("social_platform_")) {
        newSocialLinks[idx].platform = value.slice(0, textLimits.social_platform);
      } else {
        newSocialLinks[idx].url = value.slice(0, textLimits.social_url);
      }
      setFormData((prev) => ({ ...prev, social_links: newSocialLinks }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value.slice(0, textLimits[name]) }));
    }
  };

  const addSocialLink = () => {
    setFormData((prev) => ({
      ...prev,
      social_links: [...prev.social_links, { platform: "", url: "" }],
    }));
  };

  const removeSocialLink = (index) => {
    setFormData((prev) => ({
      ...prev,
      social_links: prev.social_links.filter((_, i) => i !== index),
    }));
  };

  const validateForm = () => {
    if (!formData.abn || formData.abn.length > textLimits.abn) {
      return `ABN must be between 1 and ${textLimits.abn} characters.`;
    }
    if (!formData.description || formData.description.length > textLimits.description) {
      return `Description must be between 1 and ${textLimits.description} characters.`;
    }
    if (!formData.get_in_touch || formData.get_in_touch.length > textLimits.get_in_touch) {
      return `Get in Touch text must be between 1 and ${textLimits.get_in_touch} characters.`;
    }
    for (let i = 0; i < formData.social_links.length; i++) {
      const link = formData.social_links[i];
      if (!link.platform || link.platform.length > textLimits.social_platform) {
        return `Social Platform ${i + 1} must be between 1 and ${textLimits.social_platform} characters.`;
      }
      if (!link.url || link.url.length > textLimits.social_url) {
        return `Social URL ${i + 1} must be between 1 and ${textLimits.social_url} characters.`;
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
      section: "footer",
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
        setMessage("Footer content created successfully.");
      } else {
        await api.put(`/api/content/${contentId}/`, payload, {
          headers: { Authorization: `Token ${accessToken}`, "Content-Type": "multipart/form-data" },
        });
        setMessage("Footer content updated successfully.");
      }
      setIsError(false);
    } catch (error) {
      console.error("Error saving footer content:", error);
      setMessage("Failed to save footer content. Please try again.");
      setIsError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: "bold", color: "primary.main" }}>
        Footer Section Editor
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
            label="ABN"
            name="abn"
            variant="outlined"
            value={formData.abn}
            onChange={handleChange}
            margin="normal"
            inputProps={{ maxLength: textLimits.abn }}
            helperText={`${formData.abn.length}/${textLimits.abn} characters`}
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
            label="Get in Touch Text"
            name="get_in_touch"
            variant="outlined"
            value={formData.get_in_touch}
            onChange={handleChange}
            margin="normal"
            multiline
            rows={2}
            inputProps={{ maxLength: textLimits.get_in_touch }}
            helperText={`${formData.get_in_touch.length}/${textLimits.get_in_touch} characters`}
          />
          {formData.social_links.map((link, index) => (
            <Grid container spacing={2} key={index} sx={{ mb: 2 }}>
              <Grid item xs={12} sm={5}>
                <TextField
                  select
                  fullWidth
                  label={`Social Platform ${index + 1}`}
                  name={`social_platform_${index}`}
                  variant="outlined"
                  value={link.platform}
                  onChange={(e) => handleChange(e, index)}
                  margin="normal"
                  inputProps={{ maxLength: textLimits.social_platform }}
                  helperText={`${link.platform.length}/${textLimits.social_platform} characters`}
                >
                  {socialPlatforms.map((platform) => (
                    <MenuItem key={platform} value={platform}>
                      {platform}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label={`Social URL ${index + 1}`}
                  name={`social_url_${index}`}
                  variant="outlined"
                  value={link.url}
                  onChange={(e) => handleChange(e, index)}
                  margin="normal"
                  inputProps={{ maxLength: textLimits.social_url }}
                  helperText={`${link.url.length}/${textLimits.social_url} characters`}
                />
              </Grid>
              <Grid item xs={12} sm={1} sx={{ display: "flex", alignItems: "center" }}>
                <IconButton onClick={() => removeSocialLink(index)} color="error">
                  <DeleteIcon />
                </IconButton>
              </Grid>
            </Grid>
          ))}
          <Button variant="outlined" startIcon={<AddIcon />} onClick={addSocialLink} sx={{ mb: 2 }}>
            Add Social Link
          </Button>
          <Button variant="contained" color="primary" startIcon={<SaveIcon />} onClick={handleSave} sx={{ mt: 2 }} disabled={loading}>
            {isNew ? "Create" : "Update"} Footer Section
          </Button>
        </Box>
      )}
    </Paper>
  );
}

export default FooterEditor;