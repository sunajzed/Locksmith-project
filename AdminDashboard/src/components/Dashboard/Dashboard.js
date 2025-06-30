// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   Home,
//   Wrench,
//   ChevronDown,
//   ChevronUp,
//   Key,
//   Users,
//   LogOut,
//   MessageCircle,
// } from "lucide-react";

// import CreateService from "../Service/CreateService";
// import ManageLocksmith from "../LockSmith/ManageLocksmith";
// import SetCommission from "../Commission/Commission";
// import ViewServices from "../Service/ViewService";
// import ApproveService from "../Service/ApproveService";
// import ViewMessages from "../ViewMessage/ViewMessages";
// import ManageCarKeyDetails from "../Service/ManageCarKeyDetails";
// import HeroSection from "../ContentManagement/HeroSection";
// import ServiceCards from "../ContentManagement/ServiceCards";
// import api from "../../api/api";
// import "./Dashboard.css";

// const DashboardHome = function () {
//   return React.createElement("div", null, "Welcome to Admin Dashboard");
// };

// const menuItems = [
//   {
//     name: "Dashboard",
//     icon: Home,
//     component: React.createElement(DashboardHome),
//   },
//   {
//     name: "Manage Service",
//     icon: Wrench,
//     subMenu: [
//       { name: "Create Service", component: React.createElement(CreateService) },
//       { name: "View Services", component: React.createElement(ViewServices) },
//       {
//         name: "Approve Services",
//         component: React.createElement(ApproveService),
//       },
//       {
//         name: "Manage Car Key Details",
//         component: React.createElement(ManageCarKeyDetails),
//       },
//     ],
//   },
//   {
//     name: "Content Management",
//     icon: Wrench,
//     subMenu: [
//       { name: "Hero Section", component: React.createElement(HeroSection) },
//       { name: "Service Cards", component: React.createElement(ServiceCards) },
//     ],
//   },
//   {
//     name: "Manage Locksmith",
//     icon: Key,
//     component: React.createElement(ManageLocksmith),
//   },
//   {
//     name: "Set Commission",
//     icon: Users,
//     component: React.createElement(SetCommission),
//   },
//   {
//     name: "View Messages",
//     icon: MessageCircle,
//     component: React.createElement(ViewMessages),
//   },
// ];

// function Dashboard() {
//   const [activeTab, setActiveTab] = useState("Dashboard");
//   const [expandedMenu, setExpandedMenu] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const accessToken = localStorage.getItem("accessToken");
//     const userRole = localStorage.getItem("userRole");

//     if (!accessToken || userRole !== "admin") {
//       navigate("/");
//     }
//   }, [navigate]);

//   const handleMenuClick = function (item) {
//     if (item.subMenu) {
//       setExpandedMenu(expandedMenu === item.name ? null : item.name);
//     } else {
//       setActiveTab(item.name);
//     }
//   };

//   const handleLogout = async function () {
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
//         {
//           headers: { "Content-Type": "application/json" },
//         }
//       );

//       localStorage.clear();
//       alert("Logout successful!");
//       navigate("/");
//     } catch (err) {
//       console.error("Logout Error:", err);
//       alert("Logout failed. Please try again.");
//     }
//   };

//   const ActiveComponent = menuItems
//     .flatMap((item) => item.subMenu || item)
//     .find((subItem) => subItem.name === activeTab)?.component;

//   return React.createElement(
//     "div",
//     { className: "container-fluid" },
//     React.createElement(
//       "div",
//       { className: "row dashboard-container" },

//       // Sidebar
//       React.createElement(
//         "div",
//         { className: "col-md-3 col-lg-2 sidebar" },
//         React.createElement(
//           "div",
//           { className: "brand" },
//           React.createElement("img", {
//             src: "images/logo.webp",
//             alt: "LockQuick Logo",
//             className: "logo-img",
//           })
//         ),
//         React.createElement(
//           "div",
//           { className: "menu" },
//           menuItems.map(function (item) {
//             return React.createElement(
//               "div",
//               { key: item.name },
//               React.createElement(
//                 "button",
//                 {
//                   onClick: () => handleMenuClick(item),
//                   className:
//                     "menu-item" + (activeTab === item.name ? " active" : ""),
//                 },
//                 React.createElement(item.icon, { size: 18 }),
//                 " ",
//                 item.name,
//                 item.subMenu
//                   ? expandedMenu === item.name
//                     ? React.createElement(ChevronUp, { size: 16 })
//                     : React.createElement(ChevronDown, { size: 16 })
//                   : null
//               ),
//               item.subMenu &&
//                 expandedMenu === item.name &&
//                 React.createElement(
//                   "div",
//                   { className: "submenu" },
//                   item.subMenu.map((subItem) =>
//                     React.createElement(
//                       "button",
//                       {
//                         key: subItem.name,
//                         onClick: () => setActiveTab(subItem.name),
//                         className:
//                           "submenu-item" +
//                           (activeTab === subItem.name ? " active" : ""),
//                       },
//                       subItem.name
//                     )
//                   )
//                 )
//             );
//           })
//         ),
//         React.createElement(
//           "button",
//           {
//             onClick: handleLogout,
//             className: "logout-button",
//           },
//           React.createElement(LogOut, { size: 18 }),
//           " Logout"
//         )
//       ),

//       // Main Content
//       React.createElement(
//         "div",
//         { className: "col-md-9 col-lg-10 main-content" },
//         React.createElement(
//           "div",
//           { className: "card" },
//           React.createElement(
//             "div",
//             { className: "card-body" },
//             ActiveComponent
//           )
//         ),
//         React.createElement("div", { className: "footer" })
//       )
//     )
//   );
// }

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
import LockSmithEditor from "../ContentManagement/LockSmithEditor";
import UnlockYourFutureEditor from "../ContentManagement/UnlockYourFutureEditor";
import ServicesEditor from "../ContentManagement/ServicesEditor";
import HowWeWorkEditor from "../ContentManagement/HowWeWorkEditor";
import LastSectionEditor from "../ContentManagement/LastSectionEditor";
import FooterEditor from "../ContentManagement/FooterEditor";
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
      {
        name: "Locksmith Section",
        component: React.createElement(LockSmithEditor),
      },
      {
        name: "Unlock Your Future",
        component: React.createElement(UnlockYourFutureEditor),
      },
      {
        name: "Services Section",
        component: React.createElement(ServicesEditor),
      },
      { name: "How We Work", component: React.createElement(HowWeWorkEditor) },
      {
        name: "Last Section",
        component: React.createElement(LastSectionEditor),
      },
      {
        name: "Footer Section",
        component: React.createElement(FooterEditor),
      },
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
