import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, X, LogOut } from "lucide-react";
import { getUser, clearUser } from "../utils/auth";
import { useNavigate } from "react-router-dom";

const AccountMenu: React.FC = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const user = getUser();

  const handleLogout = () => {
    clearUser();
    navigate("/");
  };

  return (
    <>
      {/* Icon Button */}
      <button
        onClick={() => setOpen(true)}
        className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200"
      >
        <User className="w-5 h-5" />
      </button>

      {/* Slide-out Panel */}
      <AnimatePresence>
        {open && (
          <>
            {/* Background Overlay */}
            <motion.div
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />

            {/* Account Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 120, damping: 20 }}
              className="fixed top-0 right-0 h-full w-80 bg-slate-900/95 backdrop-blur-xl border-l border-emerald-500/30 shadow-2xl z-50 flex flex-col"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-emerald-500/20">
                <h2 className="text-xl font-semibold text-emerald-400">Account</h2>
                <button
                  onClick={() => setOpen(false)}
                  className="text-gray-400 hover:text-emerald-400 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* User Info */}
              <div className="flex flex-col items-center mt-8 px-6 text-center text-gray-300">
                <div className="flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 text-white font-bold text-2xl shadow-lg mb-4">
                  {user?.name?.charAt(0).toUpperCase() || "U"}
                </div>

                <h3 className="text-2xl font-bold text-emerald-400 mb-1">
                  {user?.name || "User"}
                </h3>
                <p className="text-sm text-gray-400">{user?.email || "N/A"}</p>
                <p className="mt-2 px-3 py-1 bg-emerald-500/20 border border-emerald-400/30 rounded-full text-sm text-emerald-300">
                  {user?.role
                    ? user.role.charAt(0).toUpperCase() + user.role.slice(1)
                    : "Role: N/A"}
                </p>
              </div>

              {/* Divider */}
              <div className="mt-8 border-t border-emerald-500/20 mx-6"></div>

              {/* Logout */}
              <div className="mt-auto mb-10 px-6">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center gap-2 py-3 text-white font-semibold bg-gradient-to-r from-red-500 to-pink-600 rounded-full hover:scale-105 transition-all duration-200 shadow-lg"
                >
                  <LogOut className="w-5 h-5" />
                  Logout
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default AccountMenu;

