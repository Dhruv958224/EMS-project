import AdminSidebar from "../components/dashboard/AdminSidebar";
import { useAuth } from "../context/authContext";
import NavBar from "../components/dashboard/NavBar";
import { Outlet } from "react-router-dom";

const AdminDashboard = () => {
  const { user } = useAuth();

  return (
    <div className="flex h-screen">
      <AdminSidebar />
      <div className="flex-1 bg-gray-100">
        <NavBar />
        <Outlet />
      </div>
    </div>
  );
};

export default AdminDashboard;