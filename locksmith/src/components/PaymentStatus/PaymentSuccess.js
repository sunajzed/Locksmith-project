import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "./PaymentStatus.css";
import { FaCheckCircle, FaTimesCircle, FaHome } from "react-icons/fa";

const PaymentStatus = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [bookingData, setBookingData] = useState(null);
  const [error, setError] = useState(null);

  const sessionId = new URLSearchParams(location.search).get("session_id");
  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    if (!sessionId || !token) {
      setError("Unauthorized or missing session ID.");
      return;
    }

    axios
      .get(
        `${process.env.REACT_APP_BASE_URL}api/bookings/by_session/?session_id=${sessionId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        const data = res.data;
        if (data.payment_status === "paid") {
          setBookingData(data);
        } else {
          setError("Payment not completed.");
        }
      })
      .catch((err) => {
        console.error(err);
        setError("Booking not found or unauthorized.");
      });
  }, [sessionId, token]);

  if (error) {
    return (
      <div className="payment-status-container">
        <div className="card animated-card error">
          <div className="status-icon error">
            <FaTimesCircle className="shake" />
          </div>
          <h2 className="text-danger">Error</h2>
          <p className="subtitle">{error}</p>
          <div className="action-buttons">
            <button className="btn btn-primary" onClick={() => navigate("/")}>
              <FaHome className="me-2" /> Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!bookingData) return <div>Loading...</div>;

  return (
    <div className="payment-status-container">
      <div className="card animated-card success">
        <div className="status-icon success">
          <FaCheckCircle className="bounce-in" />
        </div>
        <h2 className="text-success">Payment Successful!</h2>
        <p className="subtitle">Thank you for your booking.</p>

        <div className="booking-summary">
          <h5>Booking Summary</h5>
          <p>
            <strong>Service ID:</strong> {bookingData.locksmith_service}
          </p>
          <p>
            <strong>Amount Paid:</strong> ${bookingData.total_price}
          </p>
          <p>
            <strong>Address:</strong> {bookingData.customer_address}
          </p>
          <p>
            <strong>Contact:</strong> {bookingData.customer_contact_number}
          </p>
        </div>

        <div className="action-buttons">
          <button className="btn btn-primary" onClick={() => navigate("/")}>
            <FaHome className="me-2" /> Back to Home
          </button>
          <button
            className="btn btn-outline-secondary"
            onClick={() => navigate("/mybookings")}
          >
            View My Bookings
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentStatus;
