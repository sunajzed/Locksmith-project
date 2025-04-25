import React, { useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './DetailedServices.css';
import { GiHouseKeys, GiCarKey, GiSiren } from 'react-icons/gi';
import { FaBuildingLock, FaFingerprint } from 'react-icons/fa6';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

const DetailedServices = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, delay: 200 });
  }, []);

  const navigate = useNavigate();

  const services = [
    {  
      icon: <GiHouseKeys size={60} color="#2c3e50" />, 
      title: 'Residential Locksmith Services', 
      text: 'Secure your home with expert <strong>lock installations, repairs, rekeying, and smart lock upgrades</strong>. Fast and reliable emergency lockout assistance available.', 
      path: '/residential-service' 
    },
    { 
      icon: <GiCarKey size={60} color="#2c3e50" />, 
      title: 'Automotive Locksmith Services', 
      text: 'Lost your keys or locked out? We provide <strong>car lockouts, ignition repairs, and key replacements </strong> for all vehicle makes and models.',  
      path: '/automotive-service' 
    },
    { 
      icon: <FaBuildingLock size={60} color="#2c3e50" />, 
      title: 'Commercial Locksmith Services', 
      text: 'Protect your business with <strong>high-security locks, access control systems, and master key solutions</strong> for offices, warehouses, and retail spaces.', 
      path: '/commercial-service' 
    },
    {  
      icon: <GiSiren size={60} color="#2c3e50" />, 
      title: 'Emergency Locksmith Services', 
      text: '24/7 emergency locksmith services for <strong>home, office, and car lockouts</strong>, broken locks, or urgent security needs with fast response times.', 
      path: '/emergency-service' 
    },
    { 
      icon: <FaFingerprint size={60} color="#2c3e50" />, 
      title: 'Smart Lock Solutions', 
      text: 'Upgrade to <strong>smart locks, keyless entry, and biometric security systems</strong> for enhanced safety and convenient remote access.', 
      path: '/smart-lock-service' 
    },
  ];

  return (
    <Container className="our-services-section">
      <div className="text-center mb-5">
        <h2 className='fw-bold'>OUR SERVICES</h2>
        <h4 className="mt-2"><b>Comprehensive Locksmith Solutions</b></h4>
        <p className='text-black'>We provide expert locksmith services tailored to your needs:</p>
      </div>
      <Row className="justify-content-center">
        {services.map((service, index) => (
          <Col xs={12} sm={6} md={6} lg={4} className="mb-4 d-flex justify-content-center" key={index}>
            {/* Entire Card Clickable */}
            <motion.div 
              whileHover={{ scale: 1.05 }} 
              whileTap={{ scale: 0.95 }} 
              onClick={() => navigate(service.path)} 
              style={{ cursor: 'pointer' }} // Ensures it's clickable
            >
              <Card className="service-card" data-aos="fade-up" data-aos-delay={index * 200}>
                <div className="icon-container">
                  <motion.div 
                    whileHover={{ scale: 1.2, rotate: 90 }}
                    whileTap={{ scale: 0.8, rotate: -90, borderRadius: "100%" }}
                    className="service-icon"
                  >
                    {service.icon}
                  </motion.div>
                </div>
                <Card.Body className="text-center d-flex flex-column">
                  <Card.Title className="flex-grow-1">{service.title}</Card.Title>
                  {/* <Card.Text className="flex-grow-1 text-black">{service.text}</Card.Text> */}
                  <Card.Text 
  className="flex-grow-1 text-black" 
  dangerouslySetInnerHTML={{ __html: service.text }} 
/>

                  {/* Prevent Event Bubbling */}
                  <Link 
                    to={service.path} 
                    className="learn-more-link mt-auto "
                    onClick={(e) => e.stopPropagation()} // Stops parent event from firing
                  >
                    Learn More <i className="fas fa-arrow-right"></i>
                  </Link>
                </Card.Body>
              </Card>
            </motion.div>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default DetailedServices;
