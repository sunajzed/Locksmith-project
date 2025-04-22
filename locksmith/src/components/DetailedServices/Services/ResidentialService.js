
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./ServiceStyle.css";

const ResidentialService = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // const handleViewServices = () => {
  //   const accessToken = localStorage.getItem("accessToken");
  //   const userRole = localStorage.getItem("userRole");

  //   if (!accessToken || userRole !== "customer") {
  //     alert("Please log in to access this service.");
  //     navigate("/login?role=customer");
  //     return;
  //   }
  //   navigate("/residential");
  // };
  const handleViewServices = () => {
    const accessToken = localStorage.getItem("accessToken");
    const userRole = localStorage.getItem("userRole");
  
    if (!accessToken || userRole !== "customer") {
      alert("Please log in to access this service.");
      navigate("/login?role=customer&from=residentialService"); // Add the from parameter
      return;
    }
    navigate("/residential");
  };

  return (
    <div className="residential-service container">
      {/* Section 1: Introduction */}
      <section className="service-intro-section text-center">
        <h1 className="fw-bold">RESIDENTIAL LOCKSMITH SERVICES – HOME LOCK CHANGE SERVICE</h1>
        <h4>Why Secure Your Home?</h4>
        <p className="lead text-black">
          A strong and reliable lock is the first line of defense for your home. Whether you've <b>moved to a new house, lost your keys, or need better security</b>, a professional <b>home lock change service</b> ensures safety for your family and belongings.
        </p>

        {/* Image Placeholder */}
        <div className="image-container">
          <div className="image-placeholder">
            <img src="/images/residential.webp" alt="Residential Locksmith Service" />
          </div>
        </div>

        {/* Button - Visible only on medium devices */}
        <div className="text-center">
          <button className="btn btn-dark view-locksmiths-btn" onClick={handleViewServices}>View Services</button>
        </div>
      </section>

      {/* Section 2: Services Offered */}
      <section className="services-section">
        <h2 className="text-center fw-bold">OUR RESIDENTIAL LOCKSMITH SERVICES IN AUSTRALIA</h2>
        <div className="row">
          <div className="col-md-6">
            <div className="service-box">
              <h4>1. Home Lock Installation & Upgrades</h4>
              <ul>
                <li> Install <b>high-security locks</b> (deadbolts, digital locks, smart locks)</li>
                <li> Replace outdated or damaged locks with durable <b>Australian-standard locks</b></li>
                <li> Choose from top brands like <b>Carbine and Lockwood</b></li>
              </ul>
            </div>
          </div>
          <div className="col-md-6">
            <div className="service-box">
              <h4>2. Lock Repairs & Maintenance</h4>
              <ul>
                <li> Fix <b>jammed locks, broken keys stuck inside, and misaligned door locks</b></li>
                <li> Lubricate and adjust locks for <b>smooth operation</b></li>
              </ul>
            </div>
          </div>
          <div className="col-md-6">
            <div className="service-box">
              <h4>3. Re-keying & Master Key Systems</h4>
              <ul>
                <li> Change the internal lock mechanism to <b>work with a new key</b></li>
                <li> Set up <b>master key systems</b> for <b>rental properties and multi-door access</b></li>
              </ul>
            </div>
          </div>
          <div className="col-md-6">
            <div className="service-box">
              <h4>4. Emergency Home Lockouts</h4>
              <ul>
                <li> Locked out of your house? Get <b>fast, damage-free entry assistance</b></li>
                <li> Available <b>24/7 in Sydney, Melbourne, Brisbane, and other cities</b></li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Why Choose Us */}
      <section className="why-choose-section text-center">
        <h2 className="fw-bold">WHY CHOOSE US?</h2>
        <ul className="list-unstyled">
          <li>✔ Certified and insured locksmiths across <b>Brisbane, Canberra, Sydney, Melbourne, Adelaide, Perth</b></li>
          <li>✔ <b>Same-day lock change service</b> available</li>
          <li>✔ <b>Affordable pricing with upfront quotes</b></li>
        </ul>
      </section>
    </div>
  );
};

export default ResidentialService;
