// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import './IntroPage.css';

// const services = [
//   { label: 'Residential', path: '/residential' },
//   { label: 'Automotive', path: '/automotive' },
//   { label: 'Commercial', path: '/commercial' },
//   { label: 'Emergency', path: '/emergency' },
//   { label: 'Smart Lock', path: '/smart-lock' },
// ];


// const IntroPage = () => {
//   const [selectedService, setSelectedService] = useState('');
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   const handleSearch = () => {
//     if (!selectedService) {
//       setError('Please select a service first.');
//       return;
//     }
//     const service = services.find((s) => s.label === selectedService);
//     if (service) {
//       navigate(service.path);
//     }
//   };

//   return (
//     <div className="intro-carousel">
//       <div className="carousel">
//         <img src="images/lkbg3new.png" alt="slide1" />
//         <img src="images/lkbg2new.png" alt="slide2" />
//         <img src="images/lkbg1new.png" alt="slide3" />
//       </div>

//       <div className="blur-box">
//         <h1><span className="orange">LOCK QUICK</span> – Fast & Reliable Locksmith Services in Australia</h1>
//         <h3>24/7 Emergency Locksmith Services – Anytime, Anywhere!</h3>

//         <div className="intro-description">
//           <p className="intro-lead">
//             <strong>LOCK QUICK</strong> IS AN ONLINE-ONLY MARKETPLACE CONNECTING CUSTOMERS WITH TRUSTED LOCKSMITHS ACROSS AUSTRALIA
//           </p>
//           <p>
//             Whether you're locked out or need urgent repairs, we offer fast, affordable, and 24/7 locksmith services—anytime, anywhere.
//           </p>
//         </div>

//         <div className="search-bar">
//           <select
//             value={selectedService}
//             onChange={(e) => {
//               setSelectedService(e.target.value);
//               setError('');
//             }}
//           >
//             <option value="">Select Service</option>
//             {services.map((service) => (
//               <option key={service.label} value={service.label}>
//                 {service.label}
//               </option>
//             ))}
//           </select>
//           <button onClick={handleSearch}>Search</button>
//         </div>

//         {error && <div className="error-message">{error}</div>}
//       </div>
//     </div>
//   );
// };

// export default IntroPage;

// import React, { useState, useEffect } from "react";
// import { Container, Row, Col, Button, Dropdown, Carousel } from "react-bootstrap";
// import { Search } from "react-bootstrap-icons";
// import { useNavigate } from 'react-router-dom';
// import { motion } from "framer-motion";
// import AOS from 'aos';
// import 'aos/dist/aos.css'; // Import AOS styles
// import "./IntroPage.css";

// const IntroSection = () => {
//   const [selectedService, setSelectedService] = useState("Select Service");
//   const navigate = useNavigate();

//   useEffect(() => {
//     AOS.init({
//       duration: 1000, // Animation duration
//       once: true, // Whether animation should happen only once
//     });
//   }, []);

//   const isAuthenticated = () => {
//     const token = localStorage.getItem("accessToken");
//     const role = localStorage.getItem("userRole");
//     return token && role === "customer";
//   };

//   const handleSelect = (eventKey) => {
//     setSelectedService(eventKey);
//   };
//   const handleSearch = () => {
//     if (selectedService === "Select Service") {
//       alert("Please select a service first.");
//       return;
//     }
  
//     // If the user is not authenticated, allow them to view the service pages
//     if (!isAuthenticated()) {
//       navigate(`/${selectedService.toLowerCase()}`);
//     } else {
//       // For authenticated users, proceed with the existing logic
//       navigate(`/${selectedService.toLowerCase()}`);
//     }
//   };
  

//   const headingText = [
//     { text: "LOCK QUICK", className: "highlight-text" },
//     { text: " – FAST & RELIABLE LOCKSMITH SERVICES IN AUSTRALIA", className: "" }
//   ];

//   return (
//     <section className="intro-section">
//       <Carousel className="background-carousel" interval={3000} pause={false} indicators>
//         <Carousel.Item>
//           <img className="d-block w-100 img-fluid" src="images/lkbg1new.png" alt="First slide" />
//         </Carousel.Item>
//         <Carousel.Item>
//           <img className="d-block w-100 img-fluid" src="images/lkbg2new.png" alt="Second slide" />
//         </Carousel.Item>
//         <Carousel.Item>
//           <img className="d-block w-100 img-fluid" src="images/lkbg3new.png" alt="Third slide" />
//         </Carousel.Item>
//       </Carousel>

//       <Container fluid className="text-center content-overlay">
//         <Row className="justify-content-center align-items-center">
//           <Col md={10} lg={8} className="text-content" data-aos="fade-up">
//             <h1 className="intro-heading">
//               {headingText.map((part, index) => (
//                 <span key={index} className={part.className}>
//                   {part.text.split("").map((char, i) => (
//                     <motion.span
//                       key={i}
//                       initial={{ opacity: 0, y: 20 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       transition={{ duration: 0.05, delay: (index * 10 + i) * 0.05 }}
//                       className={char === " " ? "space" : ""}
//                     >
//                       {char}
//                     </motion.span>
//                   ))}
//                 </span>
//               ))}
//             </h1>
//             <h4 className="text-light"><b>24/7 Emergency Locksmith Services – Anytime, Anywhere!</b></h4>
//             <p>
//               <b>Lock Quick is an online-only marketplace connecting customers with trusted locksmiths across Australia.</b>  Whether you're locked out or need urgent repairs, we offer fast, affordable, and 24/7 locksmith services—anytime, anywhere.
//             </p>
//             <div className="d-flex justify-content-center align-items-center w-100 service-dropdown-container">
//               <Dropdown onSelect={handleSelect}>
//                 <Dropdown.Toggle style={{ backgroundColor: "white", color: "black", width: "300px" }} id="dropdown-basic">
//                   {selectedService}
//                 </Dropdown.Toggle>
//                 <Dropdown.Menu style={{ width: "300px" }}>
//                   <Dropdown.Item eventKey="residential">Residential</Dropdown.Item>
//                   <Dropdown.Item eventKey="automotive">Automotive</Dropdown.Item>
//                   <Dropdown.Item eventKey="commercial">Commercial</Dropdown.Item>
//                   <Dropdown.Item eventKey="emergency">Emergency</Dropdown.Item>
//                   <Dropdown.Item eventKey="smart-lock">Smart Lock</Dropdown.Item>
//                 </Dropdown.Menu>
//               </Dropdown>
//               <Button variant="dark" className="search-button ms-2" onClick={handleSearch}>
//                 Search
//                 <Search />
//               </Button>
//             </div>
//           </Col>
//         </Row>
//       </Container>
//     </section>
//   );
// };

// export default IntroSection;

import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Dropdown, Carousel } from "react-bootstrap";
import { Search, ChevronDown } from "react-bootstrap-icons";
import { useNavigate } from 'react-router-dom';
import { motion } from "framer-motion";
import AOS from 'aos';
import 'aos/dist/aos.css';
import "./IntroPage.css";

const IntroSection = () => {
  const [selectedService, setSelectedService] = useState("Select Service");
  const [carouselIndex, setCarouselIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  const handleSelect = (eventKey) => {
    setSelectedService(eventKey);
  };

  const handleSearch = () => {
    if (selectedService === "Select Service") {
      alert("Please select a service first.");
      return;
    }
    navigate(`/${selectedService.toLowerCase()}`);
  };

  const handleCarouselSelect = (selectedIndex) => {
    setCarouselIndex(selectedIndex);
  };

  return (
    <section className="intro-section">
      <div className="carousel">
        <img src="images/lkbg3new.png" alt="slide1" />
        <img src="images/lkbg2new.png" alt="slide2" />
        <img src="images/lkbg1new.png" alt="slide3" />
      </div>
      

      <Container className="content-container">
        <Row className="justify-content-center">
          <Col xl={8} lg={10} className="content-wrapper">
            <motion.div 
              className="premium-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="main-heading">
                <span className="brand-name">LOCK QUICK</span>
                <span className="tagline"> – FAST & RELIABLE LOCKSMITH SERVICES IN AUSTRALIA</span>
              </h1>
              
              <h2 className="sub-heading">
                24/7 Emergency Locksmith Services – Anytime, Anywhere!
              </h2>
              
              <p className="service-description">
                Lock Quick is an online-only marketplace connecting customers with trusted locksmiths across Australia. 
                Whether you're locked out or need urgent repairs, we offer fast, affordable, and 24/7 locksmith services.
              </p>
              
              <div className="service-selector-wrapper">
                <Dropdown onSelect={handleSelect}>
                  <Dropdown.Toggle className="service-dropdown">
                    <span className="selected-service">{selectedService}</span>
                    <ChevronDown className="dropdown-arrow" />
                  </Dropdown.Toggle>
                  <Dropdown.Menu className="dropdown-options">
                    <Dropdown.Item eventKey="residential" className="dropdown-item">Residential Locksmith</Dropdown.Item>
                    <Dropdown.Item eventKey="automotive" className="dropdown-item">Automotive Locksmith</Dropdown.Item>
                    <Dropdown.Item eventKey="commercial" className="dropdown-item">Commercial Locksmith</Dropdown.Item>
                    <Dropdown.Item eventKey="emergency" className="dropdown-item">Emergency Locksmith</Dropdown.Item>
                    <Dropdown.Item eventKey="smart-lock" className="dropdown-item">Smart Lock Installation</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
                
                <Button 
                  variant="primary" 
                  className="search-btn" 
                  onClick={handleSearch}
                >
                  <Search className="search-icon" />
                  <span>Search</span>
                </Button>
              </div>
            </motion.div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default IntroSection;
