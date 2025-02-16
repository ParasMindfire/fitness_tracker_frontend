import { Workout } from "../interfaces/workoutInterface";
import { deleteWorkout } from "../services/WorkoutAPI";
import { useWorkout } from "../contexts/WorkoutContext";
import { showToast } from "../helpers/toastHelper";
import { useNavigate } from "react-router-dom";

interface Props {
  workout: Workout;
}

export const WorkoutCard = ({ workout }: Props) => {
  const { fetchWorkouts, setFormData, setId } = useWorkout();
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const handleDelete = async () => {
    if (!token) return;
    await deleteWorkout(token, workout.workout_id);
    showToast("Workout Deleted Successfully", "success");
    fetchWorkouts();
  };

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
          onClick={handleDelete}
          className="bg-red-500 text-white text-sm font-medium px-4 py-2 rounded-lg transition-all hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    </div>
  );
};
