// src/pages/Student/StudentLayout.jsx
import React from "react";
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import SideNavigation from "@cloudscape-design/components/side-navigation";
import Badge from "@cloudscape-design/components/badge";

const StudentLayout = () => {
 const navigationItems = [
  { type: "link", text: "Dashboard", href: "/student/dashboard" },
  { type: "link", text: "Evaluation", href: "/student/evaluation" }, // ✅ Fixed typo
  { type: "link", text: "Progression", href: "/student/progress" },
  { type: "divider" },
  {
    type: "link",
    text: "Notifications",
    href: "/student/notifications", // Optional: fix route if needed
    info: <Badge color="red">23</Badge>,
  },
  {
    type: "link",
    text: "Documentation",
    href: "https://example.com",
    external: true,
  },
];

  return (
    <div style={{ display: "flex" }}>
      <SideNavigation
        activeHref={location.pathname}
        header={{ href: "/", text: "Home Page" }}
        onFollow={(event) => {
          if (!event.detail.external) {
            event.preventDefault();
            navigate(event.detail.href);
          }
        }}
        items={navigationItems}
      />

      <main style={{ padding: "20px", flexGrow: 1 }}>
        <Outlet />
      </main>
    </div>
  );
};

export default StudentLayout;
