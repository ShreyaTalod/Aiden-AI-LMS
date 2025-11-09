import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface Option {
  label: string;
  link: string;
}

interface DropdownButtonProps {
  label: string;
  options: Option[];
}

const DropdownButton: React.FC<DropdownButtonProps> = ({ label, options }) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <motion.button
        className="px-8 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-lg shadow-md transition-all"
        whileHover={{ scale: 1.05 }}
      >
        {label}
      </motion.button>

      {open && (
        <motion.div
          className="absolute left-0 mt-2 w-40 bg-white text-gray-800 rounded-lg shadow-lg z-10"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
        >
          {options.map((option, index) => (
            <div
              key={index}
              onClick={() => navigate(option.link)}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-center"
            >
              {option.label}
            </div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default DropdownButton;

