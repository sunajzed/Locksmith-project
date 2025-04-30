import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../../../api/api";
import "./ConfirmPayment.css";

const ConfirmPayment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { service } = location.state;
  const [isProcessing, setIsProcessing] = useState(false);

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

  return (
    <div className="confirmation-container container mt-5 mb-5">
      <div className="card p-4">
        <h2 className="text-center mb-4">Confirm Your Booking</h2>
        <div className="booking-details mb-4">
          <h3 className="text-black">{service.service.admin_service_name}</h3>
          <p className="mb-2 text-black">
          <strong>Price:</strong> ${service.service.total_price}
          </p>
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

export default ConfirmPayment;