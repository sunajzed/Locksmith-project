

// import React from 'react';
// import './LocksmithNetwork.css';

// const LocksmithNetwork = () => {
//   return (
//     <div className="locksmith-container container py-5">
//       <div className="row align-items-center">
//         {/* Left Side */}
//         <div className="left-content col-lg-6 text-lg-start text-center mb-4">
//           <h2 className='fw-bold text-dark mb-3'>
//             JOIN OUR PROFESSIONAL LOCKSMITH NETWORK IN AUSTRALIA
//           </h2>
//           <p className="description">
//             We are expanding across Australia, with locksmith job openings in:
//           </p>
//           <ul className="points-list">
//             <li><b>Sydney, NSW</b> – High demand for commercial locksmiths.</li>
//             <li><b>Melbourne, VIC</b> – Automotive key replacement and emergency services.</li>
//             <li><b>Brisbane, QLD</b> – Residential security upgrades and smart lock installations.</li>
//             <li><b>Perth, WA</b> – Mobile locksmiths needed for remote areas.</li>
//             <li><b>Adelaide, SA</b> – Master key systems and access control specialists.</li>
//           </ul>
//         </div>
        
//         {/* Right Side */}
//         <div className="right-content col-lg-6 text-center">
//           <img
//             src="/images/locksmith-network.png"
//             alt="Locksmith Network"
//             className="network-image img-fluid rounded shadow-lg"
//           />
//         </div>
//       </div>
      
//       {/* Centered Section */}
//       <div className="text-center mt-5">
//         <p className="image-description fw-medium text-black">
//           Become part of a trusted <b>Australia-wide locksmith network</b>, helping people secure their homes, offices, and vehicles.
//         </p>
//         <h4 className="text-black fw-bold">Ready to Start? Apply Today – It’s 100% Free!</h4>
//         <p className="sub-description text-black">
//           Click the <b>"Sign Up as a Locksmith"</b> button to begin. Our team will guide you through the process and ensure you <b>start receiving locksmith jobs immediately – at no cost!</b>
//         </p>
//         <p className="sub-description text-black fw-bold">
//           Join us today and unlock new career opportunities!
//         </p>
//       </div>
//     </div>
//   );
// };

// export default LocksmithNetwork;
import React from 'react';
import { motion } from 'framer-motion';
import 'aos/dist/aos.css';
import './LocksmithNetwork.css';
import { Link } from 'react-router-dom';

const LocksmithNetwork = () => {
  return (
    <div className="locksmith-container container py-5">
      <div className="row align-items-center">
        {/* Left Side */}
        <motion.div 
          className="left-content col-lg-6 text-lg-start text-center mb-4"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          data-aos="fade-right"
        >
          <h2 className='fw-bold text-dark mb-3' data-aos="fade-up">
            JOIN OUR PROFESSIONAL LOCKSMITH NETWORK IN AUSTRALIA
          </h2>
          <p className="description" data-aos="fade-up" data-aos-delay="100">
            We are expanding across Australia, with locksmith job openings in:
          </p>
          <ul className="points-list">
            {[
              "<b>Sydney, NSW</b> – High demand for commercial locksmiths.",
              "<b>Melbourne, VIC</b> – Automotive key replacement and emergency services.",
              "<b>Brisbane, QLD</b> – Residential security upgrades and smart lock installations.",
              "<b>Perth, WA</b> – Mobile locksmiths needed for remote areas.",
              "<b>Adelaide, SA</b> – Master key systems and access control specialists."
            ].map((item, index) => (
              <motion.li 
                key={index}
                dangerouslySetInnerHTML={{ __html: item }}
                data-aos="fade-up"
                data-aos-delay={150 + (index * 50)}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              />
            ))}
          </ul>
        </motion.div>
        
        {/* Right Side */}
        <motion.div 
          className="right-content col-lg-6 text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          data-aos="fade-left"
        >
          <motion.img
            src="/images/locksmith-network.png"
            alt="Locksmith Network"
            className="network-image img-fluid rounded shadow-lg"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          />
        </motion.div>
      </div>
      
      {/* Centered Section */}
      <motion.div 
        className="text-center mt-5"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        viewport={{ once: true }}
        data-aos="fade-up"
      >
        <p className="image-description fw-medium text-black" data-aos="fade-up" data-aos-delay="100">
          Become part of a trusted <b>Australia-wide locksmith network</b>, helping people secure their homes, offices, and vehicles.
        </p>
        <h4 className="text-black fw-bold" data-aos="fade-up" data-aos-delay="150">
          Ready to Start? Apply Today – It's 100% Free!
        </h4>
        <p className="sub-description text-black" data-aos="fade-up" data-aos-delay="200">
          Click the <b>"Sign Up as a Locksmith"</b> button to begin. Our team will guide you through the process and ensure you <b>start receiving locksmith jobs immediately – at no cost!</b>
        </p>
        <p className="sub-description text-black fw-bold" data-aos="fade-up" data-aos-delay="250">
          Join us today and unlock new career opportunities!
        </p>
        
        {/* Start Earning Button */}
        <motion.div
          data-aos="fade-up"
          data-aos-delay="300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="d-inline-block mt-4"
        >
          {/* <Link to="/signup">
          <button className="btn btn-dark view-more-btn fw-bold">
            Start Earning
          </button>
          </Link> */}
        {/* <div>
  <Link to="/signup" className="btn btn-dark view-more-btn fw-bold text-decoration-none">
    Start Earning
  </Link>
</div> */}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default LocksmithNetwork;