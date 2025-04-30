import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

import "./LockSmith.css";

const LockSmith = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <section className="LockSmith-section"   style={{
      backgroundImage: "url('/images/dem.webp')",    
    }}>
      <Container>
        <Row className="align-items-center">
          {/* Left Side - Image (for large screens) */}
          <Col md={12} lg={6} className="image-content d-lg-block d-none" data-aos="zoom-in">
            <img src="images/lksmith.png" alt="locksmith" className="img-fluid" />
          </Col>

          {/* Right Side - Text Content */}
          <Col md={12} lg={6} className="lock-text-content" data-aos="zoom-in">
            <h2 className="fw-bold">RELIABLE LOCKSMITH</h2>
            <h4><b>Securing Access to Your Home and Business</b></h4>

            {/* Image between heading and paragraph in medium screens */}
            <div className="lock-image-content d-md-block d-lg-none" data-aos="zoom-in">
              <img src="images/lksmith.png" alt="locksmith" className="img-fluid" />
            </div>

            <p>
              Your safety is our priority. Whether you need a  <b>locked-out-of-house locksmith in Perth, emergency lockout services in Melbourne,</b>, or <b>lost house keys replacement in Sydney,</b>, we deliver fast and reliable locksmith solutions.
            </p>

            {/* View More Button */}
            <Row className="align-items-center mt-4">
              <Col xs={12} className="text-md-center text-lg-start" data-aos="zoom-in">
                <Link to="/about-us" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
  <Button className="view-more-btn" variant="dark">
    View More
  </Button>
</Link>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default LockSmith;
