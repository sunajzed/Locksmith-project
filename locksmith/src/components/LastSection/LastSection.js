// import React, { useEffect } from "react";
// import AOS from "aos";
// import "aos/dist/aos.css";
// import "./LastSection.css";
// import { Link } from "react-router-dom";

// const LastSection = () => {
//   useEffect(() => {
//     AOS.init({ duration: 1000 });
//   }, []);

//   return (
//     <div
//       className="custom-container d-flex justify-content-center align-items-center"
//       style={{
//         backgroundImage: "url('/images/key-bg (1).webp')",
//       }}
//     >
//       <div className="container-fluid px-0"> {/* Use container-fluid to avoid horizontal overflow */}
//         <div className="row justify-content-center mx-0"> {/* mx-0 to remove default row margins */}
//           <div className="col-12 col-md-8 col-lg-6 px-3"> {/* Add px-3 for small padding on sides */}
//             <div className="content-box text-center p-3 p-md-5" data-aos="fade-up">
//               <h2 className="mb-3 fw-bold text-light" data-aos="fade-down">
//                 SAFE & SECURE HOUSE
//               </h2>
//               <h4 className="mt-2 mb-4 text-light" data-aos="fade-right">
//                 Need a Locksmith? We Come to You!
//               </h4>
//               <p className="mb-4 text-light" data-aos="zoom-in">
//                 Searching for the <b>best emergency locksmith in Australia</b> or dealing with{" "}
//                 <b>locked keys inside your house?</b> No matter your location,{" "}
//                 <b>Lock Quick</b> is here to provide <b>fast, affordable, and reliable locksmith services</b> across Australia.
//               </p>
//               <p className="text-light" data-aos="fade-left">
//                 <b>Get in touch today – your security is just a click away!</b>
//               </p>
//               <div className="mt-3" data-aos="flip-up">
//   <Link
//     to="/contact-us"
//     onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
//   >
//     <button className="btn lavender-btn">Contact Us</button>
//   </Link>
// </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LastSection;

import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Link } from "react-router-dom";
import api from "../../api/api";
import "./LastSection.css";

const LastSection = () => {
  const [content, setContent] = useState({
    heading: "SAFE & SECURE HOUSE",
    subheading: "Need a Locksmith? We Come to You!",
    description:
      "Searching for the best emergency locksmith in Australia or dealing with locked keys inside your house? No matter your location, Lock Quick is here to provide fast, affordable, and reliable locksmith services across Australia.\nGet in touch today – your security is just a click away!",
    button_text: "Contact Us",
  });

  useEffect(() => {
    AOS.init({ duration: 1000 });

    const fetchContent = async () => {
      try {
        const response = await api.get("/api/content/?section=last_section");
        if (response.status === 200 && response.data.length > 0) {
          setContent(response.data[0].content);
        }
      } catch (error) {
        console.error("Error fetching last section content:", error);
      }
    };
    fetchContent();
  }, []);

  return (
    <div
      className="custom-container d-flex justify-content-center align-items-center"
      style={{
        backgroundImage: "url('/images/key-bg (1).webp')",
      }}
    >
      <div className="container-fluid px-0">
        <div className="row justify-content-center mx-0">
          <div className="col-12 col-md-8 col-lg-6 px-3">
            <div
              className="content-box text-center p-3 p-md-5"
              data-aos="fade-up"
            >
              <h2 className="mb-3 fw-bold text-light" data-aos="fade-down">
                {content.heading}
              </h2>
              <h4 className="mt-2 mb-4 text-light" data-aos="fade-right">
                {content.subheading}
              </h4>
              {content.description.split("\n").map((paragraph, index) => (
                <p
                  key={index}
                  className="text-light"
                  data-aos={index === 0 ? "zoom-in" : "fade-left"}
                  dangerouslySetInnerHTML={{ __html: paragraph }}
                />
              ))}
              <div className="mt-3" data-aos="flip-up">
                <Link
                  to="/contact-us"
                  onClick={() =>
                    window.scrollTo({ top: 0, behavior: "smooth" })
                  }
                >
                  <button className="btn lavender-btn">
                    {content.button_text}
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LastSection;
