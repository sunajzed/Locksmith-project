
import React, { useRef, useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarCheck, faDollarSign, faUserLock, faToolbox, faCommentDots } from '@fortawesome/free-solid-svg-icons';
import './HowWeWork.css';

const HowWeWork = () => {
  const steps = [
    { id: 1, icon: faCalendarCheck, heading: '1. Make a Booking', text: 'Contact us for immediate assistance.' },
    { id: 2, icon: faDollarSign, heading: '2. Confirm the Details & Payment', text: 'Receive a quick estimate and proceed with payment.' },
    { id: 3, icon: faUserLock, heading: '3. Locksmith Arrives', text: 'Our expert locksmith reaches your location promptly.' },
    { id: 4, icon: faToolbox, heading: '4. Service Execution', text: 'Your lock or key issue is resolved efficiently.' },
    { id: 5, icon: faCommentDots, heading: '5. Review & Feedback', text: 'Secure your property and share your experience.' },
  ];

  const carouselRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
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
    const nextIndex = (currentIndex + 1) % steps.length;
    scrollToCard(nextIndex);
  };

  const handlePrev = () => {
    const prevIndex = (currentIndex - 1 + steps.length) % steps.length;
    scrollToCard(prevIndex);
  };

  useEffect(() => {
    const interval = setInterval(() =>{
      handleNext();
    }, 3000);
    return () => clearInterval(interval);
  },  [currentIndex]);

  return (
    <div className="how-we-work-section"  style={{
      backgroundImage: "url('/images/new-grey-bg.png')",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
    }}>
    <div className="container text-center py-5">
      <h2 className="fw-bold text-black">HOW WE WORK</h2>
      <h4 className='fw-bold text-black'>Our Process</h4>

      <div className="position-relative mt-4">
        <button className="carousel-control-prev" onClick={handlePrev}>&#10094;</button>
        <div className="d-flex overflow-hidden carousel-container" ref={carouselRef}>
          {steps.map((step) => (
            <div key={step.id} className={`card step-card mx-2 ${isMobile ? 'full-width-card' : ''}`}>
              <div className="card-body">
                <FontAwesomeIcon icon={step.icon} size="3x" className="step-icon" />
                <h5 className="fw-bold mt-3">{step.heading}</h5>
                <p className="card-text mt-2 text-black">{step.text}</p>
              </div>
            </div>
          ))}
        </div>
        <button className="carousel-control-next" onClick={handleNext}>&#10095;</button>
      </div>
    </div>
    </div>
  );
};

export default HowWeWork;

 