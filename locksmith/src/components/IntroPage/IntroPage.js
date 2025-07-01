import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./IntroPage.css";
import api from "../../api/api";

const services = [
  { label: "Residential", path: "/residential" },
  { label: "Automotive", path: "/automotive" },
  { label: "Commercial", path: "/commercial" },
  { label: "Smart Lock", path: "/smart-lock" },
];

const IntroPage = () => {
  const [selectedService, setSelectedService] = useState("");
  const [error, setError] = useState("");
  const [heroContent, setHeroContent] = useState({
    title: "LOCK QUICK – Fast & Reliable Locksmith Services in Australia",
    subtitle: "24/7 Emergency Locksmith Services – Anytime, Anywhere!",
    description:
      "LOCK QUICK IS AN ONLINE-ONLY MARKETPLACE CONNECTING CUSTOMERS WITH TRUSTED LOCKSMITHS ACROSS AUSTRALIA\nWhether you're locked out or need urgent repairs, we offer fast, affordable, and 24/7 locksmith services—anytime, anywhere.",
  });
  const [images, setImages] = useState([]);
  const navigate = useNavigate();

  const username = localStorage.getItem("username");
  const accessToken = localStorage.getItem("accessToken");

  useEffect(() => {
    const fetchHeroContent = async () => {
      try {
        // Fetch hero banner content
        const heroResponse = await api.get("/api/content/?section=hero_banner");
        if (heroResponse.status === 200 && heroResponse.data.length > 0) {
          setHeroContent({
            title: heroResponse.data[0].content.title,
            subtitle: heroResponse.data[0].content.subtitle,
            description: heroResponse.data[0].content.description,
          });
        }

        // Fetch images for image1, image2, image3
        const imageSections = ["image1", "image2", "image3"];
        const imagePromises = imageSections.map((section) =>
          api.get(`/api/content/?section=${section}`)
        );
        const imageResponses = await Promise.all(imagePromises);
        const fetchedImages = imageResponses
          .filter(
            (response) => response.status === 200 && response.data.length > 0
          )
          .map((response) => response.data[0].image)
          .filter((image) => image); // Filter out null/undefined images
        setImages(
          fetchedImages.length > 0
            ? fetchedImages
            : [
                "images/lkbg3new.png",
                "images/lkbg2new.png",
                "images/lkbg1new.png",
              ]
        );
      } catch (error) {
        console.error("Error fetching hero content or images:", error);
        // Fallback to default images
        setImages([
          "images/lkbg3new.png",
          "images/lkbg2new.png",
          "images/lkbg1new.png",
        ]);
      }
    };
    fetchHeroContent();
  }, []);

  const handleSearch = () => {
    if (!selectedService) {
      setError("Please select a service first.");
      return;
    }
    const service = services.find((s) => s.label === selectedService);
    if (service) {
      navigate(service.path, {
        state: { username, accessToken },
      });
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login?role=customer");
  };

  return (
    <div className="intro-carousel">
      <div className="carousel">
        {images.map((image, index) => (
          <img key={index} src={image} alt={`slide${index + 1}`} />
        ))}
      </div>

      <div className="blur-box">
        <h1>
          <span className="orange">{heroContent.title.split(" – ")[0]}</span> –{" "}
          {heroContent.title.split(" – ")[1]}
        </h1>
        <h3>{heroContent.subtitle}</h3>
        <div className="intro-description">
          <p className="intro-lead">
            <strong>{heroContent.description.split("\n")[0]}</strong>
          </p>
          <p>{heroContent.description.split("\n")[1]}</p>
        </div>

        <div className="search-bar">
          <select
            value={selectedService}
            onChange={(e) => {
              setSelectedService(e.target.value);
              setError("");
            }}
          >
            <option value="">Select Service</option>
            {services.map((service) => (
              <option key={service.label} value={service.label}>
                {service.label}
              </option>
            ))}
          </select>
          <button onClick={handleSearch}>Search</button>
        </div>

        {error && <div className="error-message">{error}</div>}
      </div>
    </div>
  );
};

export default IntroPage;
