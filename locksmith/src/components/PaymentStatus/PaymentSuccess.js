// import React from "react";
// import { useLocation } from "react-router-dom";

// const PaymentSuccess = () => {
//   const location = useLocation();
//   const { service } = location.state || {};

//   return (
//     <div className="payment-success-container container mt-5 mb-5">
//       <div className="card p-4 text-center">
//         <div className="success-icon mb-4">
//           <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="green" viewBox="0 0 16 16">
//             <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
//           </svg>
//         </div>
//         <h2 className="text-success mb-3">Payment Successful!</h2>
//         <h4 className="mb-4">Thank you for your booking</h4>
        
//         {service && (
//           <div className="booking-summary text-start mb-4">
//             <h5>Booking Summary:</h5>
//             <p><strong>Service:</strong> {service.service.admin_service_name}</p>
//             <p><strong>Amount Paid:</strong> ${service.service.total_price}</p>
//             <p><strong>Details:</strong> {service.service.details}</p>
//           </div>
//         )}
        
//         <p className="mb-4">A confirmation has been sent to your email.</p>
        
//         <button 
//           className="btn btn-primary"
//           onClick={() => window.location.href = "/"}
//         >
//           Back to Home
//         </button>
//       </div>
//     </div>
//   );
// };

// export default PaymentSuccess;

import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaCheckCircle, FaTimesCircle, FaHome, FaEnvelope, FaCalendarAlt } from "react-icons/fa";
import { MdPayment, MdInfoOutline } from "react-icons/md";
import "./PaymentStatus.css";
const PaymentStatus = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { service, status = "success" } = location.state || {};
  
  const isSuccess = status === "success";

  return (
    <div className="payment-status-container">
      <div className="card animated-card">
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
          <button 
            className="btn btn-primary"
            onClick={() => navigate("/")}
          >
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
      </div>
    </div>
  );
};

export default PaymentStatus;