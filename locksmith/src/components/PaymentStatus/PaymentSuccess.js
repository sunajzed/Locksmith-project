import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaCheckCircle, FaTimesCircle, FaHome, FaEnvelope, FaCalendarAlt } from "react-icons/fa";
import { MdPayment, MdInfoOutline } from "react-icons/md";
import "./PaymentStatus.css";
import api from "../../api/api"; // Adjust path if needed

const PaymentStatus = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const sessionId = queryParams.get("session_id");

  const [service, setService] = useState(null);
  const [status, setStatus] = useState("loading"); 

  useEffect(() => {
    if (sessionId) {
      // Fetch session details from backend
      api.get(`/stripe/session-details?session_id=${sessionId}`)
        .then((res) => {
          setService(res.data);
          setStatus("success");
        })
        .catch((err) => {
          console.error(err);
          setStatus("error");
        });
    } else {
      setStatus("error");
    }
  }, [sessionId]);

  const isSuccess = status === "success";

  return (
    <div className="payment-status-container">
      <div className="card animated-card">
        {status === "loading" ? (
          <h3>Loading payment status...</h3>
        ) : (
          <>
            <div className={`status-icon ${isSuccess ? "success" : "error"}`}>
              {isSuccess ? (
                <FaCheckCircle className="bounce-in" />
              ) : (
                <FaTimesCircle className="shake" />
              )}
            </div>

            <h2 className={isSuccess ? "text-success" : "text-danger"}>
              {isSuccess ? "Payment Successful!" : "Payment Failed"}
            </h2>

            <p className="subtitle">
              {isSuccess
                ? "Thank you for your booking!"
                : "We couldn't process your payment"}
            </p>

            {service && isSuccess && (
              <div className="booking-summary">
                <h5>
                  <MdInfoOutline className="me-2" />
                  Booking Summary
                </h5>
                <div className="summary-item">
                  <span className="label">Service:</span>
                  <span className="value">{service.service.admin_service_name}</span>
                </div>
                <div className="summary-item">
                  <span className="label">Amount Paid:</span>
                  <span className="value">${service.service.total_price}</span>
                </div>
                <div className="summary-item">
                  <span className="label">Details:</span>
                  <span className="value">{service.service.details}</span>
                </div>
              </div>
            )}

            {!isSuccess && (
              <div className="error-message">
                <p>Please try again or use a different payment method.</p>
                <button
                  className="btn btn-outline-primary"
                  onClick={() => navigate(-1)}
                >
                  <MdPayment className="me-2" />
                  Retry Payment
                </button>
              </div>
            )}

            <div className="confirmation-message">
              <FaEnvelope className="me-2" />
              {isSuccess
                ? "A confirmation has been sent to your email."
                : "If the amount was deducted, it will be refunded within 3-5 business days."}
            </div>

            <div className="action-buttons">
              <button className="btn btn-primary" onClick={() => navigate("/")}>
                <FaHome className="me-2" />
                Back to Home
              </button>

              {isSuccess && (
                <button
                  className="btn btn-outline-secondary"
                  onClick={() => navigate("/mybookings")}
                >
                  <FaCalendarAlt className="me-2" />
                  View Bookings
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PaymentStatus;