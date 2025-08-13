import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import "./Signup.css";
import api from "../../api/api";
import { FaEye, FaEyeSlash, FaFacebook } from "react-icons/fa";
import { auth, googleProvider, facebookProvider } from "../../firebase";
import { signInWithPopup } from "firebase/auth";

export default function Login() {
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
    otp_code: "",
  });
  const [forgotPasswordData, setForgotPasswordData] = useState({
    email: "",
    otp: "",
    new_password: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [step, setStep] = useState(1); // 1: login, 2: login OTP, 3: forgot password email, 4: forgot password OTP + new password
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const selectedRole = ["customer", "locksmith"].includes(queryParams.get("role"))
    ? queryParams.get("role")
    : "customer";
  const from = queryParams.get("from");

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("accessToken");
    if (isLoggedIn) {
      navigate("/");
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleForgotPasswordChange = (e) => {
    const { name, value } = e.target;
    setForgotPasswordData({ ...forgotPasswordData, [name]: value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleTermsChange = () => {
    setAgreeToTerms(!agreeToTerms);
  };

  const handleStep1Submit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!agreeToTerms) {
      setError("You must agree to the Terms of Use and Privacy Policy to proceed.");
      return;
    }

    try {
      const response = await api.post("/login/step1/", {
        username: loginData.username,
        password: loginData.password,
        role: selectedRole,
      });
      setSuccess("Credentials validated! Please enter the OTP.");
      setStep(2);
    } catch (err) {
      setError(err.response?.data?.error || "Login failed. Please check your credentials.");
      console.error("Error:", err);
    }
  };

  const handleStep2Submit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const response = await api.post("/login/step2/", {
        username: loginData.username,
        role: selectedRole,
        otp_code: loginData.otp_code,
      });

      const { access, refresh, role, username } = response.data;

      if (role !== selectedRole) {
        setError(`Unauthorized access! You selected "${selectedRole}", but your account is "${role}".`);
        return;
      }

      localStorage.setItem("accessToken", access);
      localStorage.setItem("refreshToken", refresh);
      localStorage.setItem("userRole", role);
      localStorage.setItem("username", username);

      setSuccess("Login successful!");
      setLoginData({ username: "", password: "", otp_code: "" });

      if (from) {
        navigate(`/${from}`);
      } else {
        navigate(role === "customer" ? "/" : "/locksmith");
      }
    } catch (err) {
      setError(err.response?.data?.error || "OTP verification failed. Please try again.");
      console.error("Error:", err);
    }
  };

  const handleResendOtp = async () => {
    setError("");
    setSuccess("");

    try {
      await api.post("/resend-otp/", {
        username: loginData.username,
        role: selectedRole,
      });
      setSuccess("New OTP sent to your email!");
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to resend OTP. Please try again.");
      console.error("Error:", err);
    }
  };

  const handleSocialLogin = async (providerType) => {
    if (!agreeToTerms) {
      setError("You must agree to the Terms of Use and Privacy Policy to proceed.");
      return;
    }

    try {
      let result;
      if (providerType === 'google') {
        result = await signInWithPopup(auth, googleProvider);
      } else if (providerType === 'facebook') {
        result = await signInWithPopup(auth, facebookProvider);
      } else {
        throw new Error('Unsupported provider');
      }

      const user = result.user;
      const idToken = await user.getIdToken();

      let username = user.displayName;
      let email = user.email;

      // For Facebook, check if email exists
      if (providerType === 'facebook' && !email) {
        const response = await api.post("/api/facebook-login/", {
          token: idToken,
          role: selectedRole,
        });

        if (response.data.status === 'email_required') {
          // Prompt for email if not provided by Facebook
          email = prompt("Please enter your email to continue:");
          if (!email) {
            setError("Email is required to continue with Facebook login.");
            return;
          }
          
          // Send email to backend to trigger OTP
          const otpResponse = await api.post("/facebook-login/", {
            token: idToken,
            email: email,
            role: selectedRole,
          });

          if (otpResponse.data.status === 'otp_sent') {
            // Handle OTP verification
            const otp = prompt("Please enter the OTP sent to your email:");
            if (!otp) {
              setError("OTP is required to continue with Facebook login.");
              return;
            }

            // Verify OTP
            const verifyResponse = await api.post("/verify-otp-login/", {
              email: email,
              otp: otp
            });

            if (verifyResponse.data.status === 'otp_login') {
              // OTP verification successful, save tokens
              localStorage.setItem("accessToken", verifyResponse.data.access);
              localStorage.setItem("refreshToken", verifyResponse.data.refresh);
              localStorage.setItem("userRole", selectedRole);
              localStorage.setItem("username", username || email.split('@')[0]);
              
              navigate(selectedRole === "customer" ? "/" : "/locksmith");
              return;
            } else {
              throw new Error('OTP verification failed');
            }
          }
        }
      } else {
        // Normal flow with email
        const response = await api.post(
          providerType === 'google' ? "/api/google-login/" : "/api/facebook-login/", 
          {
            token: idToken,
            role: selectedRole,
          }
        );

        const access = response.data.access_token || response.data.access;
        const refresh = response.data.refresh_token || response.data.refresh;
        const role = response.data.user?.role || selectedRole;

        localStorage.setItem("accessToken", access);
        localStorage.setItem("refreshToken", refresh);
        localStorage.setItem("userRole", role);
        localStorage.setItem("username", username || email.split('@')[0]);

        navigate(role === "customer" ? "/" : "/locksmith");
      }
    } catch (error) {
      console.error(`${providerType} login failed:`, error);
      setError(`${providerType === 'google' ? 'Google' : 'Facebook'} login failed. ${error.response?.data?.error || 'Please try again.'}`);
    }
  };

  const handleGoogleSignIn = () => handleSocialLogin('google');
  const handleFacebookSignIn = () => handleSocialLogin('facebook');

  const handleForgotPasswordSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (step === 3) {
      try {
        const response = await api.post("/forgot-password/", {
          email: forgotPasswordData.email,
        });
        setSuccess(response.data.message);
        setStep(4);
      } catch (err) {
        setError(err.response?.data?.error || "Failed to send OTP. Please try again.");
        console.error("Error:", err);
      }
    } else if (step === 4) {
      try {
        const response = await api.post("/reset-password/", {
          email: forgotPasswordData.email,
          otp: forgotPasswordData.otp,
          new_password: forgotPasswordData.new_password,
        });
        setSuccess(response.data.message);
        setForgotPasswordData({ email: "", otp: "", new_password: "" });
        setTimeout(() => {
          setSuccess("");
          setStep(1);
        }, 2000);
      } catch (err) {
        setError(err.response?.data?.error || "Failed to reset password. Please try again.");
        console.error("Error:", err);
      }
    }
  };

  return React.createElement(
    "div",
    { className: "container-fluid loginbg d-flex align-items-center justify-content-center py-5" },
    React.createElement(
      "div",
      { className: "form-wrapper bg-white shadow-lg p-5 rounded-4 w-100 mx-3", style: { maxWidth: "600px" } },
      step === 1
        ? React.createElement(
            "form",
            { onSubmit: handleStep1Submit, className: "login-form animate-fadein" },
            React.createElement("h2", { className: "text-center fw-bold mb-4" }, `Login as ${selectedRole.charAt(0).toUpperCase() + selectedRole.slice(1)}`),
            error && React.createElement("div", { className: "alert alert-danger text-center py-2" }, error),
            success && React.createElement("div", { className: "alert alert-success text-center py-2" }, success),
            React.createElement(
              "div",
              { className: "mb-3" },
              React.createElement("label", { htmlFor: "username", className: "form-label" }, "Username"),
              React.createElement("input", {
                type: "text",
                id: "username",
                name: "username",
                value: loginData.username,
                onChange: handleChange,
                className: "form-control",
                required: true,
              })
            ),
            React.createElement(
              "div",
              { className: "mb-3 position-relative" },
              React.createElement("label", { htmlFor: "password", className: "form-label" }, "Password"),
              React.createElement("input", {
                type: showPassword ? "text" : "password",
                id: "password",
                name: "password",
                value: loginData.password,
                onChange: handleChange,
                className: "form-control pe-5",
                required: true,
              }),
              React.createElement(
                "span",
                { className: "position-absolute end-0 top-50 mt-2 me-2 password-toggle", onClick: togglePasswordVisibility },
                showPassword ? React.createElement(FaEyeSlash) : React.createElement(FaEye)
              )
            ),
            React.createElement(
              "div",
              { className: "mb-3" },
              React.createElement(
                "button",
                { type: "button", className: "btn btn-link p-0", onClick: () => setStep(3) },
                "Forgot Password?"
              )
            ),
            React.createElement(
              "div",
              { className: "mb-3 form-check" },
              React.createElement("input", {
                type: "checkbox",
                id: "agreeToTerms",
                checked: agreeToTerms,
                onChange: handleTermsChange,
                className: "form-check-input",
                required: true,
              }),
              React.createElement(
                "label",
                { htmlFor: "agreeToTerms", className: "form-check-label" },
                "I agree to the ",
                React.createElement("a", { href: "/docs/Terms%20of%20Use.pdf", target: "_blank", rel: "noopener noreferrer" }, "Terms of Use"),
                " and ",
                React.createElement("a", { href: "/docs/Privacy%20Policy.pdf", target: "_blank", rel: "noopener noreferrer" }, "Privacy Policy")
              )
            ),
            React.createElement("button", { type: "submit", className: "btn btn-dark w-100 mb-3", disabled: !agreeToTerms }, "Next"),
            React.createElement(
              "div",
              { className: "social-login mt-3 text-center" },
              React.createElement("div", { className: "text-center text-muted mb-3" }, "or login with"),
              React.createElement(
                "div",
                { className: "d-flex gap-2 w-100" },
                React.createElement(
                  "button",
                  { type: "button", className: "btn btn-google flex-grow-1", onClick: handleGoogleSignIn, disabled: !agreeToTerms },
                  React.createElement(
                    "svg",
                    { xmlns: "http://www.w3.org/2000/svg", width: "20", height: "20", viewBox: "0 0 24 24", className: "me-2" },
                    React.createElement("path", {
                      fill: "#4285F4",
                      d: "M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z",
                    }),
                    React.createElement("path", {
                      fill: "#34A853",
                      d: "M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z",
                    }),
                    React.createElement("path", {
                      fill: "#FBBC05",
                      d: "M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z",
                    }),
                    React.createElement("path", {
                      fill: "#EA4335",
                      d: "M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z",
                    })
                  ),
                  "Google"
                ),
                React.createElement(
                  "button",
                  { type: "button", className: "btn btn-facebook flex-grow-1", onClick: handleFacebookSignIn, disabled: !agreeToTerms },
                  React.createElement(FaFacebook, { className: "me-2" }),
                  "Facebook"
                )
              )
            ),
            React.createElement(
              "div",
              { className: "text-center mt-4" },
              React.createElement(
                "small",
                { className: "text-muted" },
                "Don’t have an account? ",
                selectedRole === "customer"
                  ? React.createElement(Link, { to: "/usersignup" }, "Sign up here")
                  : React.createElement(Link, { to: "/signup" }, "Sign up here")
              )
            )
          )
        : step === 2
        ? React.createElement(
            "form",
            { onSubmit: handleStep2Submit, className: "login-form animate-fadein" },
            React.createElement("h2", { className: "text-center fw-bold mb-4" }, "Verify OTP"),
            error && React.createElement("div", { className: "alert alert-danger text-center py-2" }, error),
            success && React.createElement("div", { className: "alert alert-success text-center py-2" }, success),
            React.createElement(
              "div",
              { className: "mb-3" },
              React.createElement("label", { htmlFor: "otp_code", className: "form-label" }, "Enter OTP (from email or authenticator app):"),
              React.createElement("input", {
                type: "text",
                id: "otp_code",
                name: "otp_code",
                value: loginData.otp_code,
                onChange: handleChange,
                className: "form-control",
                required: true,
              })
            ),
            React.createElement("button", { type: "submit", className: "btn btn-dark w-100 mb-2" }, "Verify OTP"),
            React.createElement("button", { type: "button", className: "btn btn-link w-100", onClick: handleResendOtp }, "Resend Email OTP")
          )
        : step === 3
        ? React.createElement(
            "form",
            { onSubmit: handleForgotPasswordSubmit, className: "login-form animate-fadein" },
            React.createElement("h2", { className: "text-center fw-bold mb-4" }, "Forgot Password"),
            error && React.createElement("div", { className: "alert alert-danger text-center py-2" }, error),
            success && React.createElement("div", { className: "alert alert-success text-center py-2" }, success),
            React.createElement(
              "div",
              { className: "mb-3" },
              React.createElement("label", { htmlFor: "email", className: "form-label" }, "Email"),
              React.createElement("input", {
                type: "email",
                id: "email",
                name: "email",
                value: forgotPasswordData.email,
                onChange: handleForgotPasswordChange,
                className: "form-control",
                required: true,
              })
            ),
            React.createElement("button", { type: "submit", className: "btn btn-dark w-100 mb-2" }, "Send OTP"),
            React.createElement(
              "button",
              { type: "button", className: "btn btn-link w-100", onClick: () => setStep(1) },
              "Back to Login"
            )
          )
        : React.createElement(
            "form",
            { onSubmit: handleForgotPasswordSubmit, className: "login-form animate-fadein" },
            React.createElement("h2", { className: "text-center fw-bold mb-4" }, "Reset Password"),
            error && React.createElement("div", { className: "alert alert-danger text-center py-2" }, error),
            success && React.createElement("div", { className: "alert alert-success text-center py-2" }, success),
            React.createElement(
              "div",
              { className: "mb-3" },
              React.createElement("label", { htmlFor: "otp", className: "form-label" }, "OTP"),
              React.createElement("input", {
                type: "text",
                id: "otp",
                name: "otp",
                value: forgotPasswordData.otp,
                onChange: handleForgotPasswordChange,
                className: "form-control",
                required: true,
              })
            ),
            React.createElement(
              "div",
              { className: "mb-3 position-relative" },
              React.createElement("label", { htmlFor: "new_password", className: "form-label" }, "New Password"),
              React.createElement("input", {
                type: showPassword ? "text" : "password",
                id: "new_password",
                name: "new_password",
                value: forgotPasswordData.new_password,
                onChange: handleForgotPasswordChange,
                className: "form-control pe-5",
                required: true,
              }),
              React.createElement(
                "span",
                { className: "position-absolute end-0 top-50 mt-2 me-2 password-toggle", onClick: togglePasswordVisibility },
                showPassword ? React.createElement(FaEyeSlash) : React.createElement(FaEye)
              )
            ),
            React.createElement("button", { type: "submit", className: "btn btn-dark w-100 mb-2" }, "Reset Password"),
            React.createElement(
              "button",
              { type: "button", className: "btn btn-link w-100", onClick: () => setStep(1) },
              "Back to Login"
            )
          )
    )
  );
}