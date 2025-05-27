import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import './Signup.css';
import api from '../../api/api';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { auth, provider } from '../../firebase';
import { signInWithPopup } from 'firebase/auth';

export default function Login() {
  const [loginData, setLoginData] = useState({
    username: '',
    password: '',
    otp_code: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const selectedRole = ['customer', 'locksmith'].includes(queryParams.get('role')) ? queryParams.get('role') : 'customer';
  const from = queryParams.get('from');

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('accessToken');
    if (isLoggedIn) {
      navigate('/');
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleTermsChange = () => {
    setAgreeToTerms(!agreeToTerms);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const response = await api.post('/login/', { ...loginData, role: selectedRole });

      const { access, refresh, role, username } = response.data;

      if (role !== selectedRole) {
        setError(`Unauthorized access! You selected "${selectedRole}", but your account is "${role}".`);
        return;
      }

      localStorage.setItem('accessToken', access);
      localStorage.setItem('refreshToken', refresh);
      localStorage.setItem('userRole', role);
      localStorage.setItem('username', username);

      setSuccess('Login successful!');
      setLoginData({ username: '', password: '', otp_code: '' });

      if (from) {
        navigate(`/${from}`);
      } else {
        navigate(role === 'customer' ? '/' : '/locksmith');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
      console.error('Error:', err);
    } finally {
      setError('');
      setSuccess('');
    }
  };

  const handleGoogleSignIn = async () => {
    if (!agreeToTerms) {
      setError('You must agree to the Terms of Use and Privacy Policy to proceed.');
      return;
    }

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const idToken = await user.getIdToken();

      console.log('Google User:', user);

      let username = user.displayName;

      if (!username) {
        const newUsername = prompt("Please enter your name:");
        if (!newUsername) {
          alert("Name is required! Please try again.");
          return;
        }
        username = newUsername;
      }

      const response = await api.post('/api/google-login/', { token: idToken, role: selectedRole });

      const access = response.data.access_token;
      const refresh = response.data.refresh_token;
      const role = response.data.user.role;

      localStorage.setItem('accessToken', access);
      localStorage.setItem('refreshToken', refresh);
      localStorage.setItem('userRole', role);
      localStorage.setItem('username', username);

      navigate(role === 'customer' ? '/' : '/locksmith');
    } catch (error) {
      console.error('Google login failed:', error);
      setError('Google login failed. Please try again.');
    } finally {
      setError('');
    }
  };

  return (
    <div className="container-fluid loginbg d-flex align-items-center justify-content-center py-5">
      <div className="form-wrapper bg-white shadow-lg p-5 rounded-4 w-100 mx-3" style={{ maxWidth: '600px' }}>
        <form onSubmit={handleSubmit} className="login-form animate-fadein">
          <h2 className="text-center fw-bold mb-4">
            Login as {selectedRole.charAt(0).toUpperCase() + selectedRole.slice(1)}
          </h2>

          {error && <div className="alert alert-danger text-center py-2">{error}</div>}
          {success && <div className="alert alert-success text-center py-2">{success}</div>}

          <div className="mb-3">
            <label htmlFor="username" className="form-label">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={loginData.username}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          <div className="mb-3 position-relative">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              name="password"
              value={loginData.password}
              onChange={handleChange}
              className="form-control pe-5"
              required
            />
            <span className="position-absolute end-0 top-50 mt-2 me-2 password-toggle" onClick={togglePasswordVisibility}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <div className="mb-3">
            <label htmlFor="otp_code" className="form-label">OTP Code</label>
            <input
              type="text"
              id="otp_code"
              name="otp_code"
              value={loginData.otp_code}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          <div className="mb-3 form-check">
            <input
              type="checkbox"
              id="agreeToTerms"
              checked={agreeToTerms}
              onChange={handleTermsChange}
              className="form-check-input"
              required
            />
            <label htmlFor="agreeToTerms" className="form-check-label">
              I agree to the{' '}
              <a href="/docs/Terms%20of%20Use.pdf" target="_blank" rel="noopener noreferrer">Terms of Use</a> and{' '}
              <a href="/docs/Privacy%20Policy.pdf" target="_blank" rel="noopener noreferrer">Privacy Policy</a>
            </label>
          </div>

          <button type="submit" className="btn btn-dark w-100 mb-3" disabled={!agreeToTerms}>Login</button>

          <div className="social-login mt-3 text-center">
            <div className="text-center text-muted mb-3">or login with</div>
            <div className="d-flex gap-2">
              <button type="button" className="btn btn-google w-50" onClick={handleGoogleSignIn} disabled={!agreeToTerms}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.20-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
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
              Don’t have an account?{' '}
              {selectedRole === 'customer' ? (
                <Link to="/usersignup">Sign up here</Link>
              ) : (
                <Link to="/signup">Sign up here</Link>
              )}
            </small>
          </div>
        </form>
      </div>
    </div>
  );
}