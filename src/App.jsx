import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/SignUp";
import Manager from "./components/ManagerDashboard";
import Admin from "./components/AdminDashboard";
import Employee from "./components/EmployeeDashboard";
import Project from "./pages/Project";
import Settings from "./pages/Settings";
import UsersTable from "./components/Usertable";
import Leave from "./components/Leave";
import EmployeeForm from "./pages/EmployeeForm";

// Function to safely get user data from localStorage
const getUserFromStorage = () => {
  try {
    return JSON.parse(localStorage.getItem("user")) || {};
  } catch (error) {
    console.error("Error parsing user data:", error);
    return {};
  }
};

// Private Route Component
const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const user = getUserFromStorage();

  if (!token || !user.role) {
    return <Navigate to="/" replace />;
  }

  return children;
};

// Role-Based Redirection
const RoleBasedRedirect = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    const user = getUserFromStorage();

    if (user.role) {
      const roleRedirects = {
        Admin: "/admin-dashboard",
        Manager: "/manager-dashboard",
        Employee: "/employee-dashboard",
      };

      const redirectPath = roleRedirects[user.role];
      
    }
  }, [navigate]);

  return null;
};

function App() {
  return (
    <Router>
      <RoleBasedRedirect />
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/manager-dashboard" element={<PrivateRoute><Manager /></PrivateRoute>} />
          <Route path="/admin-dashboard" element={<PrivateRoute><Admin /></PrivateRoute>} />
          <Route path="/employee-dashboard" element={<PrivateRoute><Employee /></PrivateRoute>} />
          <Route path="/employee" element={<PrivateRoute><EmployeeForm /></PrivateRoute>} />
          <Route path="/project" element={<PrivateRoute><Project /></PrivateRoute>} />
          <Route path="/settings" element={<PrivateRoute><Settings /></PrivateRoute>} />
          <Route path="/user" element={<PrivateRoute><UsersTable /></PrivateRoute>} />
          <Route path="/leave" element={<PrivateRoute><Leave /></PrivateRoute>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
