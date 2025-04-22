
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./ServiceStyle.css";
import "bootstrap/dist/css/bootstrap.min.css";

const EmergencyService = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top when the component loads
  }, []);

  const handleViewServicesClick = () => {
    const accessToken = localStorage.getItem("accessToken");
    const userRole = localStorage.getItem("userRole");
  
    if (!accessToken || userRole !== "customer") {
      alert("Please log in to access this service.");
      navigate("/login?role=customer&from=emergencyService"); // Add the from parameter
    } else {
      navigate("/emergency");
    }
  };

  return (
    <div className="emergency-service container">
      {/* Section 1: Introduction */}
      <section className="service-intro-section text-center">
        <h1 className="fw-bold">
          EMERGENCY LOCKSMITH SERVICES – 24 HOUR EMERGENCY LOCKSMITH
        </h1>
        <h4>Fast & Reliable Emergency Locksmith Services</h4>
        <p className="lead text-black">
          Locked out <b>at midnight? Lost your keys while traveling?</b> Our{" "}
          <b>24-hour emergency locksmith services</b> ensure{" "}
          <b>quick, reliable access to your home, business, or vehicle.</b>
        </p>

        {/* Image Placeholder */}
        <div className="image-container">
          <div className="image-placeholder">
            <img src="/images/Emergency.webp" alt="Emergency Locksmith" />
          </div>
        </div>

        {/* Button for View Services */}
        <div className="text-center">
          <button
            className="btn btn-dark view-locksmiths-btn"
            onClick={handleViewServicesClick}
          >
            View Services
          </button>
        </div>
      </section>

      {/* Section 2: Services Offered */}
      <section className="services-section">
        <h2 className="text-center fw-bold">OUR EMERGENCY LOCKSMITH SERVICES</h2>
        <div className="row">
          {/* Home & Car Lockouts */}
          <div className="col-md-6">
            <div className="service-box">
              <h4>1. Home & Car Lockouts</h4>
              <ul>
                <li>
                  Gain access to <b>homes, apartments, offices, and vehicles</b>
                </li>
              </ul>
            </div>
          </div>

          {/* Emergency Lock Repairs */}
          <div className="col-md-6">
            <div className="service-box">
              <h4>2. Emergency Lock Repairs</h4>
              <ul>
                <li>Fix <b>broken locks after break-ins</b></li>
                <li>Secure <b>damaged doors & windows</b></li>
              </ul>
            </div>
          </div>

          {/* Urgent Key Cutting & Replacements */}
          <div className="col-md-6">
            <div className="service-box">
              <h4>3. Urgent Key Cutting & Replacements</h4>
              <ul>
                <li>Get <b>spare keys on-site</b></li>
                <li>Replace <b>stolen keys immediately</b></li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Why Choose Us */}
      <section className="why-choose-section text-center">
        <h2 className="fw-bold">WHY CHOOSE US?</h2>
        <ul className="list-unstyled">
          <li>✔ Fast response – 30 minutes in major cities</li>
          <li>✔ Affordable emergency locksmith service</li>
        </ul>
      </section>
    </div>
  );
};

export default EmergencyService;
