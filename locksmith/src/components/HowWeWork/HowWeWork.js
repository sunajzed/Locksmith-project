import React, { useRef, useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarCheck, faDollarSign, faUserLock, faToolbox, faCommentDots } from '@fortawesome/free-solid-svg-icons';
import api from "../../api/api";
import './HowWeWork.css';

const HowWeWork = () => {
  const [content, setContent] = useState({
    heading: "HOW WE WORK",
    subheading: "Our Process",
    steps: [
      { heading: "1. Make a Booking", text: "Contact us for immediate assistance.", icon: "faCalendarCheck" },
      { heading: "2. Confirm the Details & Payment", text: "Receive a quick estimate and proceed with payment.", icon: "faDollarSign" },
      { heading: "3. Locksmith Arrives", text: "Our expert locksmith reaches your location promptly.", icon: "faUserLock" },
      { heading: "4. Service Execution", text: "Your lock or key issue is resolved efficiently.", icon: "faToolbox" },
      { heading: "5. Review & Feedback", text: "Secure your property and share your experience.", icon: "faCommentDots" },
    ],
  });

  const iconMap = {
    faCalendarCheck: faCalendarCheck,
    faDollarSign: faDollarSign,
    faUserLock: faUserLock,
    faToolbox: faToolbox,
    faCommentDots: faCommentDots,
  };

  const carouselRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);

    const fetchContent = async () => {
      try {
        const response = await api.get("/api/content/?section=how_we_work");
        if (response.status === 200 && response.data.length > 0) {
          setContent(response.data[0].content);
        }
      } catch (error) {
        console.error("Error fetching how we work content:", error);
      }
    };
    fetchContent();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const scrollToCard = (index) => {
    if (carouselRef.current) {
      const card = carouselRef.current.children[index];
      const scrollPosition = card.offsetLeft - carouselRef.current.offsetLeft;
      carouselRef.current.scrollTo({
        left: scrollPosition,
        behavior: 'smooth',
      });
      setCurrentIndex(index);
    }
  };

  const handleNext = () => {
    const nextIndex = (currentIndex + 1) % content.steps.length;
    scrollToCard(nextIndex);
  };

  const handlePrev = () => {
    const prevIndex = (currentIndex - 1 + content.steps.length) % content.steps.length;
    scrollToCard(prevIndex);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 3000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <div
      className="how-we-work-section"
      style={{
        backgroundImage: "url('/images/new-grey-bg.png')",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <div className="container text-center py-5">
        <h2 className="fw-bold text-black">{content.heading}</h2>
        <h4 className="fw-bold text-black">{content.subheading}</h4>
        <div className="position-relative mt-4">
          <button className="carousel-control-prev" onClick={handlePrev}>❮</button>
          <div className="d-flex overflow-hidden carousel-container" ref={carouselRef}>
            {content.steps.map((step, index) => (
              <div key={index} className={`card step-card mx-2 ${isMobile ? 'full-width-card' : ''}`}>
                <div className="card-body">
                  <FontAwesomeIcon icon={iconMap[step.icon] || faToolbox} size="3x" className="step-icon" />
                  <h5 className="fw-bold mt-3">{step.heading}</h5>
                  <p className="card-text mt-2 text-black">{step.text}</p>
                </div>
              </div>
            ))}
          </div>
          <button className="carousel-control-next" onClick={handleNext}>❯</button>
        </div>
      </div>
    </div>
  );
};

export default HowWeWork;