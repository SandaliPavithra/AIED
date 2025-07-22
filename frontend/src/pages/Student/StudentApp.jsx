// pages/Student/StudentApp.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import StudentLayout from "./StudentLayout.jsx";
import StudentHome from "./StudentHome.jsx"; // this is the dashboard
import CoursesOverview from "./StudentCourse.jsx";
import StudentEvalution from "./StudentEvalution.jsx";
import StudentProgress from "./StudentProgress.jsx";
import Test from "./StudentTest.jsx";

const StudentApp = () => {
  return (
    <Routes>
      <Route path="/" element={<StudentLayout />}>
        <Route index element={<StudentHome />} />  {/* /student */}
        <Route path="home" element={<StudentHome />} />  {/* /student/home */}
        <Route path="dashboard" element={<StudentHome />} />  {/* /student/dashboard ✅ */}
        <Route path="courses-overview" element={<CoursesOverview />} />
        <Route path="evaluation" element={<StudentEvalution />} />
        <Route path="progress" element={<StudentProgress />} />
        <Route path="test" element={<Test />} />
      </Route>
    </Routes>
  );
};

export default StudentApp;
