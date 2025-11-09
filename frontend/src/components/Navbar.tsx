import React from "react";
import { useNavigate } from "react-router-dom";
import { getUser } from "../utils/auth";
import AccountMenu from "./AccountMenu";

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const user = getUser();

  const handleDashboardClick = () => {
    if (user?.role === "employee") navigate("/employee/dashboard");
    else if (user?.role === "manager") navigate("/manager/dashboard");
    else navigate("/");
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-slate-950/90 backdrop-blur-md border-b border-emerald-500/20 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
        {/* Left Section — Logo */}
        <div
          onClick={() => navigate("/")}
          className="text-2xl font-bold text-emerald-400 tracking-wide cursor-pointer hover:scale-105 transition-transform duration-300"
        >
          Aiden<span className="text-white">AI</span>
        </div>

        {/* Right Section — Nav Links + Account */}
        <div className="flex items-center gap-8">
          <button
            onClick={() => navigate("/")}
            className="text-gray-300 hover:text-emerald-400 transition-all duration-200 font-medium"
          >
            Home
          </button>

          <button
            onClick={handleDashboardClick}
            className="text-gray-300 hover:text-emerald-400 transition-all duration-200 font-medium"
          >
            Dashboard
          </button>

          {/* Account Menu */}
          {user && <AccountMenu />}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

