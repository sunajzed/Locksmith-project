// import React from 'react';
// import './SuccessPayment.css'; // Import custom CSS

// const SuccessPayment = () => {
//   return (
//     <div className="success-payment-container">
//       <div className="success-payment-card text-center p-4">
//         <div className="icon-container mb-4">
//           <i className="fas fa-check-circle success-icon"></i>
//         </div>
//         <h1 className="success-title mb-3">Payment Successful!</h1>
//         <p className="success-message mb-4 text-white">
//           Thank you for your purchase. Your payment has been successfully processed. 
//           A confirmation email has been sent to your registered email address.
//         </p>
//         <button className="btn btn-primary btn-lg">Continue Shopping</button>
//       </div>
//     </div>
//   );
// };

// export default SuccessPayment;

// import React, { useState, useEffect } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import api from "../../api/api"; // Correct path to your api.js file

// const SuccessPayment = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const [paymentStatus, setPaymentStatus] = useState(null);  // To store payment status
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const params = new URLSearchParams(location.search);
//     const sessionId = params.get('session_id'); // Get the session_id from URL

//     // Check if sessionId is present
//     if (!sessionId) {
//       setPaymentStatus('Payment failed. No session ID found.');
//       setLoading(false);
//       return;
//     }

//     // Retrieve the booking ID (you may need to pass this from the previous page)
//     const bookingId = localStorage.getItem('bookingId'); // Example of getting the booking ID

//     if (!bookingId) {
//       setPaymentStatus('Payment failed. No booking ID found.');
//       setLoading(false);
//       return;
//     }

//     // Make the API call to complete the payment
//     const completePayment = async () => {
//       try {
//         const response = await api.post(
//           `/api/bookings/${bookingId}/complete_payment/`,
//           { session_id: sessionId },
//           {
//             headers: {
//               Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
//             },
//           }
//         );

//         if (response.data.status === "Payment confirmed and booking scheduled.") {
//           setPaymentStatus('Payment successful! Your booking is confirmed.');
//         } else {
//           setPaymentStatus('Payment failed. Please try again.');
//         }
//       } catch (error) {
//         console.error('Error completing payment:', error);
//         setPaymentStatus('Payment failed. Please try again.');
//       } finally {
//         setLoading(false);
//       }
//     };

//     completePayment();
//   }, [location.search]);

//   return (
//     <div className="success-payment-container">
//       {loading ? (
//         <p>Processing payment...</p>
//       ) : (
//         <div>
//           <h2>{paymentStatus}</h2>
//           {paymentStatus === 'Payment successful! Your booking is confirmed.' && (
//             <button onClick={() => navigate('/mybookings')}>Go to My Bookings</button>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default SuccessPayment;

import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../../api/api";
import "./SuccessPayment.css";

const SuccessPayment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const completePayment = async () => {
      const accessToken = localStorage.getItem("accessToken");
      const queryParams = new URLSearchParams(location.search);
      const sessionId = queryParams.get("session_id");
      const bookingId = queryParams.get("booking_id");

      if (!accessToken) {
        navigate("/login");
        return;
      }

      if (!sessionId || !bookingId) {
        setError("Missing payment session information");
        setIsLoading(false);
        return;
      }

      try {
        const response = await api.post(
          `/api/bookings/${bookingId}/complete_payment/`,
          { session_id: sessionId },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
          }
        );

        setPaymentStatus(response.data);
      } catch (err) {
        console.error("Payment completion error:", err);
        setError(
          err.response?.data?.error ||
            "Payment verification failed. Please check your bookings."
        );
      } finally {
        setIsLoading(false);
      }
    };

    completePayment();
  }, [location.search, navigate]);

  if (isLoading) {
    return (
      <div className="success-payment-container container mt-5">
        <div className="card p-4 text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3">Verifying your payment...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="success-payment-container container mt-5">
        <div className="card p-4">
          <div className="alert alert-danger">
            <h4 className="alert-heading">Payment Error</h4>
            <p>{error}</p>
            <div className="d-flex justify-content-center mt-3">
              <button
                className="btn btn-primary me-2"
                onClick={() => navigate("/")}
              >
                Return to Home
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => navigate("/my-bookings")}
              >
                Check My Bookings
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="success-payment-container container mt-5">
      <div className="card p-4">
        <div className="card-body text-center">
          <h2 className="card-title text-success mb-4">
            <i className="bi bi-check-circle-fill me-2"></i>
            Payment Successful!
          </h2>
          
          <div className="success-icon mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="80"
              height="80"
              fill="green"
              className="bi bi-check-circle-fill"
              viewBox="0 0 16 16"
            >
              <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
            </svg>
          </div>

          <p className="card-text fs-5 mb-4">
            Thank you for your payment. Your locksmith service has been scheduled.
          </p>

          {paymentStatus && (
            <div className="payment-details mb-4">
              <div className="alert alert-success">
                <p className="mb-1">
                  <strong>Status:</strong> {paymentStatus.status}
                </p>
                <p className="mb-0">
                  <strong>Note:</strong> {paymentStatus.message}
                </p>
              </div>
            </div>
          )}

          <div className="d-flex justify-content-center mt-4">
            <button
              className="btn btn-primary me-3"
              onClick={() => navigate("/my-bookings")}
            >
              View My Bookings
            </button>
            <button
              className="btn btn-outline-secondary"
              onClick={() => navigate("/")}
            >
              Return to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessPayment;