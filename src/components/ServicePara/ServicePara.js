// import React from "react";
// import { Container, Row, Col, Button } from "react-bootstrap";
// import "./ServicePara.css";

// const ServicePara = () => {
//   return (
//     <section className="LockSmith-section">
//       <Container>
//         <Row className="align-items-center">
//           {/* Left Side - Image (for large screens) */}
//           <Col md={12} lg={6} className="image-content d-lg-block d-none">
//             <img src="images/whytrust.webp" alt="locksmith" className="img-fluid" />
//           </Col>

//           {/* Right Side - Text Content */}
//           <Col md={12} lg={6} className="lock-text-content">
//             <h2 className="fw-bold">WHY TRUST LOCKQUICK?</h2>
//             <h4 ><b>
//             Trusted Locksmiths for Your Safety
//             </b> </h4>

//             {/* Image between heading and paragraph in medium screens */}
//             <div className="lock-image-content d-md-block d-lg-none">
//               <img src="images/whytrust.webp" alt="locksmith" className="img-fluid" />
//             </div>

//             <p>
//             At LockQuick, we understand the importance of security. Whether you need a simple lock change or a complete security system upgrade, our team provides professional locksmith services to keep your home, business, and vehicle secure.<b> All our locksmiths are certified professionals, manually verified by our team to ensure reliability and expertise</b>. You can trust us to connect you with skilled and trustworthy locksmiths for any service you need.
//             </p>

//             {/* View More Button */}
//             <Row className="align-items-center mt-4">
//               <Col xs={12} className="text-md-center text-lg-start"> 
//                 <Button className="view-more-btn" variant="dark">Learn More</Button>
//               </Col>
//             </Row>
//           </Col>
//         </Row>
//       </Container>
//     </section>
//   );
// };

// export default ServicePara;
import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import "./ServicePara.css";
import { motion } from "framer-motion";
import "aos/dist/aos.css";

const ServicePara = () => {
  return (
    <section className="LockSmith-section">
      <Container>
        <Row className="align-items-center">
          {/* Left Side - Image (for large screens) */}
          <Col md={12} lg={6} className="image-content d-lg-block d-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
            >
              <img 
                src="images/whytrust.webp" 
                alt="locksmith" 
                className="img-fluid" 
                data-aos="zoom-in"
              />
            </motion.div>
          </Col>

          {/* Right Side - Text Content */}
          <Col md={12} lg={6} className="lock-text-content">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h2 
                className="fw-bold"
                data-aos="fade-up"
              >
                WHY TRUST LOCKQUICK?
              </h2>
              <h4 
                data-aos="fade-up"
                data-aos-delay="100"
              >
                <b>Trusted Locksmiths for Your Safety</b>
              </h4>

              {/* Image between heading and paragraph in medium screens */}
              <div className="lock-image-content d-md-block d-lg-none">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <img 
                    src="images/whytrust.webp" 
                    alt="locksmith" 
                    className="img-fluid" 
                    data-aos="zoom-in"
                  />
                </motion.div>
              </div>

              <p
                data-aos="fade-up"
                data-aos-delay="200"
              >
                At LockQuick, we understand the importance of security. Whether you need a simple lock change or a complete security system upgrade, our team provides professional locksmith services to keep your home, business, and vehicle secure.<b> All our locksmiths are certified professionals, manually verified by our team to ensure reliability and expertise</b>. You can trust us to connect you with skilled and trustworthy locksmiths for any service you need.
              </p>

              {/* View More Button */}
              <Row className="align-items-center mt-4">
                <Col xs={12} className="text-md-center text-lg-start"> 
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    data-aos="fade-up"
                    data-aos-delay="300"
                  >
                    <Button className="view-more-btn" variant="dark">Learn More</Button>
                  </motion.div>
                </Col>
              </Row>
            </motion.div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default ServicePara;