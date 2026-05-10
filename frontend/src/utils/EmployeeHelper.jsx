import axios from "axios";
import { useNavigate } from "react-router-dom";

export const columns = [
  {
    name: "S.no",
    selector: (row) => row.sno,
    width: "150px",
  },
  {
    name: "Name",
    selector: (row) => row.name,
    width: "200px",
  },
  {
    name: "Department",
    selector: (row) => row.dep_name,
    width: "250px",
  },
  {
    name: "DOB",
    selector: (row) => row.dob,
    width: "230px",
  },
  {
    name: "Action",
    selector: (row) => row.action,

  },
];

export const fetchDepartments = async () => {
  let departments;
  try {
    const response = await axios.get('https://ems-backend-woad.vercel.app/api/department', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });

    if (response.data.success) {
      departments = response.data.departments
    }
  } catch (error) {
    alert(error.response?.data?.error || 'Something went wrong. Please try again later.');
  }
  return departments
};


export const getEmployees = async (id) => {
  let employees;
  try {
    const response = await axios.get(`https://ems-backend-woad.vercel.app/api/employee/department/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });

    if (response.data.success) {
      employees = response.data.employees
    }
  } catch (error) {
    alert(error.response?.data?.error || 'Something went wrong. Please try again later.');
  }
  return employees
};


export const EmployeeButtons = ({ _id }) => {
  const navigate = useNavigate();
  return (
    <div className="inline-flex flex-row gap-3">
      <button
        className="px-2 py-1 text-sm font-medium text-white bg-teal-500 rounded hover:bg-teal-600 transition duration-200"
        onClick={() => navigate(`/admin-dashboard/employees/${_id}`)}
      >
        View
      </button>

      <button
        className="px-2 py-1 text-sm font-medium text-white bg-red-600 rounded hover:bg-red-700 transition duration-200"
        onClick={() => navigate(`/admin-dashboard/employees/edit/${_id}`)}
      >
        Edit
      </button>

      <button
        className="px-2 py-1 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-700 transition duration-200"
        onClick={() => navigate(`/admin-dashboard/employees/salary/${_id}`)}
      >
        Salary
      </button>

      <button
        className="px-2 py-1 text-sm font-medium text-white bg-green-600 rounded hover:bg-green-700 transition duration-200"
        onClick={() => navigate(`/admin-dashboard/employees/leaves/${_id}`)}
      >
        Leave
      </button>
    </div>
  );
};