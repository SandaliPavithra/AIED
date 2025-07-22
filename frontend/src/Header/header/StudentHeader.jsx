import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, SpaceBetween, Icon, Box } from "@cloudscape-design/components";
import Header from "@cloudscape-design/components/header";

const StudentHeader = () => {
  const navigate = useNavigate();

  // Handler for logout click
  const handleLogout = () => {
    // Add logout logic here if needed
    navigate("/"); // Redirect to homepage
  };

  return (
    <Box margin={{ top: "s", bottom: "s", left: "s", right: "s" }}>
      <Header
        actions={
          <SpaceBetween direction="horizontal" size="xs">
            <Button variant="link" onClick={() => navigate("/student/home")}>
              Home
            </Button>
            <Button variant="link" onClick={() => navigate("/student/courses-overview")}>
              Courses Overview
            </Button>
            <Button variant="link" onClick={() => navigate("/student/test")}>
              Test
            </Button>
            <Button variant="primary" onClick={handleLogout}>
              Logout
            </Button>
          </SpaceBetween>
        }
      >
        <SpaceBetween direction="horizontal" size="xs">
          <Icon name="user-profile-active" />
          Student User
        </SpaceBetween>
      </Header>
    </Box>
  );
};

export default StudentHeader;
