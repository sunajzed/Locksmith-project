// import React from 'react';
// import { Container, Row, Col, Card } from 'react-bootstrap';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faUserShield, faIdCard, faClock } from '@fortawesome/free-solid-svg-icons'; // Import icons
// import './CardSection.css'; // Import the CSS file for styling

// const CardSection = () => {
//   return (
//     <Container className="card-section">
//       <div className="text-center mb-4">
//         {/* <h5>What We Do</h5> */}
//         <h2 className="mt-2 fw-bold">What We Do – Specialized Locksmith Services</h2>
//         <h4 className='mt-2'>Reliable & Efficient Locksmith Solutions</h4>
//       </div>
//       <Row className="justify-content-center">
//         {/* Card 1 */}
//         <Col xs={12} sm={6} md={4} className="mb-4 d-flex justify-content-center">
//           <Card className="card-item">
//             <div className="card-icon">
//               <FontAwesomeIcon icon={faUserShield} size="3x" /> {/* Icon for Reliable Locksmith */}
//             </div>
//             <Card.Body>
//               <Card.Title>Reliable Locksmith</Card.Title>
//               <Card.Text>
//               Quick and efficient solutions for lockouts, key replacements, and security installations.
//               </Card.Text>
//             </Card.Body>
//           </Card>
//         </Col>

//         {/* Card 2 */}
//         <Col xs={12} sm={6} md={4} className="mb-4 d-flex justify-content-center">
//           <Card className="card-item">
//             <div className="card-icon">
//               <FontAwesomeIcon icon={faIdCard} size="3x" /> {/* Icon for Licensed and Insured */}
//             </div>
//             <Card.Body>
//               <Card.Title>Licensed and Insured</Card.Title>
//               <Card.Text>
//               Trustworthy and certified locksmiths ensuring your safety.
//               </Card.Text>
//             </Card.Body>
//           </Card>
//         </Col>

//         {/* Card 3 */}
//         <Col xs={12} sm={6} md={4} className="mb-4 d-flex justify-content-center">
//           <Card className="card-item">
//             <div className="card-icon">
//               <FontAwesomeIcon icon={faClock} size="3x" /> {/* Icon for 24/7 Availability */}
//             </div>
//             <Card.Body>
//               <Card.Title>24/7 Availability</Card.Title>
//               <Card.Text>
//               Round-the-clock assistance for all your emergency lock and key issues.
//               </Card.Text>
//             </Card.Body>
//           </Card>
//         </Col>
//       </Row>
//     </Container>
//   );
// };

// export default CardSection;
import React, { useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserShield, faIdCard, faClock } from '@fortawesome/free-solid-svg-icons';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './CardSection.css';

const CardSection = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <Container fluid className="card-section"
    // style={{
    //   backgroundImage: "url('/images/dark-grey-bg.webp')",
    //   backgroundPosition: "center",
    //   backgroundRepeat: "no-repeat",
    //   backgroundSize: "cover",
    // }}
    style={{
      background: "linear-gradient(to right, #191919, #3a3a3a, #5a5a5a, #3a3a3a, #191919)",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
    }}
    
    >
    <Container >
      <div className="text-center mb-4">
        {/* <h2 className="mt-2 fw-bold">What We Do – Specialized Locksmith Services</h2> */}
        <h2 className="mt-2 fw-bold text-light">WHAT WE DO – SPECIALIZED LOCKSMITH SERVICES</h2>

        <h4 className='mt-3 mb-5 fw-bold text-light'>Reliable & Efficient Locksmith Solutions</h4>
      </div>
      <Row className="justify-content-center">
        {/* Card 1 */}
        <Col xs={12} sm={6} md={4} className="mb-4 d-flex justify-content-center">
          <Card className="card-item bg-light"  data-aos="flip-left">
            <div className="card-icon">
              <FontAwesomeIcon icon={faUserShield} size="3x" />
            </div>
            <Card.Body data-aos="fade-out" data-aos-delay="500">
              <Card.Title>Reliable Locksmith</Card.Title>
              <Card.Text>
                Quick and efficient solutions for lockouts, key replacements, and security installations.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        {/* Card 2 */}
        <Col xs={12} sm={6} md={4} className="mb-4 d-flex justify-content-center">
          <Card className="card-item bg-light"data-aos="flip-up">
            <div className="card-icon">
              <FontAwesomeIcon icon={faIdCard} size="3x" />
            </div>
            <Card.Body data-aos="fade-out" data-aos-delay="500">
              <Card.Title>Licensed and Insured</Card.Title>
              <Card.Text>
                Trustworthy and certified locksmiths ensuring your safety.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        {/* Card 3 */}
        <Col xs={12} sm={6} md={4} className="mb-4 d-flex justify-content-center">
          <Card className="card-item bg-light"  data-aos="flip-right">
            <div className="card-icon">
              <FontAwesomeIcon icon={faClock} size="3x" />
            </div>
            <Card.Body data-aos="fade-out" data-aos-delay="500">
              <Card.Title>24/7 Availability</Card.Title>
              <Card.Text>
                Round-the-clock assistance for all your emergency lock and key issues.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container></Container>
  );
};

export default CardSection;
