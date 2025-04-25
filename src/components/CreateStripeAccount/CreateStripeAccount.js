
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Form, Button, Container, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";
import "./CreateStripeAccount.css";

const CreateStripeAccount = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState(null);
  const [accessToken, setAccessToken] = useState("");

  // Check authentication and role
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const userRole = localStorage.getItem("userRole");

    if (!token || userRole !== "locksmith") {
      navigate("/login?role=locksmith");
    } else {
      setAccessToken(token);
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!accessToken) {
      setMessage({ type: "danger", text: "Unauthorized. Please log in." });
      return;
    }

    try {
      await api.post(
        `/api/locksmiths/create_stripe_account/`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      setMessage({ type: "success", text: "Stripe account created successfully!" });
      navigate("/stripe-onboard");
    } catch (error) {
      setMessage({
        type: "danger",
        text: error.response?.data?.message || "Failed to create Stripe account.",
      });
      console.error("Error creating Stripe account:", error);
    }
  };

  return (
    <Container className="stripe-account-container">
      <h2 className="text-center">Create Stripe Account</h2>
      {message && <Alert variant={message.type}>{message.text}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Button variant="dark" type="submit" className="mt-3">
          Create Stripe Account
        </Button>
      </Form>
    </Container>
  );
};

export default CreateStripeAccount;
