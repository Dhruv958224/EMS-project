import { FaUser } from "react-icons/fa";
import { useAuth } from "../../context/authContext";

const SummaryCard = () => {
  const { user } = useAuth(); 

  return (
    <div className="flex items-center p-4 bg-white shadow-md rounded-lg space-x-4">
      <div className="text-blue-500 text-3xl">
        <FaUser />
      </div>
      <div>
        <p className="text-sm text-gray-500">Welcome Back</p>
        <p className="text-lg font-semibold text-gray-800">{user?.name || "User"}</p>
      </div>
    </div>
  );
};

export default SummaryCard;