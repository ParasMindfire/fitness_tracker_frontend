import { Workout } from "../interfaces/workoutInterface";
import { deleteWorkout } from "../services/WorkoutAPI";
import { useWorkout } from "../contexts/WorkoutContext";
import { showToast } from "../helpers/toastHelper";
import { useNavigate } from "react-router-dom";

interface Props {
  workout: Workout;
}

export const WorkoutCard = ({ workout }: Props) => {
  const { fetchWorkouts, setFormData ,setId} = useWorkout();
  const token = localStorage.getItem("token");

  const navigate=useNavigate();

  const handleDelete = async () => {
    if (!token) return;
    await deleteWorkout(token, workout.workout_id);
    showToast("Workout Deleted Successfully","success");
    fetchWorkouts();
  };

  const handleEdit = (id:any) => {
    setFormData(workout);
    navigate('/workoutFormPage')
    setId(id);
  };

  return (
    <div className="p-4 border rounded-lg shadow-lg">
      <h2 className="text-lg font-semibold">{workout.exercise_type}</h2>
      <p>Duration: {workout.duration} mins</p>
      <p>Calories Burned: {workout.calories_burned} kcal</p>
      <p>Date: {new Date(workout.workout_date).toLocaleDateString()}</p>

      <button
        onClick={()=>handleEdit(workout.workout_id)}
        className="cursor-pointer mt-2 bg-green-500 text-white px-3 py-1 rounded"
      >
        Edit
      </button>

      <button
        onClick={handleDelete}
        className="cursor-pointer mt-2 ml-5 bg-red-500 text-white px-3 py-1 rounded"
      >
        Delete
      </button>
    </div>
  );
};
