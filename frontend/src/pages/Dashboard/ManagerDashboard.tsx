import React, { useEffect, useState, useMemo } from "react";
import Navbar from "../../components/Navbar";
import { getUser } from "../../utils/auth";
import { motion } from "framer-motion";
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

const ManagerDashboard: React.FC = () => {
  const user = getUser();
  const [requests, setRequests] = useState<LeaveRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [sortOption, setSortOption] = useState("newest");

  const fetchRequests = async () => {
    try {
      const res = await axios.get(`${API}/leave-requests`);
      setRequests(res.data);
    } catch (err) {
      console.error(err);
      toast.error("Could not fetch leave requests. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, status: string) => {
    try {
      await axios.put(`${API}/leave-request/${id}`, { status });
      toast.success(`Leave ${status.toLowerCase()} successfully!`);
      fetchRequests();
    } catch (err) {
      console.error("Error updating leave:", err);
      toast.error("Failed to update leave status.");
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

  // ✅ Filter & Sort Logic
  const filteredRequests = useMemo(() => {
    let filtered = requests.filter(
      (req) =>
        req.employee_name.toLowerCase().includes(search.toLowerCase()) ||
        req.email.toLowerCase().includes(search.toLowerCase()) ||
        req.reason.toLowerCase().includes(search.toLowerCase())
    );

    switch (sortOption) {
      case "newest":
        filtered.sort(
          (a, b) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
        break;
      case "oldest":
        filtered.sort(
          (a, b) =>
            new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
        );
        break;
      case "fromAsc":
        filtered.sort(
          (a, b) =>
            new Date(a.from_date).getTime() - new Date(b.from_date).getTime()
        );
        break;
      case "fromDesc":
        filtered.sort(
          (a, b) =>
            new Date(b.from_date).getTime() - new Date(a.from_date).getTime()
        );
        break;
    }

    return filtered;
  }, [requests, search, sortOption]);

  const resetFilters = () => {
    setSearch("");
    setSortOption("newest");
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />
      <ToastContainer position="top-right" autoClose={1500} />

      <main className="pt-24 px-10 max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-emerald-400 mb-2">
            Welcome back, {user?.name || "Manager"} 👋
          </h1>
          <p className="text-gray-400 text-lg">
            Role:{" "}
            {user?.role
              ? user.role.charAt(0).toUpperCase() + user.role.slice(1)
              : "Manager"}
          </p>
        </div>

        {/* Leave Requests Section */}
        <section className="bg-slate-900/50 p-8 rounded-2xl shadow-lg border border-emerald-500/20">
          {/* Header with Search + Sort + Reset */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
            <h2 className="text-2xl font-semibold text-emerald-400">
              Employee Leave Requests
            </h2>

            <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
              {/* Search Input */}
              <input
                type="text"
                placeholder="🔍 Search by name, email, or reason..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="bg-slate-800 text-white px-4 py-2 rounded-lg border border-gray-700 focus:ring-2 focus:ring-emerald-500 outline-none w-72"
              />

              {/* Sort Dropdown */}
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="bg-slate-800 text-white px-3 py-2 rounded-lg border border-gray-700 focus:ring-2 focus:ring-emerald-500 outline-none"
              >
             
                <option value="fromAsc">🔼 From Date (Earliest)</option>
                <option value="fromDesc">🔽 From Date (Latest)</option>
              </select>

              {/* Reset Button */}
              <button
                onClick={resetFilters}
                className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-all duration-200 border border-gray-600"
              >
                Reset
              </button>
            </div>
          </div>

          {/* Cards Section */}
          {loading ? (
            <p className="text-center text-gray-400">Loading requests...</p>
          ) : filteredRequests.length === 0 ? (
            <p className="text-center text-gray-400">
              No matching requests found.
            </p>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {filteredRequests.map((req) => (
                <motion.div
                  key={req.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="bg-slate-800/60 border border-emerald-500/10 rounded-xl p-6 shadow-md hover:shadow-emerald-500/10 transition-all duration-300"
                >
                  <h3 className="text-lg font-bold text-emerald-300">{req.employee_name}</h3>
                  <p className="text-gray-400 text-sm">{req.email}</p>

                  <p className="text-sm text-gray-500 mt-1">
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

                  {/* ✅ Status label + colored value */}
                  <p className="mt-3 text-sm font-semibold">
                    Status: <span className={getStatusColor(req.status)}>{req.status}</span>
                  </p>

                  {req.status === "Pending" && (
                    <div className="flex justify-center gap-3 mt-5">
                      <button
                        onClick={() => updateStatus(req.id, "Approved")}
                        className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-lg hover:scale-105 transition-all duration-200"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => updateStatus(req.id, "Rejected")}
                        className="px-4 py-2 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-lg hover:scale-105 transition-all duration-200"
                      >
                        Reject
                      </button>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default ManagerDashboard;
