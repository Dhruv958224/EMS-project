import { NavLink, useNavigate } from 'react-router-dom';
import {
  FaTachometerAlt,
  FaUsers,
  FaBuilding,
  FaMoneyBill,
  FaCog,
  FaCalendarAlt,
  FaKey,
} from 'react-icons/fa';
import { useState } from 'react';

const AdminSidebar = () => {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const navigate = useNavigate();

  const linkClasses = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-2 rounded transition-colors ${isActive ? 'bg-teal-600 text-white font-semibold' : 'text-gray-300 hover:bg-gray-700'
    }`;

  return (
    <div className="fixed top-0 left-0 h-screen w-64 bg-gray-800 text-white p-6 overflow-y-auto z-50">
      <div className="mb-8">
        <h3 className="text-2xl font-bold text-center">Employee MS</h3>
      </div>

      <div className="flex flex-col gap-4">
        <NavLink to="/admin-dashboard" className={linkClasses} end>
          <FaTachometerAlt className="text-lg" />
          <span className="text-sm">Dashboard</span>
        </NavLink>

        <NavLink to="/admin-dashboard/employees" className={linkClasses}>
          <FaUsers className="text-lg" />
          <span className="text-sm">Employee</span>
        </NavLink>

        <NavLink to="/admin-dashboard/departments" className={linkClasses}>
          <FaBuilding className="text-lg" />
          <span className="text-sm">Department</span>
        </NavLink>

        <NavLink to="/admin-dashboard/leaves" className={linkClasses}>
          <FaCalendarAlt className="text-lg" />
          <span className="text-sm">Leave</span>
        </NavLink>

        <NavLink to="/admin-dashboard/salary/add" className={linkClasses}>
          <FaMoneyBill className="text-lg" />
          <span className="text-sm">Salary</span>
        </NavLink>

        <button
          onClick={() => setSettingsOpen(!settingsOpen)}
          className="flex items-center justify-between w-full px-4 py-2 rounded transition-colors text-gray-300 hover:bg-gray-700"
        >
          <div className="flex items-center gap-3">
            <FaCog className="text-lg" />
            <span className="text-sm">Settings</span>
          </div>
          <span>{settingsOpen ? '▲' : '▼'}</span>
        </button>

        {settingsOpen && (
          <div className="pl-10 mt-2 flex flex-col gap-2">
            <NavLink
              to="/admin-dashboard/change-password"
              className={({ isActive }) =>
                `flex items-center gap-2 px-4 py-2 text-sm rounded transition-colors ${isActive ? 'bg-teal-600 text-white font-semibold' : 'text-gray-300 hover:bg-gray-700'
                }`
              }
            >
              <FaKey className="text-sm" />
              Change Password
            </NavLink>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminSidebar;