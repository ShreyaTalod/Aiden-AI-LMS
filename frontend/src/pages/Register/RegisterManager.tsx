import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API = "http://127.0.0.1:8080/api";

const RegisterManager: React.FC = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API}/register/manager`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.detail || "Registration failed");
        return;
      }

      toast.success("Registration successful! Please login.");
      setTimeout(() => navigate("/login/manager"), 1500);
    } catch {
      toast.error("Network error");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center text-white">
      <ToastContainer position="top-right" autoClose={1500} />
      <div className="bg-slate-900/60 backdrop-blur-xl border border-emerald-500/20 p-10 rounded-2xl w-full max-w-md shadow-lg">
        <h2 className="text-3xl font-bold text-center text-emerald-400 mb-6">Manager Registration</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            placeholder="Full Name"
            className="w-full p-3 rounded-lg bg-slate-800 border border-slate-700 focus:border-emerald-400 outline-none"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 rounded-lg bg-slate-800 border border-slate-700 focus:border-emerald-400 outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 rounded-lg bg-slate-800 border border-slate-700 focus:border-emerald-400 outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="w-full py-3 bg-emerald-500 text-black font-semibold rounded-full hover:bg-emerald-400 transition-all"
          >
            Register
          </button>
        </form>
        <p className="text-center text-gray-400 mt-6">
          Already registered?{" "}
          <Link to="/login/manager" className="text-emerald-400 hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterManager;

