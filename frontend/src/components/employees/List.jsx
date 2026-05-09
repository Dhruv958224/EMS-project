import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { columns, EmployeeButtons } from '../../utils/EmployeeHelper';
import DataTable from 'react-data-table-component';
import axios from 'axios';

const List = () => {
  const [employees, setEmployees] = useState([]);
  const [empLoading, setEmpLoading] = useState(false);
  const [filteredEmployee, setFilteredEmployees] = useState([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      setEmpLoading(true);
      try {
        const response = await axios.get('https://ems-project-ah24.vercel.app/api/employee', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        if (response.data.success) {
          let sno = 1;
          const data = response.data.employees.map((emp) => ({
            _id: emp._id,
            sno: sno++,
            dep_name: emp.department?.dep_name || 'N/A',
            name: emp.userId?.name || 'N/A',
            dob: emp.dob ? new Date(emp.dob).toISOString().split('T')[0] : 'N/A',
            action: <EmployeeButtons _id={emp._id} />,
          }));

          setEmployees(data);
          setFilteredEmployees(data);
        }
      } catch (error) {
        alert(error.response?.data?.error || 'Something went wrong. Please try again later.');
      } finally {
        setEmpLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  const handleFilter = (e) => {
    const records = employees.filter((emp) =>
      emp.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredEmployees(records);
  };

  return (
    <div className="ml-64 flex-1 p-6 max-w-7xl mx-auto">
      <div className="mb-4">
        <h3 className="text-2xl font-semibold text-gray-800 text-center">Manage Employees</h3>
      </div>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Search By Employee Name"
          className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={handleFilter}
        />
      </div>

      <Link
        to="/admin-dashboard/add-employee"
        className="inline-block px-6 py-2 mb-4 bg-blue-600 text-white font-medium rounded hover:bg-blue-700 transition"
      >
        Add New Employee
      </Link>

      <div>
        {empLoading ? (
          <p className="text-center text-gray-500">Loading employees...</p>
        ) : (
          <DataTable columns={columns} data={filteredEmployee} />
        )}
      </div>
    </div>
  );
};

export default List;