import Sidebar from "../components/EmployeeDashboard/Sidebar";
import { Outlet } from "react-router-dom";
import NavBar from "../components/dashboard/NavBar";

const EmployeeDashboard = () => {

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 bg-gray-100">
        <NavBar />
        <Outlet />
      </div>
    </div>
  );
};

export default EmployeeDashboard;