// src/pages/Login/LoginManager.tsx
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion";
import { saveUser } from "../../utils/auth";

const API = "http://127.0.0.1:8080/api";

const LoginManager: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${API}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.detail || data.message || "Login failed");
        setLoading(false);
        return;
      }

      // ✅ handle username or name properly
      saveUser({
        token: data.token,
        name: data.user?.name || data.username || "User",
        email: data.user?.email || data.email,
        role: data.user?.role || data.role,
        isNew: false,
      });

      toast.success(`Welcome back, ${data.user?.name || data.username}!`);
      navigate("/manager/dashboard", { replace: true });
    } catch (err) {
      console.error("Login error:", err);
      toast.error("Network error. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center text-white">
      <ToastContainer />
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-slate-900/70 border border-emerald-500/20 rounded-2xl shadow-2xl p-10 w-full max-w-md backdrop-blur-md"
      >
        <h2 className="text-3xl font-bold text-center text-emerald-400 mb-8">
          Manager Login
        </h2>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-gray-300 mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-3 rounded-lg bg-slate-800 text-white border border-emerald-500/20 focus:outline-none focus:ring-2 focus:ring-emerald-400"
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-3 rounded-lg bg-slate-800 text-white border border-emerald-500/20 focus:outline-none focus:ring-2 focus:ring-emerald-400"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg font-semibold transition-all duration-200 ${
              loading
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-gradient-to-r from-emerald-500 to-teal-500 hover:scale-105"
            }`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-center mt-6 text-gray-400">
          New here?{" "}
          <Link
            to="/register/manager"
            className="text-emerald-400 hover:underline font-semibold"
          >
            Create an account
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default LoginManager;

