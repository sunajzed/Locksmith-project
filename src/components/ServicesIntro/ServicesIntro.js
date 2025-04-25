import React from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap

const ServicesIntro = () => {
  return (
    <div
      className="about-section d-flex align-items-center position-relative"
      style={{
        minHeight: "525px",
        display: "flex",
        justifyContent: "center",
        padding: "50px 0",
        background: "url('/images/services.jpg') no-repeat center center/cover",
      }}
    >
      {/* Black Transparent Overlay */}
      <div
        className="overlay position-absolute top-0 start-0 w-100 h-100"
        style={{
          background: "rgba(0, 0, 0, 0.5)", // Black with 50% transparency
        }}
      ></div>

      <div className="container position-relative">
        <div className="row justify-content-center">
          <div className="col-md-8 text-center fade-in">
            <h1 className="text-light fw-bold">Our Services</h1>
            {/* <p className="about-quote">
              "Innovation distinguishes between a leader and a follower."
            </p> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesIntro;
