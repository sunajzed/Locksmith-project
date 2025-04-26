// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Facebook icon
// import {Facebook, Google} from '@icon-park/react';
// import api from '../../api/api';
// import './Signup.css';

// export default function UserSignup() {
//   const [formData, setFormData] = useState({
//     username: '',
//     email: '',
//     password: '',
//     role: 'customer',
//     totp_enabled: true,
//   });
//   const [agreeTerms, setAgreeTerms] = useState(false);
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');
//   const [totpData, setTotpData] = useState(null);
//   const [showPassword, setShowPassword] = useState(false); // State for password visibility

//   const resetForm = () => {
//     setFormData({ username: '', email: '', password: '', role: 'customer', totp_enabled: true });
//     setAgreeTerms(false);
//   };

// /*************  ✨ Windsurf Command ⭐  *************/
// /**
//  * Updates the formData state with the new input value.
//  *
//  * @param {Object} e - The event object from the input field.
//  * @param {string} e.target.name - The name attribute of the input field.
//  * @param {string} e.target.value - The current value of the input field.
//  */

// /*******  7f6f02fd-17b0-43e2-9fc5-1708489afd3a  *******/
//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const togglePasswordVisibility = () => {
//     setShowPassword(!showPassword);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     setSuccess('');
//     setTotpData(null);

//     if (!agreeTerms) {
//       setError('You must agree to the terms and policies to register.');
//       return;
//     }

//     try {
//       const response = await api.post('/register/user/', formData);
//       setSuccess('Signup successful! Please log in.');
//       setTotpData({ secret: response.data.user.totp_secret, qrCode: response.data.user.totp_qr_code });
//       resetForm();
//     } catch (err) {
//       if (err.response?.status === 409) {
//         alert('User already exists. Please use a different username or email.');
//       } else {
//         setError(err.response?.data?.message || 'Signup failed. Please try again.');
//       }
//       console.error('Error:', err);
//     }
//   };

//   return (
//     <div className="container-fluid loginbg d-flex align-items-center justify-content-center py-5">
//           <div className="form-wrapper bg-white shadow-lg p-5 rounded-4 w-100 mx-3" style={{ maxWidth: '600px' }}>
//             <form onSubmit={handleSubmit} className="signup-form animate-fadein">
//               <h2 className="text-center mb-4">Sign Up as Customer</h2>
//               {error && <p className="text-danger text-center">{error}</p>}
//               {success && <p className="text-success text-center">{success}</p>}
//               {totpData && (
//                 <div className="text-center mb-3">
//                   <h4>TOTP Setup</h4>
//                   <p className='text-black'><strong>Secret Key:</strong> {totpData.secret}</p>
//                   <img src={totpData.qrCode} alt="TOTP QR Code" className="img-fluid" style={{ width: '150px', height: '150px' }} />
//                   <p className='text-black'>Scan the QR code using your authenticator app.</p>
//                 </div>
//               )}
//               <div className="mb-3">
//                 <label htmlFor="username" className="form-label">Username:</label>
//                 <input type="text" id="username" name="username" value={formData.username} onChange={handleChange} className="form-control" required />
//               </div>
//               <div className="mb-3">
//                 <label htmlFor="email" className="form-label">Email:</label>
//                 <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="form-control" required />
//               </div>
//               <div className="mb-3 position-relative">
//                 <label htmlFor="password" className="form-label">Password:</label>
//                 <input
//                   type={showPassword ? "text" : "password"}
//                   id="password"
//                   name="password"
//                   value={formData.password}
//                   onChange={handleChange}
//                   className="form-control"
//                   required
//                 />
//                 <span
//                   className="position-absolute end-0 top-50 mt-2 me-2 password-toggle"
//                   onClick={togglePasswordVisibility}
//                 >
//                   {showPassword ? <FaEyeSlash /> : <FaEye />}
//                 </span>
//               </div>
//               <div className="mb-3 form-check">
//                 <input type="checkbox" id="agreeTerms" className="form-check-input" checked={agreeTerms}onChange={(e) => setAgreeTerms(e.target.checked)} />
//                 <label htmlFor="agreeTerms" className="form-check-label">
//                   I agree to the <a href="/docs/Terms of Use.pdf" target="_blank" rel="noopener noreferrer">Terms of use</a> and <a href="/docs/Privacy Policy.pdf" target="_blank" rel="noopener noreferrer">Privacy policy</a>
//                 </label>
//               </div>
//               <button type="submit" className="btn btn-dark w-100" disabled={!agreeTerms}>Register</button>
    
//               {/* Social Login Section */}
//               <div className="social-login mt-3 text-center">
//                 <div className="text-center text-muted mb-3">or SignUp with</div>
//                 <div className="d-flex gap-2">
//                   <button type="button" className="btn btn-google w-50" onClick={() => alert('Google login coming soon!')}>
//                   <Google theme="outline" size="24" fill="#333"/> Google
//                   </button>
//                   <button type="button" className="btn btn-facebook w-50" onClick={() => alert('Facebook login coming soon!')}>
//                   <Facebook theme="outline" size="24" fill="#333"/> Facebook
//                   </button>
//                 </div>
//               </div>


      
//               <div className="text-center mt-4">
//                 <small className="text-muted">
//                   Already have an account?
//                   <Link to="/login?role=customer">Login</Link>
//                 </small>
//               </div>
//             </form>
//           </div>
//         </div>
//   );
// }

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaEye, FaEyeSlash, FaFacebookF, FaGoogle } from 'react-icons/fa'; // Facebook icon
import {Facebook, Google} from '@icon-park/react';
import api from '../../api/api';
import './Signup.css';
import { auth, provider } from '../../firebase';
import { signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';


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
  
      console.log('Firebase ID Token:', idToken);  
  
      const response = await api.post('/api/google-login/', {
        token: idToken,
        role: 'customer'  
      });
  
      console.log('Backend Response:', response.data); 
      const { access, refresh, role, username } = response.data;
  
      localStorage.setItem('accessToken', access);
      localStorage.setItem('refreshToken', refresh);
      localStorage.setItem('userRole', role);
      localStorage.setItem('username', username);
  
      navigate('/customer');  
    } catch (error) {
      console.error('Google login failed:', error);
      setError('Google login failed. Please try again.');
  
      if (error.response) {
        setError(`Backend error: ${error.response.data.message || 'Google login failed. Please try again.'}`);
      } else {
        setError('Google login failed. Please try again. ' + (error.message || ''));
      }
    }
  };
  
  return (
    <div className="container-fluid loginbg d-flex align-items-center justify-content-center py-5">
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
                             <FaGoogle size={24} color="#4285F4" /> {/* Google color */}
                             Google
                           </button>
             
                           <button type="button" className="btn btn-facebook w-50" onClick={() => alert('Facebook login coming soon!')}>
                             <FaFacebookF size={24} color="#FFFFFF" /> {/* Facebook color */}
                             Facebook
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