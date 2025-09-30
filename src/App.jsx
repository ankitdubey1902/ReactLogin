import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import ForgotPasswordForm from "./components/ForgotPasswordForm";
import Dashboard from "./components/Dashboard";

const PrivateRoute = ({ userEmail, children }) => {
  return userEmail ? children : <Navigate to="/login" replace />;
};

const PublicRoute = ({ userEmail, children }) => {
  return !userEmail ? children : <Navigate to="/dashboard" replace />;
};

export default function App() {
  const [userEmail, setUserEmail] = useState(localStorage.getItem("userEmail") || null);

  const handleLogin = (email) => {
    localStorage.setItem("userEmail", email);
    setUserEmail(email);
  };

  const handleRegister = (email) => {
    // localStorage.setItem("userEmail", email);
    // setUserEmail(email);
  };

  const handleLogout = () => {
    localStorage.removeItem("userEmail");
    setUserEmail(null);
  };

  const handlePasswordReset = () => {
    // You can expand functionality here if needed
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={
            <PublicRoute userEmail={userEmail}>
              <LoginForm onLogin={handleLogin} />
            </PublicRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute userEmail={userEmail}>
              <RegisterForm onRegister={handleRegister} />
            </PublicRoute>
          }
        />
        <Route
          path="/forgot-password"
          element={
            <PublicRoute userEmail={userEmail}>
              <ForgotPasswordForm onReset={handlePasswordReset} />
            </PublicRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute userEmail={userEmail}>
              <Dashboard email={userEmail} onLogout={handleLogout} />
            </PrivateRoute>
          }
        />
        {/* Redirect unknown routes */}
        <Route path="*" element={<Navigate to={userEmail ? "/dashboard" : "/login"} replace />} />
      </Routes>
    </Router>
  );
}
