
import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Container, Row, Col, Button } from "react-bootstrap";
import "./LockRequirements.css";
import { Link } from 'react-router-dom';

const LockRequirements = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <section className="LockRequirements-section" style={{
      backgroundImage: "url('/images/Careernew.webp')",
    }}>
      <Container>
        <Row className="align-items-center">
          <Col md={12} lg={6} className="image-content d-lg-block d-none" data-aos="zoom-in">
            {/* <img src="images/lksmith.png" alt="locksmith" className="img-fluid" /> */}
          </Col>

          <Col md={12} lg={6} className="lock-text-content" data-aos="zoom-in">
            <div className="text-content-wrapper">
              <h2 className="fw-bold">WHAT ARE THE REQUIREMENTS TO WORK AS A LOCKSMITH?</h2>
              <h4><b>Securing Access to Your Home and Business</b></h4>

              <p>
                To ensure top-quality service, we require all applicants to meet these qualifications:
              </p>
              <ul className="lock-require-list">
                <li className="text-black">
                  <b>✔ Locksmith Training or Certification</b> – Completion of an accredited locksmith course or apprenticeship is preferred.
                </li>
                <li className="text-black">
                  <b>✔ Ability to Work on Different Lock Systems</b> – Whether it's high-security locks, smart locks, digital keypads, or traditional lock mechanisms, we welcome locksmiths with diverse skills.
                </li>
                <li className="text-black">
                  <b>✔ Tools & Equipment</b> – Locksmiths should have essential tools, such as lock-picking kits, key-cutting machines, and programming tools for electronic locks.
                </li>
                <li className="text-black">
                  <b>✔ Professionalism & Customer Service</b> – We prioritize customer satisfaction, so excellent communication and reliability are a must.
                </li>
              </ul>

              {/* <Row className="align-items-center mt-4">
                <Col xs={12} className="text-md-center text-lg-start" data-aos="zoom-in">
                  <Button className="view-more-btn" variant="dark">View More</Button>
                </Col>
              </Row> */}
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default LockRequirements;