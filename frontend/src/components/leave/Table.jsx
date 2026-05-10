import { useEffect, useState } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import { columns, LeaveButtons } from "../../utils/LeaveHelper";

const Table = () => {
  const [leaves, setLeaves] = useState([]);
  const [filteredLeaves, setFilteredLeaves] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const fetchLeaves = async () => {
    try {
      const response = await axios.get("https://ems-backend-woad.vercel.app/api/leave", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.data.success) {
        let sno = 1;
        const data = response.data.leaves.map((leave) => {
          const emp = leave.employeeId || {};
          const user = emp.userId || {};
          const dept = emp.department || {};

          const start = new Date(leave.startDate);
          const end = new Date(leave.endDate);
          const days =
            Math.floor((end - start) / (1000 * 60 * 60 * 24)) + 1;

          return {
            _id: leave._id,
            sno: sno++,
            employeeId: emp.employeeId || "N/A",
            name: user.name || "N/A",
            leaveType: leave.leaveType || "N/A",
            department: dept.dep_name || "N/A",
            days: isNaN(days) ? "N/A" : days,
            status: leave.status || "N/A",
            action: <LeaveButtons Id={leave._id} />,
          };
        });

        setLeaves(data);
        setFilteredLeaves(data);
      }
    } catch (error) {
      console.error("Fetch error:", error);
      alert(
        error.response?.data?.error ||
        "Something went wrong. Please try again later."
      );
    }
  };

  useEffect(() => {
    fetchLeaves();
  }, []);

  const filterByInput = (e) => {
    const data = leaves.filter((leave) =>
      leave.employeeId
        .toLowerCase()
        .includes(e.target.value.toLowerCase())
    );
    setFilteredLeaves(data);
  };

  const filterByButton = (status) => {
    const data = leaves.filter((leave) =>
      leave.status.toLowerCase().includes(status.toLowerCase())
    );
    setFilteredLeaves(data);
    setIsDropdownOpen(false);
  };

  return (
    <>
      {filteredLeaves ? (
        <div className="ml-64 min-h-screen bg-gray-100 p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            <h3 className="text-2xl font-semibold text-gray-800 text-center">
              Manage Leaves
            </h3>

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <input
                type="text"
                placeholder="Search By Emp Id"
                className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={filterByInput}
              />

              <div className="relative w-full max-w-md">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center justify-between w-full px-4 py-2 bg-blue-600 text-white font-medium border border-blue-700 rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                >
                  <span>Search By Status</span>
                  <span className="ml-2 text-sm">
                    {isDropdownOpen ? "▲" : "▼"}
                  </span>
                </button>

                {isDropdownOpen && (
                  <div className="absolute top-full mt-2 w-full bg-white border border-gray-200 rounded-md shadow-lg z-20">
                    <button
                      className="w-full px-4 py-2 text-sm text-blue-700 bg-blue-100 hover:bg-blue-200 transition"
                      onClick={() => {
                        setFilteredLeaves(leaves);
                        setIsDropdownOpen(false);
                      }}
                    >
                      Applied
                    </button>

                    <button
                      className="w-full px-4 py-2 text-sm text-yellow-700 bg-yellow-100 border-b border-yellow-400 hover:bg-yellow-200 transition"
                      onClick={() => filterByButton("Pending")}
                    >
                      Pending
                    </button>
                    <button
                      className="w-full px-4 py-2 text-sm text-green-700 bg-green-100 border-b border-green-400 hover:bg-green-200 transition"
                      onClick={() => filterByButton("Approved")}
                    >
                      Approved
                    </button>
                    <button
                      className="w-full px-4 py-2 text-sm text-red-700 bg-red-100 border-b border-red-400 hover:bg-red-200 transition"
                      onClick={() => filterByButton("Rejected")}
                    >
                      Rejected
                    </button>

                  </div>
                )}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow overflow-x-auto">
              <DataTable columns={columns} data={filteredLeaves} />
            </div>
          </div>
        </div>
      ) : (
        <div className="ml-64 p-6 text-center text-lg font-medium">
          Loading...
        </div>
      )}
    </>
  );
};

export default Table;