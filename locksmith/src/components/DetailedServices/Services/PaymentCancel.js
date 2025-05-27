import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./PaymentCancel.css"; 

const PaymentCancel = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { bookingId, service, totalPrice } = location.state || {};
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
  }, []);

  // Extract customer details from service object
  const customer_contact_number =
    service?.customer_contact_number || "Not provided";
  const customer_address = service?.customer_address || "Not provided";
  const house_number =
    service?.house_number ||
    customer_address.match(/^\d+\s/)?.[0]?.trim() ||
    null;

  return (
    <div className="cancel-container">
      <div className={`cancel-card ${animate ? "animate" : ""}`}>
        <div className="cancel-icon">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
              stroke="#DC2626"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M15 9L9 15"
              stroke="#DC2626"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M9 9L15 15"
              stroke="#DC2626"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <div className="cancel-content">
          <h2>Payment Cancelled</h2>
          <p className="cancel-message">
            Your payment has been cancelled. The booking has not been confirmed.
          </p>

          {service && (
            <div className="booking-summary">
              <div className="summary-header">
                <h3>Booking Summary</h3>
                <span className="status-badge cancelled">Cancelled</span>
              </div>

              <div className="summary-details">
                <div className="detail-item">
                  <span className="detail-label">Service:</span>
                  <span>{service.service.admin_service_name}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Total Keys:</span>
                  <span>{service.totalKeys || "N/A"}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Contact:</span>
                  <span>{customer_contact_number}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Address:</span>
                  <span>{customer_address}</span>
                </div>
                {house_number && (
                  <div className="detail-item">
                    <span className="detail-label">House Number:</span>
                    <span>{house_number}</span>
                  </div>
                )}
                <div className="detail-item">
                  <span className="detail-label">Amount:</span>
                  <span>${totalPrice ? totalPrice.toFixed(2) : "N/A"}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Service Time:</span>
                  <span>
                    {service.isEmergency
                      ? "Immediately"
                      : new Date(service.scheduled_date).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          )}

          <div className="cancel-actions">
            <button className="secondary-button" onClick={() => navigate("/")}>
              Return Home
            </button>
            <button
              className="primary-button"
              onClick={() => navigate("/mybookings")}
            >
              View Bookings
            </button>
          </div>

          <div className="cancel-note">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 22C17.5228 22 22 17.5228 22 12C2 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                stroke="#6B7280"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12 8V12"
                stroke="#6B7280"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12 16H12.01"
                stroke="#6B7280"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <p>
              If you need assistance, please contact our support team.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentCancel;