// import React from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { FaCheckCircle, FaTimesCircle, FaHome, FaEnvelope, FaCalendarAlt } from "react-icons/fa";
// import { MdPayment, MdInfoOutline } from "react-icons/md";
// import "./PaymentStatus.css";
// const PaymentStatus = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { service, status = "success" } = location.state || {};
//   const isSuccess = status === "success";

//   return (
//     <div className="payment-status-container">
//       <div className="card animated-card">
//         <div className={`status-icon ${isSuccess ? "success" : "error"}`}>
//           {isSuccess ? (
//             <FaCheckCircle className="bounce-in" />
//           ) : (
//             <FaTimesCircle className="shake" />
//           )}
//         </div>
        
//         <h2 className={isSuccess ? "text-success" : "text-danger"}>
//           {isSuccess ? "Payment Successful!" : "Payment Failed"}
//         </h2>
        
//         <p className="subtitle">
//           {isSuccess 
//             ? "Thank you for your booking!" 
//             : "We couldn't process your payment"}
//         </p>
        
//         {service && isSuccess && (
//           <div className="booking-summary">
//             <h5>
//               <MdInfoOutline className="me-2" />
//               Booking Summary
//             </h5>
//             <div className="summary-item">
//               <span className="label">Service:</span>
//               <span className="value">{service.service.admin_service_name}</span>
//             </div>
//             <div className="summary-item">
//               <span className="label">Amount Paid:</span>
//               <span className="value">${service.service.total_price}</span>
//             </div>
//             <div className="summary-item">
//               <span className="label">Details:</span>
//               <span className="value">{service.service.details}</span>
//             </div>
//           </div>
//         )}
        
//         {!isSuccess && (
//           <div className="error-message">
//             <p>Please try again or use a different payment method.</p>
//             <button 
//               className="btn btn-outline-primary"
//               onClick={() => navigate(-1)}
//             >
//               <MdPayment className="me-2" />
//               Retry Payment
//             </button>
//           </div>
//         )}
        
//         <div className="confirmation-message">
//           <FaEnvelope className="me-2" />
//           {isSuccess 
//             ? "A confirmation has been sent to your email." 
//             : "If the amount was deducted, it will be refunded within 3-5 business days."}
//         </div>
        
//         <div className="action-buttons">
//           <button 
//             className="btn btn-primary"
//             onClick={() => navigate("/")}
//           >
//             <FaHome className="me-2" />
//             Back to Home
//           </button>
          
//           {isSuccess && (
//             <button 
//               className="btn btn-outline-secondary"
//               onClick={() => navigate("/mybookings")}
//             >
//               <FaCalendarAlt className="me-2" />
//               View Bookings
//             </button>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PaymentStatus;


import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaCheckCircle, FaTimesCircle, FaHome, FaEnvelope, FaCalendarAlt } from "react-icons/fa";
import { MdPayment, MdInfoOutline } from "react-icons/md";
import "./PaymentStatus.css";

const PaymentStatus = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { service, status = "success", totalPrice, customer_contact_number, customer_address, house_number } = location.state || {};
  const isSuccess = status === "success";

  if (!service) {
    return (
      <div className="payment-status-container">
        <div className="card animated-card">
          <div className="status-icon error">
            <FaTimesCircle className="shake" />
          </div>
          <h2 className="text-danger">Error</h2>
          <p className="subtitle">Missing booking details.</p>
          <div className="action-buttons">
            <button className="btn btn-primary" onClick={() => navigate("/")}>
              <FaHome className="me-2" />
              Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="payment-status-container">
      <div className={`card animated-card ${isSuccess ? "success" : "error"}`}>
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
        
        {isSuccess && (
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
              <span className="value">${totalPrice.toFixed(2)}</span>
            </div>
            <div className="summary-item">
              <span className="label">Details:</span>
              <span className="value">{service.service.details}</span>
            </div>
            <div className="summary-item">
              <span className="label">Total Keys:</span>
              <span className="value">{service.totalKeys}</span>
            </div>
            <div className="summary-item">
              <span className="label">Contact:</span>
              <span className="value">{customer_contact_number}</span>
            </div>
            <div className="summary-item">
              <span className="label">Address:</span>
              <span className="value">{customer_address}</span>
            </div>
            {house_number && (
              <div className="summary-item">
                <span className="label">House Number:</span>
                <span className="value">{house_number}</span>
              </div>
            )}
            <div className="summary-item">
              <span className="label">Service Time:</span>
              <span className="value">
                {service.isEmergency
                  ? "Immediately"
                  : new Date(service.scheduled_date).toLocaleString()}
              </span>
            </div>
          </div>
        )}
        
        {!isSuccess && (
          <div className="error-message">
            <p>Please try again or use a different payment method.</p>
            <button 
              className="btn btn-outline-primary"
              onClick={() => navigate("/confirm-payment", { state: location.state })}
            >
              <MdPayment className="me-2" />
              Retry Payment
            </button>
          </div>
        )}
        
        <div className="confirmation-message">
          <FaEnvelope className="me-2" />
          {isSuccess 
            ? "A confirmation has been sent to your email and SMS."
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