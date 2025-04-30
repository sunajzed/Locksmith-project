import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Facebook icon
import {Facebook, Google} from '@icon-park/react';
import api from '../../api/api';
import { useNavigate } from 'react-router-dom';
import { auth, provider } from '../../firebase';
import { signInWithPopup } from 'firebase/auth';
import './Signup.css';

export default function UserSignup() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: 'customer',
    totp_enabled: true,
  });
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [totpData, setTotpData] = useState(null);
  const [showPassword, setShowPassword] = useState(false); // State for password visibility
  const navigate = useNavigate();
  const resetForm = () => {
    setFormData({ username: '', email: '', password: '', role: 'customer', totp_enabled: true });
    setAgreeTerms(false);
  };

/*************  ✨ Windsurf Command ⭐  *************/
/**
 * Updates the formData state with the new input value.
 *
 * @param {Object} e - The event object from the input field.
 * @param {string} e.target.name - The name attribute of the input field.
 * @param {string} e.target.value - The current value of the input field.
 */

/*******  7f6f02fd-17b0-43e2-9fc5-1708489afd3a  *******/
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setTotpData(null);

    if (!agreeTerms) {
      setError('You must agree to the terms and policies to register.');
      return;
    }

    try {
      const response = await api.post('/register/user/', formData);
      setSuccess('Signup successful! Please log in.');
      setTotpData({ secret: response.data.user.totp_secret, qrCode: response.data.user.totp_qr_code });
      resetForm();
    } catch (err) {
      if (err.response?.status === 409) {
        alert('User already exists. Please use a different username or email.');
      } else {
        setError(err.response?.data?.message || 'Signup failed. Please try again.');
      }
      console.error('Error:', err);
    }
  };
  
  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const idToken = await user.getIdToken();

      let username = user.displayName;

      if (!username) {
        const newUsername = prompt("Please enter your name:");
        if (!newUsername) {
          alert("Name is required! Please try again.");
          return;
        }
        username = newUsername;
      }

      const response = await api.post('/api/google-login/', {
        token: idToken,
        role: 'customer'
      });

      const access = response.data.access_token;
      const refresh = response.data.refresh_token;
      const role = response.data.user.role;

      localStorage.setItem('accessToken', access);
      localStorage.setItem('refreshToken', refresh);
      localStorage.setItem('userRole', role);
      localStorage.setItem('username', username);

      navigate('/');
    } catch (error) {
      console.error('Google login failed:', error);
      setError('Google login failed. Please try again.');
    }
  };


  return (
    <div className="container-fluid loginbg d-flex align-items-center justify-content-center py-5">
            {error && <div className="alert alert-danger">{error}</div>}

          <div className="form-wrapper bg-white shadow-lg p-5 rounded-4 w-100 mx-3" style={{ maxWidth: '600px' }}>
            <form onSubmit={handleSubmit} className="signup-form animate-fadein">
              <h2 className="text-center mb-4">Sign Up as Customer</h2>
              {error && <p className="text-danger text-center">{error}</p>}
              {success && <p className="text-success text-center">{success}</p>}
              {totpData && (
                <div className="text-center mb-3">
                  <h4>TOTP Setup</h4>
                  <p className='text-black'><strong>Secret Key:</strong> {totpData.secret}</p>
                  <img src={totpData.qrCode} alt="TOTP QR Code" className="img-fluid" style={{ width: '150px', height: '150px' }} />
                  <p className='text-black'>Scan the QR code using your authenticator app.</p>
                </div>
              )}
              <div className="mb-3">
                <label htmlFor="username" className="form-label">Username:</label>
                <input type="text" id="username" name="username" value={formData.username} onChange={handleChange} className="form-control" required />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email:</label>
                <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="form-control" required />
              </div>
              <div className="mb-3 position-relative">
                <label htmlFor="password" className="form-label">Password:</label>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
                <span
                  className="position-absolute end-0 top-50 mt-2 me-2 password-toggle"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
              <div className="mb-3 form-check">
                <input type="checkbox" id="agreeTerms" className="form-check-input" checked={agreeTerms}onChange={(e) => setAgreeTerms(e.target.checked)} />
                <label htmlFor="agreeTerms" className="form-check-label">
                  I agree to the <a href="/docs/Terms of Use.pdf" target="_blank" rel="noopener noreferrer">Terms of use</a> and <a href="/docs/Privacy Policy.pdf" target="_blank" rel="noopener noreferrer">Privacy policy</a>
                </label>
              </div>
              <button type="submit" className="btn btn-dark w-100" disabled={!agreeTerms}>Register</button>

              {/* Social Login Section */}
              <div className="social-login mt-3 text-center">
            <div className="text-center text-muted mb-3">or login with</div>
            <div className="d-flex gap-2">
              <button type="button" className="btn btn-google w-50" onClick={handleGoogleSignIn}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                Sign in with Google
              </button>

              <button type="button" className="btn btn-facebook w-50" onClick={() => alert('Facebook login coming soon!')}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="white"
                >
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                </svg>
                Sign in with Facebook
              </button>
            </div>
          </div>



              <div className="text-center mt-4">
                <small className="text-muted">
                  Already have an account?
                  <Link to="/login?role=customer">Login</Link>
                </small>
              </div>
            </form>
          </div>
        </div>
  );
}


