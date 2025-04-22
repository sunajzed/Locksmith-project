
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./ServiceStyle.css";
import "bootstrap/dist/css/bootstrap.min.css";

const SmartLockService = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top when the component loads
  }, []);

 
  const handleViewServicesClick = () => {
    const accessToken = localStorage.getItem("accessToken");
    const userRole = localStorage.getItem("userRole");

    if (!accessToken || userRole !== "customer") {
      alert("Please log in to access this service.");
      navigate("/login?role=customer&from=smartLockService"); // Add the from parameter
    } else {
      navigate("/smart-lock");
    }
  };

  return (
    <div className="smart-lock-service container">
      {/* Section 1: Introduction */}
      <section className="service-intro-section text-center">
        <h1 className="fw-bold">SMART LOCK SOLUTIONS – BEST SMART LOCK INSTALLATION</h1>
        <h4>Upgrade to Smart Locks</h4>
        <p className="lead text-black">
          Smart locks offer <b>keyless convenience, remote access, and advanced security</b>. 
          Our <b>smart lock installation services</b> make your home or business <b>safer and more convenient</b>.
        </p>

        {/* Image Placeholder - Centered and Adjusted Width */}
        <div className="image-container">
          <div className="image-placeholder">
            <img src="/images/smart-lock.jpg" alt="Smart Lock" />
          </div>
        </div>

        {/* Button Below Image */}
        <div className="text-center">
          <button className="btn btn-dark view-locksmiths-btn" onClick={handleViewServicesClick}>
            View Services
          </button>
        </div>
      </section>

      {/* Section 2: Services Offered */}
      <section className="services-section">
        <h2 className="text-center fw-bold">SMART LOCK SERVICES IN AUSTRALIA</h2>
        <div className="row">
          {/* Digital & Keyless Lock Installation */}
          <div className="col-md-6">
            <div className="service-box">
              <h4>1. Digital & Keyless Lock Installation</h4>
              <ul>
                <li>Install <b>fingerprint, PIN code, or Bluetooth locks</b></li>
              </ul>
            </div>
          </div>

          {/* Smart Lock Troubleshooting & Repairs */}
          <div className="col-md-6">
            <div className="service-box">
              <h4>2. Smart Lock Troubleshooting & Repairs</h4>
              <ul>
                <li>Fix <b>battery issues, connectivity problems, and lock malfunctions</b></li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Why Choose Us */}
      <section className="why-choose-section text-center">
        <h2 className="fw-bold">WHY CHOOSE US?</h2>
        <ul className="list-unstyled">
          <li>✔ <b>Top brands: Yale, Samsung, Schlage</b></li>
          <li>✔ <b>Certified locksmiths for smart lock installation</b></li>
        </ul>
      </section>
    </div>
  );
};

export default SmartLockService;
