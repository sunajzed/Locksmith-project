import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserShield, faIdCard, faClock } from "@fortawesome/free-solid-svg-icons";
import AOS from "aos";
import "aos/dist/aos.css";
import "./CardSection.css";
import api from "../../api/api";

const CardSection = () => {
  const [content, setContent] = useState({
    maintitle: "WHAT WE DO – SPECIALIZED LOCKSMITH SERVICES",
    subtitle: "Reliable & Efficient Locksmith Solutions",
    card1: {
      heading: "Reliable Locksmith",
      description: "Quick and efficient solutions for lockouts, key replacements, and security installations.",
      icon: "faUserShield",
    },
    card2: {
      heading: "Licensed and Insured",
      description: "Trustworthy and certified locksmiths ensuring your safety.",
      icon: "faIdCard",
    },
    card3: {
      heading: "24/7 Availability",
      description: "Round-the-clock assistance for all your emergency lock and key issues.",
      icon: "faClock",
    },
  });

  const textLimits = {
    maintitle: 50,
    subtitle: 40,
    card_heading: 30,
    card_description: 100,
  };

  const defaultIcons = ["faUserShield", "faIdCard", "faClock"];
  const iconMap = {
    faUserShield: faUserShield,
    faIdCard: faIdCard,
    faClock: faClock,
  };

  useEffect(() => {
    AOS.init({ duration: 1000 });

    const fetchContent = async () => {
      try {
        const response = await api.get("/api/content/?section=service_cards");
        console.log("Fetched card section content:", response.data); // Debug log
        if (response.status === 200 && response.data.length > 0) {
          const fetchedContent = response.data[0].content;
          setContent({
            maintitle: fetchedContent.maintitle.slice(0, textLimits.maintitle) || content.maintitle,
            subtitle: fetchedContent.subtitle.slice(0, textLimits.subtitle) || content.subtitle,
            card1: {
              heading: fetchedContent.card1?.heading.slice(0, textLimits.card_heading) || content.card1.heading,
              description: fetchedContent.card1?.description.slice(0, textLimits.card_description) || content.card1.description,
              icon: fetchedContent.card1?.icon && iconMap[fetchedContent.card1.icon] ? fetchedContent.card1.icon : defaultIcons[0],
            },
            card2: {
              heading: fetchedContent.card2?.heading.slice(0, textLimits.card_heading) || content.card2.heading,
              description: fetchedContent.card2?.description.slice(0, textLimits.card_description) || content.card2.description,
              icon: fetchedContent.card2?.icon && iconMap[fetchedContent.card2.icon] ? fetchedContent.card2.icon : defaultIcons[1],
            },
            card3: {
              heading: fetchedContent.card3?.heading.slice(0, textLimits.card_heading) || content.card3.heading,
              description: fetchedContent.card3?.description.slice(0, textLimits.card_description) || content.card3.description,
              icon: fetchedContent.card3?.icon && iconMap[fetchedContent.card3.icon] ? fetchedContent.card3.icon : defaultIcons[2],
            },
          });
        }
      } catch (error) {
        console.error("Error fetching service cards content:", error);
      }
    };
    fetchContent();
  }, []);

  return (
    <Container
      fluid
      className="card-section"
      style={{
        background:
          "linear-gradient(to right, #191919, #3a3a3a, #5a5a5a, #3a3a3a, #191919)",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <Container>
        <div className="text-center mb-4">
          <h2 className="mt-2 fw-bold text-light">{content.maintitle}</h2>
          <h4 className="mt-3 mb-5 fw-bold text-light">{content.subtitle}</h4>
        </div>
        <Row className="justify-content-center">
          {/* Card 1 */}
          <Col
            xs={12}
            sm={6}
            md={4}
            className="mb-4 d-flex justify-content-center"
          >
            <Card className="card-item bg-light" data-aos="flip-left">
              <div className="card-icon">
                {iconMap[content.card1.icon] ? (
                  <FontAwesomeIcon icon={iconMap[content.card1.icon]} size="3x" />
                ) : (
                  <FontAwesomeIcon icon={iconMap[defaultIcons[0]]} size="3x" />
                )}
              </div>
              <Card.Body data-aos="fade-out" data-aos-delay="500">
                <Card.Title>{content.card1.heading}</Card.Title>
                <Card.Text>{content.card1.description}</Card.Text>
              </Card.Body>
            </Card>
          </Col>

          {/* Card 2 */}
          <Col
            xs={12}
            sm={6}
            md={4}
            className="mb-4 d-flex justify-content-center"
          >
            <Card className="card-item bg-light" data-aos="flip-up">
              <div className="card-icon">
                {iconMap[content.card2.icon] ? (
                  <FontAwesomeIcon icon={iconMap[content.card2.icon]} size="3x" />
                ) : (
                  <FontAwesomeIcon icon={iconMap[defaultIcons[1]]} size="3x" />
                )}
              </div>
              <Card.Body data-aos="fade-out" data-aos-delay="500">
                <Card.Title>{content.card2.heading}</Card.Title>
                <Card.Text>{content.card2.description}</Card.Text>
              </Card.Body>
            </Card>
          </Col>

          {/* Card 3 */}
          <Col
            xs={12}
            sm={6}
            md={4}
            className="mb-4 d-flex justify-content-center"
          >
            <Card className="card-item bg-light" data-aos="flip-right">
              <div className="card-icon">
                {iconMap[content.card3.icon] ? (
                  <FontAwesomeIcon icon={iconMap[content.card3.icon]} size="3x" />
                ) : (
                  <FontAwesomeIcon icon={iconMap[defaultIcons[2]]} size="3x" />
                )}
              </div>
              <Card.Body data-aos="fade-out" data-aos-delay="500">
                <Card.Title>{content.card3.heading}</Card.Title>
                <Card.Text>{content.card3.description}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default CardSection;