// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import "./Dashboard.css";
// import { Home, Wrench, ChevronDown, ChevronUp, Key, Users, LogOut, MessageCircle } from "lucide-react";
// import CreateService from "../Service/CreateService";
// import ManageLocksmith from "../LockSmith/ManageLocksmith";
// import SetCommission from "../Commission/Commission";
// import ViewServices from "../Service/ViewService";
// import ApproveService from "../Service/ApproveService";
// import ViewMessages from "../ViewMessage/ViewMessages";
// import ManageCarKeyDetails from "../Service/ManageCarKeyDetails";
// import api from "../../api/api";

// const DashboardHome = () => <div>Welcome to Admin Dashboard </div>;

// const menuItems = [
//   { name: "Dashboard", icon: Home, component: <DashboardHome /> },
//   {
//     name: "Manage Service",
//     icon: Wrench,
//     subMenu: [
//       { name: "Create Service", component: <CreateService /> },
//       { name: "View Services", component: <ViewServices /> },
//       { name: "Approve Services", component: <ApproveService /> },
//       { name: "Manage Car Key Details", component: <ManageCarKeyDetails /> },
//     ],
//   },
//   { name: "Manage Locksmith", icon: Key, component: <ManageLocksmith /> },
//   { name: "Set Commission", icon: Users, component: <SetCommission /> },
//   { name: "View Messages", icon: MessageCircle, component: <ViewMessages /> },
// ];

// const Dashboard = () => {
//   const [activeTab, setActiveTab] = useState("Dashboard");
//   const [expandedMenu, setExpandedMenu] = useState(null);
//   const navigate = useNavigate();

//   // 🔒 Authorization Check
//   useEffect(() => {
//     const accessToken = localStorage.getItem("accessToken");
//     const userRole = localStorage.getItem("userRole");

//     if (!accessToken || userRole !== "admin") {
//       navigate("/"); // Redirect to login if not authorized
//     }
//   }, [navigate]);

//   const handleMenuClick = (item) => {
//     if (item.subMenu) {
//       setExpandedMenu(expandedMenu === item.name ? null : item.name);
//     } else {
//       setActiveTab(item.name);
//     }
//   };

//   // 🔴 Logout Function
//   const handleLogout = async () => {
//     const refreshToken = localStorage.getItem("refreshToken");

//     if (!refreshToken) {
//       alert("No refresh token found. Please log in again.");
//       navigate("/");
//       return;
//     }

//     try {
//       await api.post(
//         "/logout/",
//         { refresh: refreshToken },
//         { headers: { "Content-Type": "application/json" } }
//       );

//       // Remove tokens & redirect
//       localStorage.clear();
//       alert("Logout successful!");
//       navigate("/");
//     } catch (err) {
//       console.error("Logout Error:", err);
//       alert("Logout failed. Please try again.");
//     }
//   };

//   const ActiveComponent = menuItems
//     .flatMap((item) => (item.subMenu ? item.subMenu : item))
//     .find((subItem) => subItem.name === activeTab)?.component;

//   return (
//     <div className="container-fluid">
//       <div className="row dashboard-container">
//         {/* Sidebar */}
//         <div className="col-md-3 col-lg-2 sidebar">
//           <div className="brand">
//             <img src="images/logo.webp" alt="LockQuick Logo" className="logo-img" />
//           </div>
//           <div className="menu">
//             {menuItems.map((item) => (
//               <div key={item.name}>
//                 <button
//                   onClick={() => handleMenuClick(item)}
//                   className={`menu-item ${activeTab === item.name ? "active" : ""}`}
//                 >
//                   <item.icon size={18} /> {item.name}
//                   {item.subMenu && (expandedMenu === item.name ? <ChevronUp size={16} /> : <ChevronDown size={16} />)}
//                 </button>
//                 {item.subMenu && expandedMenu === item.name && (
//                   <div className="submenu">
//                     {item.subMenu.map((subItem) => (
//                       <button
//                         key={subItem.name}
//                         onClick={() => setActiveTab(subItem.name)}
//                         className={`submenu-item ${activeTab === subItem.name ? "active" : ""}`}
//                       >
//                         {subItem.name}
//                       </button>
//                     ))}
//                   </div>
//                 )}
//               </div>
//             ))}
//           </div>
//           {/* Logout Button */}
//           <button onClick={handleLogout} className="logout-button">
//             <LogOut size={18} /> Logout
//           </button>
//         </div>

//         {/* Main Content */}
//         <div className="col-md-9 col-lg-10 main-content">
//           <div className="card">
//             <div className="card-body">{ActiveComponent}</div>
//           </div>
//           <div className="footer"></div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Home,
  Wrench,
  ChevronDown,
  ChevronUp,
  Key,
  Users,
  LogOut,
  MessageCircle,
} from "lucide-react";

import CreateService from "../Service/CreateService";
import ManageLocksmith from "../LockSmith/ManageLocksmith";
import SetCommission from "../Commission/Commission";
import ViewServices from "../Service/ViewService";
import ApproveService from "../Service/ApproveService";
import ViewMessages from "../ViewMessage/ViewMessages";
import ManageCarKeyDetails from "../Service/ManageCarKeyDetails";
import HeroSection from "../ContentManagement/HeroSection";
import ServiceCards from "../ContentManagement/ServiceCards";
import api from "../../api/api";
import "./Dashboard.css";

const DashboardHome = function () {
  return React.createElement("div", null, "Welcome to Admin Dashboard");
};

const menuItems = [
  {
    name: "Dashboard",
    icon: Home,
    component: React.createElement(DashboardHome),
  },
  {
    name: "Manage Service",
    icon: Wrench,
    subMenu: [
      { name: "Create Service", component: React.createElement(CreateService) },
      { name: "View Services", component: React.createElement(ViewServices) },
      {
        name: "Approve Services",
        component: React.createElement(ApproveService),
      },
      {
        name: "Manage Car Key Details",
        component: React.createElement(ManageCarKeyDetails),
      },
    ],
  },
  {
    name: "Content Management",
    icon: Wrench,
    subMenu: [
      { name: "Hero Section", component: React.createElement(HeroSection) },
      { name: "Service Cards", component: React.createElement(ServiceCards) },
    ],
  },
  {
    name: "Manage Locksmith",
    icon: Key,
    component: React.createElement(ManageLocksmith),
  },
  {
    name: "Set Commission",
    icon: Users,
    component: React.createElement(SetCommission),
  },
  {
    name: "View Messages",
    icon: MessageCircle,
    component: React.createElement(ViewMessages),
  },
];

function Dashboard() {
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [expandedMenu, setExpandedMenu] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const userRole = localStorage.getItem("userRole");

    if (!accessToken || userRole !== "admin") {
      navigate("/");
    }
  }, [navigate]);

  const handleMenuClick = function (item) {
    if (item.subMenu) {
      setExpandedMenu(expandedMenu === item.name ? null : item.name);
    } else {
      setActiveTab(item.name);
    }
  };

  const handleLogout = async function () {
    const refreshToken = localStorage.getItem("refreshToken");

    if (!refreshToken) {
      alert("No refresh token found. Please log in again.");
      navigate("/");
      return;
    }

    try {
      await api.post(
        "/logout/",
        { refresh: refreshToken },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      localStorage.clear();
      alert("Logout successful!");
      navigate("/");
    } catch (err) {
      console.error("Logout Error:", err);
      alert("Logout failed. Please try again.");
    }
  };

  const ActiveComponent = menuItems
    .flatMap((item) => item.subMenu || item)
    .find((subItem) => subItem.name === activeTab)?.component;

  return React.createElement(
    "div",
    { className: "container-fluid" },
    React.createElement(
      "div",
      { className: "row dashboard-container" },

      // Sidebar
      React.createElement(
        "div",
        { className: "col-md-3 col-lg-2 sidebar" },
        React.createElement(
          "div",
          { className: "brand" },
          React.createElement("img", {
            src: "images/logo.webp",
            alt: "LockQuick Logo",
            className: "logo-img",
          })
        ),
        React.createElement(
          "div",
          { className: "menu" },
          menuItems.map(function (item) {
            return React.createElement(
              "div",
              { key: item.name },
              React.createElement(
                "button",
                {
                  onClick: () => handleMenuClick(item),
                  className:
                    "menu-item" + (activeTab === item.name ? " active" : ""),
                },
                React.createElement(item.icon, { size: 18 }),
                " ",
                item.name,
                item.subMenu
                  ? expandedMenu === item.name
                    ? React.createElement(ChevronUp, { size: 16 })
                    : React.createElement(ChevronDown, { size: 16 })
                  : null
              ),
              item.subMenu &&
                expandedMenu === item.name &&
                React.createElement(
                  "div",
                  { className: "submenu" },
                  item.subMenu.map((subItem) =>
                    React.createElement(
                      "button",
                      {
                        key: subItem.name,
                        onClick: () => setActiveTab(subItem.name),
                        className:
                          "submenu-item" +
                          (activeTab === subItem.name ? " active" : ""),
                      },
                      subItem.name
                    )
                  )
                )
            );
          })
        ),
        React.createElement(
          "button",
          {
            onClick: handleLogout,
            className: "logout-button",
          },
          React.createElement(LogOut, { size: 18 }),
          " Logout"
        )
      ),

      // Main Content
      React.createElement(
        "div",
        { className: "col-md-9 col-lg-10 main-content" },
        React.createElement(
          "div",
          { className: "card" },
          React.createElement(
            "div",
            { className: "card-body" },
            ActiveComponent
          )
        ),
        React.createElement("div", { className: "footer" })
      )
    )
  );
}

export default Dashboard;
