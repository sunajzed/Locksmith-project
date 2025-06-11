import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../api/api";
import "./StripeDashboard.css";

const StripeDashboard = () => {
  const [loginUrl, setLoginUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLoginUrl = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");

        if (!accessToken) {
          navigate("/login?role=locksmith");
          return;
        }

        api.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;

        const response = await api.get("/api/locksmiths/generate_stripe_login_link/");

        if (response.data && response.data.login_url) {
          setLoginUrl(response.data.login_url);
        } else {
          throw new Error("Invalid response format.");
        }
      } catch (err) {
        if (err.response?.status === 401) {
          navigate("/login?role=locksmith");
        } else {
          console.error("Error generating Stripe login URL:", err);
          setError("Failed to load Stripe Dashboard link.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchLoginUrl();
  }, [navigate]);

  return (
    <div className="stripe-dashboard-container">
      <h2 className="stripe-dashboard-title">Stripe Dashboard</h2>

      {loading ? (
        <p className="stripe-loading">Loading dashboard link...</p>
      ) : error ? (
        <p className="stripe-error">{error}</p>
      ) : (
        <button
          onClick={() => window.open(loginUrl, "_blank")}
          className="stripe-button"
        >
          Go to Stripe Dashboard
        </button>
      )}
    </div>
  );
};

export default StripeDashboard;
