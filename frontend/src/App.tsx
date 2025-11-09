// frontend/src/App.tsx
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import CommandNavbar from "./components/Navbar";
import CommandFooter from "./components/CommandFooter";

const App: React.FC = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gradient-to-br from-emerald-950 via-slate-900 to-black text-gray-100">
        <CommandNavbar />
        <main className="flex-grow pt-20 pb-10 px-10">
          <AppRoutes />
        </main>
        <CommandFooter />
      </div>
    </Router>
  );
};

export default App;
