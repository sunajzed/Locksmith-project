
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./StripeOnboarding.css";
import api from "../../api/api";

export default function StripeOnboarding() {
  const [onboardingLink, setOnboardingLink] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const userRole = localStorage.getItem("userRole");

    if (!accessToken || userRole !== "locksmith") {
      navigate("/login?role=locksmith");
      return;
    }

    const fetchOnboardingLink = async () => {
      setLoading(true);
      try {
        const response = await api.get("/api/locksmiths/generate_stripe_onboarding_link/", {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        setOnboardingLink(response.data.onboarding_url);
      } catch (err) {
        console.error("Error fetching onboarding link:", err);
        setError(
          err.response?.data?.message || "Failed to fetch onboarding link. Please try again later."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchOnboardingLink();
  }, [navigate]);

  return (
    <div className="stripe-onboarding-container">
      <h2 className="stripe-onboarding-title">Stripe Onboarding</h2>
      {loading && <p className="stripe-onboarding-loading">Loading...</p>}
      {error && <p className="stripe-onboarding-error">{error}</p>}
      {onboardingLink && (
        <button className="stripe-onboarding-button">
          <a href={onboardingLink} target="_blank" rel="noopener noreferrer">
            Go Onboard
          </a>
        </button>
      )}
    </div>
  );
}
