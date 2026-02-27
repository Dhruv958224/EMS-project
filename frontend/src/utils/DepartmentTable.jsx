import axios from "axios";
import { useNavigate } from "react-router-dom";

export const columns = [
  {
    name: "S.no",
    selector: (row) => row.sno,
    width: "250px",
  },
  {
    name: "Department Name",
    selector: (row) => row.dep_name,
    width: "350px",
  },

  {
    name: 'Employees Count',
    selector: row => row.employees || 'No employees',
    width: "300px",

  },


  {
    name: "Action",
    selector: (row) => row.action,
  },
];

export const DepartmentButtons = ({ _id, onDepartmentDelete }) => {
  const navigate = useNavigate();

  const handleDelete = async () => {
    const confirm = window.confirm("Do you want to delete?");
    if (confirm) {
      try {
        const response = await axios.delete(`http://localhost:5000/api/department/${_id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (response.data.success) {

          alert("Department deleted successfully!");
          onDepartmentDelete(_id);
        } else {
          alert("Failed to delete department.");
        }
      } catch (error) {
        alert(error.response?.data?.error || "Something went wrong. Please try again later.");
      }
    }
  };



  return (
    <div className="flex gap-3 justify-center">
      <button
        className="px-3 py-1 text-sm font-medium text-white bg-teal-500 rounded hover:bg-teal-600 transition duration-200"
        onClick={() => navigate(`/admin-dashboard/department/${_id}`)}
      >
        Edit
      </button>
      <button
        className="px-3 py-1 text-sm font-medium text-white bg-red-600 rounded hover:bg-red-700 transition duration-200"
        onClick={handleDelete}
      >
        Delete
      </button>
    </div>
  );
};