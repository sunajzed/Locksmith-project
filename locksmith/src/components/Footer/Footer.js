// import React, { useEffect } from "react";
// import { Link } from "react-router-dom";
// import { Container, Row, Col } from "react-bootstrap";
// import { FaFacebookF, FaInstagram, FaLinkedinIn , FaEnvelope } from "react-icons/fa";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "./Footer.css";

// const Footer = () => {
//   // Scroll to top whenever the route changes
//   useEffect(() => {
//     const handleRouteChange = () => {
//       window.scrollTo(0, 0);
//     };

//     // Add event listener for route changes
//     window.addEventListener("popstate", handleRouteChange);

//     return () => {
//       // Clean up the event listener
//       window.removeEventListener("popstate", handleRouteChange);
//     };
//   }, []);

//   // Function to handle click on any link
//   const handleLinkClick = () => {
//     window.scrollTo(0, 0);
//   };

//   return (
//     <div
//       className="footer-section"
//       // style={{
//       //   backgroundColor: "rgb(144, 145, 149)",
//       //   marginTop: "0 !important",
//       //   paddingTop: "0",
//       //   backgroundImage: "url('/images/dark-grey-bg.webp')",
//       //   backgroundSize: "cover",
//       //   backgroundPosition: "center",
//       //   color: "white",
//       // }}
//       style={{
//         background: "linear-gradient(to right, #191919, #3a3a3a, #5a5a5a, #3a3a3a, #191919)",
//         marginTop: "0 !important",
//         paddingTop: "0",
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
//             <p className="text-white">ABN: 24 684 285 050</p>
//             <p className="text-light">
//             Lock Quick is an online-only marketplace connecting customers with trusted locksmiths across Australia. We offer fast, reliable locksmith services—from lock repairs to emergency lockouts—available 24/7 to keep you secure, wherever you are.
//             </p>
//           </Col>

//           <Col sm={12} md={2} lg={2} className="footer-column md-mt-5">
//             <h5 className="footer-heading">Quick Links</h5>
//             <ul className="custom-list">
//               <li><Link to="/" className="text-light" onClick={handleLinkClick}>Home</Link></li>
//               <li><Link to="/about-us" className="text-light" onClick={handleLinkClick}>About</Link></li>
//               <li><Link to="/services" className="text-light" onClick={handleLinkClick}>Services</Link></li>
//               <li><Link to="/careers" className="text-light" onClick={handleLinkClick}>Careers</Link></li>
//               <li><Link to="/contact-us" className="text-light" onClick={handleLinkClick}>Contact Us</Link></li>
//             </ul>
//           </Col>

//           <Col sm={12} md={2} lg={2} className="footer-column md-mt-5">
//             <h5 className="footer-heading">Services</h5>
//             <ul className="custom-list">
//               <li><Link to="/residential-service" className="text-light" onClick={handleLinkClick}>Residential</Link></li>
//               <li><Link to="/commercial-service" className="text-light" onClick={handleLinkClick}>Commercial</Link></li>
//               <li><Link to="/automotive-service" className="text-light" onClick={handleLinkClick}>Automotive</Link></li>
//               <li><Link to="/smart-lock-service" className="text-light" onClick={handleLinkClick}>SmartLock</Link></li>
//             </ul>
//           </Col>

//           <Col sm={12} md={2} lg={2} className="footer-column md-mt-5">
//             <h5 className="footer-heading">Support</h5>
//             <ul className="custom-list">
//               <li><Link to="/faq" className="text-light" onClick={handleLinkClick}>FAQs</Link></li>
//               <li><Link to="/contact-support" className="text-light" onClick={handleLinkClick}>Contact Support</Link></li>
//               <li><a href="/docs/Terms of Use.pdf" className="text-light" target="_blank" rel="noopener noreferrer">Terms & Conditions</a></li>
//               <li><a href="/docs/Privacy Policy.pdf" className="text-light" target="_blank" rel="noopener noreferrer">Privacy Policy</a></li>
//             </ul>
//           </Col>
//           <Col sm={12} md={2} lg={2} className="footer-column md-mt-5">
//             <h5 className="footer-heading">Get in Touch</h5>
//             <p className="text-white">Questions or feedback? <br /> We'd love to hear from you.</p>
//             <div className="message-icon">
//               <Link to="/contact-form" className="text-light" onClick={handleLinkClick}>
//                 <FaEnvelope className="social-icon" />
//               </Link>
//             </div>
//           </Col>
//         </Row>

//         <hr className="footer-line" />

//         <Row className="social justify-content-center">
//           <Col className="text-center">
//            <div className="social-icons">
//   <a
//     href="https://www.facebook.com/profile.php?id=61577346733921"
//     target="_blank"
//     rel="noopener noreferrer"
//   >
//     <FaFacebookF className="social-icon" />
//   </a>
//   <a
//     href="https://www.instagram.com/lockquick/?fbclid=IwY2xjawLIgkhleHRuA2FlbQIxMQBicmlkETFBdzk4Z1Q4SWMzeVd1M1N2AR4alkyfLtJ3r5f2n0vI2RfhorvIOxfP3ntWVbGmpbyaWyq5K7gY_guBaxHpzQ_aem_O7-r-PxR50El-cGtj4vghw"
//     target="_blank"
//     rel="noopener noreferrer"
//   >
//     <FaInstagram className="social-icon" />
//   </a>
//   <a
//     href="https://www.linkedin.com/company/lockquick/?viewAsMember=true"
//     target="_blank"
//     rel="noopener noreferrer"
//   >
//     <FaLinkedinIn className="social-icon" />
//   </a>
// </div>
//           </Col>
//         </Row>

//       </Container>
//     </div>
//   );
// };

// export default Footer;
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaEnvelope,
} from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import api from "../../api/api";
import "./Footer.css";

const Footer = () => {
  const [content, setContent] = useState({
    abn: "24 684 285 050",
    description:
      "Lock Quick is an online-only marketplace connecting customers with trusted locksmiths across Australia. We offer fast, reliable locksmith services—from lock repairs to emergency lockouts—available 24/7 to keep you secure, wherever you are.",
    get_in_touch: "Questions or feedback? We'd love to hear from you.",
    social_links: [
      {
        platform: "Facebook",
        url: "https://www.facebook.com/profile.php?id=61577346733921",
      },
      {
        platform: "Instagram",
        url: "https://www.instagram.com/lockquick/?fbclid=IwY2xjawLIgkhleHRuA2FlbQIxMQBicmlkETFBdzk4Z1Q4SWMzeVd1M1N2AR4alkyfLtJ3r5f2n0vI2RfhorvIOxfP3ntWVbGmpbyaWyq5K7gY_guBaxHpzQ_aem_O7-r-PxR50El-cGtj4vghw",
      },
      {
        platform: "LinkedIn",
        url: "https://www.linkedin.com/company/lockquick/?viewAsMember=true",
      },
    ],
  });

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await api.get("/api/content/?section=footer");
        if (response.status === 200 && response.data.length > 0) {
          setContent(response.data[0].content);
        }
      } catch (error) {
        console.error("Error fetching footer content:", error);
      }
    };
    fetchContent();

    const handleRouteChange = () => {
      window.scrollTo(0, 0);
    };
    window.addEventListener("popstate", handleRouteChange);
    return () => window.removeEventListener("popstate", handleRouteChange);
  }, []);

  const handleLinkClick = () => {
    window.scrollTo(0, 0);
  };

  const getSocialIcon = (platform) => {
    switch (platform.toLowerCase()) {
      case "facebook":
        return <FaFacebookF className="social-icon" />;
      case "instagram":
        return <FaInstagram className="social-icon" />;
      case "linkedin":
        return <FaLinkedinIn className="social-icon" />;
      default:
        return null;
    }
  };

  return (
    <div
      className="footer-section"
      style={{
        background:
          "linear-gradient(to right, #191919, #3a3a3a, #5a5a5a, #3a3a3a, #191919)",
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
            <p className="text-white">ABN: {content.abn}</p>
            <p
              className="text-light"
              dangerouslySetInnerHTML={{ __html: content.description }}
            />
          </Col>

          <Col sm={12} md={2} lg={2} className="footer-column md-mt-5">
            <h5 className="footer-heading">Quick Links</h5>
            <ul className="custom-list">
              <li>
                <Link to="/" className="text-light" onClick={handleLinkClick}>
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/about-us"
                  className="text-light"
                  onClick={handleLinkClick}
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  to="/services"
                  className="text-light"
                  onClick={handleLinkClick}
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  to="/careers"
                  className="text-light"
                  onClick={handleLinkClick}
                >
                  Careers
                </Link>
              </li>
              <li>
                <Link
                  to="/contact-us"
                  className="text-light"
                  onClick={handleLinkClick}
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </Col>

          <Col sm={12} md={2} lg={2} className="footer-column md-mt-5">
            <h5 className="footer-heading">Services</h5>
            <ul className="custom-list">
              <li>
                <Link
                  to="/residential-service"
                  className="text-light"
                  onClick={handleLinkClick}
                >
                  Residential
                </Link>
              </li>
              <li>
                <Link
                  to="/commercial-service"
                  className="text-light"
                  onClick={handleLinkClick}
                >
                  Commercial
                </Link>
              </li>
              <li>
                <Link
                  to="/automotive-service"
                  className="text-light"
                  onClick={handleLinkClick}
                >
                  Automotive
                </Link>
              </li>
              <li>
                <Link
                  to="/smart-lock-service"
                  className="text-light"
                  onClick={handleLinkClick}
                >
                  SmartLock
                </Link>
              </li>
            </ul>
          </Col>

          <Col sm={12} md={2} lg={2} className="footer-column md-mt-5">
            <h5 className="footer-heading">Support</h5>
            <ul className="custom-list">
              <li>
                <Link
                  to="/faq"
                  className="text-light"
                  onClick={handleLinkClick}
                >
                  FAQs
                </Link>
              </li>
              <li>
                <Link
                  to="/contact-support"
                  className="text-light"
                  onClick={handleLinkClick}
                >
                  Contact Support
                </Link>
              </li>
              <li>
                <a
                  href="/docs/Terms of Use.pdf"
                  className="text-light"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a
                  href="/docs/Privacy Policy.pdf"
                  className="text-light"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Privacy Policy
                </a>
              </li>
            </ul>
          </Col>

          <Col sm={12} md={2} lg={2} className="footer-column md-mt-5">
            <h5 className="footer-heading">Get in Touch</h5>
            <p
              className="text-white"
              dangerouslySetInnerHTML={{ __html: content.get_in_touch }}
            />
            <div className="message-icon">
              <Link
                to="/contact-form"
                className="text-light"
                onClick={handleLinkClick}
              >
                <FaEnvelope className="social-icon" />
              </Link>
            </div>
          </Col>
        </Row>

        <hr className="footer-line" />

        <Row className="social justify-content-center">
          <Col className="text-center">
            <div className="social-icons">
              {content.social_links.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {getSocialIcon(link.platform)}
                </a>
              ))}
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Footer;
