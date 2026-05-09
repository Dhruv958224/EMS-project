import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/authContext";

const View = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);
  const { user } = useAuth();
  const isAdmin = user?.role === "admin";

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await axios.get(`https://ems-backend-seven.vercel.app/api/employee/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (response.data.success) {
          setEmployee(response.data.employee);
        }
      } catch (error) {
        alert(error.response?.data?.error || "Something went wrong. Please try again later.");
      }
    };

    fetchEmployee();
  }, [id]);

  if (!employee) return <div className="p-6">Loading...</div>;

  const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

  return (
    <div
      className={`flex items-center justify-center min-h-[calc(100vh-4rem)] bg-gray-100 px-4 pt-16 ${isAdmin ? "ml-64" : ""
        } `}
    >
      <div className="w-full max-w-2xl bg-white p-8 rounded-lg shadow space-y-6">
        <h2 className="text-2xl font-semibold text-gray-800 text-center">Employee Details</h2>

        <div className="space-y-4 text-gray-700">
          <div className="flex gap-3">
            <p className="font-semibold w-32">Name:</p>
            <p>{employee.userId?.name}</p>
          </div>
          <div className="flex gap-3">
            <p className="font-semibold w-32">Email:</p>
            <p>{employee.userId?.email}</p>
          </div>
          <div className="flex gap-3">
            <p className="font-semibold w-32">Employee ID:</p>
            <p>{employee.employeeId}</p>
          </div>
          <div className="flex gap-3">
            <p className="font-semibold w-32">Department:</p>
            <p>{employee.department?.dep_name}</p>
          </div>
          <div className="flex gap-3">
            <p className="font-semibold w-32">Designation:</p>
            <p>{employee.designation}</p>
          </div>
          <div className="flex gap-3">
            <p className="font-semibold w-32">Gender:</p>
            <p>{employee.gender}</p>
          </div>
          <div className="flex gap-3">
            <p className="font-semibold w-32">DOB:</p>
            <p>{formatDate(employee.dob)}</p>
          </div>
          <div className="flex gap-3">
            <p className="font-semibold w-32">Salary:</p>
            <p>${employee.salary}</p>
          </div>
          <div className="flex gap-3">
            <p className="font-semibold w-32">Role:</p>
            <p>{employee.role}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default View;