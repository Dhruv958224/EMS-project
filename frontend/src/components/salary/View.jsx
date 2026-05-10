import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/authContext";

const View = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const isAdmin = user?.role === "Admin";

  const [salaries, setSalaries] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchSalaries = async () => {
    try {
      const response = await axios.get(`https://ems-backend-woad.vercel.app/api/salary/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.data.success) {
        setSalaries(response.data.salary);
      }
    } catch (error) {
      alert(error.response?.data?.error || "Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSalaries();
  }, [id]);

  return (
    <>
      {loading ? (
        <div className="text-center py-10 text-lg font-medium">Loading...</div>
      ) : (
        <div className={`pt-16 ${isAdmin ? "ml-64" : ""}`}>
          <div className="flex justify-end px-8">
            <div className="w-full max-w-6xl">
              <h3 className="text-2xl font-semibold text-gray-800 text-center mb-6">Salary History</h3>

              {salaries.length > 0 ? (
                <div className="w-full overflow-x-auto bg-white rounded shadow">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SNO</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Emp ID</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Salary</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pay Date</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {salaries.map((salary, index) => (
                        <tr key={salary._id || index}>
                          <td className="px-6 py-4">{index + 1}</td>
                          <td className="px-6 py-4">{salary.employeeId?.employeeId || "N/A"}</td>
                          <td className="px-6 py-4">
                            {new Intl.NumberFormat("en-US", {
                              style: "currency",
                              currency: "USD",
                            }).format(salary.basicSalary)}
                          </td>
                          <td className="px-6 py-4">{new Date(salary.payDate).toLocaleDateString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center text-gray-600 mt-4">No Records</div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default View;