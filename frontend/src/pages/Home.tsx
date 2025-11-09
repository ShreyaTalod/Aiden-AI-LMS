import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white flex flex-col items-center relative overflow-hidden">
      <Navbar />

      {/* Background glow animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(25)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-emerald-400/10 rounded-full"
            style={{
              width: Math.random() * 10 + 6,
              height: Math.random() * 10 + 6,
              top: Math.random() * 100 + "%",
              left: Math.random() * 100 + "%",
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.8, 0.3],
              scale: [1, 1.4, 1],
            }}
            transition={{
              duration: Math.random() * 6 + 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <main className="flex flex-col items-center justify-center flex-grow text-center px-6 z-10 relative">
        {/* Logo and tagline */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          {/* 🔹 Unified glowing + rotating logo background */}
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
            className="relative mx-auto w-36 h-36 rounded-full mb-6 
                       bg-gradient-to-br from-emerald-500/25 via-emerald-400/10 to-transparent
                       shadow-[0_0_40px_rgba(16,185,129,0.25)] 
                       flex items-center justify-center"
          >
            {/* Faded logo blended directly into the circle */}
            <img
              src="/logo.png"
              alt="Aiden AI Logo"
              className="absolute inset-0 w-full h-full object-contain rounded-full opacity-80 mix-blend-screen"
            />
          </motion.div>

          {/* Title and subtitle */}
          <h1 className="text-6xl font-extrabold text-emerald-400 drop-shadow-md">
            Aiden <span className="text-white">AI</span>
          </h1>

          <p className="mt-4 text-gray-400 text-lg max-w-2xl mx-auto">
            Smart leave management for modern teams — streamline, approve, and track with ease.
          </p>
        </motion.div>

        {/* Login Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="flex gap-8 mt-12 flex-wrap justify-center"
        >
          <motion.button
            whileHover={{
              scale: 1.08,
              boxShadow: "0px 0px 15px rgba(16, 185, 129, 0.6)",
            }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate("/login/manager")}
            className="px-8 py-3 bg-emerald-500 text-black font-semibold rounded-full text-lg shadow-md transition-all duration-300 hover:bg-emerald-400"
          >
            Manager Login
          </motion.button>

          <motion.button
            whileHover={{
              scale: 1.08,
              boxShadow: "0px 0px 15px rgba(16, 185, 129, 0.6)",
            }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate("/login/employee")}
            className="px-8 py-3 bg-emerald-500 text-black font-semibold rounded-full text-lg shadow-md transition-all duration-300 hover:bg-emerald-400"
          >
            Employee Login
          </motion.button>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="text-gray-500 text-sm mb-8">
        © {new Date().getFullYear()} Aiden AI — Smart Workflows, Human Touch.
      </footer>
    </div>
  );
};

export default Home;





















