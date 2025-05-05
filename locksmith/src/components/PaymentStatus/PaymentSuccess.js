import React from "react";
import { useLocation } from "react-router-dom";

const PaymentSuccess = () => {
  const location = useLocation();
  const { service } = location.state || {};

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
        
        {service && (
          <div className="booking-summary text-start mb-4">
            <h5>Booking Summary:</h5>
            <p><strong>Service:</strong> {service.service.admin_service_name}</p>
            <p><strong>Amount Paid:</strong> ${service.service.total_price}</p>
            <p><strong>Details:</strong> {service.service.details}</p>
          </div>
        )}
        
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

export default PaymentSuccess;