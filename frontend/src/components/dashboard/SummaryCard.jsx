import { IconContext } from "react-icons/lib";

const SummaryCard = ({ icon, text, number }) => {
  return (
    <div className="flex flex-col items-center justify-center text-center space-y-3">
      <div className="bg-white rounded-full p-3 shadow-md">
        <IconContext.Provider value={{ className: "text-4xl" }}>
          {icon}
        </IconContext.Provider>
      </div>
      <div>
        <p className="text-sm font-medium text-gray-600">{text}</p>
        <p className="text-xl font-bold text-gray-800">{number}</p>
      </div>
    </div>
  );
};

export default SummaryCard;