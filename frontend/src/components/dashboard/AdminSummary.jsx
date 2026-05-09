import { useEffect, useState } from "react";
import SummaryCard from "./SummaryCard";
import DashboardGraph from "./DashboardGraph";
import SummaryGraph from "./SummaryGraph";
import {
  FaFileAlt,
  FaCheckCircle,
  FaHourglassHalf,
  FaTimesCircle,
  FaBuilding,
  FaMoneyBillWave,
  FaUsers,
} from "react-icons/fa";
import axios from "axios";

const Dashboard = () => {
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const response = await axios.get("https://ems-project-ah24.vercel.app/api/dashboard/summary", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setSummary(response.data);
      } catch (error) {
        if (error.response?.data?.error) {
          alert(error.response.data.error);
        }
        console.log(error.message);
      }
    };
    fetchSummary();
  }, []);

  if (!summary) {
    return <div className="p-6 text-center text-lg font-medium">Loading...</div>;
  }

  return (
    <div className="ml-64 flex-1 p-6 space-y-12 max-w-7xl mx-auto">
      <section className="bg-white rounded-lg shadow-md p-6 space-y-8">
        <h2 className="text-2xl font-bold text-gray-800 text-center">Dashboard Overview</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <SummaryCard icon={<FaUsers className="text-3xl text-teal-600" />} text="Total Employees" number={summary.totalEmployees} />
          <SummaryCard icon={<FaBuilding className="text-3xl text-purple-600" />} text="Total Departments" number={summary.totalDepartments} />
          <SummaryCard icon={<FaMoneyBillWave className="text-3xl text-green-600" />} text="Monthly Salary" number={`$${summary.totalSalary.toLocaleString()}`} />
        </div>

        <div className="flex justify-center">
          <div className="w-full max-w-md">
            <DashboardGraph
              title="Dashboard Overview"
              labels={["Employees", "Departments", "Monthly Salary"]}
              dataPoints={[summary.totalEmployees, summary.totalDepartments, summary.totalSalary]}
              colors={[
                "rgba(13, 148, 136, 0.7)", 
                "rgba(126, 34, 206, 0.7)", 
                "rgba(34, 197, 94, 0.7)",  
              ]}
            />
          </div>
        </div>
      </section>

      <section className="bg-white rounded-lg shadow-md p-6 space-y-8">
        <h2 className="text-2xl font-bold text-gray-800 text-center">Leave Summary</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <SummaryCard icon={<FaFileAlt className="text-3xl text-blue-600" />} text="Leave Applied" number={summary.leaveSummary.appliedFor} />
          <SummaryCard icon={<FaCheckCircle className="text-3xl text-green-600" />} text="Leave Approved" number={summary.leaveSummary.approved} />
          <SummaryCard icon={<FaHourglassHalf className="text-3xl text-yellow-500" />} text="Leave Pending" number={summary.leaveSummary.pending} />
          <SummaryCard icon={<FaTimesCircle className="text-3xl text-red-600" />} text="Leave Rejected" number={summary.leaveSummary.rejected} />
        </div>

        <div className="flex justify-center">
          <div className="w-full max-w-md">
            <SummaryGraph leaveSummary={summary.leaveSummary} />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;