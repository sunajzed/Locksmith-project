// import React from 'react';
// import Login from '../components/Login/Login';

// export default function SignUpLogin() {
//   return (
//     <div><Login/></div>
//   )
// }
import React from 'react';
import Login from '../components/Login/Login'; // Ensure the path is correct
import Footer from '../components/Footer/Footer';

export default function SignUpLogin() {
  return (
    <div>
      <Login /> 
      <Footer/>
    </div>
  );
}