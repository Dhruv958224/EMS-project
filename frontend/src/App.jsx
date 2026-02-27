import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import PrivateRoutes from "./utils/privateroutes";
import RoleBasedRoute from "./utils/RoleBasedRoute";
import AdminSummary from "./components/dashboard/AdminSummary";
import DepartmentList from "./components/department/DepartmentList";
import AddDepartment from "./components/department/AddDepartment";
import EditDepartment from "./components/department/EditDepartment";
import EmployeeList from "./components/employees/List";
import AddEmployee from "./components/employees/Add";
import ViewEmployee from "./components/employees/View";
import EditEmployee from "./components/employees/Edit";
import AddSalary from "./components/salary/Add";
import ViewSalary from "./components/salary/View";
import SummaryCard from "./components/EmployeeDashboard/SummaryCard";
import Setting from "./components/common/setting";
import LeaveList from "./components/leave/List";
import AddLeave from "./components/leave/Add";
import Table from "./components/leave/Table";
import Detail from "./components/leave/Detail";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/admin-dashboard" />} />
        <Route path="/login" element={<Login />} />

        <Route
          path="/admin-dashboard"
          element={
            <PrivateRoutes>
              <RoleBasedRoute requiredRole={["admin"]}>
                <AdminDashboard />
              </RoleBasedRoute>
            </PrivateRoutes>
          }
        >
          <Route index element={<AdminSummary />} />
          <Route path="departments" element={<DepartmentList />} />
          <Route path="add-department" element={<AddDepartment />} />
          <Route path="department/:id" element={<EditDepartment />} />
          <Route path="employees" element={<EmployeeList />} />
          <Route path="add-employee" element={<AddEmployee />} />
          <Route path="employees/:id" element={<ViewEmployee />} />
          <Route path="employees/edit/:id" element={<EditEmployee />} />
          <Route path="leaves" element={<Table />} />
          <Route path="leaves/:id" element={<Detail />} />
          <Route path="employees/leaves/:id" element={<LeaveList />} />
          <Route path="employees/salary/:id" element={<ViewSalary />} />
          <Route path="salary/add" element={<AddSalary />} />
          <Route path="change-password" element={<Setting />} />
        </Route>


        <Route
          path="/employee-dashboard"
          element={
            <PrivateRoutes>
              <RoleBasedRoute requiredRole={["Admin", "Employee", "Manager", "Intern"]}>
                <EmployeeDashboard />
              </RoleBasedRoute>
            </PrivateRoutes>
          }
        >
          <Route index element={<SummaryCard />} />
          <Route path="profile/:id" element={<ViewEmployee />} />
          <Route path="salary/:id" element={<ViewSalary />} />
          <Route path="change-password" element={<Setting />} />
          <Route path="leaves/:id" element={<LeaveList />} />
          <Route path="add-leave" element={<AddLeave />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;