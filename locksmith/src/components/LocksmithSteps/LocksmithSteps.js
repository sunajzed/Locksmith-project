import { useState } from "react";
import { motion } from "framer-motion";
import { UserPlus, FileText, Briefcase } from "lucide-react";
import "aos/dist/aos.css";
import "./LocksmithSteps.css";
import "bootstrap/dist/css/bootstrap.min.css";

const steps = [
  {
    title: "Step 1: Register Your Interest",
    description:
      "Click on the 'Sign Up' button and fill out the online application form. We will ask for basic details such as your:",
    list: [
      "Full Name",
      "Contact Information",
      "Location (City/State)",
      "Locksmith Specialization (<strong> Automotive, Residential, Commercial, or Digital Security </strong>)",
    ],
    icon: UserPlus,
  },
  {
    title: "Step 2: Submit Required Documents",
    description:
      "To ensure that we maintain the highest level of service, you must submit the following:",
    list: [
      "<strong>Locksmith License (if applicable in your state)</strong> – NSW, Victoria, Queensland, and other states may have different licensing rules.",
      "<strong>Police Clearance & Background Check</strong> – Security and trust are our top priorities.",
      "<strong>Valid Driver’s License</strong> – As many locksmith jobs require mobile service, a valid license is necessary.",
      "<strong>Experience Proof (Optional) </strong>– If you have prior experience, submit any relevant work history or certifications.",
    ],
    icon: FileText,
  },
  {
    title: "Step 3: Start Receiving Locksmith Jobs",
    description:
      "Once onboarded, you’ll start receiving service requests from homeowners, businesses, and car owners in need of locksmith assistance. You can <strong>choose the jobs that match your skills and availability.</strong>",
    icon: Briefcase,
  },
];


export default function LocksmithSteps() {
  const [selectedStep, setSelectedStep] = useState(null);

  return (
    <div className="locksmith-container">
      <motion.div 
        className="locksmith-header"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        data-aos="fade-up"
      >
        <h2 className="fw-bold">HOW TO BECOME A LOCKSMITH WITH US?</h2>
        <p className="subheading">
          Joining our locksmith network is a simple and free process. Follow these
          steps to start your locksmith career in Australia.
        </p>
      </motion.div>
      
      <div className="lock-steps-container">
        {steps.map((step, index) => (
          <div
            key={index}
            className="step-wrapper"
            onMouseEnter={() => setSelectedStep(index)}
            onMouseLeave={() => setSelectedStep(null)}
          >
            <motion.div
              className={`lock-step-card ${selectedStep === index ? "selected" : ""}`}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              whileHover={{ scale: 1.03 }}
              viewport={{ once: true }}
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div className="lock-step-content">
                <motion.div
                  className="lock-icon-container"
                  animate={{ 
                    scale: selectedStep === index ? 1.2 : 1,
                    rotate: selectedStep === index ? 5 : 0
                  }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <step.icon className="lock-icon" />
                </motion.div>
                <h3 className="lock-step-title">{step.title}</h3>
                <p
                  className="lock-step-description"
                  dangerouslySetInnerHTML={{ __html: step.description }}
                ></p>
                {selectedStep === index && step.list && (
                  <motion.div
                    className="details-box"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    transition={{ duration: 0.3 }}
                  >
                    <ul>
                      {step.list.map((item, i) => (
                        <motion.li 
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1 }}
                        >
                          <span dangerouslySetInnerHTML={{ __html: item }}></span>
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </div>
        ))}
      </div>
      
      <motion.p 
        className="footer-text"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        viewport={{ once: true }}
        data-aos="fade-up"
      >
        No Application Fees! Signing up is completely FREE!
      </motion.p>
    </div>
  );
}