import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend, Title);

const DashboardGraph = ({ title, labels, dataPoints, colors }) => {
  const data = {
    labels,
    datasets: [
      {
        label: title,
        data: dataPoints,
        backgroundColor: colors,
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "bottom" },
      title: { display: true, text: `${title}` },
    },
  };

  return (
    <div className="w-full max-w-xs h-64 mx-auto">
      <Pie data={data} options={options} />
    </div>
  );
};

export default DashboardGraph;