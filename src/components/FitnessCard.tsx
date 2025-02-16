import { FitnessGoal } from "../contexts/FitnessContext";
import { useFitness } from "../contexts/FitnessContext";
import { useNavigate } from "react-router-dom";

interface Props {
  goal: FitnessGoal;
}

const FitnessCard = ({ goal }: Props) => {
  const {removeFitnessGoal,setId,setFormData } = useFitness();

  const navigate=useNavigate();

  const handleEdit = (id:any) => {
    console.log("edit id",id);
    setFormData(goal);
    navigate('/fitnessFormPage');
    setId(id);
  };

  return (
    <div className="p-4 border rounded-lg shadow-lg">
      <h2 className="text-lg font-semibold">{goal.goal_type.replace("_", " ").toUpperCase()}</h2>
      <p>Target: {goal.target_value}</p>
      <p>Current Progress: {goal.current_progress}</p>
      <p>Start Date: {new Date(goal.start_date).toLocaleDateString()}</p>
      {goal.end_date && <p>End Date: {new Date(goal.end_date).toLocaleDateString()}</p>}
      <p>Status: {goal.status.toUpperCase()}</p>

      {/* Edit Button */}
      <button onClick={()=>handleEdit(goal.goal_id)} className="cursor-pointer mt-2 bg-green-500 text-white px-3 py-1 rounded">
            Edit
      </button>


      {/* Delete Button */}
      <button
        onClick={() => removeFitnessGoal(goal.goal_id)}
        className="cursor-pointer mt-2 ml-5 bg-red-500 text-white px-3 py-1 rounded"
      >
        Delete
      </button>
    </div>
  );
};

export default FitnessCard;
