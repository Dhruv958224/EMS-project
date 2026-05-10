import { useState, useEffect } from 'react';
import { fetchDepartments, getEmployees } from '../../utils/EmployeeHelper';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Add = () => {
  const navigate = useNavigate();


  const [salary, setSalary] = useState({
    employeeId: null,
    basicSalary: 0,
    payDate: null,
  });

  const [departments, setDepartments] = useState([]);
  const [employees, setEmployees] = useState([]);


  useEffect(() => {
    const getDepartments = async () => {
      try {
        const deptList = await fetchDepartments();
        setDepartments(deptList);
      } catch (error) {
        console.error('Failed to fetch departments:', error);
      }
    };

    getDepartments();
  }, []);

  const handleDepartment = async (e) => {
    const emps = await getEmployees(e.target.value)
    setEmployees(emps)
  }



  const handleChange = (e) => {
    const { name, value } = e.target;
    setSalary((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `https://ems-backend-woad.vercel.app/api/salary/add`,
        salary,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      if (response.data.success) {
        alert("Salary added successfully ✅");
        navigate('/admin-dashboard/employees');
      }
    } catch (error) {
      alert(error.response?.data?.error || 'Something went wrong. Please try again later.');
    }
  };



  return (
    <div className="ml-64 min-h-screen bg-gray-100 flex items-start justify-center pt-20 px-4">
      <div className="w-full max-w-2xl bg-white p-6 rounded-lg shadow space-y-8">
        <h2 className="text-2xl font-bold text-center text-gray-800">Add Salary</h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <select
            name="department"
            onChange={handleDepartment}
            className="px-4 py-2 border rounded-md w-full"
            required
          >
            <option value="">Select Department</option>
            {departments.map((dep) => (
              <option key={dep._id} value={dep._id}>
                {dep.dep_name}
              </option>
            ))}
          </select>

          <select
            name="employeeId"
            onChange={handleChange}
            className="px-4 py-2 border rounded-md w-full"
            required
          >
            <option value="">Select Employee</option>
            {employees.map((emp) => (
              <option key={emp._id} value={emp._id}>
                {emp.employeeId}
              </option>
            ))}
          </select>

          <input
            name="basicSalary"
            type="number"
            placeholder="Salary"
            onChange={handleChange}
            className="px-4 py-2 border rounded-md w-full"
            required
          />

          <input
            name="payDate"
            type="date"
            placeholder="payDate"
            onChange={handleChange}
            className="px-4 py-2 border rounded-md w-full"
            required
          />

          <div className="md:col-span-2">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
            >
              Add Salary
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Add;