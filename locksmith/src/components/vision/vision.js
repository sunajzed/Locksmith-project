import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { FaEye, FaEnvelope } from "react-icons/fa";
import { GiAchievement } from "react-icons/gi";
import "./vision.css";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import AOS from 'aos';
import 'aos/dist/aos.css';

AOS.init({
  duration: 800,
  easing: 'ease-in-out',
  once: true
});

const WhyChooseUs = () => {
  return (
    <section className="vision">
      <Container>
        <Row className="align-items-center h-100">
          {/* Left Side - Text Content */}
          <Col md={6} className="vision-text-content d-flex flex-column justify-content-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="fw-bold" data-aos="fade-right">WHY CHOOSE LOCKQUICK?</h2>
              <h4 data-aos="fade-right" data-aos-delay="100">Your Security, Our Expertise</h4>
              <p className="text-black" data-aos="fade-right" data-aos-delay="200">
                Finding a <b>trusted locksmith in Brisbane, Canberra, Sydney, Melbourne, Adelaide, or Perth</b>
                can be challenging, but with <b>LockQuick</b>, you get the best service wherever you are.
              </p>
            </motion.div>

            <Row>
              <Col md={6} data-aos="fade-up" data-aos-delay="300">
                <div className="icon-box">
                  <motion.div
                    className="transparent-box"
                    whileHover={{ y: -5 }}
                  >
                    <FaEye className="icon" />
                    <h5 className="fw-bold">Our Vision</h5>
                    <p className="text-black">
                      To be the most <b>trusted locksmith service provider across Australia</b>, delivering
                      top-tier security solutions with integrity and professionalism.
                    </p>
                  </motion.div>
                </div>
              </Col>
              <Col md={6} data-aos="fade-up" data-aos-delay="400">
                <div className="icon-box">
                  <motion.div
                    className="transparent-box"
                    whileHover={{ y: -5 }}
                  >
                    <GiAchievement className="icon" />
                    <h5 className="fw-bold">Our Mission</h5>
                    <p className="text-black">
                      To provide <b>fast, efficient, and affordable locksmith solutions</b>, integrating the latest
                      security technologies for <b>homes, businesses, and vehicles</b>.
                    </p>
                  </motion.div>
                </div>
              </Col>
            </Row>
            <div data-aos="fade-up" data-aos-delay="500">
              <Link to="/services" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
                <Button className="services-btn">
                  OUR SERVICES
                </Button>
              </Link>
            </div>
          </Col>
          {/* Right Side - Image and Email Box */}
          <Col md={6} className="image-content">
            <div className="image-email-wrapper">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="image-container"
              >
                <img
                  src="/images/worker-client.webp"
                  alt="Locksmith at work"
                  className="locksmith-img"
                  data-aos="zoom-in"
                />
              </motion.div>
              <motion.div
                className="vision-contact-box"
                data-aos="fade-up"
                data-aos-delay="300"
                whileHover={{ y: -5 }}
              >
                <p className="text-white"><i>Have security questions? Email our experts now!</i></p>
                <a href="mailto:contact@lockquick.com.au" className="email-link" style={{ textDecoration: 'none' }}>
                  <p className="email-icon text-white">
                    <FaEnvelope className="email-icon" /> contact@lockquick.com.au
                  </p>
                </a>
              </motion.div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default WhyChooseUs;