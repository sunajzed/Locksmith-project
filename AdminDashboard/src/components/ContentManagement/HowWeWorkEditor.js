// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { Box, TextField, Typography, Button, Paper, Alert, CircularProgress, IconButton, Grid } from "@mui/material";
// import SaveIcon from "@mui/icons-material/Save";
// import AddIcon from "@mui/icons-material/Add";
// import DeleteIcon from "@mui/icons-material/Delete";
// import api from "../../api/api";

// function HowWeWorkEditor() {
//   const [formData, setFormData] = useState({
//     heading: "",
//     subheading: "",
//     steps: [{ heading: "", text: "" }],
//   });
//   const [message, setMessage] = useState("");
//   const [isError, setIsError] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [contentId, setContentId] = useState(null);
//   const [isNew, setIsNew] = useState(true);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const accessToken = localStorage.getItem("accessToken");
//     const userRole = localStorage.getItem("userRole");

//     if (!accessToken || userRole !== "admin") {
//       navigate("/login");
//       return;
//     }

//     fetchContent();
//   }, [navigate]);

//   const fetchContent = async () => {
//     setLoading(true);
//     try {
//       const response = await api.get("/api/content/?section=how_we_work");
//       if (response.status === 200 && response.data.length > 0) {
//         setFormData(response.data[0].content);
//         setContentId(response.data[0].id);
//         setIsNew(false);
//       }
//     } catch (error) {
//       console.error("Error fetching how we work content:", error);
//       setMessage("Failed to load how we work content.");
//       setIsError(true);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleChange = (e, index) => {
//     const { name, value } = e.target;
//     if (name.startsWith("step_heading_") || name.startsWith("step_text_")) {
//       const newSteps = [...formData.steps];
//       const idx = parseInt(name.split("_")[2]);
//       if (name.startsWith("step_heading_")) {
//         newSteps[idx].heading = value;
//       } else {
//         newSteps[idx].text = value;
//       }
//       setFormData((prev) => ({ ...prev, steps: newSteps }));
//     } else {
//       setFormData((prev) => ({ ...prev, [name]: value }));
//     }
//   };

//   const addStep = () => {
//     setFormData((prev) => ({ ...prev, steps: [...prev.steps, { heading: "", text: "" }] }));
//   };

//   const removeStep = (index) => {
//     setFormData((prev) => ({
//       ...prev,
//       steps: prev.steps.filter((_, i) => i !== index),
//     }));
//   };

//   const handleSave = async () => {
//     const accessToken = localStorage.getItem("accessToken");
//     if (
//       !formData.heading ||
//       !formData.subheading ||
//       formData.steps.some((step) => step.heading === "" || step.text === "")
//     ) {
//       setMessage("All fields are required.");
//       setIsError(true);
//       return;
//     }

//     const payload = {
//       section: "how_we_work",
//       content: JSON.stringify(formData),
//     };

//     setLoading(true);
//     try {
//       if (isNew) {
//         const response = await api.post("/api/content/", payload, {
//           headers: { Authorization: `Token ${accessToken}`, "Content-Type": "multipart/form-data" },
//         });
//         setContentId(response.data.id);
//         setIsNew(false);
//         setMessage("How We Work content created successfully.");
//       } else {
//         await api.put(`/api/content/${contentId}/`, payload, {
//           headers: { Authorization: `Token ${accessToken}`, "Content-Type": "multipart/form-data" },
//         });
//         setMessage("How We Work content updated successfully.");
//       }
//       setIsError(false);
//     } catch (error) {
//       console.error("Error saving how we work content:", error);
//       setMessage("Failed to save how we work content. Please try again.");
//       setIsError(true);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Paper elevation={3} sx={{ p: 3 }}>
//       <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: "bold", color: "primary.main" }}>
//         How We Work Section Editor
//       </Typography>
//       {message && (
//         <Alert severity={isError ? "error" : "success"} onClose={() => setMessage("")} sx={{ mb: 2 }}>
//           {message}
//         </Alert>
//       )}
//       {loading ? (
//         <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", my: 4 }}>
//           <CircularProgress />
//           <Typography sx={{ ml: 2 }}>Loading...</Typography>
//         </Box>
//       ) : (
//         <Box component="form" noValidate autoComplete="off" sx={{ "& .MuiTextField-root": { mb: 2 } }}>
//           <TextField fullWidth label="Heading" name="heading" variant="outlined" value={formData.heading} onChange={handleChange} margin="normal" />
//           <TextField
//             fullWidth
//             label="Subheading"
//             name="subheading"
//             variant="outlined"
//             value={formData.subheading}
//             onChange={handleChange}
//             margin="normal"
//           />
//           {formData.steps.map((step, index) => (
//             <Grid container spacing={2} key={index} sx={{ mb: 2 }}>
//               <Grid item xs={12} sm={5}>
//                 <TextField
//                   fullWidth
//                   label={`Step ${index + 1} Heading`}
//                   name={`step_heading_${index}`}
//                   variant="outlined"
//                   value={step.heading}
//                   onChange={(e) => handleChange(e, index)}
//                   margin="normal"
//                 />
//               </Grid>
//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   fullWidth
//                   label={`Step ${index + 1} Text`}
//                   name={`step_text_${index}`}
//                   variant="outlined"
//                   value={step.text}
//                   onChange={(e) => handleChange(e, index)}
//                   margin="normal"
//                   multiline
//                   rows={3}
//                 />
//               </Grid>
//               <Grid item xs={12} sm={1} sx={{ display: "flex", alignItems: "center" }}>
//                 <IconButton onClick={() => removeStep(index)} color="error">
//                   <DeleteIcon />
//                 </IconButton>
//               </Grid>
//             </Grid>
//           ))}
//           <Button variant="outlined" startIcon={<AddIcon />} onClick={addStep} sx={{ mb: 2 }}>
//             Add Step
//           </Button>
//           <Button variant="contained" color="primary" startIcon={<SaveIcon />} onClick={handleSave} sx={{ mt: 2 }} disabled={loading}>
//             {isNew ? "Create" : "Update"} How We Work Section
//           </Button>
//         </Box>
//       )}
//     </Paper>
//   );
// }

// export default HowWeWorkEditor;

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
  IconButton,
  Grid,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import api from "../../api/api";

function HowWeWorkEditor() {
  const [formData, setFormData] = useState({
    heading: "",
    subheading: "",
    steps: [{ heading: "", text: "" }],
  });
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [contentId, setContentId] = useState(null);
  const [isNew, setIsNew] = useState(true);
  const navigate = useNavigate();

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
    if (name.startsWith("step_heading_") || name.startsWith("step_text_")) {
      const newSteps = [...formData.steps];
      const idx = parseInt(name.split("_")[2]);
      if (name.startsWith("step_heading_")) {
        newSteps[idx].heading = value;
      } else {
        newSteps[idx].text = value;
      }
      setFormData((prev) => ({ ...prev, steps: newSteps }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const addStep = () => {
    setFormData((prev) => ({
      ...prev,
      steps: [...prev.steps, { heading: "", text: "" }],
    }));
  };

  const removeStep = (index) => {
    setFormData((prev) => ({
      ...prev,
      steps: prev.steps.filter((_, i) => i !== index),
    }));
  };

  const handleSave = async () => {
    const accessToken = localStorage.getItem("accessToken");
    if (
      !formData.heading ||
      !formData.subheading ||
      formData.steps.some((step) => step.heading === "" || step.text === "")
    ) {
      setMessage("All fields are required.");
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
          headers: {
            Authorization: `Token ${accessToken}`,
            "Content-Type": "multipart/form-data",
          },
        });
        setContentId(response.data.id);
        setIsNew(false);
        setMessage("How We Work content created successfully.");
      } else {
        await api.put(`/api/content/${contentId}/`, payload, {
          headers: {
            Authorization: `Token ${accessToken}`,
            "Content-Type": "multipart/form-data",
          },
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
      <Typography
        variant="h5"
        component="h2"
        gutterBottom
        sx={{ fontWeight: "bold", color: "primary.main" }}
      >
        How We Work Section Editor
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
            label="Heading"
            name="heading"
            variant="outlined"
            value={formData.heading}
            onChange={handleChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Subheading"
            name="subheading"
            variant="outlined"
            value={formData.subheading}
            onChange={handleChange}
            margin="normal"
          />
          {formData.steps.map((step, index) => (
            <Grid container spacing={2} key={index} sx={{ mb: 2 }}>
              <Grid item xs={12} sm={5}>
                <TextField
                  fullWidth
                  label={`Step ${index + 1} Heading`}
                  name={`step_heading_${index}`}
                  variant="outlined"
                  value={step.heading}
                  onChange={(e) => handleChange(e, index)}
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
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
                />
              </Grid>
              <Grid
                item
                xs={12}
                sm={1}
                sx={{ display: "flex", alignItems: "center" }}
              >
                <IconButton onClick={() => removeStep(index)} color="error">
                  <DeleteIcon />
                </IconButton>
              </Grid>
            </Grid>
          ))}
          <Button
            variant="outlined"
            startIcon={<AddIcon />}
            onClick={addStep}
            sx={{ mb: 2 }}
          >
            Add Step
          </Button>
          <Button
            variant="contained"
            color="primary"
            startIcon={<SaveIcon />}
            onClick={handleSave}
            sx={{ mt: 2 }}
            disabled={loading}
          >
            {isNew ? "Create" : "Update"} How We Work Section
          </Button>
        </Box>
      )}
    </Paper>
  );
}

export default HowWeWorkEditor;
