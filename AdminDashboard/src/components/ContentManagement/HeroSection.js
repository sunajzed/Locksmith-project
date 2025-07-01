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
    title: "",
    subtitle: "",
    description: "",
    image1: null,
    image2: null,
    image3: null,
  });

  const [imageIds, setImageIds] = useState({
    image1: null,
    image2: null,
    image3: null,
  });

  const [imagePreviews, setImagePreviews] = useState({
    image1: null,
    image2: null,
    image3: null,
  });

  const [contentId, setContentId] = useState(null);
  const [isNew, setIsNew] = useState(true);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const textLimits = {
    title: 80,
    subtitle: 120,
    description: 300,
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
      const sections = ["hero_banner", "image1", "image2", "image3"];
      const fetchPromises = sections.map((section) =>
        api.get(`/api/content/?section=${section}`)
      );
      const responses = await Promise.all(fetchPromises);

      const newFormData = { ...formData };
      const newImageIds = { ...imageIds };

      responses.forEach((response, index) => {
        const section = sections[index];
        if (response.status === 200 && response.data.length > 0) {
          const data = response.data[0];
          if (section === "hero_banner") {
            newFormData.title = data.content.title || "";
            newFormData.subtitle = data.content.subtitle || "";
            newFormData.description = data.content.description || "";
            setContentId(data.id);
            setIsNew(false);
          } else {
            newFormData[section] = data.image || null;
            newImageIds[section] = data.id;
          }
        }
      });

      setFormData(newFormData);
      setImageIds(newImageIds);
    } catch (error) {
      console.error("Error fetching hero content or images:", error);
      setMessage("Failed to load hero section content or images.");
      setIsError(true);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (files) {
      const file = files[0];
      setFormData((prev) => ({ ...prev, [name]: file }));

      const previewUrl = URL.createObjectURL(file);
      setImagePreviews((prev) => ({
        ...prev,
        [name]: previewUrl,
      }));
    } else {
      const limitedValue = textLimits[name]
        ? value.slice(0, textLimits[name])
        : value;
      setFormData((prev) => ({ ...prev, [name]: limitedValue }));
    }
  };

  const handleSave = async () => {
    const accessToken = localStorage.getItem("accessToken");

    if (!formData.title || !formData.subtitle || !formData.description) {
      setMessage("Title, subtitle, and description are required.");
      setIsError(true);
      return;
    }

    setLoading(true);
    try {
      const heroPayload = new FormData();
      heroPayload.append("section", "hero_banner");
      heroPayload.append(
        "content",
        JSON.stringify({
          title: formData.title,
          subtitle: formData.subtitle,
          description: formData.description,
        })
      );

      if (isNew) {
        const heroResponse = await api.post("/api/content/", heroPayload, {
          headers: {
            Authorization: `Token ${accessToken}`,
            "Content-Type": "multipart/form-data",
          },
        });
        setContentId(heroResponse.data.id);
        setIsNew(false);
      } else {
        await api.put(`/api/content/${contentId}/`, heroPayload, {
          headers: {
            Authorization: `Token ${accessToken}`,
            "Content-Type": "multipart/form-data",
          },
        });
      }

      const imageSections = ["image1", "image2", "image3"];
      for (const section of imageSections) {
        if (formData[section] && formData[section] instanceof File) {
          const imagePayload = new FormData();
          imagePayload.append("section", section);
          imagePayload.append("content", JSON.stringify({}));
          imagePayload.append("image", formData[section]);

          if (imageIds[section]) {
            await api.put(`/api/content/${imageIds[section]}/`, imagePayload, {
              headers: {
                Authorization: `Token ${accessToken}`,
                "Content-Type": "multipart/form-data",
              },
            });
          } else {
            const response = await api.post("/api/content/", imagePayload, {
              headers: {
                Authorization: `Token ${accessToken}`,
                "Content-Type": "multipart/form-data",
              },
            });
            setImageIds((prev) => ({
              ...prev,
              [section]: response.data.id,
            }));
          }
        }
      }

      setMessage("Hero section and images updated successfully.");
      setIsError(false);
    } catch (error) {
      console.error("Error saving hero content or images:", error);
      setMessage(
        "Failed to save hero section content or images. Please try again."
      );
      setIsError(true);
    } finally {
      setLoading(false);
    }
  };

  // Cleanup object URLs to avoid memory leaks
  useEffect(() => {
    return () => {
      Object.values(imagePreviews).forEach((url) => {
        if (url) URL.revokeObjectURL(url);
      });
    };
  }, [imagePreviews]);

  return (
    <Paper elevation={3} sx={{ p: 3, mb: 9 }}>
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

          {["image1", "image2", "image3"].map((imageKey, index) => (
            <Box key={imageKey} sx={{ mb: 2 }}>
              <TextField
                fullWidth
                type="file"
                label={`Hero Image ${index + 1}`}
                name={imageKey}
                InputLabelProps={{ shrink: true }}
                onChange={handleChange}
                margin="normal"
                inputProps={{ accept: "image/*" }}
              />

              {(imagePreviews[imageKey] ||
                (formData[imageKey] &&
                  typeof formData[imageKey] === "string")) && (
                <Box sx={{ mt: 1 }}>
                  <Typography variant="subtitle1">
                    {imagePreviews[imageKey] ? "Preview" : "Current"} Image{" "}
                    {index + 1}:
                  </Typography>
                  <img
                    src={
                      imagePreviews[imageKey]
                        ? imagePreviews[imageKey]
                        : formData[imageKey]
                    }
                    alt={`Hero image ${index + 1}`}
                    style={{
                      maxWidth: "200px",
                      maxHeight: "200px",
                      borderRadius: "8px",
                    }}
                  />
                </Box>
              )}
            </Box>
          ))}

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
