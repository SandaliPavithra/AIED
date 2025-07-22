// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HeaderController from "./Header/HeaderController";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import StudentApp from "./pages/Student/StudentApp";
import PrivateRoute from "./components/PrivateRoute";
import RoleBasedRoute from "./components/Rolebased";
import { AuthProvider } from "./context/AuthContext"; // Import your AuthProvider

const App = () => {
  return (
    // Wrap your entire application with AuthProvider
    <AuthProvider>
      <Router>
        <HeaderController />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />

          {/* Protected Student Routes */}
          <Route element={<PrivateRoute />}>
            <Route element={<RoleBasedRoute allowedRoles={["student"]} />}>
              <Route path="/student/*" element={<StudentApp />} />
            </Route>
          </Route>

          {/* Add other routes as needed */}
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;