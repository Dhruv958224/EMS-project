import { Link, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/authContext';

const LeaveList = () => {
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const { id } = useParams();
  const { user } = useAuth();

  const fetchLeaves = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/leave/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.data.success) {
        setLeaves(response.data.leaves);
      }
    } catch (error) {
      setErrorMsg(error.response?.data?.error || "Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaves();
  }, [id]);

  const isAdmin = user?.role === "admin";

  return (
    <div className={`${isAdmin ? "ml-64" : ""} flex-1 p-6 pt-16 transition-all duration-300`}>
      <h3 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Manage Leaves</h3>

      {["Employee", "Manager", "Intern"].includes(user?.role) && (
        <Link
          to="/employee-dashboard/add-leave"
          className="inline-block mb-6 px-6 py-2 bg-blue-600 text-white font-medium rounded hover:bg-blue-700 transition"
        >
          Add New Leave
        </Link>
      )}

      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SNO</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Leave Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">From</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">To</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Applied Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {loading ? (
              <tr>
                <td colSpan="7" className="text-center py-6">Loading...</td>
              </tr>
            ) : leaves.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center py-6">No leave records found.</td>
              </tr>
            ) : (
              leaves.map((leave, index) => (
                <tr key={leave._id || index}>
                  <td className="px-6 py-4">{index + 1}</td>
                  <td className="px-6 py-4">{leave.leaveType}</td>
                  <td className="px-6 py-4">{new Date(leave.startDate).toLocaleDateString()}</td>
                  <td className="px-6 py-4">{new Date(leave.endDate).toLocaleDateString()}</td>
                  <td className="px-6 py-4">{leave.reason}</td>
                  <td className="px-6 py-4">{new Date(leave.appliedDate).toLocaleDateString()}</td>
                  <td className="px-6 py-4">{leave.status}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeaveList;