import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import "./Navbar.css";
import "bootstrap/dist/css/bootstrap.min.css";
import api from "../../api/api";

export default function NavBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const username = localStorage.getItem("username");
  const isAuthenticated = !!localStorage.getItem("accessToken");
  const userRole = localStorage.getItem("userRole");
  const [expanded, setExpanded] = useState(false); // State to control navbar collapse

  const handleLogout = async () => {
    const refreshToken = localStorage.getItem("refreshToken");
    console.log("Refresh Token:", refreshToken);

    if (!refreshToken) {
      alert("No refresh token found. Please log in again.");
      navigate("/login");
      return;
    }

    try {
      const response = await api.post(
        "/logout/",
        { refresh: refreshToken },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

      alert(response.data.message || "Logout successful!");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("userRole");
      localStorage.removeItem("username");
      navigate("/");
    } catch (err) {
      console.error("Error:", err);
      console.error("Error Response:", err.response?.data);
      alert(err.response?.data?.message || "Logout failed. Please try again.");
    }
  };

  const [navHeight, setNavHeight] = useState(
    window.innerWidth <= 768 ? 150 : 90
  );

  useEffect(() => {
    const handleResize = () => {
      setNavHeight(window.innerWidth <= 768 ? 150 : 90);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Close navbar when location changes (i.e., after navigation)
  useEffect(() => {
    setExpanded(false);
  }, [location]);

  // Handle link clicks to close navbar and navigate
  const handleNavLinkClick = (path) => {
    setExpanded(false);
    navigate(path);
  };

  return (
    <>
      {isAuthenticated && (
        <div className="d-lg-none welcome-message">
          <div className="container text-end">Welcome, {username}</div>
        </div>
      )}

      <Navbar
        className="custom-navbar-bg"
        expand="lg"
        expanded={expanded}
        onToggle={() => setExpanded(!expanded)}
        style={{
          background:
            "linear-gradient(to right, #191919, #3a3a3a, #5a5a5a, #3a3a3a, #191919)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          padding: "4px 0",
          height: `${navHeight}px`,
        }}
      >
        <Container>
          <Navbar.Brand
            as={userRole === "locksmith" ? "div" : Link}
            to={userRole === "locksmith" ? "#" : "/"}
            style={
              userRole === "locksmith"
                ? { cursor: "default", pointerEvents: "none" }
                : {}
            }
          >
            <a href="/">
              <img
                alt="Logo"
                src="images/logo.webp"
                width="40"
                height="40"
                className="d-inline-block align-top logo"
              />
            </a>
          </Navbar.Brand>

          <Navbar.Toggle
            className="toggle-button"
            aria-controls="basic-navbar-nav"
          />
          <Navbar.Collapse
            id="basic-navbar-nav"
            className="navbar-collapse-overlay"
          >
            {!isAuthenticated || userRole !== "locksmith" ? (
              <Nav className="custom-nav mx-auto text-center">
                <Nav.Link
                  as={Link}
                  to="/"
                  className={`me-lg-3 fw-bold text-light ${
                    location.pathname === "/" ? "active" : ""
                  }`}
                  onClick={() => handleNavLinkClick("/")}
                >
                  Home
                </Nav.Link>
                <Dropdown as={Nav.Item} className="me-lg-3">
                  <div
                    onClick={() => handleNavLinkClick("/services")}
                    style={{ cursor: "pointer" }}
                  >
                    <Dropdown.Toggle
                      as={Nav.Link}
                      className={`fw-bold text-light ${
                        location.pathname.includes("/services") ? "active" : ""
                      }`}
                      style={{ backgroundColor: "transparent" }}
                    >
                      Services
                    </Dropdown.Toggle>
                  </div>
                  <Dropdown.Menu className="custom-dropdown-menu">
                    <Dropdown.Item
                      as={Link}
                      to="/residential-service"
                      className="dropdown-item-custom"
                      onClick={() => handleNavLinkClick("/residential-service")}
                    >
                      Residential
                    </Dropdown.Item>
                    <Dropdown.Item
                      as={Link}
                      to="/automotive-service"
                      className="dropdown-item-custom"
                      onClick={() => handleNavLinkClick("/automotive-service")}
                    >
                      Automotive
                    </Dropdown.Item>
                    <Dropdown.Item
                      as={Link}
                      to="/commercial-service"
                      className="dropdown-item-custom"
                      onClick={() => handleNavLinkClick("/commercial-service")}
                    >
                      Commercial
                    </Dropdown.Item>
                    <Dropdown.Item
                      as={Link}
                      to="/smart-lock-service"
                      className="dropdown-item-custom"
                      onClick={() => handleNavLinkClick("/smart-lock-service")}
                    >
                      Smart Lock
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
                <Nav.Link
                  as={Link}
                  to="/about-us"
                  className={`me-lg-3 fw-bold text-light ${
                    location.pathname === "/about-us" ? "active" : ""
                  }`}
                  onClick={() => handleNavLinkClick("/about-us")}
                >
                  About Us
                </Nav.Link>
                <Nav.Link
                  as={Link}
                  to="/careers"
                  className={`me-lg-3 fw-bold text-light ${
                    location.pathname === "/careers" ? "active" : ""
                  }`}
                  onClick={() => handleNavLinkClick("/careers")}
                >
                  Careers
                </Nav.Link>
                <Nav.Link
                  as={Link}
                  to="/contact-us"
                  className={`me-lg-3 fw-bold text-light ${
                    location.pathname === "/contact-us" ? "active" : ""
                  }`}
                  onClick={() => handleNavLinkClick("/contact-us")}
                >
                  Contact Us
                </Nav.Link>
              </Nav>
            ) : (
              <Nav className="mx-auto text-center"></Nav>
            )}

            <Nav className="ms-lg-auto d-flex flex-column flex-lg-row align-items-center">
              {isAuthenticated ? (
                <>
                  <Nav.Link className="me-lg-3 fw-bold text-light d-none d-lg-block">
                    Welcome, {username}
                  </Nav.Link>
                  {userRole === "customer" && (
                    <>
                      <Button
                        as={Link}
                        to="/mybookings"
                        className="action-btn my-2 my-lg-0"
                        onClick={() => handleNavLinkClick("/mybookings")}
                      >
                        Bookings
                      </Button>
                      <Button
                        as={Link}
                        to="/update-profile"
                        className="action-btn my-2 my-lg-0"
                        onClick={() => handleNavLinkClick("/update-profile")}
                      >
                        Profile
                      </Button>
                    </>
                  )}
                  <Button
                    className="logout-action-btn my-2 my-lg-0"
                    onClick={handleLogout}
                  >
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Dropdown className="my-2 my-lg-0">
                    <Dropdown.Toggle as={Button} className="drop-action-btn">
                      Login
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item
                        as={Link}
                        to="/login?role=customer"
                        onClick={() =>
                          handleNavLinkClick("/login?role=customer")
                        }
                      >
                        User
                      </Dropdown.Item>
                      <Dropdown.Item
                        as={Link}
                        to="/login?role=locksmith"
                        onClick={() =>
                          handleNavLinkClick("/login?role=locksmith")
                        }
                      >
                        Locksmith
                      </Dropdown.Item>
                      <Dropdown.Item
                        as={Link}
                        to="#"
                        onClick={() => handleNavLinkClick("#")}
                      >
                        CCTV Techician
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                  <Dropdown className="my-2 my-lg-0">
                    <Dropdown.Toggle as={Button} className="drop-action-btn">
                      SignUp
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item
                        as={Link}
                        to="/usersignup"
                        onClick={() => handleNavLinkClick("/usersignup")}
                      >
                        User
                      </Dropdown.Item>
                      <Dropdown.Item
                        as={Link}
                        to="/signup"
                        onClick={() => handleNavLinkClick("/signup")}
                      >
                        Locksmith
                      </Dropdown.Item>

                      <Dropdown.Item
                        as={Link}
                        to="#"
                        onClick={() => handleNavLinkClick("#")}
                      >
                        CCTV Techician
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
