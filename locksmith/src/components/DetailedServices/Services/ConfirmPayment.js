import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import api from "../../../api/api";
import "./ConfirmPayment.css";

const ConfirmPayment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { bookingId, service, basePrice, additionalKeys = 0, additionalKeyPrice } = location.state || {};
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [error, setError] = useState(null);

  // Handle payment status from Stripe redirect
  useEffect(() => {
    const sessionId = searchParams.get("session_id");
    const success = searchParams.get("success");

    if (sessionId && success === "true") {
      setPaymentStatus("success");
    }
  }, [searchParams]);

  // Validate passed data
  if (!bookingId || !service || !basePrice || additionalKeyPrice === undefined) {
    console.error("Missing required data in location.state:", {
      bookingId,
      service,
      basePrice,
      additionalKeys,
      additionalKeyPrice,
    });
    setError("Missing booking data. Please try booking again.");
    return (
      <div className="payment-error-container">
        <div className="payment-error-card">
          <div className="error-icon">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#DC2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 8V12" stroke="#DC2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 16H12.01" stroke="#DC2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h2>Booking Error</h2>
          <p className="error-message">{error}</p>
          <button className="primary-button" onClick={() => navigate("/")}>
            Return Home
          </button>
        </div>
      </div>
    );
  }

  // Calculate the total price
  const adjustedBasePrice = parseFloat(basePrice) + (additionalKeys * parseFloat(additionalKeyPrice));
  const tenPercentFee = adjustedBasePrice * 0.1;
  const platformFee = 40;
  const totalPrice = adjustedBasePrice + tenPercentFee + platformFee;

  const handleConfirmPayment = async () => {
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      alert("You need to log in first.");
      navigate("/login");
      return;
    }

    setIsProcessing(true);

    try {
      const paymentResponse = await api.post(
        `/api/bookings/${bookingId}/process_payment/`,
        { amount: Math.round(totalPrice * 100) }, // Stripe expects the amount in cents
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );

      window.location.href = paymentResponse.data.checkout_url;
    } catch (error) {
      console.error("Payment error:", error.response?.data || error.message);
      alert(
        error.response?.data?.detail ||
          error.response?.data?.message ||
          "Payment processing failed. Please try again."
      );
    } finally {
      setIsProcessing(false);
    }
  };

  if (paymentStatus === "success") {
    return <PaymentSuccess service={service} totalPrice={totalPrice} navigate={navigate} />;
  }

  return (
    <div className="payment-container">
      <div className="payment-card">
        <div className="payment-header">
          <h2>Confirm Payment</h2>
          <p className="subheader">Review your booking details before proceeding</p>
        </div>

        <div className="service-summary">
          <div className="service-info">
            <h3>{service.service.admin_service_name}</h3>
            <p>{service.service.details}</p>
          </div>
          <div className="service-price">
            <span>Booking Price: ${totalPrice.toFixed(2)}</span>
          </div>
        </div>

        {/* Price Breakdown Section */}
        <div className="price-breakdown">
          <h3>Price Breakdown</h3>
          <div className="breakdown-item">
            <span>Base Price:</span>
            <span>${parseFloat(basePrice).toFixed(2)}</span>
          </div>
          {additionalKeys > 0 && (
            <div className="breakdown-item">
              <span>Additional Keys ({additionalKeys} x ${parseFloat(additionalKeyPrice).toFixed(2)}):</span>
              <span>${(additionalKeys * parseFloat(additionalKeyPrice)).toFixed(2)}</span>
            </div>
          )}
          <div className="breakdown-item">
            <span>Subtotal:</span>
            <span>${adjustedBasePrice.toFixed(2)}</span>
          </div>
          <div className="breakdown-item">
            <span>Service Fee (10%):</span>
            <span>${tenPercentFee.toFixed(2)}</span>
          </div>
          <div className="breakdown-item">
            <span>GST (10%, included in total):</span>
            <span>${tenPercentFee.toFixed(2)}</span>
          </div>
          <div className="breakdown-item">
            <span>Platform Fee:</span>
            <span>${platformFee.toFixed(2)}</span>
          </div>
          <div className="breakdown-item total">
            <span>Total:</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
        </div>

        <div className="scheduled-time">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 4H5C3.89543 4 3 4.89543 3 6V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V6C21 4.89543 20.1046 4 19 4Z" stroke="#4B5563" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M16 2V6" stroke="#4B5563" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M8 2V6" stroke="#4B5563" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M3 10H21" stroke="#4B5563" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span>Scheduled for: <strong>{service.isEmergency ? "Immediately" : new Date(service.scheduled_date).toLocaleString()}</strong></span>
        </div>

        <div className="payment-actions">
          <button
            className={`primary-button ${isProcessing ? "processing" : ""}`}
            onClick={handleConfirmPayment}
            disabled={isProcessing}
          >
            {isProcessing ? (
              <>
                <span className="button-spinner"></span>
                Processing...
              </>
            ) : (
              "Confirm & Pay"
            )}
          </button>
          
          <div className="security-info">
            <div className="security-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 22C12 22 20 18 20 12V5L12 2L4 5V12C4 18 12 22 12 22Z" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>Secure payment</span>
            </div>
            <div className="security-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 13L9 17L19 7" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>Instant confirmation</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const PaymentSuccess = ({ service, totalPrice, navigate }) => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
  }, []);

  return (
    <div className="success-container">
      <div className={`success-card ${animate ? "animate" : ""}`}>
        <div className="success-icon">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M22 11.08V12C21.9988 14.1564 21.3005 16.2547 20.0093 17.9818C18.7182 19.709 16.9033 20.9725 14.8354 21.5839C12.7674 22.1953 10.5573 22.1219 8.53447 21.3746C6.51168 20.6273 4.78465 19.2461 3.61096 17.4371C2.43727 15.628 1.87979 13.4881 2.02168 11.3363C2.16356 9.18455 2.99721 7.13631 4.39828 5.49706C5.79935 3.85781 7.69279 2.71537 9.79619 2.24013C11.8996 1.7649 14.1003 1.98232 16.07 2.85999" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M22 4L12 14.01L9 11.01" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>

        <div className="success-content">
          <h2>Payment Successful</h2>
          <p className="success-message">Your booking has been confirmed</p>

          <div className="booking-summary">
            <div className="summary-header">
              <h3>Booking Details</h3>
              <span className="status-badge">Confirmed</span>
            </div>

            <div className="summary-details">
              <div className="detail-item">
                <span>Service:</span>
                <span>{service.service.admin_service_name}</span>
              </div>
              <div className="detail-item">
                <span>Total Keys:</span>
                <span>{service.totalKeys}</span>
              </div>
              <div className="detail-item">
                <span>Amount Paid:</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              <div className="detail-item">
                <span>Service Time:</span>
                <span>{service.isEmergency ? "Immediately" : new Date(service.scheduled_date).toLocaleString()}</span>
              </div>
            </div>
          </div>

          <div className="success-actions">
            <button className="secondary-button" onClick={() => navigate("/")}>
              Return Home
            </button>
            <button className="primary-button" onClick={() => navigate("/dashboard")}>
              View Bookings
            </button>
          </div>

          <div className="success-note">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 22C17.5228 22 22 17.5228 22 12C2 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 8V12" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 16H12.01" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <p>A confirmation has been sent to your email. Our locksmith will contact you shortly.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmPayment;