import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const Detail = () => {
  const { id } = useParams();
  const [leave, setLeave] = useState(null);
  const navigate = useNavigate()

  useEffect(() => {
    const fetchLeave = async () => {
      try {
        const response = await axios.get(`https://ems-backend-woad.vercel.app/api/leave/detail/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (response.data.success) {
          setLeave(response.data.leave);
        }
      } catch (error) {
        alert(error.response?.data?.error || "Something went wrong. Please try again later.");
      }
    };

    fetchLeave();
  }, []);

  const changeStatus = async (id, status) => {
    try {
      const response = await axios.put(`https://ems-backend-woad.vercel.app/api/leave/${id}`, { status }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.data.success) {
        navigate('/admin-dashboard/leaves')
      }
    } catch (error) {
      alert(error.response?.data?.error || "Something went wrong. Please try again later.");
    }

  }



  if (!leave) return <div className="p-6">Loading...</div>;
  return (
    <div className="ml-64 flex-1 p-6 max-w-7xl mx-auto">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Leave Details</h2>
      <div className="bg-white p-6 rounded shadow-md max-w-xl mx-auto space-y-5">
        <div className="flex space-x-3">
          <p className="text-lg font-bold">Name:</p>
          <p className="font-medium">{leave.employeeId.userId?.name}</p>
        </div>
        <div className="flex space-x-3">
          <p className="text-lg font-bold">Employee ID:</p>
          <p className="font-medium">{leave.employeeId.employeeId}</p>
        </div>
        <div className="flex space-x-3">
          <p className="text-lg font-bold">Leave Type:</p>
          <p className="font-medium">{leave.leaveType}</p>
        </div>
        <div className="flex space-x-3">
          <p className="text-lg font-bold">Reason:</p>
          <p className="font-medium">{leave.reason}</p>
        </div>
        <div className="flex space-x-3">
          <p className="text-lg font-bold">Department:</p>
          <p className="font-medium">{leave.employeeId.department?.dep_name}</p>
        </div>
        <div className="flex space-x-3">
          <p className="text-lg font-bold">Start Date:</p>
          <p className="font-medium">{new Date(leave.startDate).toLocaleDateString()}</p>
        </div>
        <div className="flex space-x-3">
          <p className="text-lg font-bold">End Date:</p>
          <p className="font-medium">{new Date(leave.endDate).toLocaleDateString()}</p>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-3 space-y-2 sm:space-y-0">
          <p className="text-lg font-bold">
            {leave.status === "Pending" ? "Action:" : "Status:"}
          </p>

          {leave.status === "Pending" ? (
            <div className="flex space-x-2">
              <button className="px-4 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                onClick={() => changeStatus(leave._id, "Approved")}>Approve
              </button>
              <button className="px-4 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                onClick={() => changeStatus(leave._id, "Rejected")}>Reject
              </button>
            </div>
          ) : (
            <p className="font-medium">{leave.status}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Detail;