import { Link } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import { columns, DepartmentButtons } from '../../utils/DepartmentTable';
import { useEffect, useState } from 'react';
import axios from 'axios';

const DepartmentList = () => {
  const [departments, setDepartments] = useState([]);
  const [filteredDepartments, setFilteredDepartments] = useState([]);

  const onDepartmentDelete = async (id) => {
    const updated = departments.filter(dep => dep._id !== id);
    setDepartments(updated);
    setFilteredDepartments(updated);
    window.location.reload();
  };

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await axios.get('https://ems-project-ah24.vercel.app/api/department/with-employees', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (response.data.success) {
          const Departments = response.data.departments;
          let sno = 1;
          const formatted = Departments.map(dep => ({
            _id: dep._id,
            sno: sno++,
            dep_name: dep.dep_name,
            employees: dep.employeeCount > 0 ? dep.employeeCount : 'No employees',
            action: <DepartmentButtons _id={dep._id} onDepartmentDelete={onDepartmentDelete} />,
          }));
          setDepartments(formatted);
          setFilteredDepartments(formatted);
        }
      } catch (error) {
        alert(error.response?.data?.error || 'Something went wrong. Please try again later.');
      }
    };

    fetchDepartments();
  }, []);

  const filterDepartments = (e) => {
    const keyword = e.target.value.toLowerCase();
    const filtered = departments.filter(dep =>
      dep.dep_name.toLowerCase().includes(keyword)
    );
    setFilteredDepartments(filtered);
  };

  return (
    <div className="ml-64 flex-1 p-6 max-w-7xl mx-auto">
      <div className="mb-4 text-center">
  <h3 className="text-2xl font-semibold text-gray-800">Manage Departments</h3>
</div>


      <div className="mb-6">
        <input
          type="text"
          placeholder="Search By Department Name"
          className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={filterDepartments}
        />
      </div>

      <Link
        to="/admin-dashboard/add-department"
        className="inline-block px-6 py-2 mb-4 bg-blue-600 text-white font-medium rounded hover:bg-blue-700 transition"
      >
        Add New Department
      </Link>

      <div className="mt-6">
        <DataTable columns={columns} data={filteredDepartments} />
      </div>
    </div>
  );
};

export default DepartmentList;