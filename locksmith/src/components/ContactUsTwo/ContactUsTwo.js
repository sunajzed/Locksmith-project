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
  <div style={{ height: "400px", width: "100%" }}>
  <iframe
  title="Queensland Map"
  width="100%"
  height="100%"
  style={{ border: "0" }}
  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d34640468.567390315!2d113.33895374835791!3d-25.274398082437237!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6b91579dd27438f9%3A0x500eef17f209a40!2sQueensland!5e0!3m2!1sen!2sau!4v1714477350611!5m2!1sen!2sau"
  allowFullScreen=""
  loading="lazy"
  referrerPolicy="no-referrer-when-downgrade"
/>
    
  </div>
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