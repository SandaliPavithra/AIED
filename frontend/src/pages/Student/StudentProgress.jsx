import * as React from "react";
import Drawer from "@cloudscape-design/components/drawer";
import Box from "@cloudscape-design/components/box";
import SpaceBetween from "@cloudscape-design/components/space-between";
import Header from "@cloudscape-design/components/header";
import ExpandableSection from "@cloudscape-design/components/expandable-section";
import KeyValuePairs from "@cloudscape-design/components/key-value-pairs";

export default () => {
  return (
    <div className="drawer-example">
      <Drawer header={<h2>Summary</h2>}>
        <Box margin={{ bottom: "l" }}>
          <SpaceBetween size="xxl">
            <SpaceBetween size="xs">
              <Header variant="h3">
                Step 1: Engine type
              </Header>
              <ExpandableSection
                headerText="Engine options"
                defaultExpanded
              >
                <KeyValuePairs
                  columns={2}
                  items={[
                    { label: "Engine", value: "Aurora" },
                    {
                      label: "License model",
                      value: "Bring your own license"
                    },
                    {
                      label: "Edition",
                      value: "MySQL 5.6-compatible"
                    }
                  ]}
                />
              </ExpandableSection>
            </SpaceBetween>
            <SpaceBetween size="xs">
              <Header variant="h3">
                Step 2: Instance details
              </Header>
              <ExpandableSection headerText="Instance options">
                <KeyValuePairs
                  columns={2}
                  items={[
                    {
                      label: "Class",
                      value: "db.t2.micro"
                    },
                    {
                      label: "Storage type",
                      value: "General Purpose (SSD)"
                    },
                    {
                      label: "Allocated storage",
                      value: "20 GiB"
                    }
                  ]}
                />
              </ExpandableSection>
              <ExpandableSection headerText="Names and password">
                <KeyValuePairs
                  columns={2}
                  items={[
                    {
                      label: "DB instance identifier",
                      value: "example-instance-identifier"
                    },
                    {
                      label: "Primary username",
                      value: "example-username"
                    },
                    {
                      label: "Primary password",
                      value: "example-password"
                    }
                  ]}
                />
              </ExpandableSection>
            </SpaceBetween>
          </SpaceBetween>
        </Box>
      </Drawer>
    </div>
  );
}