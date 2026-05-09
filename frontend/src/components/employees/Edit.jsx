import { useState, useEffect } from 'react';
import { fetchDepartments } from '../../utils/EmployeeHelper';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const Edit = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [employee, setEmployee] = useState({
    name: '',
    email: '',
    designation: '',
    department: '',
    salary: 0,
  });

  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await axios.get(`https://ems-backend-seven.vercel.app/api/employee/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (response.data.success) {
          const emp = response.data.employee;
          setEmployee({
            name: emp.userId.name || '',
            email: emp.email || '',
            designation: emp.designation || '',
            department: emp.department?._id || '',
            salary: emp.salary || 0,
          });
        }
      } catch (error) {
        console.log(response.data);
        alert(error.response?.data?.error || 'Something went wrong. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchEmployee();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        `http://localhost:5000/api/employee/${id}`,
        employee,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      if (response.data.success) {
        alert('Employee updated successfully!');
        navigate('/admin-dashboard/employees');
      }
    } catch (error) {
      alert(error.response?.data?.error || 'Something went wrong. Please try again later.');
    }
  };

  if (loading) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="ml-64 flex justify-center items-start min-h-screen p-6 bg-gray-50">
      <div className="w-full max-w-2xl bg-white p-6 rounded-lg shadow space-y-8">
        <h2 className="text-2xl font-bold text-center text-gray-800">Edit Employee</h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input
            name="name"
            type="text"
            placeholder="Name"
            value={employee.name}
            onChange={handleChange}
            className="px-4 py-2 border rounded-md w-full"
            required
          />

          <input
            name="email"
            type="email"
            placeholder="Email"
            value={employee.email}
            onChange={handleChange}
            className="px-4 py-2 border rounded-md w-full"
            required
          />

          <input
            name="designation"
            type="text"
            placeholder="Designation"
            value={employee.designation}
            onChange={handleChange}
            className="px-4 py-2 border rounded-md w-full"
            required
          />

          <select
            name="department"
            value={employee.department}
            onChange={handleChange}
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

          <input
            name="salary"
            type="number"
            placeholder="Salary"
            value={employee.salary}
            onChange={handleChange}
            className="px-4 py-2 border rounded-md w-full"
            required
          />

          <div className="md:col-span-2">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
            >
              Update Employee
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Edit;