import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./ServiceStyle.css";
import "bootstrap/dist/css/bootstrap.min.css";

const AutomotiveService = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top when the component loads
  }, []);

  // const handleViewServicesClick = () => {
  //   const accessToken = localStorage.getItem("accessToken");
  //   const userRole = localStorage.getItem("userRole");
  
  //   if (!accessToken || userRole !== "customer") {
  //     alert("Please log in to access this service.");
  //     navigate("/login?role=customer&from=automotiveService"); // Add the from parameter
  //   } else {
  //     navigate("/automotive");
  //   }
  // };
  const handleViewServicesClick = () => {
    navigate("/automotive");
  };
  
  return (
    <div className="automotive-service container">
      {/* Section 1: Introduction */}
      <section className="service-intro-section text-center">
        <h1 className="fw-bold">AUTOMOTIVE LOCKSMITH SERVICES – CAR KEY REPLACEMENT NEAR ME</h1>
        <p className="lead text-black">
          Losing your <b>car keys</b> can be frustrating. Our <b>automotive locksmith services</b> provide <b>quick car key replacement, key programming, 
          and emergency lockout solutions</b> across Australia.
        </p>

        {/* Image Placeholder */}
        <div className="image-container">
          <div className="image-placeholder">
            <img src="/images/automotive.webp" alt="Automotive Locksmith Service" />
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
        <h2 className="text-center fw-bold">OUR CAR LOCKSMITH SERVICES</h2>
        <div className="row">
          <div className="col-md-6">
            <div className="service-box">
              <h4>1. Car Lockout Assistance</h4>
              <ul>
                <li> Unlock <b>vehicles without damage</b></li>
                <li> Available for <b>all car brands: Toyota, Ford, Hyundai, BMW, Mercedes</b></li>
              </ul>
            </div>
          </div>
          <div className="col-md-6">
            <div className="service-box">
              <h4>2. Car Key Cutting & Replacement</h4>
              <ul>
                <li> Cut <b>new car keys</b> for <b>lost, broken, or stolen keys</b></li>
                <li> On-site key cutting for <b>instant replacements</b></li>
              </ul>
            </div>
          </div>
          <div className="col-md-6">
            <div className="service-box">
              <h4>3. Transponder Key Programming</h4>
              <ul>
                <li> Program <b>chip-enabled car keys</b></li>
                <li> Fix <b>issues with immobilizers & remote entry systems</b></li>
              </ul>
            </div>
          </div>
          <div className="col-md-6">
            <div className="service-box">
              <h4>4. Ignition Repair & Replacement</h4>
              <ul>
                <li> Repair <b>jammed or broken ignitions</b></li>
                <li> Replace ignition locks for <b>push-to-start and traditional key systems</b></li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Why Choose Us */}
      <section className="why-choose-section text-center">
        <h2 className="fw-bold">WHY CHOOSE US?</h2>
        <ul className="list-unstyled">
          <li>✔ <b>Mobile auto locksmith service – we come to you!</b></li>
          <li>✔ <b>Specialized in all car makes & models</b></li>
          <li>✔ <b>Competitive pricing & same-day key replacements</b></li>
        </ul>
      </section>
    </div>
  );
};

export default AutomotiveService;
