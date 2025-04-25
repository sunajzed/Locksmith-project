import React, { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import AOS from "aos";
import "aos/dist/aos.css"; // Import AOS CSS
import "./ContactUsOne.css"; // Ensure you import the CSS file

const ContactUsOne = () => {
  // Initialize AOS
  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration
      once: true, // Whether animation should happen only once
    });
  }, []);

  return (
    <section className="contact-section">
      <Container className="text-center">
        {/* Title with AOS animation */}
        <h1 className="fw-bold text-black" data-aos="fade-down">
          GET IN TOUCH WITH LOCKQUICK – YOUR TRUSTED LOCKSMITH EXPERTS
        </h1>

        {/* Description with AOS animation */}
        <p className="text-black" data-aos="fade-up" data-aos-delay="100">
          Need a reliable locksmith? We’re here to help! Whether you're locked out, need key replacements, or want to upgrade your security, our expert team is available 24/7 across <b>Brisbane, Canberra, Sydney, Melbourne, Adelaide, and Perth</b>.
        </p>

        {/* Subtext with AOS animation */}
        <p data-aos="fade-up" data-aos-delay="200">
          <i className="text-black">Fast Response | Professional Service | Affordable Prices</i>
        </p>

        <Row className="justify-content-center">
          {/* Office Location Card with Flip Animation */}
          <Col md={4} sm={12} className="contact-card">
            <div
              className="contact-box office-bg"
              data-aos="flip-left" // Flip animation
              data-aos-delay="300" // Delay for staggered effect
            >
              <div className="contact-icon">
                <i className="fas fa-map-marker-alt"></i>
              </div>
              <h5 className="text-white">Office Location</h5>
              <p>Queensland, Australia</p>
            </div>
          </Col>

          {/* Phone Contact Card with Flip Animation */}
          {/* <Col md={4} sm={12} className="contact-card">
            <div
              className="contact-box phone-bg"
              data-aos="flip-up" // Flip animation
              data-aos-delay="400" // Delay for staggered effect
            >
              <div className="contact-icon">
                <i className="fas fa-phone-alt"></i>
              </div>
              <h5 className="text-white">Give Us A Call</h5>
              <p>(+62)81 115 8596 / (+62)81 115 8749</p>
            </div>
          </Col> */}

          {/* Email Contact Card with Flip Animation */}
          <Col md={4} sm={12} className="contact-card">
            <div
              className="contact-box email-bg"
              data-aos="flip-right" // Flip animation
              data-aos-delay="500" // Delay for staggered effect
            >
              <div className="contact-icon">
                <i className="fas fa-envelope"></i>
              </div>
              <h5 className="text-white">Email Us</h5>
              <p>contact@lockquick.com.au</p>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default ContactUsOne;