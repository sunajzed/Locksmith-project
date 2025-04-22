// import React from "react";
// import { Container, Row, Col, Button } from "react-bootstrap";
// import "./SecurityInfoSection.css"; // Ensure the CSS file is imported

// const SecurityInfoSection = () => {
//   return (
//     <section className="locksmith-section py-5">
//       <Container>
//         <Row className="align-items-center">
//           {/* Left Side - Image Section */}
//           <Col lg={6} className="text-center text-lg-start">
//             <img
//               src="/images/Untitled design (1).png"
//               alt="Locksmith Work"
//               className="img-fluid main-image"
//             />
//           </Col>

//           {/* Right Side - Text Content */}
//           <Col lg={6} className="text-container">
//             {/* <p className="welcome-text">WELCOME TO KEYMAN</p>
//             <h6 className="title">
//               We Have 15 Years of Experience in Locksmith Service
//             </h6> */}
//             <h1 className="fw-bold">
//             {/* Welcome to LockQuick – Your Trusted Locksmith Experts Across Australia */}
//             WELCOME TO LOCKQUICK – YOUR TRUSTED ACCESS TO LOCKSMITHS ACROSS AUSTRALIA
//             </h1>
//             <p className="description text-dark">
//             Lock Quick is the one and only place to find<b> professional locksmith services</b> in <b>Brisbane, Canberra, Sydney, Melbourne, Adelaide, and Perth</b>. Lock Quick's Online world is the gateway to Locksmiths who are dedicated to ensuring the safety and security of homes, businesses, and vehicles with <b>fast, reliable, legal and affordable locksmith solutions</b>.            </p>
//             <p className="text-dark">We understand that security is more than just locks and keys—it’s about <b>trust and peace of mind</b>. Whether you need a quick lock repair, emergency lockout assistance, or advanced security installations, <b>online hub of our mobile locksmiths are available 24/7 to help</b>.
//             </p>

//             <Row>
              
//                 <ul className="list-unstyled">
//                   <li><span className="brown-tick">✔</span>	<b>Fast & Reliable </b>– Quick response times and efficient service</li>
//                   <li><span className="brown-tick">✔</span><b> Certified & Insured</b> – Licensed professionals ensuring your security.</li>
//                   <li><span className="brown-tick">✔</span> <b>Advanced Security Solutions</b> – Smart locks and high-tech access control.</li>
//                 </ul>
              
//               {/* <Col md={6}>
//                 <ul className="list-unstyled">
//                   <li><span className="brown-tick">✔</span> Installation and repair of locks</li>
//                   <li><span className="brown-tick">✔</span> Fast lock-out service</li>
//                   <li><span className="brown-tick">✔</span> Quick Tips and Advice</li>
//                 </ul>
//               </Col> */}
//             </Row>

//             {/* Testimonial Section */}
//             <div className="testimonial p-3 mt-3">
//               <p className="quote text-dark">
//                 <i>
//                 At LockQuick, your safety is our priority. We provide access to expert locksmith services tailored to your needs.
//                 </i>
//               </p>
//             </div>

//             {/* Button */}
//             <Button variant="dark" className="mt-3 more-btn">
//               MORE ABOUT US
//             </Button>
//           </Col>
//         </Row>
//       </Container>
//     </section>
//   );
// };

// export default SecurityInfoSection;
import React, { useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";
import "./SecurityInfoSection.css"; // Ensure the CSS file is imported

const SecurityInfoSection = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <section className="locksmith-section py-5">
      <Container>
        <Row className="align-items-center">
          {/* Left Side - Image Section */}
          <Col lg={6} className="text-center text-lg-start">
            <motion.img
              src="/images/abt-new.png"
              alt="Locksmith Work"
              className="img-fluid main-image"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              data-aos="fade-right"
            />
          </Col>

          {/* Right Side - Text Content */}
          <Col lg={6} className="text-container">
            <motion.h1
              className="fw-bold"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              data-aos="fade-up"
            >
              WELCOME TO LOCKQUICK – YOUR TRUSTED ACCESS TO LOCKSMITHS ACROSS AUSTRALIA
            </motion.h1>

            <motion.p
              className="description text-dark"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              data-aos="fade-up"
            >
              Lock Quick is the one and only place to find <b>professional locksmith services</b> in 
              <b> Brisbane, Canberra, Sydney, Melbourne, Adelaide, and Perth</b>. Lock Quick's online world is the 
              gateway to locksmiths dedicated to ensuring the safety and security of homes, businesses, and vehicles 
              with <b>fast, reliable, legal, and affordable locksmith solutions</b>.
            </motion.p>

            <motion.p
              className="text-dark"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
              data-aos="fade-up"
            >
              We understand that security is more than just locks and keys—it’s about <b>trust and peace of mind</b>. 
              Whether you need a quick lock repair, emergency lockout assistance, or advanced security installations, 
              <b> our online hub of mobile locksmiths is available 24/7 to help</b>.
            </motion.p>

            <Row>
              <motion.ul
                className="list-unstyled"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.8 }}
                data-aos="fade-left"
              >
                <li><span className="brown-tick">✔</span> <b>Fast & Reliable</b> – Quick response times and efficient service</li>
                <li><span className="brown-tick">✔</span> <b>Certified & Insured</b> – Licensed professionals ensuring your security.</li>
                <li><span className="brown-tick">✔</span> <b>Advanced Security Solutions</b> – Smart locks and high-tech access control.</li>
              </motion.ul>
            </Row>

            {/* Testimonial Section */}
            <motion.div
              className="testimonial p-3 mt-3"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 1 }}
              data-aos="zoom-in"
            >
              <p className="quote text-dark">
                <i>
                  At LockQuick, your safety is our priority. We provide access to expert locksmith services tailored to your needs.
                </i>
              </p>
            </motion.div>

            {/* Button */}
            {/* <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 1.2 }}
              data-aos="zoom-in"
            >
              <Button variant="dark" className="mt-3 more-btn">
                MORE ABOUT US
              </Button>
            </motion.div> */}
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default SecurityInfoSection;
