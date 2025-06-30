import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, TextField, Typography, Button, Paper, Grid, Alert, CircularProgress } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import api from "../../api/api"; // Assuming api is configured with REACT_APP_BASE_URL

function ServiceCards() {
  const [formData, setFormData] = useState({
    maintitle: "",
    subtitle: "",
    card1heading: "",
    card1description: "",
    card2heading: "",
    card2description: "",
    card3heading: "",
    card3description: "",
  });
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [contentId, setContentId] = useState(null);
  const [isNew, setIsNew] = useState(true);
  const navigate = useNavigate();

  // Check authentication and fetch content on mount
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const userRole = localStorage.getItem("userRole");

    if (!accessToken || userRole !== "admin") {
      navigate("/login");
      return;
    }

    fetchServiceCardsContent();
  }, [navigate]);

  // Fetch existing service cards content
  const fetchServiceCardsContent = async () => {
    setLoading(true);
    try {
      const response = await api.get("/api/content/?section=service_cards");
      if (response.status === 200 && response.data.length > 0) {
        const content = response.data[0].content;
        setFormData({
          maintitle: content.maintitle || "",
          subtitle: content.subtitle || "",
          card1heading: content.card1?.heading || "",
          card1description: content.card1?.description || "",
          card2heading: content.card2?.heading || "",
          card2description: content.card2?.description || "",
          card3heading: content.card3?.heading || "",
          card3description: content.card3?.description || "",
        });
        setContentId(response.data[0].id);
        setIsNew(false);
      }
    } catch (error) {
      console.error("Error fetching service cards content:", error);
      setMessage("Failed to load service cards content.");
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
    if (
      !formData.maintitle ||
      !formData.subtitle ||
      !formData.card1heading ||
      !formData.card1description ||
      !formData.card2heading ||
      !formData.card2description ||
      !formData.card3heading ||
      !formData.card3description
    ) {
      setMessage("All fields are required.");
      setIsError(true);
      return;
    }

    const payload = {
      section: "service_cards",
      content: JSON.stringify({
        maintitle: formData.maintitle,
        subtitle: formData.subtitle,
        card1: { heading: formData.card1heading, description: formData.card1description },
        card2: { heading: formData.card2heading, description: formData.card2description },
        card3: { heading: formData.card3heading, description: formData.card3description },
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
        setMessage("Service cards created successfully.");
      } else {
        // Update existing content
        await api.put(`/api/content/${contentId}/`, payload, {
          headers: {
            Authorization: `Token ${accessToken}`,
            "Content-Type": "multipart/form-data",
          },
        });
        setMessage("Service cards updated successfully.");
      }
      setIsError(false);
    } catch (error) {
      console.error("Error saving service cards content:", error);
      setMessage("Failed to save service cards content. Please try again.");
      setIsError(true);
    } finally {
      setLoading(false);
    }
  };

  const renderCardFields = (n) => (
    <Paper elevation={2} sx={{ p: 3, mb: 3 }} key={n}>
      <Typography variant="h6" gutterBottom sx={{ fontWeight: "medium" }}>
        Card {n} Content
      </Typography>

      <TextField
        fullWidth
        label={`Card ${n} Heading`}
        name={`card${n}heading`}
        variant="outlined"
        value={formData[`card${n}heading`]}
        onChange={handleChange}
        margin="normal"
      />

      <TextField
        fullWidth
        label={`Card ${n} Description`}
        name={`card${n}description`}
        variant="outlined"
        value={formData[`card${n}description`]}
        onChange={handleChange}
        margin="normal"
        multiline
        rows={3}
      />
    </Paper>
  );

  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Typography
        variant="h5"
        component="h2"
        gutterBottom
        sx={{ fontWeight: "bold", color: "primary.main" }}
      >
        Service Cards Editor
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
        <Box component="form" noValidate autoComplete="off">
          <TextField
            fullWidth
            label="Main Title"
            name="maintitle"
            variant="outlined"
            value={formData.maintitle}
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

          <Typography
            variant="subtitle1"
            gutterBottom
            sx={{ mt: 3, mb: 2, fontWeight: "medium" }}
          >
            Card Contents
          </Typography>

          <Grid container spacing={3}>
            {[1, 2, 3].map((n) => (
              <Grid item xs={12} md={4} key={n}>
                {renderCardFields(n)}
              </Grid>
            ))}
          </Grid>

          <Button
            variant="contained"
            color="primary"
            startIcon={<SaveIcon />}
            onClick={handleSave}
            sx={{ mt: 3 }}
            size="large"
            disabled={loading}
          >
            {isNew ? "Create" : "Update"} Service Cards
          </Button>
        </Box>
      )}
    </Paper>
  );
}

export default ServiceCards;