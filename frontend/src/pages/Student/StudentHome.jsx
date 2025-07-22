import React from "react";
import { useNavigate } from "react-router-dom";
import SideNavigation from "@cloudscape-design/components/side-navigation";
import Badge from "@cloudscape-design/components/badge";
import { ColumnLayout } from "@cloudscape-design/components";

const StudentDashboard = () => {

  return (

       <ColumnLayout columns={3} variant="text-grid">
      <div>
        Use this variant when you have text content inside
        columns.
      </div>
      <div>
        Use this variant when you have text content inside
        columns.
      </div>
      <div>
        Use this variant when you have text content inside
        columns.
      </div>
    </ColumnLayout>
  );
};

export default StudentDashboard;
