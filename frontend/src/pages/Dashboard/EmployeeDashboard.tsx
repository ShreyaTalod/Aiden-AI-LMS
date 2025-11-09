import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import { getUser, clearIsNewFlag } from "../../utils/auth";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface LeaveRequest {
  id: string;
  employee_name: string;
  email: string;
  reason: string;
  from_date: string;
  to_date: string;
  status: string;
  created_at: string;
}

const API = "http://127.0.0.1:8080/api";

const EmployeeDashboard: React.FC = () => {
  const user = getUser();
  const [requests, setRequests] = useState<LeaveRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ reason: "", from_date: "", to_date: "" });

  const fetchRequests = async () => {
    try {
      const res = await axios.get(`${API}/leave-requests/${user?.email}`);
      setRequests(res.data);
    } catch (err) {
      console.error(err);
      toast.error("Could not load your leave requests");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(`${API}/leave-request`, {
        employee_name: user?.name,
        email: user?.email,
        reason: formData.reason,
        from_date: formData.from_date,
        to_date: formData.to_date,
      });
      toast.success("Leave request submitted successfully!");
      setFormData({ reason: "", from_date: "", to_date: "" });
      setShowForm(false);
      fetchRequests();
    } catch {
      toast.error("Error submitting leave request");
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Approved":
        return "text-emerald-400";
      case "Rejected":
        return "text-red-400";
      case "Pending":
        return "text-yellow-400";
      default:
        return "text-gray-400";
    }
  };

  useEffect(() => {
    fetchRequests();
    clearIsNewFlag();
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />
      <ToastContainer position="top-right" autoClose={1500} />

      <main className="pt-24 px-8 max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h1 className="text-4xl font-bold text-emerald-400 mb-2">
            {user?.isNew
              ? `Welcome to Aiden AI, ${user?.name || "Employee"}!`
              : `Welcome back, ${user?.name || "Employee"} 👋`}
          </h1>
          <p className="text-gray-400 text-lg">
            Role: {user?.role ? user.role.charAt(0).toUpperCase() + user.role.slice(1) : "Employee"}
          </p>
        </motion.div>

        {/* New Leave Button */}
        <div className="flex justify-center mb-6">
          <button
            onClick={() => setShowForm((prev) => !prev)}
            className="px-5 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg text-white font-semibold hover:scale-105 transition-transform"
          >
            {showForm ? "Close Form" : "+ New Leave Request"}
          </button>
        </div>

        {/* Animated Leave Form */}
        <AnimatePresence>
          {showForm && (
            <motion.form
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              onSubmit={handleSubmit}
              className="bg-slate-900/60 p-6 rounded-2xl mb-10 shadow-lg border border-emerald-500/20 max-w-2xl mx-auto"
            >
              <h2 className="text-2xl font-semibold text-emerald-400 mb-4 text-center">
                Leave Request Form
              </h2>

              <div className="flex flex-col gap-4">
                <textarea
                  placeholder="Reason for leave"
                  value={formData.reason}
                  onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                  required
                  className="w-full p-3 rounded-lg bg-slate-800 border border-gray-700 focus:ring-2 focus:ring-emerald-500 outline-none"
                />

                <div className="flex gap-4">
                  <div className="flex flex-col w-1/2">
                    <label className="text-sm text-gray-400 mb-1">From Date</label>
                    <input
                      type="date"
                      value={formData.from_date}
                      onChange={(e) => setFormData({ ...formData, from_date: e.target.value })}
                      required
                      className="p-3 rounded-lg bg-slate-800 border border-gray-700 focus:ring-2 focus:ring-emerald-500 outline-none"
                    />
                  </div>
                  <div className="flex flex-col w-1/2">
                    <label className="text-sm text-gray-400 mb-1">To Date</label>
                    <input
                      type="date"
                      value={formData.to_date}
                      onChange={(e) => setFormData({ ...formData, to_date: e.target.value })}
                      required
                      className="p-3 rounded-lg bg-slate-800 border border-gray-700 focus:ring-2 focus:ring-emerald-500 outline-none"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="mt-4 w-full py-3 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg font-bold hover:scale-105 transition-transform"
                >
                  Submit Request
                </button>
              </div>
            </motion.form>
          )}
        </AnimatePresence>

        {/* Leave Requests List */}
        <section className="bg-slate-900/50 p-6 rounded-2xl shadow-lg border border-emerald-500/20">
          <h2 className="text-2xl font-semibold text-emerald-400 mb-6 text-center">
            Your Leave Requests
          </h2>

          {loading ? (
            <p className="text-center text-gray-400">Loading requests...</p>
          ) : requests.length === 0 ? (
            <p className="text-center text-gray-400">No leave requests yet.</p>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {requests.map((req) => (
                <motion.div
                  key={req.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="bg-slate-800/60 border border-emerald-500/10 rounded-xl p-6 shadow-md hover:shadow-emerald-500/10 transition-all duration-300"
                >
                  <p className="text-sm text-gray-500">
                    Requested on:{" "}
                    <span className="text-emerald-400">
                      {new Date(req.created_at).toLocaleDateString("en-GB")}
                    </span>
                  </p>
                  <p className="mt-3 text-gray-300">
                    🗓 <span className="text-emerald-400 font-medium">Leave from</span>{" "}
                    {new Date(req.from_date).toLocaleDateString("en-GB")}{" "}
                    <span className="text-emerald-400 font-medium">to</span>{" "}
                    {new Date(req.to_date).toLocaleDateString("en-GB")}
                  </p>
                  <p className="text-gray-300 mt-2">
                    <strong>Reason:</strong> {req.reason}
                  </p>
                  <p className="text-sm font-semibold mt-3">
                    Status:{" "}
                    <span className={getStatusColor(req.status)}>{req.status}</span>
                  </p>
                </motion.div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default EmployeeDashboard;

