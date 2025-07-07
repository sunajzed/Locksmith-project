import React, { useState, useEffect } from "react";
import api from "../api/api";
import "./CCTVPreRegister.css";

const CCTVPreRegister = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
  });

  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    let timer;
    if (successMsg) {
      timer = setTimeout(() => {
        setSuccessMsg("");
      }, 5000);
    }
    return () => clearTimeout(timer);
  }, [successMsg]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMsg("");
    setErrorMsg("");

    try {
      const response = await api.post("/api/cctv/pre-register/", formData);
      setSuccessMsg(
        "🎉 Pre-registration submitted successfully! We'll contact you when our CCTV services launch."
      );
      setFormData({ name: "", email: "", address: "", phone: "" });
    } catch (error) {
      setErrorMsg("⚠️ Failed to submit. Please try again.");
      console.error("Submission error:", error);
    }
  };

  return (
    <div className="cctv-page">
      <div className="cctv-container">
        <div className="cctv-card">
          {!isMobile && (
            <div className="cctv-image-section">
              <div className="cctv-image-overlay">
                <div className="cctv-tag">COMING SOON</div>
                <h1 className="cctv-heading">
                  Advanced CCTV Security Solutions
                </h1>
                <p className="cctv-subtext">
                  Be the first to access our professional surveillance systems.
                  Pre-register today for exclusive launch benefits.
                </p>
              </div>
            </div>
          )}

          <div className="cctv-form-container">
            {isMobile && (
              <div className="cctv-mobile-header">
                <div className="cctv-tag">COMING SOON</div>
                <h1 className="cctv-mobile-heading">
                  Advanced CCTV Security Solutions
                </h1>
                <p className="cctv-mobile-subtext">
                  Be the first to access our professional surveillance systems.
                  Pre-register today for exclusive launch benefits.
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="cctv-form">
              <h2 className="cctv-form-title">Join Our Priority List</h2>
              <p className="cctv-form-subtitle">
                Secure your spot for our upcoming launch
              </p>

              <div className="cctv-form-grid">
                <div className="cctv-input-group">
                  <label className="cctv-label">Full Name*</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="cctv-input"
                  />
                </div>

                <div className="cctv-input-group">
                  <label className="cctv-label">Email*</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="cctv-input"
                  />
                </div>

                <div className="cctv-input-group">
                  <label className="cctv-label">Phone*</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    pattern="[0-9]{10}"
                    className="cctv-input"
                  />
                </div>

                <div className="cctv-input-group">
                  <label className="cctv-label">Property Address*</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                    className="cctv-input"
                  />
                </div>
              </div>

              <button type="submit" className="cctv-button">
                Secure My Priority Access
              </button>
            </form>

            {successMsg && <div className="cctv-success">{successMsg}</div>}
            {errorMsg && <div className="cctv-error">{errorMsg}</div>}

            <div className="cctv-footer-note">
              <p>
                We value your privacy. Your information will only be used to
                contact you about our service launch.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CCTVPreRegister;
