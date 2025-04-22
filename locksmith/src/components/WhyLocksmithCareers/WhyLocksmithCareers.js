// import React, { useEffect } from "react";
// import { Container, Row, Col, Button } from "react-bootstrap";
// import AOS from "aos";
// import "aos/dist/aos.css"; // Import AOS styles
// import { Link } from "react-router-dom";

// import "./WhyLocksmithCareers.css";

// const WhyLocksmithCareers = () => {
//   useEffect(() => {
//     AOS.init({ duration: 1000 }); // Initialize AOS with a duration of 1000ms
//   }, []);

//   return (
//     <section className="lock-career-section"   style={{
//       backgroundImage: "url('/images/key-lock-img.png')",
      
//     }}>
//       <Container>
//         <Row className="align-items-center">
//           {/* Left Side - Text Content */}
//           <Col md={6} className="unlock-text-content" data-aos="fade-right">
//             <h2 className="fw-bold text-light unlock-heading">
//             WHY CHOOSE OUR LOCKSMITH CAREERS?
//             </h2>
//             <p className="text-white">
//             Joining our team means more than just a job—it’s a chance to work with a trusted company that values your expertise. Here’s why locksmiths across Australia prefer working with us:

//             </p>

//             {/* Additional Points as a List */}
//             <ul className="benefits-list">
//               <li className="text-light">
//                 <b>High-Paying Locksmith Jobs</b> – Competitive salaries and flexible job opportunities.
//               </li>
//               <li className="text-light">
//                 <b>Work in Your Preferred Location</b> – Opportunities available in<b> Sydney, Melbourne, Brisbane, Perth, Adelaide, and other Australian cities</b>
//               </li>
//               <li className="text-light">
//                 <b>Steady Flow of Jobs</b> – Get a consistent supply of locksmith service requests, from emergency lockouts to high-tech security installations.
//               </li>
//               <li className="text-light">
//                 <b>24/7 Support</b> – Our dispatch and customer support team ensure smooth operations for locksmiths at all times.

//               </li>
//               <li className="text-light">
//                 <b>Free Training & Certification Assistance</b> – Stay updated with the latest locksmith tools, digital locks, and security systems.

//               </li>
//               <li className="text-light">
//                 <b>No Sign-Up Fees</b> – <b>Joining our locksmith network is 100% FREE</b>.<br/> No hidden costs!


//               </li>
//               <li className="text-light">
//                 <b>Work Independently or as a Team</b> – Choose whether to operate solo or collaborate with fellow locksmiths on large-scale security projects.


//               </li>
//             </ul>

//             {/* <Link to="/signup" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
//   <Button className="services-btn" data-aos="zoom-in">
//     Start Earning!
//   </Button>
// </Link> */}
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

// export default WhyLocksmithCareers;
import React, { useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import AOS from "aos";
import "aos/dist/aos.css"; // Import AOS styles
import { Link } from "react-router-dom";

import "./WhyLocksmithCareers.css";

const WhyLocksmithCareers = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 }); // Initialize AOS with a duration of 1000ms
  }, []);

  return (
    <section className="lock-career-section" style={{
      backgroundImage: "url('/images/key-lock-img.png')",
    }}>
      <Container>
        <Row className="align-items-center">
          {/* Text Content - Now full width on medium and smaller devices */}
          <Col md={12} lg={6} className="unlock-text-content" data-aos="fade-right">
            <h2 className="fw-bold text-light unlock-heading text-center text-lg-start">
              WHY CHOOSE OUR LOCKSMITH CAREERS?
            </h2>
            <p className="text-white text-center text-lg-start">
              Joining our team means more than just a job—it's a chance to work with a trusted company that values your expertise. Here's why locksmiths across Australia prefer working with us:
            </p>

            {/* Additional Points as a List */}
            <ul className="career-list">
              <li className="text-light">
                <b>High-Paying Locksmith Jobs</b> – Competitive salaries and flexible job opportunities.
              </li>
              <li className="text-light">
                <b>Work in Your Preferred Location</b> – Opportunities available in<b> Sydney, Melbourne, Brisbane, Perth, Adelaide, and other Australian cities</b>
              </li>
              <li className="text-light">
                <b>Steady Flow of Jobs</b> – Get a consistent supply of locksmith service requests, from emergency lockouts to high-tech security installations.
              </li>
              <li className="text-light">
                <b>24/7 Support</b> – Our dispatch and customer support team ensure smooth operations for locksmiths at all times.
              </li>
              <li className="text-light">
                <b>Free Training & Certification Assistance</b> – Stay updated with the latest locksmith tools, digital locks, and security systems.
              </li>
              <li className="text-light">
                <b>No Sign-Up Fees</b> – <b>Joining our locksmith network is 100% FREE</b>.<br/> No hidden costs!
              </li>
              <li className="text-light">
                <b>Work Independently or as a Team</b> – Choose whether to operate solo or collaborate with fellow locksmiths on large-scale security projects.
              </li>
            </ul>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default WhyLocksmithCareers;