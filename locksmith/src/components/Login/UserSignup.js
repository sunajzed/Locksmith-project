
// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
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

//   const resetForm = () => {
//     setFormData({ username: '', email: '', password: '', role: 'customer', totp_enabled: true });
//     setAgreeTerms(false);
//   };

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
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
//     <div className="container mt-5">
//       <div className="row justify-content-center">
//         <div className="col-md-6">
//           <form onSubmit={handleSubmit} className="signup-form p-4 shadow">
//             <h2 className="text-center mb-4">Sign Up as Customer</h2>
//             {error && <p className="text-danger text-center">{error}</p>}
//             {success && <p className="text-success text-center">{success}</p>}
//             {totpData && (
//               <div className="text-center mb-3">
//                 <p className='text-black'><strong>Secret Key:</strong> {totpData.secret}</p>
//                 <img src={totpData.qrCode} alt="TOTP QR Code" style={{ width: '150px', height: '150px' }} />
//                 <p className='text-black'>Scan the QR code using your authenticator app.</p>
//               </div>
//             )}
//             <div className="mb-3">
//               <label htmlFor="username" className="form-label">Username:</label>
//               <input type="text" id="username" name="username" value={formData.username} onChange={handleChange} className="form-control" required />
//             </div>
//             <div className="mb-3">
//               <label htmlFor="email" className="form-label">Email:</label>
//               <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="form-control" required />
//             </div>
//             <div className="mb-3">
//               <label htmlFor="password" className="form-label">Password:</label>
//               <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} className="form-control" required />
//             </div>
//             <div className="mb-3 form-check">
//               <input type="checkbox" id="agreeTerms" className="form-check-input" checked={agreeTerms} onChange={(e) => setAgreeTerms(e.target.checked)} />
//               <label htmlFor="agreeTerms" className="form-check-label">
//                 I agree to the <a href="/docs/Terms of Use.pdf" target="_blank" rel="noopener noreferrer">Terms of use</a> and <a href="/docs/Privacy Policy.pdf" target="_blank" rel="noopener noreferrer">Privacy policy</a>
//               </label>
//             </div>
//             <button type="submit" className="btn btn-dark w-100" disabled={!agreeTerms}>Register</button>
//             <div className="text-center mt-3">
//               <p className='text-black'>Already have an account? <Link to="/login?role=customer">Login</Link></p>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Import eye icons
import api from '../../api/api';
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

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <form onSubmit={handleSubmit} className="signup-form p-4 shadow">
            <h2 className="text-center mb-4">Sign Up as Customer</h2>
            {error && <p className="text-danger text-center">{error}</p>}
            {success && <p className="text-success text-center">{success}</p>}
            {totpData && (
              <div className="text-center mb-3">
                <p className='text-black'><strong>Secret Key:</strong> {totpData.secret}</p>
                <img src={totpData.qrCode} alt="TOTP QR Code" style={{ width: '150px', height: '150px' }} />
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
                className="position-absolute end-0 top-50 mt-2 me-2"
                onClick={togglePasswordVisibility}
                style={{ cursor: 'pointer' }}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            <div className="mb-3 form-check">
              <input type="checkbox" id="agreeTerms" className="form-check-input" checked={agreeTerms} onChange={(e) => setAgreeTerms(e.target.checked)} />
              <label htmlFor="agreeTerms" className="form-check-label">
                I agree to the <a href="/docs/Terms of Use.pdf" target="_blank" rel="noopener noreferrer">Terms of use</a> and <a href="/docs/Privacy Policy.pdf" target="_blank" rel="noopener noreferrer">Privacy policy</a>
              </label>
            </div>
            <button type="submit" className="btn btn-dark w-100" disabled={!agreeTerms}>Register</button>
            <div className="text-center mt-3">
              <p className='text-black'>Already have an account? <Link to="/login?role=customer">Login</Link></p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}