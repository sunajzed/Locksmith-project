// import React, { useEffect } from "react";
// import { Container, Row, Col, Button } from "react-bootstrap";
// import AOS from "aos";
// import "aos/dist/aos.css"; // Import AOS styles
// import { Link } from "react-router-dom";

// import "./UnlockYourFuture.css";

// const UnlockYourFuture = () => {
//   useEffect(() => {
//     AOS.init({ duration: 1000 }); // Initialize AOS with a duration of 1000ms
//   }, []);

//   return (
//     <section className="unlock-section"   style={{
//       backgroundImage: "url('/images/dem (3).webp')",

//     }}>
//       <Container>
//         <Row className="align-items-center">
//           {/* Left Side - Text Content */}
//           <Col md={6} className="unlock-text-content" data-aos="fade-right">
//             <h2 className="fw-bold text-light unlock-heading">
//               UNLOCK YOUR FUTURE – BECOME A LOCKSMITH WITH US!
//             </h2>
//             <p className="text-white">
//               <b>Are You a Skilled Locksmith Looking for More Jobs?</b> Join our{" "}
//               <b>Australia-wide locksmith network</b> and start receiving
//               high-paying service requests today!
//             </p>

//             {/* Additional Points as a List */}
//             <ul className="benefits-list">
//               <li className="text-white">
//                 <b>Guaranteed Work Opportunities</b> – Residential, Commercial &
//                 Automotive Locksmith Jobs
//               </li>
//               <li className="text-white">
//                 <b>Flexible Schedule</b> – Work in <b>Sydney, Melbourne, Brisbane, Perth, Adelaide & Beyond</b>
//               </li>
//               <li className="text-white">
//                 <b>Instant Job Assignments</b> – No more waiting! Start getting
//                 locksmith service requests immediately.
//               </li>
//               <li className="text-white">
//                 <b>Work Independently or with a Team</b> – Choose your preferred
//                 work style
//               </li>
//               <li className="text-white">
//                 <b>Free Sign-Up & Quick Approval</b> – Fast-track your locksmith
//                 career now!
//               </li>
//             </ul>

//             <Link to="/careers" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
//   <Button className="services-btn" data-aos="zoom-in">
//     Start Earning!
//   </Button>
// </Link>
//           </Col>

//           {/* Right Side - Image */}
//           {/* <Col md={6} className="image-content" data-aos="fade-left">
//             <img src="/images/Future.png" alt="Locksmith at work" className="img-fluid unlock-image" />
//           </Col> */}
//         </Row>
//       </Container>
//     </section>
//   );
// };

// export default UnlockYourFuture;

import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import AOS from "aos";
import "aos/dist/aos.css";
import { Link } from "react-router-dom";
import api from "../../api/api";
import "./UnlockYourFuture.css";

const UnlockYourFuture = () => {
  const [content, setContent] = useState({
    heading: "UNLOCK YOUR FUTURE – BECOME A LOCKSMITH WITH US!",
    subheading: "Are You a Skilled Locksmith Looking for More Jobs?",
    description:
      "Join our Australia-wide locksmith network and start receiving high-paying service requests today!",
    benefits: [
      {
        text: "Guaranteed Work Opportunities – Residential, Commercial & Automotive Locksmith Jobs",
      },
      {
        text: "Flexible Schedule – Work in Sydney, Melbourne, Brisbane, Perth, Adelaide & Beyond",
      },
      {
        text: "Instant Job Assignments – No more waiting! Start getting locksmith service requests immediately.",
      },
      {
        text: "Work Independently or with a Team – Choose your preferred work style",
      },
      {
        text: "Free Sign-Up & Quick Approval – Fast-track your locksmith career now!",
      },
    ],
    button_text: "Start Earning!",
  });

  useEffect(() => {
    AOS.init({ duration: 1000 });

    const fetchContent = async () => {
      try {
        const response = await api.get(
          "/api/content/?section=unlock_your_future"
        );
        if (response.status === 200 && response.data.length > 0) {
          setContent(response.data[0].content);
        }
      } catch (error) {
        console.error("Error fetching unlock your future content:", error);
      }
    };
    fetchContent();
  }, []);

  return (
    <section
      className="unlock-section"
      style={{
        backgroundImage: "url('/images/dem (3).webp')",
      }}
    >
      <Container>
        <Row className="align-items-center">
          <Col md={6} className="unlock-text-content" data-aos="fade-right">
            <h2 className="fw-bold text-light unlock-heading">
              {content.heading}
            </h2>
            <p
              className="text-white"
              dangerouslySetInnerHTML={{ __html: content.subheading }}
            />
            <p
              className="text-white"
              dangerouslySetInnerHTML={{ __html: content.description }}
            />
            <ul className="benefits-list">
              {content.benefits.map((benefit, index) => (
                <li
                  key={index}
                  className="text-white"
                  dangerouslySetInnerHTML={{ __html: benefit.text }}
                />
              ))}
            </ul>
            <Link
              to="/careers"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              <Button className="services-btn" data-aos="zoom-in">
                {content.button_text}
              </Button>
            </Link>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default UnlockYourFuture;
