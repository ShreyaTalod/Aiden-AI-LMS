import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import LoginManager from "../pages/Login/LoginManager";
import LoginEmployee from "../pages/Login/LoginEmployee";
import RegisterManager from "../pages/Register/RegisterManager";
import RegisterEmployee from "../pages/Register/RegisterEmployee";
import EmployeeDashboard from "../pages/Dashboard/EmployeeDashboard";
import ManagerDashboard from "../pages/Dashboard/ManagerDashboard";

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login/manager" element={<LoginManager />} />
      <Route path="/login/employee" element={<LoginEmployee />} />
      <Route path="/register/manager" element={<RegisterManager />} />
      <Route path="/register/employee" element={<RegisterEmployee />} />
      <Route path="/employee/dashboard" element={<EmployeeDashboard />} />
      <Route path="/manager/dashboard" element={<ManagerDashboard />} />
    </Routes>
  );
};

export default AppRoutes;

