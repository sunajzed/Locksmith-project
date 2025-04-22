
// import React, { useState, useEffect } from 'react';
// import { useNavigate, useLocation, Link } from 'react-router-dom';
// import './Signup.css';
// import api from '../../api/api';

// export default function Login() {
//   const [loginData, setLoginData] = useState({
//     username: '',
//     password: '',
//     otp_code: '',
//   });
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');
//   const navigate = useNavigate();
//   const location = useLocation();
//   const queryParams = new URLSearchParams(location.search);
//   const selectedRole = queryParams.get('role') || 'customer'; // Default to 'customer'
//   const from = queryParams.get('from'); // Check if the user was redirected from ResidentialService

//   useEffect(() => {
//     console.log("Selected Role:", selectedRole);
//   }, [selectedRole]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setLoginData({
//       ...loginData,
//       [name]: value,
//     });
//   };



//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     setSuccess('');
  
//     try {
//       const response = await api.post('/login/', {
//         ...loginData,
//         role: selectedRole,
//       });
  
//       const { access, refresh, role, username } = response.data;
  
//       if (role !== selectedRole) {
//         setError(`Unauthorized access! You selected "${selectedRole}", but your account is "${role}".`);
//         return;
//       }
  
//       localStorage.setItem('accessToken', access);
//       localStorage.setItem('refreshToken', refresh);
//       localStorage.setItem('userRole', role);
//       localStorage.setItem('username', username);
  
//       setSuccess('Login successful!');
//       setLoginData({ username: '', password: '', otp_code: '' });
  
//       // Redirect to Commercial page if the user was redirected from CommercialService
//       if (from === 'commercialService') {
//         navigate('/commercial');
//       } else if (from === 'residentialService') {
//         navigate('/residential');
//       } else if (from === 'automotiveService') {
//         navigate('/automotive');
//       } else if (from === 'emergencyService') {
//         navigate('/emergency');
//       } else if (from === 'smart-lockService') {
//         navigate('/smart-lock');
//       } else {
//         navigate(role === 'customer' ? '/' : '/locksmith');
//       }
  
//     } catch (err) {
//       setError(err.response?.data?.message || 'Login failed. Please try again.');
//       console.error('Error:', err);
//     }
//   };

//   return (
//     <div className="container mt-5">
//       <div className="row justify-content-center">
//         <div className="col-md-6">
//           <form onSubmit={handleSubmit} className="signup-form p-4 shadow">
//             <h2 className="text-center mb-4">Login as {selectedRole.charAt(0).toUpperCase() + selectedRole.slice(1)}</h2>
//             {error && <p className="text-danger text-center">{error}</p>}
//             {success && <p className="text-success text-center">{success}</p>}
//             <div className="mb-3">
//               <label htmlFor="username" className="form-label">Username:</label>
//               <input type="text" id="username" name="username" value={loginData.username} onChange={handleChange} className="form-control" required />
//             </div>
//             <div className="mb-3">
//               <label htmlFor="password" className="form-label">Password:</label>
//               <input type="password" id="password" name="password" value={loginData.password} onChange={handleChange} className="form-control" required />
//             </div>
//             <div className="mb-3">
//               <label htmlFor="otp_code" className="form-label">OTP Code:</label>
//               <input type="text" id="otp_code" name="otp_code" value={loginData.otp_code} onChange={handleChange} className="form-control" required />
//             </div>
//             <button type="submit" className="btn btn-dark w-100">Login</button>

//             <div className="text-center mt-3">
//               {selectedRole === 'customer' ? (
//                 <p className='text-black'>Don't have an account? <Link to="/usersignup">Sign up </Link>here</p>
//               ) : (
//                 <p className='text-black'>Don't have an account? <Link to="/signup">Sign up </Link>here</p>
//               )}
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }

// import React, { useState, useEffect } from 'react';
// import { useNavigate, useLocation, Link } from 'react-router-dom';
// import './Signup.css';
// import api from '../../api/api';
// import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Import eye icons

// export default function Login() {
//   const [loginData, setLoginData] = useState({
//     username: '',
//     password: '',
//     otp_code: '',
//   });
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');
//   const [showPassword, setShowPassword] = useState(false); // State for password visibility
//   const navigate = useNavigate();
//   const location = useLocation();
//   const queryParams = new URLSearchParams(location.search);
//   const selectedRole = queryParams.get('role') || 'customer'; // Default to 'customer'
//   const from = queryParams.get('from'); // Check if the user was redirected from ResidentialService

//   useEffect(() => {
//     console.log("Selected Role:", selectedRole);
//   }, [selectedRole]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setLoginData({
//       ...loginData,
//       [name]: value,
//     });
//   };

//   const togglePasswordVisibility = () => {
//     setShowPassword(!showPassword);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     setSuccess('');
  
//     try {
//       const response = await api.post('/login/', {
//         ...loginData,
//         role: selectedRole,
//       });
  
//       const { access, refresh, role, username } = response.data;
  
//       if (role !== selectedRole) {
//         setError(`Unauthorized access! You selected "${selectedRole}", but your account is "${role}".`);
//         return;
//       }
  
//       localStorage.setItem('accessToken', access);
//       localStorage.setItem('refreshToken', refresh);
//       localStorage.setItem('userRole', role);
//       localStorage.setItem('username', username);
  
//       setSuccess('Login successful!');
//       setLoginData({ username: '', password: '', otp_code: '' });
  
//       // Redirect to Commercial page if the user was redirected from CommercialService
//       if (from === 'commercialService') {
//         navigate('/commercial');
//       } else if (from === 'residentialService') {
//         navigate('/residential');
//       } else if (from === 'automotiveService') {
//         navigate('/automotive');
//       } else if (from === 'emergencyService') {
//         navigate('/emergency');
//       } else if (from === 'smart-lockService') {
//         navigate('/smart-lock');
//       } else {
//         navigate(role === 'customer' ? '/' : '/locksmith');
//       }
  
//     } catch (err) {
//       setError(err.response?.data?.message || 'Login failed. Please try again.');
//       console.error('Error:', err);
//     }
//   };

//   return (
//     <div className="container mt-5">
//       <div className="row justify-content-center">
//         <div className="col-md-6">
//           <form onSubmit={handleSubmit} className="signup-form p-4 shadow">
//             <h2 className="text-center mb-4">Login as {selectedRole.charAt(0).toUpperCase() + selectedRole.slice(1)}</h2>
//             {error && <p className="text-danger text-center">{error}</p>}
//             {success && <p className="text-success text-center">{success}</p>}
//             <div className="mb-3">
//               <label htmlFor="username" className="form-label">Username:</label>
//               <input type="text" id="username" name="username" value={loginData.username} onChange={handleChange} className="form-control" required />
//             </div>
//             <div className="mb-3 position-relative">
//               <label htmlFor="password" className="form-label">Password:</label>
//               <input 
//                 type={showPassword ? "text" : "password"} 
//                 id="password" 
//                 name="password" 
//                 value={loginData.password} 
//                 onChange={handleChange} 
//                 className="form-control" 
//                 required 
//               />
//               <span 
//                 className="position-absolute end-0 top-50 mt-2 me-2"
//                 onClick={togglePasswordVisibility}
//                 style={{ cursor: 'pointer' }}
//               >
//                 {showPassword ? <FaEyeSlash /> : <FaEye />}
//               </span>
//             </div>
//             <div className="mb-3">
//               <label htmlFor="otp_code" className="form-label">OTP Code:</label>
//               <input type="text" id="otp_code" name="otp_code" value={loginData.otp_code} onChange={handleChange} className="form-control" required />
//             </div>
//             <button type="submit" className="btn btn-dark w-100">Login</button>

//             <div className="text-center mt-3">
//               {selectedRole === 'customer' ? (
//                 <p className='text-black'>Don't have an account? <Link to="/usersignup">Sign up </Link>here</p>
//               ) : (
//                 <p className='text-black'>Don't have an account? <Link to="/signup">Sign up </Link>here</p>
//               )}
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import './Signup.css';
import api from '../../api/api';
import { FaEye, FaEyeSlash, FaFacebook } from 'react-icons/fa';
import {Facebook, Google} from '@icon-park/react';

export default function Login() {
  const [loginData, setLoginData] = useState({
    username: '',
    password: '',
    otp_code: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const selectedRole = queryParams.get('role') || 'customer';
  const from = queryParams.get('from');

  useEffect(() => {
    console.log("Selected Role:", selectedRole);
  }, [selectedRole]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const response = await api.post('/login/', {
        ...loginData,
        role: selectedRole,
      });

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

      if (from === 'commercialService') navigate('/commercial');
      else if (from === 'residentialService') navigate('/residential');
      else if (from === 'automotiveService') navigate('/automotive');
      else if (from === 'emergencyService') navigate('/emergency');
      else if (from === 'smart-lockService') navigate('/smart-lock');
      else navigate(role === 'customer' ? '/' : '/locksmith');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
      console.error('Error:', err);
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
            <span
             className="position-absolute end-0 top-50 mt-2 me-2 password-toggle"
              onClick={togglePasswordVisibility}
            >
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

          <button type="submit" className="btn btn-dark w-100 mb-3">Login</button>
            <div className="social-login mt-3 text-center">
            <div className="text-center text-muted mb-3">or login with</div>
                      <div className="d-flex gap-2">
                        <button type="button" className="btn btn-google w-50" onClick={() => alert('Google login coming soon!')}>
                        <Google theme="outline" size="24" fill="#333"/> Google
                        </button>
                        <button type="button" className="btn btn-facebook w-50" onClick={() => alert('Facebook login coming soon!')}>
                        <Facebook theme="outline" size="24" fill="#333"/> Facebook
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
