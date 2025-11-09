import React from "react";

const CommandFooter: React.FC = () => {
  return (
    <footer className="w-full py-4 mt-20 backdrop-blur-lg bg-white/5 border-t border-emerald-500/20 shadow-inner text-center text-gray-400 text-sm">
      <p>
        © {new Date().getFullYear()}{" "}
        <span className="text-emerald-400 font-semibold">Aiden AI Systems</span> — All Rights Reserved.
      </p>
    </footer>
  );
};

export default CommandFooter;
