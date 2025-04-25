
// import React, { useState, useEffect } from "react";
// import { Container, Row, Col, Button, Dropdown, Carousel } from "react-bootstrap";
// import { Search } from "react-bootstrap-icons";
// import { useNavigate } from 'react-router-dom';
// import { motion } from "framer-motion";
// import AOS from 'aos';
// import 'aos/dist/aos.css'; // Import AOS styles
// import "./IntroSection.css";

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
    
//     if (!isAuthenticated()) {
//       alert("Please login first.");
//       navigate(`/login?from=${selectedService.toLowerCase()}Service`);
//     } else {
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
//               Locked out? Need urgent lock repairs? <b>Lock Quick</b> offers <b>affordable 24-hour locksmith support</b> with fast mobile solutions across Australia.
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
import { Search } from "react-bootstrap-icons";
import { useNavigate } from 'react-router-dom';
import { motion } from "framer-motion";
import AOS from 'aos';
import 'aos/dist/aos.css'; 
import "./IntroSection.css";

const IntroSection = () => {
  const [selectedService, setSelectedService] = useState("Select Service");
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

  const headingText = [
    { text: "LOCK QUICK", className: "highlight-text" },
    { text: " – FAST & RELIABLE LOCKSMITH SERVICES IN AUSTRALIA", className: "" }
  ];

  return (
    <section className="intro-section">
      <Carousel className="background-carousel" interval={3000} pause={false} indicators>
        <Carousel.Item>
          <img className="d-block w-100 img-fluid" src="images/lkbg1new.png" alt="First slide" />
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100 img-fluid" src="images/lkbg2new.png" alt="Second slide" />
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100 img-fluid" src="images/lkbg3new.png" alt="Third slide" />
        </Carousel.Item>
      </Carousel>

      <Container fluid className="text-center content-overlay">
        <Row className="justify-content-center align-items-center">
          <Col md={10} lg={8} className="text-content" data-aos="fade-up">
            <h1 className="intro-heading">
              {headingText.map((part, index) => (
                <span key={index} className={part.className}>
                  {part.text.split("").map((char, i) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.05, delay: (index * 10 + i) * 0.05 }}
                      className={char === " " ? "space" : ""}
                    >
                      {char}
                    </motion.span>
                  ))}
                </span>
              ))}
            </h1>
            <h4 className="text-light"><b>24/7 Emergency Locksmith Services – Anytime, Anywhere!</b></h4>
            <p>
              Locked out? Need urgent lock repairs? <b>Lock Quick</b> offers <b>affordable 24-hour locksmith support</b> with fast mobile solutions across Australia.
            </p>
            <div className="d-flex justify-content-center align-items-center w-100 service-dropdown-container">
              <Dropdown onSelect={handleSelect}>
                <Dropdown.Toggle style={{ backgroundColor: "white", color: "black", width: "300px" }} id="dropdown-basic">
                  {selectedService}
                </Dropdown.Toggle>
                <Dropdown.Menu style={{ width: "300px" }}>
                  <Dropdown.Item eventKey="residential">Residential</Dropdown.Item>
                  <Dropdown.Item eventKey="automotive">Automotive</Dropdown.Item>
                  <Dropdown.Item eventKey="commercial">Commercial</Dropdown.Item>
                  <Dropdown.Item eventKey="emergency">Emergency</Dropdown.Item>
                  <Dropdown.Item eventKey="smart-lock">Smart Lock</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              <Button variant="dark" className="search-button ms-2" onClick={handleSearch}>
                Search
                <Search />
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default IntroSection;
