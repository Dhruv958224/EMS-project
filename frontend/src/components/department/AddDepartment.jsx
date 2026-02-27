import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddDepartment = () => {
  const [department, setDepartment] = useState({
    dep_name: '',
    description: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDepartment({ ...department, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!department.dep_name.trim()) {
      alert('Department name is required');
      return;
    }

    try {
      const response = await axios.post(
        'http://localhost:5000/api/department/add',
        department,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      if (response.data.success) {
        alert("Department added successfully!");
        navigate('/admin-dashboard/departments');
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.response.data.error);
      } else {
        alert('Something went wrong. Please try again later.');
      }
    }
  };
  return (
    <div className="min-h-screen bg-gray-100 flex items-start justify-center pt-20 px-4">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h3 className="text-2xl font-bold mb-6 text-gray-800">Add Department</h3>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="dep_name" className="block text-sm font-medium text-gray-700">
              Department Name
            </label>
            <input
              type="text"
              id="dep_name"
              name="dep_name"
              value={department.dep_name}
              onChange={handleChange}
              placeholder="Enter Dep Name"
              className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              name="description"
              id="description"
              value={department.description}
              onChange={handleChange}
              placeholder="Description"
              className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200"
          >
            Add Department
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddDepartment;