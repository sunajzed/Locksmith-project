
// import React from "react";
// import { Container, Row, Col, Form, Button } from "react-bootstrap";
// import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
// import "leaflet/dist/leaflet.css";
// import L from "leaflet";
// import "./ContactUsTwo.css";

// // Fix Leaflet marker icon issue
// import markerIcon from "leaflet/dist/images/marker-icon.png";
// import markerShadow from "leaflet/dist/images/marker-shadow.png";

// const defaultIcon = new L.Icon({
//   iconUrl: markerIcon,
//   shadowUrl: markerShadow,
//   iconSize: [25, 41],
//   iconAnchor: [12, 41],
//   popupAnchor: [1, -34],
//   shadowSize: [41, 41],
// });

// // Locations to be marked on the map
// const locations = [
//   { name: "Brisbane", coords: [-27.4698, 153.0251] },
//   { name: "Canberra", coords: [-35.2809, 149.1300] },
//   { name: "Sydney", coords: [-33.8688, 151.2093] },
//   { name: "Melbourne", coords: [-37.8136, 144.9631] },
//   { name: "Adelaide", coords: [-34.9285, 138.6007] },
//   { name: "Perth", coords: [-31.9505, 115.8605] },
// ];

// const ContactForm = () => {
//   return (
//     <section className="contact-form-section">
//       <Container>
//         <Row className="align-items-center">
//           {/* Left Side - Map */}
//           <Col lg={6} md={12} className="map-container">
//             <MapContainer
//               center={[-25.2744, 133.7751]} // Center of Australia
//               zoom={4}
//               style={{ height: "400px", width: "100%" }}
//             >
//               <TileLayer
//                 url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//                 attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//               />
//               {locations.map((location, index) => (
//                 <Marker key={index} position={location.coords} icon={defaultIcon}>
//                   <Popup>{location.name}</Popup>
//                 </Marker>
//               ))}
//             </MapContainer>
//           </Col>

//           {/* Right Side - Contact Form */}
//           <Col lg={6} md={12} className="form-container">
//             <Form>
//               <Form.Group className="mb-3">
//                 <Form.Control type="text" placeholder="Your Name" />
//               </Form.Group>

//               <Form.Group className="mb-3">
//                 <Form.Control type="email" placeholder="Your Email" />
//               </Form.Group>

//               <Form.Group className="mb-3">
//                 <Form.Control type="text" placeholder="Your Subject" />
//               </Form.Group>

//               <Form.Group className="mb-3">
//                 <Form.Control as="textarea" rows={4} placeholder="Your Message" />
//               </Form.Group>

//               <Button variant="secondary" className="send-btn">
//                 SEND MESSAGE
//               </Button>
//             </Form>
//           </Col>
//         </Row>
//       </Container>
//     </section>
//   );
// };

// export default ContactForm;
import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "./ContactUsTwo.css";
import api from "../../api/api";

// Fix Leaflet marker icon issue
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

const defaultIcon = new L.Icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

// Locations to be marked on the map
const locations = [
  { name: "Brisbane", coords: [-27.4698, 153.0251] },
  { name: "Canberra", coords: [-35.2809, 149.1300] },
  { name: "Sydney", coords: [-33.8688, 151.2093] },
  { name: "Melbourne", coords: [-37.8136, 144.9631] },
  { name: "Adelaide", coords: [-34.9285, 138.6007] },
  { name: "Perth", coords: [-31.9505, 115.8605] },
];

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isCustomer = localStorage.getItem("userRole") === "customer";
  const accessToken = localStorage.getItem("accessToken");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsSubmitting(true);

    if (!isCustomer) {
      setError("You need to be logged in as a customer to send a message.");
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await api.post(
        "/api/contact/",
        {
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      setSuccess("Your message has been sent successfully!");
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to send message. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="contact-form-section">
      <Container>
        <Row className="align-items-center">
          {/* Left Side - Map */}
          <Col lg={6} md={12} className="map-container">
            <MapContainer
              center={[-25.2744, 133.7751]} // Center of Australia
              zoom={4}
              style={{ height: "400px", width: "100%" }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              {locations.map((location, index) => (
                <Marker key={index} position={location.coords} icon={defaultIcon}>
                  <Popup>{location.name}</Popup>
                </Marker>
              ))}
            </MapContainer>
          </Col>

          {/* Right Side - Contact Form */}
          <Col lg={6} md={12} className="form-container">
            <h2 className="contact-heading mb-4">Get in Touch</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            {success && <Alert variant="success">{success}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Control
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Control
                  type="text"
                  name="subject"
                  placeholder="Your Subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Control
                  as="textarea"
                  rows={4}
                  name="message"
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Button
                variant="secondary"
                className="send-btn"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Sending..." : "SEND MESSAGE"}
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default ContactForm;