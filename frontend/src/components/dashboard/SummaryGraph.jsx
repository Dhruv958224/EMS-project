import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const SummaryGraph = ({ leaveSummary }) => {
  const data = {
    labels: ["Applied", "Approved", "Pending", "Rejected"],
    datasets: [
      {
        label: "Leave Summary",
        data: [
          leaveSummary.appliedFor,
          leaveSummary.approved,
          leaveSummary.pending,
          leaveSummary.rejected,
        ],
        backgroundColor: [
          "rgba(59, 130, 246, 0.7)", 
          "rgba(34, 197, 94, 0.7)",  
          "rgba(234, 179, 8, 0.7)",  
          "rgba(239, 68, 68, 0.7)",  
        ],
        borderRadius: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      title: { display: true, text: "Leave Summary Overview" },
    },
  };

  return (
    <div className="w-full max-w-xs h-64 mx-auto">
      <Bar data={data} options={options} />
    </div>
  );
};

export default SummaryGraph;