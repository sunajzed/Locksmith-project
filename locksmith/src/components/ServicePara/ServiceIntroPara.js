
// import React from "react";
// import { Container, Row, Col, Button } from "react-bootstrap";
// import "./ServiceIntroPara.css";
// import { motion } from "framer-motion";
// import "aos/dist/aos.css";

// const ServiceIntroPara = () => {
//   return (
//     <section className="locksmith-section py-5">
//       <Container>
//         <Row className="align-items-center">
//           {/* Left Side - Image Section */}
//           <Col lg={6} className="text-center text-lg-start">
//             <motion.div
//               initial={{ opacity: 0, x: -50 }}
//               whileInView={{ opacity: 1, x: 0 }}
//               transition={{ duration: 0.8 }}
//               viewport={{ once: true }}
//             >
//               <img
//                 src="/images/serv-1.png"
//                 alt="Locksmith Work"
//                 className="img-fluid service-intro-image"
//               />
//             </motion.div>
//           </Col>

//           {/* Right Side - Text Content */}
//           <Col lg={6} className="text-container">
//             <motion.div
//               initial={{ opacity: 0, y: 50 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.8, delay: 0.2 }}
//               viewport={{ once: true }}
//             >
//               <h1 
//                 className="fw-bold"
//                 data-aos="fade-up"
//                 data-aos-delay="100"
//               >
//                 PROFESSIONAL LOCKSMITH SOLUTIONS FOR HOMES AND BUSINESSES
//               </h1>
//               <p 
//                 className="description text-black"
//                 data-aos="fade-up"
//                 data-aos-delay="200"
//               >
//                 When it comes to securing your home, office, or vehicle, you need a locksmith you can trust. At LockQuick, we provide fast, reliable, and professional locksmith services to keep you safe and secure. Whether you're locked out, need key replacements, or want to install advanced security systems, we are here to help.
//               </p>
//               <p 
//                 className="text-black"
//                 data-aos="fade-up"
//                 data-aos-delay="300"
//               >
//                 We proudly serve Brisbane, Canberra, Sydney, Melbourne, Adelaide, and Perth, offering 24/7 emergency assistance and expert locksmith solutions tailored to your needs.
//               </p>
//             </motion.div>
//           </Col>
//         </Row>
//       </Container>
//     </section>
//   );
// };

// export default ServiceIntroPara;

import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import "./ServiceIntroPara.css";
import { motion } from "framer-motion";
import "aos/dist/aos.css";

const ServiceIntroPara = () => {
  return (
    <section className="locksmith-section py-5">
      <Container>
        <Row className="align-items-center">
          {/* Left Side - Image Section */}
          <Col lg={6} className="text-center text-lg-start mb-4 mb-lg-0">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <img
                src="/images/serv-1.png"
                alt="Locksmith Work"
                className="img-fluid service-intro-image"
              />
            </motion.div>
          </Col>

          {/* Right Side - Text Content */}
          <Col lg={6} className="text-center text-lg-start">
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
                PROFESSIONAL LOCKSMITH SOLUTIONS FOR HOMES AND BUSINESSES
              </h1>
              <p 
                className="description text-black"
                data-aos="fade-up"
                data-aos-delay="200"
              >
                When it comes to securing your home, office, or vehicle, you need a locksmith you can trust. At LockQuick, we provide fast, reliable, and professional locksmith services to keep you safe and secure. Whether you're locked out, need key replacements, or want to install advanced security systems, we are here to help.
              </p>
              <p 
                className="text-black"
                data-aos="fade-up"
                data-aos-delay="300"
              >
                We proudly serve Brisbane, Canberra, Sydney, Melbourne, Adelaide, and Perth, offering 24/7 emergency assistance and expert locksmith solutions tailored to your needs.
              </p>
            </motion.div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default ServiceIntroPara;