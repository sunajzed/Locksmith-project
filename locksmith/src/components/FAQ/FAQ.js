
// import { useState } from "react";
// import { ChevronDown, ChevronUp } from "lucide-react";
// import "./FAQ.css";

// const faqs = [
//   {
//     question: "Are locksmith prices higher after normal business hours?",
//     answer:
//       "Yes, emergency locksmith services may have slightly higher charges after regular hours, on weekends, or during holidays. This is due to the urgency of the service and availability of our technicians. However, we always provide a price estimate before starting any work so you know what to expect.",
//   },
//   {
//     question: "Where can I find more details about your services?",
//     answer:
//       "You can explore our website for details on <strong>lock replacements, security system installations, car key duplication</strong>, and other services. If you have specific questions, our customer support team is happy to assist.",
//   },
//   {
//     question: "Can a locksmith open any lock?",
//     answer:
//       "Yes, our locksmiths are trained to open all types of locks, including residential door locks, commercial security locks, car locks, and digital keypads. We use professional tools to unlock doors safely without damaging the lock or door frame. Before confirming the details, choose the category you need assistance with—<strong>Commercial, Residential, Automotive, or Digital</strong>—so we can provide the right service tailored to your needs.",
//   },
//   {
//     question: "How much does a locksmith service cost?",
//     answer:
//       "The cost depends on the service you need. A simple <strong>key duplication or lock repair</strong> is usually affordable, while <strong>advanced security installations</strong> or <strong>emergency lockout assistance</strong> may cost more. Contact us for a quote based on your needs.",
//   },
//   {
//     question: "Do you provide locksmith services in my city?",
//     answer:
//       "Yes! We serve customers in <strong>Brisbane, Canberra, Sydney, Melbourne, Adelaide, and Perth</strong>. Our team is available for <strong>residential, commercial, and automotive locksmith services</strong> across these areas.",
//   },
//   {
//     question: "How long does it take for a locksmith to arrive?",
//     answer:
//       "Our locksmiths strive to reach your location as quickly as possible. In most cases, we offer fast response times, typically within 30–60 minutes, depending on your location and service availability.",
//   },
// ];

// export default function FAQ() {
//   const [openIndex, setOpenIndex] = useState({});

//   const toggleFAQ = (index) => {
//     setOpenIndex((prev) => ({ ...prev, [index]: !prev[index] }));
//   };

//   return (
//     <div className="faq-container">
//       <h2 className="faq-title">FREQUENTLY ASKED QUESTIONS</h2>
//       <div className="faq-grid">
//         {faqs.map((faq, index) => (
//           <div key={index} className="faq-card-wrapper">
//             <div className={`faq-card ${openIndex[index] ? "expanded" : ""}`}>
//               <button
//                 className={`faq-question ${openIndex[index] ? "active" : ""}`}
//                 onClick={() => toggleFAQ(index)}
//               >
//                 {faq.question}
//                 {openIndex[index] ? <ChevronUp /> : <ChevronDown />}
//               </button>
//               <div
//                 className={`faq-answer ${openIndex[index] ? "show" : ""}`}
//                 dangerouslySetInnerHTML={{ __html: faq.answer }}
//               ></div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { motion } from "framer-motion";
import "aos/dist/aos.css";
import "./FAQ.css";

const faqs = [
  {
    question: "Are locksmith prices higher after normal business hours?",
    answer:
      "Yes, emergency locksmith services may have slightly higher charges after regular hours, on weekends, or during holidays. This is due to the urgency of the service and availability of our technicians. However, we always provide a price estimate before starting any work so you know what to expect.",
  },
  {
    question: "Where can I find more details about your services?",
    answer:
      "You can explore our website for details on <strong>lock replacements, security system installations, car key duplication</strong>, and other services. If you have specific questions, our customer support team is happy to assist.",
  },
  {
    question: "Can a locksmith open any lock?",
    answer:
      "Yes, our locksmiths are trained to open all types of locks, including residential door locks, commercial security locks, car locks, and digital keypads. We use professional tools to unlock doors safely without damaging the lock or door frame. Before confirming the details, choose the category you need assistance with—<strong>Commercial, Residential, Automotive, or Digital</strong>—so we can provide the right service tailored to your needs.",
  },
  {
    question: "How much does a locksmith service cost?",
    answer:
      "The cost depends on the service you need. A simple <strong>key duplication or lock repair</strong> is usually affordable, while <strong>advanced security installations</strong> or <strong>emergency lockout assistance</strong> may cost more. Contact us for a quote based on your needs.",
  },
  {
    question: "Do you provide locksmith services in my city?",
    answer:
      "Yes! We serve customers in <strong>Brisbane, Canberra, Sydney, Melbourne, Adelaide, and Perth</strong>. Our team is available for <strong>residential, commercial, and automotive locksmith services</strong> across these areas.",
  },
  {
    question: "How long does it take for a locksmith to arrive?",
    answer:
      "Our locksmiths strive to reach your location as quickly as possible. In most cases, we offer fast response times, typically within 30–60 minutes, depending on your location and service availability.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState({});

  const toggleFAQ = (index) => {
    setOpenIndex((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  return (
    <div className="faq-container">
      <h2 
        className="faq-title"
        data-aos="fade-up"
      >
        FREQUENTLY ASKED QUESTIONS
      </h2>
      <div className="faq-grid">
        {faqs.map((faq, index) => (
          <motion.div 
            key={index} 
            className="faq-card-wrapper"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            data-aos="fade-up"
            data-aos-delay={index * 50}
          >
            <div className={`faq-card ${openIndex[index] ? "expanded" : ""}`}>
              <motion.button
                className={`faq-question ${openIndex[index] ? "active" : ""}`}
                onClick={() => toggleFAQ(index)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {faq.question}
                {openIndex[index] ? <ChevronUp /> : <ChevronDown />}
              </motion.button>
              <motion.div
                className={`faq-answer ${openIndex[index] ? "show" : ""}`}
                initial={{ height: 0, opacity: 0 }}
                animate={{ 
                  height: openIndex[index] ? "auto" : 0,
                  opacity: openIndex[index] ? 1 : 0
                }}
                transition={{ duration: 0.3 }}
                dangerouslySetInnerHTML={{ __html: faq.answer }}
              ></motion.div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}