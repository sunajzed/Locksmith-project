import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './IntroPage.css';

const services = [
  { label: 'Residential', path: '/residential' },
  { label: 'Automotive', path: '/automotive' },
  { label: 'Commercial', path: '/commercial' },
  { label: 'Emergency', path: '/emergency' },
  { label: 'Smart Lock', path: '/smart-lock' },
];

const IntroPage = () => {
  const [selectedService, setSelectedService] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    if (!selectedService) {
      setError('Please select a service first.');
      return;
    }
    const service = services.find((s) => s.label === selectedService);
    if (service) {
      navigate(service.path);
    }
  };

  return (
    <div className="intro-carousel">
      <div className="carousel">
        <img src="images/lkbg3new.png" alt="slide1" />
        <img src="images/lkbg2new.png" alt="slide2" />
        <img src="images/lkbg1new.png" alt="slide3" />
      </div>

      <div className="blur-box">
        <h1><span className="orange">LOCK QUICK</span> – FAST & RELIABLE LOCKSMITH SERVICES IN AUSTRALIA</h1>
        <h3>24/7 Emergency Locksmith Services – Anytime, Anywhere!</h3>
        
        <div className="intro-description">
          <p>
            Locked out of your home, office, or car? Need urgent lock repairs or key replacements? 
            <strong> Lock Quick</strong> is your go-to locksmith service provider, offering affordable locksmith services, 
            24-hour support, and fast mobile locksmith solutions across Australia.
          </p>
          <p>
            Whether it’s an emergency lockout or a security upgrade, our certified professionals are always ready to assist. 
            Lock Quick is an online-only marketplace that connects locksmiths and customers—fast, secure, and hassle-free.
          </p>
        </div>

        <div className="search-bar">
          <select
            value={selectedService}
            onChange={(e) => {
              setSelectedService(e.target.value);
              setError('');
            }}
          >
            <option value="">Select Service</option>
            {services.map((service) => (
              <option key={service.label} value={service.label}>
                {service.label}
              </option>
            ))}
          </select>
          <button onClick={handleSearch}>Search</button>
        </div>
        
        {error && <div className="error-message">{error}</div>}
      </div>
    </div>
  );
};

export default IntroPage;

