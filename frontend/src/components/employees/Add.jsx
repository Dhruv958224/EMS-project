import { useState, useEffect } from 'react';
import { fetchDepartments } from '../../utils/EmployeeHelper';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const Add = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    dob: '',
    salary: '',
    employeeId: '',
    email: '',
    gender: '',
    designation: '',
    department: '',
    role: '',
    password: '',
  });

  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    const getDepartments = async () => {
      const departments = await fetchDepartments();
      setDepartments(departments);
    };
    getDepartments();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        'https://ems-backend-seven.vercel.app/api/employee/add',
        formData,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      if (response.data.success) {
        alert('Employee added successfully!');
        navigate('/admin-dashboard/employees');
      }
    } catch (error) {
      alert(
        error.response?.data?.error ||
        'Something went wrong. Please try again later.'
      );
    }
  };

  return (
    <div className="ml-64 min-h-screen bg-gray-100 flex items-start justify-center px-6 pt-16">
      <div className="w-full max-w-4xl bg-white shadow-xl rounded-lg p-8 space-y-8">
        <h2 className="text-3xl font-bold text-center text-gray-800">Add New Employee</h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <input
            name="name"
            type="text"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            className="px-5 py-3 border border-gray-300 rounded-md w-full" />

          <input
            name="email"
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="px-5 py-3 border border-gray-300 rounded-md w-full" />

          <input
            name="employeeId"
            type="text"
            placeholder="Employee ID"
            value={formData.employeeId}
            onChange={handleChange}
            className="px-5 py-3 border border-gray-300 rounded-md w-full" />

          <input
            name="dob"
            type="date"
            value={formData.dob}
            onChange={handleChange}
            className="px-5 py-3 border border-gray-300 rounded-md w-full" />

          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="px-5 py-3 border border-gray-300 rounded-md w-full">
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>

          <input
            name="designation"
            type="text"
            placeholder="Designation"
            value={formData.designation}
            onChange={handleChange}
            className="px-5 py-3 border border-gray-300 rounded-md w-full" />
          <select
            name="department"
            value={formData.department}
            onChange={handleChange}
            className="px-5 py-3 border border-gray-300 rounded-md w-full">
            <option value="">Select Department</option>
            {departments.length > 0 ? (
              departments.map((dep) => (
                <option key={dep._id} value={dep._id}>{dep.dep_name}</option>
              ))
            ) : (
              <option disabled>Loading departments...</option>
            )}
          </select>

          <input
            name="salary"
            type="number"
            placeholder="Salary"
            value={formData.salary}
            onChange={handleChange}
            className="px-5 py-3 border border-gray-300 rounded-md w-full" />

          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="px-5 py-3 border border-gray-300 rounded-md w-full">
            <option value="">Select Role</option>
            <option value="Admin">Admin</option>
            <option value="Manager">Manager</option>
            <option value="Employee">Employee</option>
            <option value="Intern">Intern</option>
          </select>

          <input
            name="password"
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="px-5 py-3 border border-gray-300 rounded-md w-full" />

          <div className="md:col-span-2">
            <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Add;