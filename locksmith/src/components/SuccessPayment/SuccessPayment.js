import React from 'react';
import './SuccessPayment.css'; // Import custom CSS

const SuccessPayment = () => {
  return (
    <div className="success-payment-container">
      <div className="success-payment-card text-center p-4">
        <div className="icon-container mb-4">
          <i className="fas fa-check-circle success-icon"></i>
        </div>
        <h1 className="success-title mb-3">Payment Successful!</h1>
        <p className="success-message mb-4 text-white">
          Thank you for your purchase. Your payment has been successfully processed. 
          A confirmation email has been sent to your registered email address.
        </p>
        <button className="btn btn-primary btn-lg">Continue Shopping</button>
      </div>
    </div>
  );
};

export default SuccessPayment;
