import { FitnessGoal } from "../contexts/FitnessContext";
import { useFitness } from "../contexts/FitnessContext";
import { useNavigate } from "react-router-dom";

interface Props {
  goal: FitnessGoal;
}

const FitnessCard = ({ goal }: Props) => {
  const { removeFitnessGoal, setId, setFormData } = useFitness();
  const navigate = useNavigate();

  const handleEdit = (id: any) => {
    setFormData(goal);
    navigate("/fitnessFormPage");
    setId(id);
  };

  return (
    <div className="relative bg-white shadow-md rounded-xl p-4 border border-gray-200 w-96 transition-transform hover:scale-105 hover:shadow-lg">
      <h2 className="text-lg font-bold text-gray-700 uppercase truncate">
        {goal.goal_type.replace("_", " ")}
      </h2>

      <div className="text-gray-600 text-sm mt-2 space-y-1">
        <p>
          <span className="font-semibold">Target:</span> {goal.target_value}
        </p>
        <p>
          <span className="font-semibold">Progress:</span> {goal.current_progress}
        </p>
        <p>
          <span className="font-semibold">Start:</span> {new Date(goal.start_date).toLocaleDateString()}
        </p>
        {goal.end_date && (
          <p>
            <span className="font-semibold">End:</span> {new Date(goal.end_date).toLocaleDateString()}
          </p>
        )}
      </div>

      <span
        className={`absolute top-3 right-3 text-xs font-semibold px-2 py-1 rounded-full ${
          goal.status === "complete"
            ? "bg-green-100 text-green-600"
            : "bg-yellow-100 text-yellow-600"
        }`}
      >
        {goal.status.toUpperCase()}
      </span>
      
      <div className="flex justify-between mt-4">
        <button
          onClick={() => handleEdit(goal.goal_id)}
          className="bg-blue-500 hover:bg-blue-600 text-white text-xs font-medium px-3 py-1 rounded-lg transition-all"
        >
          Edit
        </button>
        <button
          onClick={() => removeFitnessGoal(goal.goal_id)}
          className="bg-red-500 hover:bg-red-600 text-white text-xs font-medium px-3 py-1 rounded-lg transition-all"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default FitnessCard;
