
import { useWorkout } from "../contexts/WorkoutContext";
import { useNavigate } from "react-router-dom";
import { WorkoutCardProps } from "../interfaces/WorkoutInterface";

//shows contents for workout form has edit , delete button to edit or delete workout datas
export const WorkoutCard = ({ workout,onDelete }: WorkoutCardProps) => {
  const { setFormData, setId } = useWorkout();
  const navigate = useNavigate();

  //handles edit and selects workout id to edit 
  const handleEdit = (id: any) => {
    setFormData(workout);
    navigate("/workoutFormPage");
    setId(id);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-md p-5 w-64 transition-transform transform hover:scale-105">
      <h2 className="text-xl font-bold text-gray-800 uppercase">{workout.exercise_type}</h2>
      <div className="mt-3 text-gray-600 space-y-1">
        <p><span className="font-semibold">⏳ Duration:</span> {workout.duration} mins</p>
        <p><span className="font-semibold">🔥 Calories:</span> {workout.calories_burned} kcal</p>
        <p><span className="font-semibold">📅 Date:</span> {new Date(workout.workout_date).toLocaleDateString()}</p>
      </div>

      <div className="mt-4 flex justify-between">
        <button
          onClick={() => handleEdit(workout.workout_id)}
          className="bg-blue-500 text-white text-sm font-medium px-4 py-2 rounded-lg transition-all hover:bg-blue-600"
        >
          Edit
        </button>

        <button
          onClick={()=>onDelete(workout.workout_id)}
          className="bg-red-500 text-white text-sm font-medium px-4 py-2 rounded-lg transition-all hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    </div>
  );
};
