// import React from "react";
// import { Container, Button } from "react-bootstrap";
// import "./AboutContact.css";
// import { Link } from "react-router-dom";

// const AboutContact = () => {
//   return (
//     <section className="banner-section">
//       <Container className="text-center">
//         <div className="video-btn">
//           <span className="play-icon" variant="dark">&#9654;</span>
//         </div>
//         {/* <h2 className="banner-title">
//           We Are Available For 24/7 Emergency Locksmith Services
//         </h2> */}
//         {/* <h2 className="fw-bold">
//         24/7 Emergency Locksmith Services – We Come to You!
//         </h2> */}
//         <h2 className="fw-bold">
//         24/7 EMERGENCY LOCKSMITH SERVICES – WE ARE THERE FOR YOU!
//         </h2>
//         <p className="text-dark">
//         Locked out in the middle of the night? Need urgent key replacement? Searching for a <b>reliable locksmith in Brisbane, Canberra, Sydney, Melbourne, Adelaide, or Perth? LockQuick has you covered!</b>
//         </p>
//         <p className="text-dark"><i>We are available 24/7 to provide quick, efficient, and professional locksmith services—because your security can’t wait!</i></p>
//         <p className="text-dark"><b>Sign up now for immediate assistance!</b></p>
//         <Link to="/contact-us" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
//   <Button className="contact-btn text-light" variant="dark">
//     CONTACT US
//   </Button>
// </Link>      </Container>
//     </section>
//   );
// };

// export default AboutContact;
import React from "react";
import { Container, Button } from "react-bootstrap";
import "./AboutContact.css";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import AOS from 'aos';
import 'aos/dist/aos.css';

// Initialize AOS
AOS.init({
  duration: 800,
  easing: 'ease-in-out',
  once: true
});

const AboutContact = () => {
  return (
    <section className="banner-section">
      <Container className="text-center">
        <motion.div
          className="video-btn"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          data-aos="zoom-in"
        >
          <span className="play-icon" variant="dark">&#9654;</span>
        </motion.div>

        <motion.h2 
          className="fw-bold"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          data-aos="fade-up"
        >
          24/7 EMERGENCY LOCKSMITH SERVICES – WE ARE THERE FOR YOU!
        </motion.h2>

        <motion.p 
          className="text-dark"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          data-aos="fade-up"
          data-aos-delay="100"
        >
          Locked out in the middle of the night? Need urgent key replacement? Searching for a <b>reliable locksmith in Brisbane, Canberra, Sydney, Melbourne, Adelaide, or Perth? LockQuick has you covered!</b>
        </motion.p>

        <motion.p 
          className="text-dark"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          data-aos="fade-up"
          data-aos-delay="200"
        >
          <i>We are available 24/7 to provide quick, efficient, and professional locksmith services—because your security can't wait!</i>
        </motion.p>

        <motion.p 
          className="text-dark"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          data-aos="fade-up"
          data-aos-delay="300"
        >
          <b>Sign up now for immediate assistance!</b>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          data-aos="fade-up"
          data-aos-delay="400"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link to="/contact-us" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
            <Button className="contact-btn text-light" variant="dark">
              CONTACT US
            </Button>
          </Link>
        </motion.div>
      </Container>
    </section>
  );
};

export default AboutContact;