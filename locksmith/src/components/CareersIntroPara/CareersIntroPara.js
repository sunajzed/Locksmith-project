import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./CareersIntroPara.css";
import { motion } from "framer-motion";
import "aos/dist/aos.css";

const CareersIntroPara = () => {
  return (
    <section className="locksmith-section py-5">
      <Container>
        <Row className="align-items-center">
          {/* Left Side - Image Section */}
          <Col lg={6} className="text-center text-lg-start">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <img
                src="/images/Career4.png"
                alt="Locksmith Work"
                className="img-fluid main-image"
                data-aos="fade-right"
              />
            </motion.div>
          </Col>

          {/* Right Side - Text Content */}
          <Col lg={6} className="text-container">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h1 
                className="fw-bold"
                data-aos="fade-up"
                data-aos-delay="100"
              >
                LOCKSMITH JOB OPPORTUNITIES IN AUSTRALIA – JOIN OUR TEAM TODAY!
              </h1>
              <p 
                className="description text-black"
                data-aos="fade-up"
                data-aos-delay="200"
              >
                Are you an experienced locksmith or just starting your career in the security industry? We are looking for skilled, passionate, and professional locksmiths to join our growing network across Australia. Whether you specialize in <b>residential locksmith services, commercial security solutions, automotive key replacement, or smart lock installations</b>, we offer a rewarding career path with <b>excellent benefits – and it's completely FREE to join!</b>
              </p>
            </motion.div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default CareersIntroPara;