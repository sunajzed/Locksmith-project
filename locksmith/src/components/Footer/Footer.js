
// import React from "react";
// import { Link } from "react-router-dom";
// import { Container, Row, Col } from "react-bootstrap";
// import { FaFacebookF, FaInstagram, FaTwitter, FaEnvelope } from "react-icons/fa";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "./Footer.css";

// const Footer = () => {
//   return (
//     <div
//       className="footer-section"
//       style={{
//         backgroundColor: "rgb(144, 145, 149)",
//         marginTop: "0 !important",
//         paddingTop: "0",
//         backgroundImage: "url('/images/dark-grey-bg.webp')",
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//         color: "white",
//       }}
//     >
//       <Container className="footer">
//         <Row>
//           <Col sm={12} md={4} lg={4} className="footer-column">
//             <div className="logo-container">
//               <img
//                 alt="Logo"
//                 src="/images/logo.webp"
//                 className="d-inline-block align-top logo-img"
//               />
//             </div>
//             <p className="text-light">
//               Lock Quick offers fast, reliable locksmith services across Australia. From lock repairs to emergency lockouts, our certified experts are available 24/7 to keep you secure.
//             </p>
//           </Col>

//           <Col sm={12} md={2} lg={2} className="footer-column md-mt-5">
//             <h5 className="footer-heading">Quick Links</h5>
//             <ul className="custom-list">
//               <li><Link to="/" className="text-light">Home</Link></li>
//               <li><Link to="/about-us" className="text-light">About</Link></li>
//               <li><Link to="/services" className="text-light">Services</Link></li>
//               <li><Link to="/careers" className="text-light">Careers</Link></li>
//               <li><Link to="/contact-us" className="text-light">Contact Us</Link></li>
//             </ul>
//           </Col>

//           <Col sm={12} md={2} lg={2} className="footer-column md-mt-5">
//             <h5 className="footer-heading">Services</h5>
//             <ul className="custom-list">
//               <li><Link to="/residential-service" className="text-light">Residential</Link></li>
//               <li><Link to="/commercial-service" className="text-light">Commercial</Link></li>
//               <li><Link to="/automotive-service" className="text-light">Automotive</Link></li>
//               <li><Link to="/emergency-service" className="text-light">Emergency</Link></li>
//               <li><Link to="/smart-lock-service" className="text-light">SmartLock</Link></li>
//             </ul>
//           </Col>

//           <Col sm={12} md={2} lg={2} className="footer-column md-mt-5">
//             <h5 className="footer-heading">Support</h5>
//             <ul className="custom-list">
//               <li><Link to="/faq" className="text-light">FAQs</Link></li>
//               <li><Link to="/contact-support" className="text-light">Contact Support</Link></li>
//               <li><a href="/docs/Terms of Use.pdf" className="text-light" target="_blank" rel="noopener noreferrer">Terms & Conditions</a></li>
//               <li><a href="/docs/Privacy Policy.pdf" className="text-light" target="_blank" rel="noopener noreferrer">Privacy Policy</a></li>
//             </ul>
//           </Col>

//           <Col sm={12} md={2} lg={2} className="footer-column md-mt-5">
//             <h5 className="footer-heading">Get in Touch</h5>
//             <p className="text-white">Questions or feedback? <br /> We'd love to hear from you.</p>
//             <div className="message-icon">
//               <Link to="/contact-form" className="text-light">
//                 <FaEnvelope className="social-icon" />
//               </Link>
//             </div>
//           </Col>
//         </Row>

//         <hr className="footer-line" />

//         <Row className="social justify-content-center">
//           <Col className="text-center">
//             <div className="social-icons">
//               <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
//                 <FaFacebookF className="social-icon" />
//               </a>
//               <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
//                 <FaInstagram className="social-icon" />
//               </a>
//               <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
//                 <FaTwitter className="social-icon" />
//               </a>
//             </div>
//           </Col>
//         </Row>
//       </Container>
//     </div>
//   );
// };

// export default Footer;

import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { FaFacebookF, FaInstagram, FaTwitter, FaEnvelope } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Footer.css";

const Footer = () => {
  // Scroll to top whenever the route changes
  useEffect(() => {
    const handleRouteChange = () => {
      window.scrollTo(0, 0);
    };

    // Add event listener for route changes
    window.addEventListener("popstate", handleRouteChange);

    return () => {
      // Clean up the event listener
      window.removeEventListener("popstate", handleRouteChange);
    };
  }, []);

  // Function to handle click on any link
  const handleLinkClick = () => {
    window.scrollTo(0, 0);
  };

  return (
    <div
      className="footer-section"
      // style={{
      //   backgroundColor: "rgb(144, 145, 149)",
      //   marginTop: "0 !important",
      //   paddingTop: "0",
      //   backgroundImage: "url('/images/dark-grey-bg.webp')",
      //   backgroundSize: "cover",
      //   backgroundPosition: "center",
      //   color: "white",
      // }}
      style={{
        background: "linear-gradient(to right, #191919, #3a3a3a, #5a5a5a, #3a3a3a, #191919)",
        marginTop: "0 !important",
        paddingTop: "0",
        backgroundSize: "cover",
        backgroundPosition: "center",
        color: "white",
      }}
      
    >
      <Container className="footer">
        <Row>
          <Col sm={12} md={4} lg={4} className="footer-column">
            <div className="logo-container">
              <img
                alt="Logo"
                src="/images/logo.webp"
                className="d-inline-block align-top logo-img"
              />
            </div>
            <p className="text-light">
              Lock Quick offers fast, reliable locksmith services across Australia. From lock repairs to emergency lockouts, our certified experts are available 24/7 to keep you secure.
            </p>
          </Col>

          <Col sm={12} md={2} lg={2} className="footer-column md-mt-5">
            <h5 className="footer-heading">Quick Links</h5>
            <ul className="custom-list">
              <li><Link to="/" className="text-light" onClick={handleLinkClick}>Home</Link></li>
              <li><Link to="/about-us" className="text-light" onClick={handleLinkClick}>About</Link></li>
              <li><Link to="/services" className="text-light" onClick={handleLinkClick}>Services</Link></li>
              <li><Link to="/careers" className="text-light" onClick={handleLinkClick}>Careers</Link></li>
              <li><Link to="/contact-us" className="text-light" onClick={handleLinkClick}>Contact Us</Link></li>
            </ul>
          </Col>

          <Col sm={12} md={2} lg={2} className="footer-column md-mt-5">
            <h5 className="footer-heading">Services</h5>
            <ul className="custom-list">
              <li><Link to="/residential-service" className="text-light" onClick={handleLinkClick}>Residential</Link></li>
              <li><Link to="/commercial-service" className="text-light" onClick={handleLinkClick}>Commercial</Link></li>
              <li><Link to="/automotive-service" className="text-light" onClick={handleLinkClick}>Automotive</Link></li>
              <li><Link to="/emergency-service" className="text-light" onClick={handleLinkClick}>Emergency</Link></li>
              <li><Link to="/smart-lock-service" className="text-light" onClick={handleLinkClick}>SmartLock</Link></li>
            </ul>
          </Col>

          <Col sm={12} md={2} lg={2} className="footer-column md-mt-5">
            <h5 className="footer-heading">Support</h5>
            <ul className="custom-list">
              <li><Link to="/faq" className="text-light" onClick={handleLinkClick}>FAQs</Link></li>
              <li><Link to="/contact-support" className="text-light" onClick={handleLinkClick}>Contact Support</Link></li>
              <li><a href="/docs/Terms of Use.pdf" className="text-light" target="_blank" rel="noopener noreferrer">Terms & Conditions</a></li>
              <li><a href="/docs/Privacy Policy.pdf" className="text-light" target="_blank" rel="noopener noreferrer">Privacy Policy</a></li>
            </ul>
          </Col>

          <Col sm={12} md={2} lg={2} className="footer-column md-mt-5">
            <h5 className="footer-heading">Get in Touch</h5>
            <p className="text-white">Questions or feedback? <br /> We'd love to hear from you.</p>
            <div className="message-icon">
              <Link to="/contact-form" className="text-light" onClick={handleLinkClick}>
                <FaEnvelope className="social-icon" />
              </Link>
            </div>
          </Col>
        </Row>

        <hr className="footer-line" />

        <Row className="social justify-content-center">
          <Col className="text-center">
            <div className="social-icons">
              <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                <FaFacebookF className="social-icon" />
              </a>
              <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                <FaInstagram className="social-icon" />
              </a>
              <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
                <FaTwitter className="social-icon" />
              </a>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Footer;