// import React, { useState, useEffect } from "react";
// import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
// import api from "../../../api/api";
// import "./ConfirmPayment.css";

// const ConfirmPayment = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const [searchParams] = useSearchParams();
//   const { service, basePrice, additionalKeys = 0, additionalKeyPrice } = location.state || {};
//   const [isProcessing, setIsProcessing] = useState(false);
//   const [paymentStatus, setPaymentStatus] = useState(null);
//   const [isHovering, setIsHovering] = useState(false);

//   // Validate passed data
//   if (!service || !basePrice || additionalKeyPrice === undefined) {
//     console.error("Missing required data in location.state:", {
//       service,
//       basePrice,
//       additionalKeys,
//       additionalKeyPrice,
//     });
//   }

//   // Calculate the total price (fixed amount)
//   const totalPrice =
//     additionalKeys > 0
//       ? parseFloat(basePrice) + additionalKeys * parseFloat(additionalKeyPrice || 0)
//       : parseFloat(service.totalPrice || service.service?.total_price);

//   // Calculate the breakdown within the total price
//   const gstPercentage = 10;
//   const commissionPercentage = 10;
//   const platformFeeFixed = 40;

//   const gst = (totalPrice * gstPercentage) / 100;
//   const commission = (totalPrice * commissionPercentage) / 100;
//   const platformFee = platformFeeFixed;
//   const locksmithFee = totalPrice - (gst + commission + platformFee);

//   useEffect(() => {
//     const sessionId = searchParams.get("session_id");
//     const success = searchParams.get("success");

//     if (sessionId && success === "true") {
//       setPaymentStatus("success");
//     }
//   }, [searchParams]);

//   const handleConfirmPayment = async () => {
//     const accessToken = localStorage.getItem("accessToken");

//     if (!accessToken) {
//       alert("You need to login first.");
//       navigate("/login");
//       return;
//     }

//     setIsProcessing(true);

//     try {
//       const bookingData = {
//         service_id: service.service?.id,
//         locksmith_service: service.service?.id,
//         scheduled_date: new Date().toISOString(),
//         details: service.service?.details,
//         total_price: totalPrice,
//         additional_keys: additionalKeys,
//         additional_key_price: additionalKeyPrice,
//       };

//       const bookingResponse = await api.post("/api/bookings/", bookingData, {
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//           "Content-Type": "application/json",
//         },
//       });

//       const bookingId = bookingResponse.data.id;

//       // Debug the amount being sent to Stripe
//       console.log("Total Price:", totalPrice);
//       console.log("GST (10%):", gst);
//       console.log("Service Fee (10%):", commission);
//       console.log("Platform Fee:", platformFee);
//       console.log("Locksmith Fee:", locksmithFee);
//       console.log("Amount sent to Stripe (in cents):", Math.round(totalPrice * 100));

//       const paymentResponse = await api.post(
//         `/api/bookings/${bookingId}/process_payment/`,
//         { amount: Math.round(totalPrice * 100) },
//         { headers: { Authorization: `Bearer ${accessToken}` } }
//       );

//       window.location.href = paymentResponse.data.checkout_url;
//     } catch (error) {
//       console.error("Payment error:", error.response?.data || error.message);
//       alert(
//         error.response?.data?.detail ||
//           error.response?.data?.message ||
//           "Payment processing failed. Please try again."
//       );
//     } finally {
//       setIsProcessing(false);
//     }
//   };

//   if (paymentStatus === "success") {
//     return <PaymentSuccess service={service} totalPrice={totalPrice} navigate={navigate} />;
//   }

//   return (
//     <div className="luxury-payment-container">
//       <div className="luxury-card">
//         <div className="luxury-card-header">
//           <div className="header-decoration"></div>
//           <h2 className="luxury-title">
//             <span className="title-accent">Confirm Your Booking </span>
//           </h2>
//           <p className="luxury-subtitle">Final step to secure your service</p>
//         </div>

//         <div className="luxury-service-card">
//           <div className="service-icon">
//             <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//               <path
//                 d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z"
//                 fill="#8B5CF6"
//               />
//               <path
//                 d="M12 6C10.9 6 10 6.9 10 8C10 9.1 10.9 10 12 10C13.1 10 14 9.1 14 8C14 6.9 13.1 6 12 6ZM12 16C10.9 16 10 16.9 10 18C10 19.1 10.9 20 12 20C13.1 20 14 19.1 14 18C14 16.9 13.1 16 12 16Z"
//                 fill="#8B5CF6"
//               />
//             </svg>
//           </div>
//           <div className="service-details">
//             <h3>{service.service.admin_service_name}</h3>
//             <p className="service-description">{service.service.details}</p>
//             <div className="service-meta"></div>
//           </div>
//           <div className="service-price">
//             <span className="price-amount">${totalPrice.toFixed(2)}</span>
//           </div>
//         </div>

//         <div className="luxury-price-breakdown">
//           <h4 className="breakdown-title">Payment Details</h4>
//           <div className="breakdown-grid">
//             {additionalKeys > 0 && (
//               <>
//                 <div className="breakdown-row">
//                   <span>Base Service</span>
//                   <span>${parseFloat(basePrice).toFixed(2)}</span>
//                 </div>
//                 <div className="breakdown-row">
//                   <span>
//                     Additional Keys ({additionalKeys} × ${additionalKeyPrice}): $
//                     {(additionalKeys * additionalKeyPrice).toFixed(2)}
//                   </span>
//                   <span>+${(additionalKeys * additionalKeyPrice).toFixed(2)}</span>
//                 </div>
//               </>
//             )}

//             <div className="breakdown-row">
//               <span>GST ({gstPercentage}%)</span>
//               <span>${gst.toFixed(2)}</span>
//             </div>

//             <div className="breakdown-row">
//               <span>Service Fee ({commissionPercentage}%)</span>
//               <span>${commission.toFixed(2)}</span>
//             </div>

//             <div className="breakdown-row">
//               <span>Platform Fee</span>
//               <span>${platformFee.toFixed(2)}</span>
//             </div>

//             <div className="breakdown-row">
//               <span>Locksmith Fee</span>
//               <span>${locksmithFee.toFixed(2)}</span>
//             </div>

//             <div className="divider"></div>

//             <div className="breakdown-row total-row">
//               <span>Total Amount</span>
//               <span className="total-amount">${totalPrice.toFixed(2)}</span>
//             </div>
//           </div>
//         </div>

//         <div
//           style={{
//             display: "flex",
//             justifyContent: "center",
//             alignItems: "center",
//             gap: "8px",
//             color: "#374151",
//             fontSize: "14px",
//           }}
//         >
//           <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//             <path
//               d="M12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z"
//               fill="#4B5563"
//             />
//             <path d="M12 6V12L16 14" fill="#4B5563" />
//           </svg>
//           <span>
//             Your service is scheduled for: <strong>Now</strong> (immediate processing)
//           </span>
//         </div>

//         <div className="luxury-payment-actions">
//           <button
//             className={`luxury-confirm-button ${isProcessing ? "processing" : ""}`}
//             onClick={handleConfirmPayment}
//             disabled={isProcessing}
//             onMouseEnter={() => setIsHovering(true)}
//             onMouseLeave={() => setIsHovering(false)}
//           >
//             {isProcessing ? (
//               <>
//                 <span className="button-spinner"></span>
//                 Processing Payment
//               </>
//             ) : (
//               <>
//                 <span>Confirm & Pay</span>
//                 <svg
//                   className={`arrow-icon ${isHovering ? "hover" : ""}`}
//                   width="20"
//                   height="20"
//                   viewBox="0 0 24 24"
//                   fill="none"
//                   xmlns="http://www.w3.org/2000/svg"
//                 >
//                   <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
//                   <path
//                     d="M12 5L19 12L12 19"
//                     stroke="currentColor"
//                     strokeWidth="2"
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                   />
//                 </svg>
//               </>
//             )}
//           </button>
//           <div className="security-assurance">
//             <div className="security-badge">
//               <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//                 <path
//                   d="M12 22C12 22 20 18 20 12V5L12 2L4 5V12C4 18 12 22 12 22Z"
//                   stroke="#10B981"
//                   strokeWidth="2"
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                 />
//                 <path
//                   d="M9 12L11 14L15 10"
//                   stroke="#10B981"
//                   strokeWidth="2"
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                 />
//               </svg>
//               <span>Secure Payment</span>
//             </div>
//             <div className="security-badge">
//               <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//                 <path
//                   d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
//                   stroke="#3B82F6"
//                   strokeWidth="2"
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                 />
//                 <path
//                   d="M12 8V12L15 15"
//                   stroke="#3B82F6"
//                   strokeWidth="2"
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                 />
//               </svg>
//               <span>Instant Confirmation</span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// const PaymentSuccess = ({ service, totalPrice, navigate }) => {
//   const [animate, setAnimate] = useState(false);

//   useEffect(() => {
//     setAnimate(true);
//   }, []);

//   return (
//     <div className="luxury-success-container">
//       <div className={`luxury-success-card ${animate ? "animate" : ""}`}>
//         <div className="success-decoration"></div>

//         <div className="success-icon-circle">
//           <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//             <path
//               d="M22 11.08V12C21.9988 14.1564 21.3005 16.2547 20.0093 17.9818C18.7182 19.709 16.9033 20.9725 14.8354 21.5839C12.7674 22.1953 10.5573 22.1219 8.53447 21.3746C6.51168 20.6273 4.78465 19.2461 3.61096 17.4371C2.43727 15.628 1.87979 13.4881 2.02168 11.3363C2.16356 9.18455 2.99721 7.13631 4.39828 5.49706C5.79935 3.85781 7.69279 2.71537 9.79619 2.24013C11.8996 1.7649 14.1003 1.98232 16.07 2.85999"
//               stroke="#8B5CF6"
//               strokeWidth="2"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//             />
//             <path
//               d="M22 4L12 14.01L9 11.01"
//               stroke="#8B5CF6"
//               strokeWidth="2"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//             />
//           </svg>
//         </div>

//         <div className="success-content">
//           <h2 className="success-title">Payment Confirmed</h2>
//           <p className="success-subtitle">Your service has been successfully booked</p>

//           <div className="success-summary">
//             <div className="summary-header">
//               <h3>Booking Summary</h3>
//               <div className="status-pill">Confirmed</div>
//             </div>

//             <div className="summary-details">
//               <div className="detail-row">
//                 <span>Service</span>
//                 <span>{service.service.admin_service_name}</span>
//               </div>
//               <div className="detail-row">
//                 <span>Amount Paid</span>
//                 <span className="detail-highlight">${totalPrice.toFixed(2)}</span>
//               </div>
//               <div className="detail-row">
//                 <span>Service Details</span>
//                 <span>{service.service.details}</span>
//               </div>
//             </div>
//           </div>

//           <div className="success-actions">
//             <button className="luxury-home-button" onClick={() => navigate("/")}>
//               Return Home
//             </button>
//             <button className="luxury-dashboard-button" onClick={() => navigate("/dashboard")}>
//               View Bookings
//             </button>
//           </div>

//           <div className="success-note">
//             <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//               <path
//                 d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
//                 stroke="#6B7280"
//                 strokeWidth="2"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//               />
//               <path
//                 d="M12 8V12"
//                 stroke="#6B7280"
//                 strokeWidth="2"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//               />
//               <path
//                 d="M12 16H12.01"
//                 stroke="#6B7280"
//                 strokeWidth="2"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//               />
//             </svg>
//             <p>A detailed confirmation has been sent to your email. Our locksmith will contact you shortly.</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ConfirmPayment;


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
  const [isHovering, setIsHovering] = useState(false);
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
      <div className="luxury-payment-container">
        <div className="luxury-card">
          <h2>Error</h2>
          <p>{error}</p>
          <button className="luxury-home-button" onClick={() => navigate("/")}>
            Return Home
          </button>
        </div>
      </div>
    );
  }

  const totalPrice =
    additionalKeys > 0
      ? parseFloat(basePrice) + additionalKeys * parseFloat(additionalKeyPrice)
      : parseFloat(service.totalPrice || service.service?.total_price);

  const gstPercentage = 10;
  const commissionPercentage = 10;
  const platformFeeFixed = 40;

  const gst = (totalPrice * gstPercentage) / 100;
  const commission = (totalPrice * commissionPercentage) / 100;
  const platformFee = platformFeeFixed;
  const locksmithFee = totalPrice - (gst + commission + platformFee);

  const handleConfirmPayment = async () => {
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      alert("You need to log in first.");
      navigate("/login");
      return;
    }

    setIsProcessing(true);

    try {
      console.log("Processing payment for booking ID:", bookingId);
      console.log("Amount sent to Stripe (in cents):", Math.round(totalPrice * 100));

      const paymentResponse = await api.post(
        `/api/bookings/${bookingId}/process_payment/`,
        { amount: Math.round(totalPrice * 100) },
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
    <div className="luxury-payment-container">
      <div className="luxury-card">
        <div className="luxury-card-header">
          <div className="header-decoration"></div>
          <h2 className="luxury-title">
            <span className="title-accent">Confirm Your Booking</span>
          </h2>
          <p className="luxury-subtitle">Final step to secure your service</p>
        </div>

        <div className="luxury-service-card">
          <div className="service-icon">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z"
                fill="#8B5CF6"
              />
              <path
                d="M12 6C10.9 6 10 6.9 10 8C10 9.1 10.9 10 12 10C13.1 10 14 9.1 14 8C14 6.9 13.1 6 12 6ZM12 16C10.9 16 10 16.9 10 18C10 19.1 10.9 20 12 20C13.1 20 14 19.1 14 18C14 16.9 13.1 16 12 16Z"
                fill="#8B5CF6"
              />
            </svg>
          </div>
          <div className="service-details">
            <h3>{service.service.admin_service_name}</h3>
            <p className="service-description">{service.service.details}</p>
            <div className="service-meta"></div>
          </div>
          <div className="service-price">
            <span className="price-amount">${totalPrice.toFixed(2)}</span>
          </div>
        </div>

        <div className="luxury-price-breakdown">
          <h4 className="breakdown-title">Payment Details</h4>
          <div className="breakdown-grid">
            {additionalKeys > 0 && (
              <>
                <div className="breakdown-row">
                  <span>Base Service</span>
                  <span>${parseFloat(basePrice).toFixed(2)}</span>
                </div>
                <div className="breakdown-row">
                  <span>
                    Additional Keys ({additionalKeys} × ${additionalKeyPrice}): $
                    {(additionalKeys * additionalKeyPrice).toFixed(2)}
                  </span>
                  <span>+${(additionalKeys * additionalKeyPrice).toFixed(2)}</span>
                </div>
              </>
            )}

            <div className="breakdown-row">
              <span>GST ({gstPercentage}%)</span>
              <span>${gst.toFixed(2)}</span>
            </div>

            <div className="breakdown-row">
              <span>Service Fee ({commissionPercentage}%)</span>
              <span>${commission.toFixed(2)}</span>
            </div>

            <div className="breakdown-row">
              <span>Platform Fee</span>
              <span>${platformFee.toFixed(2)}</span>
            </div>

            <div className="breakdown-row">
              <span>Locksmith Fee</span>
              <span>${locksmithFee.toFixed(2)}</span>
            </div>

            <div className="divider"></div>

            <div className="breakdown-row total-row">
              <span>Total Amount</span>
              <span className="total-amount">${totalPrice.toFixed(2)}</span>
            </div>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "8px",
            color: "#374151",
            fontSize: "14px",
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z"
              fill="#4B5563"
            />
            <path d="M12 6V12L16 14" fill="#4B5563" />
          </svg>
          <span>
            Your service is scheduled for: <strong>{service.isEmergency ? "Now" : new Date(service.scheduled_date).toLocaleString()}</strong>
          </span>
        </div>

        <div className="luxury-payment-actions">
          <button
            className={`luxury-confirm-button ${isProcessing ? "processing" : ""}`}
            onClick={handleConfirmPayment}
            disabled={isProcessing}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            {isProcessing ? (
              <>
                <span className="button-spinner"></span>
                Processing Payment
              </>
            ) : (
              <>
                <span>Confirm & Pay</span>
                <svg
                  className={`arrow-icon ${isHovering ? "hover" : ""}`}
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path
                    d="M12 5L19 12L12 19"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </>
            )}
          </button>
          <div className="security-assurance">
            <div className="security-badge">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M12 22C12 22 20 18 20 12V5L12 2L4 5V12C4 18 12 22 12 22Z"
                  stroke="#10B981"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M9 12L11 14L15 10"
                  stroke="#10B981"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span>Secure Payment</span>
            </div>
            <div className="security-badge">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                  stroke="#3B82F6"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12 8V12L15 15"
                  stroke="#3B82F6"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span>Instant Confirmation</span>
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
    <div className="luxury-success-container">
      <div className={`luxury-success-card ${animate ? "animate" : ""}`}>
        <div className="success-decoration"></div>

        <div className="success-icon-circle">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M22 11.08V12C21.9988 14.1564 21.3005 16.2547 20.0093 17.9818C18.7182 19.709 16.9033 20.9725 14.8354 21.5839C12.7674 22.1953 10.5573 22.1219 8.53447 21.3746C6.51168 20.6273 4.78465 19.2461 3.61096 17.4371C2.43727 15.628 1.87979 13.4881 2.02168 11.3363C2.16356 9.18455 2.99721 7.13631 4.39828 5.49706C5.79935 3.85781 7.69279 2.71537 9.79619 2.24013C11.8996 1.7649 14.1003 1.98232 16.07 2.85999"
              stroke="#8B5CF6"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M22 4L12 14.01L9 11.01"
              stroke="#8B5CF6"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <div className="success-content">
          <h2 className="success-title">Payment Confirmed</h2>
          <p className="success-subtitle">Your service has been successfully booked</p>

          <div className="success-summary">
            <div className="summary-header">
              <h3>Booking Summary</h3>
              <div className="status-pill">Confirmed</div>
            </div>

            <div className="summary-details">
              <div className="detail-row">
                <span>Service</span>
                <span>{service.service.admin_service_name}</span>
              </div>
              <div className="detail-row">
                <span>Amount Paid</span>
                <span className="detail-highlight">${totalPrice.toFixed(2)}</span>
              </div>
              <div className="detail-row">
                <span>Service Details</span>
                <span>{service.service.details}</span>
              </div>
            </div>
          </div>

          <div className="success-actions">
            <button className="luxury-home-button" onClick={() => navigate("/")}>
              Return Home
            </button>
            <button className="luxury-dashboard-button" onClick={() => navigate("/dashboard")}>
              View Bookings
            </button>
          </div>

          <div className="success-note">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
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
            <p>A detailed confirmation has been sent to your email. Our locksmith will contact you shortly.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmPayment;
