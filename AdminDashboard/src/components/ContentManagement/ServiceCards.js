import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  TextField,
  Typography,
  Button,
  Paper,
  Grid,
  Alert,
  CircularProgress,
  MenuItem,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import api from "../../api/api";

function ServiceCards() {
  const defaultIcons = ["faUserShield", "faIdCard", "faClock"];
  const [formData, setFormData] = useState({
    maintitle: "WHAT WE DO – SPECIALIZED LOCKSMITH SERVICES",
    subtitle: "Reliable & Efficient Locksmith Solutions",
    card1: {
      heading: "Reliable Locksmith",
      description:
        "Quick and efficient solutions for lockouts, key replacements, and security installations.",
      icon: defaultIcons[0],
    },
    card2: {
      heading: "Licensed and Insured",
      description: "Trustworthy and certified locksmiths ensuring your safety.",
      icon: defaultIcons[1],
    },
    card3: {
      heading: "24/7 Availability",
      description:
        "Round-the-clock assistance for all your emergency lock and key issues.",
      icon: defaultIcons[2],
    },
  });
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [contentId, setContentId] = useState(null);
  const [isNew, setIsNew] = useState(true);
  const navigate = useNavigate();

  const cardIcons = ["faUserShield", "faIdCard", "faClock"];
  const textLimits = {
    maintitle: 50,
    subtitle: 40,
    card_heading: 30,
    card_description: 100,
  };

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const userRole = localStorage.getItem("userRole");

    if (!accessToken || userRole !== "admin") {
      navigate("/login");
      return;
    }

    fetchServiceCardsContent();
  }, [navigate]);

  const fetchServiceCardsContent = async () => {
    setLoading(true);
    try {
      const response = await api.get("/api/content/?section=service_cards");
      console.log("Fetched service cards content:", response.data); // Debug log
      if (response.status === 200 && response.data.length > 0) {
        const content = response.data[0].content;
        setFormData({
          maintitle:
            content.maintitle.slice(0, textLimits.maintitle) ||
            formData.maintitle,
          subtitle:
            content.subtitle.slice(0, textLimits.subtitle) || formData.subtitle,
          card1: {
            heading:
              content.card1?.heading.slice(0, textLimits.card_heading) ||
              formData.card1.heading,
            description:
              content.card1?.description.slice(
                0,
                textLimits.card_description
              ) || formData.card1.description,
            icon:
              content.card1?.icon && cardIcons.includes(content.card1.icon)
                ? content.card1.icon
                : defaultIcons[0],
          },
          card2: {
            heading:
              content.card2?.heading.slice(0, textLimits.card_heading) ||
              formData.card2.heading,
            description:
              content.card2?.description.slice(
                0,
                textLimits.card_description
              ) || formData.card2.description,
            icon:
              content.card2?.icon && cardIcons.includes(content.card2.icon)
                ? content.card2.icon
                : defaultIcons[1],
          },
          card3: {
            heading:
              content.card3?.heading.slice(0, textLimits.card_heading) ||
              formData.card3.heading,
            description:
              content.card3?.description.slice(
                0,
                textLimits.card_description
              ) || formData.card3.description,
            icon:
              content.card3?.icon && cardIcons.includes(content.card3.icon)
                ? content.card3.icon
                : defaultIcons[2],
          },
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("card")) {
      const [card, field, index] = name.split("_");
      setFormData((prev) => ({
        ...prev,
        [`card${index}`]: {
          ...prev[`card${index}`],
          [field]:
            field === "icon"
              ? value
              : value.slice(0, textLimits[`card_${field}`]),
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value.slice(0, textLimits[name]),
      }));
    }
  };

  const validateForm = () => {
    if (
      !formData.maintitle ||
      formData.maintitle.length > textLimits.maintitle
    ) {
      return `Main Title must be between 1 and ${textLimits.maintitle} characters.`;
    }
    if (!formData.subtitle || formData.subtitle.length > textLimits.subtitle) {
      return `Subtitle must be between 1 and ${textLimits.subtitle} characters.`;
    }
    for (let i = 1; i <= 3; i++) {
      const card = formData[`card${i}`];
      if (!card.heading || card.heading.length > textLimits.card_heading) {
        return `Card ${i} Heading must be between 1 and ${textLimits.card_heading} characters.`;
      }
      if (
        !card.description ||
        card.description.length > textLimits.card_description
      ) {
        return `Card ${i} Description must be between 1 and ${textLimits.card_description} characters.`;
      }
      if (!card.icon || !cardIcons.includes(card.icon)) {
        return `Card ${i} Icon is invalid or not selected.`;
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
      section: "service_cards",
      content: JSON.stringify({
        maintitle: formData.maintitle,
        subtitle: formData.subtitle,
        card1: formData.card1,
        card2: formData.card2,
        card3: formData.card3,
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
        setMessage("Service cards created successfully.");
      } else {
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
        name={`card_heading_${n}`}
        variant="outlined"
        value={formData[`card${n}`].heading}
        onChange={handleChange}
        margin="normal"
        inputProps={{ maxLength: textLimits.card_heading }}
        helperText={`${formData[`card${n}`].heading.length}/${
          textLimits.card_heading
        } characters`}
      />

      <TextField
        fullWidth
        label={`Card ${n} Description`}
        name={`card_description_${n}`}
        variant="outlined"
        value={formData[`card${n}`].description}
        onChange={handleChange}
        margin="normal"
        multiline
        rows={3}
        inputProps={{ maxLength: textLimits.card_description }}
        helperText={`${formData[`card${n}`].description.length}/${
          textLimits.card_description
        } characters`}
      />

      <TextField
        select
        fullWidth
        label={`Card ${n} Icon`}
        name={`card_icon_${n}`}
        variant="outlined"
        value={formData[`card${n}`].icon}
        onChange={handleChange}
        margin="normal"
      >
        {cardIcons.map((icon) => (
          <MenuItem key={icon} value={icon}>
            {icon}
          </MenuItem>
        ))}
      </TextField>
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
        <Box component="form" noValidate autoComplete="off">
          <TextField
            fullWidth
            label="Main Title"
            name="maintitle"
            variant="outlined"
            value={formData.maintitle}
            onChange={handleChange}
            margin="normal"
            inputProps={{ maxLength: textLimits.maintitle }}
            helperText={`${formData.maintitle.length}/${textLimits.maintitle} characters`}
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
