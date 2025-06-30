// import React, { useEffect } from 'react';
// import { Container, Row, Col, Card, Button } from 'react-bootstrap';
// import { motion } from 'framer-motion';
// import AOS from 'aos';
// import 'aos/dist/aos.css';
// import { GiHouseKeys, GiCarKey, GiKeyLock, GiSiren } from 'react-icons/gi';
// import { FaBuildingLock, FaFingerprint } from 'react-icons/fa6';
// import { MdEmergency } from 'react-icons/md';
// import { Link } from "react-router-dom";

// import './Services.css';
// import 'bootstrap/dist/css/bootstrap.min.css';

// const OurServices = () => {
//   useEffect(() => {
//     AOS.init({ duration: 1000, delay: 200 });
//   }, []);

//   const services = [
//     {
//       icon: <GiHouseKeys size={60} color="#2c3e50" />,
//       title: 'Residential Locksmith Services',
//       text: 'Secure your home with expert lock installations, repairs, rekeying, and smart lock upgrades. Fast and reliable emergency lockout assistance available.',
//       link: '#'
//     },
//     {
//       icon: <GiCarKey size={60} color="#2c3e50" />,
//       title: 'Automotive Locksmith Services',
//       text: 'Lost your keys or locked out? We provide car lockouts, ignition repairs, and key replacements for all vehicle makes and models.',
//       link: '#'
//     },
//     {
//       icon: <FaBuildingLock size={60} color="#2c3e50" />,
//       title: 'Commercial Locksmith Services',
//       text: 'Protect your business with high-security locks, access control systems, and master key solutions for offices, warehouses, and retail spaces.',
//       link: '#'
//     },
//     {
//       icon: <GiSiren size={60} color="#2c3e50" />,
//       title: 'Emergency Locksmith Services',
//       text: '24/7 emergency locksmith services for home, office, and car lockouts, broken locks, or urgent security needs with fast response times.',
//       link: '#'
//     },
//     {
//       icon: <FaFingerprint size={60} color="#2c3e50" />,
//       title: 'Smart Lock Solutions',
//       text: 'Upgrade to smart locks, keyless entry, and biometric security systems for enhanced safety and convenient remote access.',
//       link: '#'
//     },
//   ];

//   return (
//     <Container className="our-services-section text-center">
//       <div className="mb-5">
//         <h2 className='fw-bold service-heading'>OUR SERVICES</h2>
//         <h4 className="mt-2"><b>Trusted Locksmith Solutions for Homes, Businesses & Vehicles</b></h4>
//         <p className='text-black'>
//           Security is our top priority. We provide expert locksmith services tailored to meet your needs—whether it’s securing your home, protecting your business, or assisting with automotive lock issues. Our skilled locksmiths ensure fast, reliable, and affordable solutions.
//         </p>
//       </div>
//       <Row className="justify-content-center">
//         {services.map((service, index) => (
//           <Col xs={12} sm={6} md={6} lg={4} className="mb-4 d-flex justify-content-center" key={index}>
//             <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
//               <Card className="service-card service-demo shadow-lg" data-aos="fade-up" data-aos-delay={index * 200}>
//                 <div className="icon-container">
//                   <motion.div whileHover={{ scale: 1.2, rotate: 10 }} whileTap={{ scale: 0.8, rotate: -10 }}>
//                     {service.icon}
//                   </motion.div>
//                 </div>
//                 <Card.Body className="text-center d-flex flex-column">
//                   <Card.Title className="flex-grow-1">{service.title}</Card.Title>
//                   <Card.Text className="flex-grow-1 text-black">{service.text}</Card.Text>
//                 </Card.Body>
//               </Card>
//             </motion.div>
//           </Col>
//         ))}
//       </Row>
//       <div className="text-center mt-4">
//   <Link
//     to="/services"
//     onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
//   >
//     <Button variant="dark" className="view-more-btn shadow">
//       Explore
//     </Button>
//   </Link>
// </div>
//     </Container>
//   );
// };

// export default OurServices;

import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";
import { GiHouseKeys, GiCarKey, GiKeyLock, GiSiren } from "react-icons/gi";
import { FaBuildingLock, FaFingerprint } from "react-icons/fa6";
import { Link } from "react-router-dom";
import api from "../../api/api";
import "./Services.css";
import "bootstrap/dist/css/bootstrap.min.css";

const OurServices = () => {
  const [content, setContent] = useState({
    heading: "OUR SERVICES",
    subheading: "Trusted Locksmith Solutions for Homes, Businesses & Vehicles",
    description:
      "Security is our top priority. We provide expert locksmith services tailored to meet your needs—whether it’s securing your home, protecting your business, or assisting with automotive lock issues. Our skilled locksmiths ensure fast, reliable, and affordable solutions.",
    services: [
      {
        title: "Residential Locksmith Services",
        text: "Secure your home with expert lock installations, repairs, rekeying, and smart lock upgrades. Fast and reliable emergency lockout assistance available.",
      },
      {
        title: "Automotive Locksmith Services",
        text: "Lost your keys or locked out? We provide car lockouts, ignition repairs, and key replacements for all vehicle makes and models.",
      },
      {
        title: "Commercial Locksmith Services",
        text: "Protect your business with high-security locks, access control systems, and master key solutions for offices, warehouses, and retail spaces.",
      },
      {
        title: "Emergency Locksmith Services",
        text: "24/7 emergency locksmith services for home, office, and car lockouts, broken locks, or urgent security needs with fast response times.",
      },
      {
        title: "Smart Lock Solutions",
        text: "Upgrade to smart locks, keyless entry, and biometric security systems for enhanced safety and convenient remote access.",
      },
    ],
    button_text: "Explore",
  });

  const icons = [
    <GiHouseKeys size={60} color="#2c3e50" />,
    <GiCarKey size={60} color="#2c3e50" />,
    <FaBuildingLock size={60} color="#2c3e50" />,
    <GiSiren size={60} color="#2c3e50" />,
    <FaFingerprint size={60} color="#2c3e50" />,
  ];

  useEffect(() => {
    AOS.init({ duration: 1000, delay: 200 });

    const fetchContent = async () => {
      try {
        const response = await api.get("/api/content/?section=services");
        if (response.status === 200 && response.data.length > 0) {
          setContent(response.data[0].content);
        }
      } catch (error) {
        console.error("Error fetching services content:", error);
      }
    };
    fetchContent();
  }, []);

  return (
    <Container className="our-services-section text-center">
      <div className="mb-5">
        <h2 className="fw-bold service-heading">{content.heading}</h2>
        <h4 className="mt-2">
          <b>{content.subheading}</b>
        </h4>
        <p
          className="text-black"
          dangerouslySetInnerHTML={{ __html: content.description }}
        />
      </div>
      <Row className="justify-content-center">
        {content.services.map((service, index) => (
          <Col
            xs={12}
            sm={6}
            md={6}
            lg={4}
            className="mb-4 d-flex justify-content-center"
            key={index}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Card
                className="service-card service-demo shadow-lg"
                data-aos="fade-up"
                data-aos-delay={index * 200}
              >
                <div className="icon-container">
                  <motion.div
                    whileHover={{ scale: 1.2, rotate: 10 }}
                    whileTap={{ scale: 0.8, rotate: -10 }}
                  >
                    {icons[index] || <GiKeyLock size={60} color="#2c3e50" />}
                  </motion.div>
                </div>
                <Card.Body className="text-center d-flex flex-column">
                  <Card.Title className="flex-grow-1">
                    {service.title}
                  </Card.Title>
                  <Card.Text className="flex-grow-1 text-black">
                    {service.text}
                  </Card.Text>
                </Card.Body>
              </Card>
            </motion.div>
          </Col>
        ))}
      </Row>
      <div className="text-center mt-4">
        <Link
          to="/services"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <Button variant="dark" className="view-more-btn shadow">
            {content.button_text}
          </Button>
        </Link>
      </div>
    </Container>
  );
};

export default OurServices;
