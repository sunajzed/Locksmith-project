import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import api from "../../../api/api";
import "./ConfirmPayment.css";

const ConfirmPayment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { service } = location.state;
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(null);

  // Check for Stripe success redirect
  useEffect(() => {
    const sessionId = searchParams.get('session_id');
    const success = searchParams.get('success');
    
    if (sessionId && success === 'true') {
      setPaymentStatus('success');
      // You might want to store the booking details in state or localStorage
      // to display on the success page
    }
  }, [searchParams]);

  // Calculate fee breakdown
  const totalPrice = service.service?.total_price || 0;
  const platformFeePercentage = 40;
  const commissionPercentage = 10;
  
  const platformFee = (totalPrice * platformFeePercentage / 100).toFixed(2);
  const commission = (totalPrice * commissionPercentage / 100).toFixed(2);
  const locksmithFee = (totalPrice - platformFee - commission).toFixed(2);

  const handleConfirmPayment = async () => {
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      alert("You need to login first.");
      navigate("/login");
      return;
    }

    setIsProcessing(true);

    try {
      // Prepare booking data with automatic current date
      const bookingData = {
        service_id: service.service?.id,
        locksmith_service: service.service?.id,
        scheduled_date: new Date().toISOString(),
        details: service.service?.details,
        total_price: service.service?.total_price,
      };
      
      // 1. Create the booking
      const bookingResponse = await api.post(
        "/api/bookings/",
        bookingData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      const bookingId = bookingResponse.data.id;

      // 2. Process payment
      const paymentResponse = await api.post(
        `/api/bookings/${bookingId}/process_payment/`,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      // Redirect to Stripe
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

  if (paymentStatus === 'success') {
    return <PaymentSuccess service={service} />;
  }

  return (
    <div className="confirmation-container container mt-5 mb-5">
      <div className="card p-4">
        <h2 className="text-center mb-4">Confirm Your Booking</h2>
        <div className="booking-details mb-4">
          <h3 className="text-black">{service.service.admin_service_name}</h3>      
          <div className="price-breakdown mb-2">
            <p className="total-price">
              <strong>Total Price:</strong>
              <span className="total-price-amount">${totalPrice}</span>
            </p>
            <ul className="text-black">
              <li>Platform fee ({platformFeePercentage}%): ${platformFee}</li>
              <li>Commission ({commissionPercentage}%): ${commission}</li>
              <li>Locksmith fee: ${locksmithFee}</li>
            </ul>
          </div>
          <p className="text-black">
            <strong>Details:</strong> {service.service.details}
          </p>
          <p className="text-black">
            <strong>Service will be scheduled for:</strong> Now (immediate processing)
          </p>
        </div>

        <p className="text-center mb-4 text-black">
          Are you sure you want to proceed with the payment?
        </p>
        
        <div className="text-center">
          <button
            className="confirm-button btn btn-dark btn-lg"
            onClick={handleConfirmPayment}
            disabled={isProcessing}
          >
            {isProcessing ? "Processing..." : "Confirm and Proceed to Payment"}
          </button>
        </div>
      </div>
    </div>
  );
};

const PaymentSuccess = ({ service }) => {
  return (
    <div className="payment-success-container container mt-5 mb-5">
      <div className="card p-4 text-center">
        <div className="success-icon mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="green" viewBox="0 0 16 16">
            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
          </svg>
        </div>
        <h2 className="text-success mb-3">Payment Successful!</h2>
        <h4 className="mb-4">Thank you for your booking</h4>
        
        <div className="booking-summary text-start mb-4">
          <h5>Booking Summary:</h5>
          <p><strong>Service:</strong> {service.service.admin_service_name}</p>
          <p><strong>Amount Paid:</strong> ${service.service.total_price}</p>
          <p><strong>Details:</strong> {service.service.details}</p>
        </div>
        
        <p className="mb-4">A confirmation has been sent to your email.</p>
        
        <button 
          className="btn btn-primary"
          onClick={() => window.location.href = "/"}
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default ConfirmPayment;