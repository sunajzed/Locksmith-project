import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./LockDashboard.css";
import {
  Home,
  Wrench,
  ChevronDown,
  ChevronUp,
  User,
  CheckCircle,
  CreditCard,
  PlusCircle,
} from "lucide-react";

import ManageService from "../Services copy/ManageService";
import ServiceRequest from "../Services copy/ServiceRequest";
import CreateService from "../Services copy/CreateServices/CreateServices";
import MyServices from "../Services copy/MyServices/MyServices";
import CreateStripeAccount from "../CreateStripeAccount/CreateStripeAccount";
import LocksmithAvailability from "../Services copy/LocksmithAvailability/LocksmithAvailability";
import MyProfile from "../Services copy/MyProfile/MyProfile";
import StripeOnboarding from "../StripeOnboarding/StripeOnboarding";
import StripeStatus from "../Services copy/StripeStatus/StripeStatus";
import StripeDashboard from "../Services copy/StripeStatus/StripeDashboard";
import SuggestServices from "../Services copy/SuggestServices/SuggestServices";

const DashboardHome = () => <div>Welcome to Locksmith Dashboard</div>;

const menuItems = [
  { name: "Dashboard", icon: Home, component: <DashboardHome /> },
  { name: "My Profile", icon: User, component: <MyProfile /> },
  {
    name: "Manage Service",
    icon: Wrench,
    subMenu: [
      { name: "Create Service", icon: Wrench, component: <CreateService /> },
      { name: "Service Request", icon: Wrench, component: <ServiceRequest /> },
      { name: "My Services", icon: Wrench, component: <MyServices /> },
    ],
  },
  {
    name: "Availability",
    icon: CheckCircle,
    component: <LocksmithAvailability />,
  },
  {
    name: "Stripe",
    icon: CreditCard,
    subMenu: [
      { name: "Stripe Status", icon: CreditCard, component: <StripeStatus /> },
      {
        name: "Stripe Dashboard",
        icon: CreditCard,
        component: <StripeDashboard />,
      },
    ],
  },
  {
    name: "Suggest Services",
    icon: PlusCircle,
    component: <SuggestServices />,
  },
];

const LockDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [expandedMenu, setExpandedMenu] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024);
  const [stripeStatus, setStripeStatus] = useState("");

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const userRole = localStorage.getItem("userRole");

    if (!accessToken || userRole !== "locksmith") {
      navigate("/login?role=locksmith");
    }

    const fetchStripeStatus = async () => {
      try {
        // Replace with your real API call
        setStripeStatus("incomplete"); // Example: "complete" | "incomplete"
      } catch (error) {
        console.error("Error fetching Stripe status:", error);
      }
    };

    fetchStripeStatus();

    const handleResize = () => setIsMobile(window.innerWidth <= 1024);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [navigate]);

  const handleMenuClick = (item) => {
    if (item.subMenu) {
      setExpandedMenu(expandedMenu === item.name ? null : item.name);
    } else {
      setActiveTab(item.name);
    }
  };

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const ActiveComponent = menuItems
    .flatMap((item) => (item.subMenu ? item.subMenu : item))
    .find((subItem) => subItem.name === activeTab)?.component;

  return (
    <div className="container-fluid">
      <div className="row dashboard-container">
        {(isSidebarOpen || !isMobile) && (
          <div className="col-md-3 col-lg-2 sidebar">
            <div className="menu">
              {isMobile && (
                <button className="close-sidebar-btn" onClick={toggleSidebar}>
                  ×
                </button>
              )}
              {menuItems.map((item) => (
                <div key={item.name}>
                  <button
                    onClick={() => handleMenuClick(item)}
                    className={`menu-item ${
                      activeTab === item.name ? "active" : ""
                    }`}
                  >
                    <item.icon size={18} /> {item.name}
                    {item.name === "Stripe" && stripeStatus === "complete" && (
                      <span className="stripe-status-badge complete">✓</span>
                    )}
                    {item.subMenu &&
                      (expandedMenu === item.name ? (
                        <ChevronUp size={16} />
                      ) : (
                        <ChevronDown size={16} />
                      ))}
                  </button>
                  {item.subMenu && expandedMenu === item.name && (
                    <div className="submenu">
                      {item.subMenu.map((subItem) => (
                        <button
                          key={subItem.name}
                          onClick={() => setActiveTab(subItem.name)}
                          className={`submenu-item ${
                            activeTab === subItem.name ? "active" : ""
                          }`}
                        >
                          {subItem.name}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        <div
          className={`col-md-9 col-lg-${
            isSidebarOpen || !isMobile ? "10" : "12"
          } main-content`}
        >
          <div className="card">
            <div className="card-body">
              {isMobile && !isSidebarOpen && (
                <button className="open-sidebar-btn" onClick={toggleSidebar}>
                  Open Sidebar
                </button>
              )}
              {ActiveComponent}
            </div>
          </div>
          <div className="footer"></div>
        </div>
      </div>
    </div>
  );
};

export default LockDashboard;