import { useNavigate } from "react-router-dom";

export const columns = [
  { name: "S.no", selector: (row) => row.sno },
  { name: "Emp ID", selector: (row) => row.employeeId },
  { name: "Name", selector: (row) => row.name },
  { name: "Leave Type", selector: (row) => row.leaveType },
  { name: "Department", selector: (row) => row.department },
  { name: "Days", selector: (row) => row.days },
  { name: "Status", selector: (row) => row.status },
  { name: "Action", selector: (row) => row.action },
];

export const LeaveButtons = ({ Id }) => {
  const navigate = useNavigate();

  const handleView = () => {
    navigate(`/admin-dashboard/leaves/${Id}`);
  };

  return (
    <button
      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
      onClick={handleView}
    >
      View
    </button>
  );
};