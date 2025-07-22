import React from "react";
import { Button, SpaceBetween, Icon, Box } from "@cloudscape-design/components";
import Header from "@cloudscape-design/components/header";

const GuestHeader = () => {
  return (
    <Box margin={{ top: "s", bottom: "s", left: "s", right: "s" }}>
      <Header>
        <SpaceBetween direction="horizontal" size="xs">
          <Icon name="user-profile-active" />
          Guest User
        </SpaceBetween>
      </Header>
    </Box>
  );
};

export default GuestHeader;
