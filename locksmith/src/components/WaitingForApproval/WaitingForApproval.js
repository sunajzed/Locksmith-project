
// import React, { useEffect, useState } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import api from '../../api/api';

// import axios from "axios";

// const WaitingForApproval = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const token = location.state?.token || localStorage.getItem("accessToken");
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     if (!token) {
//       console.log("No token found, redirecting to login...");
//       navigate("/login");
//       return;
//     }

//     const checkApprovalStatus = async () => {
//       try {
//         console.log("Fetching approval status...");
//         const response = await api.get("/api/Approvalverification/", {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         console.log("API Response:", response.data);

//         const locksmithData = Array.isArray(response.data) ? response.data[0] : null;

//         if (locksmithData && locksmithData.is_approved) {
//           console.log("User is approved, checking onboarding status...");
          
//           try {
//             const onboardingResponse = await api.get("/api/locksmiths/check_onboarding_status/", {
//               headers: {
//                 Authorization: `Bearer ${token}`,
//               },
//             });
            
//             console.log("Onboarding API Response:", onboardingResponse.data);

//             if (onboardingResponse.data && Object.keys(onboardingResponse.data).length > 0) {
//               navigate("/lock-dashboard");
//             } else {
//               navigate("/create-stripe");
//             }
//           } catch (onboardingError) {
//             console.error("Error checking onboarding status:", onboardingError);
//             navigate("/create-stripe");
//           }
//         } else {
//           console.log("User is not approved yet");
//           setLoading(false);
//         }
//       } catch (err) {
//         console.error("Error fetching approval status:", err);
//         setError("Error fetching approval status. Please try again.");
//         setLoading(false);
//       }
//     };

//     checkApprovalStatus();
//   }, [token, navigate]);

//   if (loading) {
//     return <div className="text-center mt-5 text-black">Checking approval status...</div>;
//   }

//   return (
//     <div className="d-flex justify-content-center align-items-center vh-100">
//       <div className="card text-center p-4 shadow-lg">
//         <h2 className="mb-3">Waiting for Approval</h2>
//         {error ? <p className="text-danger">{error}</p> : <p className="text-black">Your profile update has been submitted successfully. Please wait for admin approval.</p>}
//       </div>
//     </div>
//   );
// };

// export default WaitingForApproval;
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import api from "../../api/api";

const WaitingForApproval = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const token = location.state?.token || localStorage.getItem("accessToken");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!token) {
      console.log("No token found, redirecting to login...");
      navigate("/login?role=locksmith");
      return;
    }

    const checkApprovalStatus = async () => {
      try {
        console.log("Fetching approval status...");
        const { data } = await api.get("/api/Approvalverification/", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const locksmithData = Array.isArray(data) ? data[0] : null;

        if (locksmithData?.is_approved) {
          console.log("User is approved, checking onboarding status...");

          try {
            const onboardingResponse = await api.get("/api/locksmiths/check_onboarding_status/", {
              headers: { Authorization: `Bearer ${token}` },
            });

            console.log("Onboarding API Response:", onboardingResponse.data);

            if (onboardingResponse.data && Object.keys(onboardingResponse.data).length > 0) {
              navigate("/lock-dashboard");
            } else {
              navigate("/create-stripe");
            }
          } catch (onboardingError) {
            console.error("Error checking onboarding status:", onboardingError);
            navigate("/create-stripe");
          }
        } else {
          console.log("User is not approved yet");
          setLoading(false);
        }
      } catch (err) {
        console.error("Error fetching approval status:", err);
        setError("Error fetching approval status. Please try again.");
        setLoading(false);
      }
    };

    checkApprovalStatus();
  }, [token, navigate]);

  if (loading) {
    return <div className="text-center mt-5 text-black">Checking approval status...</div>;
  }

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="card text-center p-4 shadow-lg">
        <h2 className="mb-3">Waiting for Approval</h2>
        {error ? (
          <p className="text-danger">{error}</p>
        ) : (
          <p className="text-black">
            Your profile update has been submitted successfully. Please wait for admin approval.
          </p>
        )}
      </div>
    </div>
  );
};

export default WaitingForApproval;
