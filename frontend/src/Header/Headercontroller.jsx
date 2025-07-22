import React from "react";
import { useLocation } from "react-router-dom";
import GuestHeader from "./header/GuestHeader";
import StudentHeader from "./header/StudentHeader";

const HeaderController = () => {
  const location = useLocation();

  // You can route based on path
  if (location.pathname.startsWith("/student")) {
    return <StudentHeader />;
  }

  // Default fallback (guest)
  return <GuestHeader />;
};

export default HeaderController;
