import React from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import SendMoney from "./pages/SendMoney";

// Function to check if the user is authenticated
const isAuthenticated = () => {
  return !!localStorage.getItem("token"); // Returns true if token exists, otherwise false
};

// Protected Route Component
const ProtectedRoute = ({ element }) => {
  return isAuthenticated() ? element : <Navigate to="/signin" />;
};

function App() {
  return (
    <div style={{ backgroundColor: "#d3d3d3", height: "100vh" }}>
      <Routes>
        {/* If user is logged in, redirect to Dashboard instead of Signin/Signup */}
        <Route path="/signin" element={isAuthenticated() ? <Navigate to="/dashboard" /> : <Signin />} />
        <Route path="/signup" element={isAuthenticated() ? <Navigate to="/dashboard" /> : <Signup />} />

        {/* Protected Routes (Only for authenticated users) */}
        <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} />} />
        <Route path="/send" element={<ProtectedRoute element={<SendMoney />} />} />

        {/* Default Route (Redirect to Dashboard if logged in, else Signin) */}
        <Route path="/" element={isAuthenticated() ? <Navigate to="/dashboard" /> : <Navigate to="/signin" />} />
      </Routes>
    </div>
  );
}

export default App;
