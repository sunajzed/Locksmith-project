// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import './IntroPage.css';

// const services = [
//   { label: 'Residential', path: '/residential' },
//   { label: 'Automotive', path: '/automotive' },
//   { label: 'Commercial', path: '/commercial' },
//   { label: 'Smart Lock', path: '/smart-lock' },
// ];

// const IntroPage = () => {
//   const [selectedService, setSelectedService] = useState('');
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   const username = localStorage.getItem('username');
//   const accessToken = localStorage.getItem('accessToken');

//   const handleSearch = () => {
//     if (!selectedService) {
//       setError('Please select a service first.');
//       return;
//     }
//     const service = services.find((s) => s.label === selectedService);
//     if (service) {
//       navigate(service.path, {
//         state: { username, accessToken },
//       });
//     }
//   };

//   const handleLogout = () => {
//     localStorage.clear();
//     navigate('/login?role=customer');
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
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./IntroPage.css";
import api from "../../api/api";

const services = [
  { label: "Residential", path: "/residential" },
  { label: "Automotive", path: "/automotive" },
  { label: "Commercial", path: "/commercial" },
  { label: "Smart Lock", path: "/smart-lock" },
];

const IntroPage = () => {
  const [selectedService, setSelectedService] = useState("");
  const [error, setError] = useState("");
  const [heroContent, setHeroContent] = useState({
    title: "LOCK QUICK – Fast & Reliable Locksmith Services in Australia",
    subtitle: "24/7 Emergency Locksmith Services – Anytime, Anywhere!",
    description:
      "LOCK QUICK IS AN ONLINE-ONLY MARKETPLACE CONNECTING CUSTOMERS WITH TRUSTED LOCKSMITHS ACROSS AUSTRALIA\nWhether you're locked out or need urgent repairs, we offer fast, affordable, and 24/7 locksmith services—anytime, anywhere.",
  });
  const navigate = useNavigate();

  const username = localStorage.getItem("username");
  const accessToken = localStorage.getItem("accessToken");

  useEffect(() => {
    const fetchHeroContent = async () => {
      try {
        const response = await api.get("/api/content/?section=hero_banner");
        if (response.status === 200 && response.data.length > 0) {
          setHeroContent(response.data[0].content);
        }
      } catch (error) {
        console.error("Error fetching hero content:", error);
      }
    };
    fetchHeroContent();
  }, []);

  const handleSearch = () => {
    if (!selectedService) {
      setError("Please select a service first.");
      return;
    }
    const service = services.find((s) => s.label === selectedService);
    if (service) {
      navigate(service.path, {
        state: { username, accessToken },
      });
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login?role=customer");
  };

  return (
    <div className="intro-carousel">
      <div className="carousel">
        <img src="images/lkbg3new.png" alt="slide1" />
        <img src="images/lkbg2new.png" alt="slide2" />
        <img src="images/lkbg1new.png" alt="slide3" />
      </div>

      <div className="blur-box">
        <h1>
          <span className="orange">{heroContent.title.split(" – ")[0]}</span> –{" "}
          {heroContent.title.split(" – ")[1]}
        </h1>
        <h3>{heroContent.subtitle}</h3>
        <div className="intro-description">
          <p className="intro-lead">
            <strong>{heroContent.description.split("\n")[0]}</strong>
          </p>
          <p>{heroContent.description.split("\n")[1]}</p>
        </div>

        <div className="search-bar">
          <select
            value={selectedService}
            onChange={(e) => {
              setSelectedService(e.target.value);
              setError("");
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
