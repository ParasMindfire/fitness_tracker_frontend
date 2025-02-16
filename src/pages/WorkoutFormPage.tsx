import { useWorkout } from "../contexts/WorkoutContext";
import { createWorkout, updateWorkout } from "../services/WorkoutAPI";
import { useEffect, useState } from "react";
import { showToast } from "../helpers/toastHelper";
import { useNavigate } from "react-router-dom";

export const WorkoutFormPage = () => {
  const navigate = useNavigate();
  const { formData, setFormData, fetchWorkouts, id } = useWorkout();
  
  const [localFormData, setLocalFormData] = useState({
    exercise_type: "",
    duration: "",
    calories_burned: "",
    workout_date: "",
  });

  useEffect(() => {
    if (formData) {
      setLocalFormData({
        exercise_type: formData.exercise_type,
        duration: formData.duration.toString(),
        calories_burned: formData.calories_burned.toString(),
        workout_date: formData.workout_date,
      });
    }
  }, [formData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalFormData({ ...localFormData, [e.target.name]: e.target.value });
  };

  const token = localStorage.getItem("token");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;

    if (formData) {
      await updateWorkout(token, {
        ...localFormData,
        workout_id: id,
        duration: Number(localFormData.duration),
        calories_burned: Number(localFormData.calories_burned),
      });
      showToast("Workout Updated Successfully", "success");
    } else {
      await createWorkout(token, {
        ...localFormData,
        duration: Number(localFormData.duration),
        calories_burned: Number(localFormData.calories_burned),
      });
      showToast("Workout Added Successfully", "success");
    }

    setFormData(null);
    setLocalFormData({
      exercise_type: "",
      duration: "",
      calories_burned: "",
      workout_date: "",
    });

    navigate('/workoutViews');
    fetchWorkouts();
  };

  return (
    <div className="mt-64">
      <form 
        onSubmit={handleSubmit} 
        className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg border border-gray-200"
      >
        <h2 className="text-xl font-semibold text-gray-700 text-center mb-4">
          {formData ? "Edit Workout" : "Add Workout"}
        </h2>

        <div className="space-y-3">
          <div>
            <label className="block text-gray-700 font-medium mb-1">Exercise Type</label>
            <input
              type="text"
              name="exercise_type"
              value={localFormData.exercise_type}
              onChange={handleChange}
              className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-300 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Duration (mins)</label>
            <input
              type="number"
              name="duration"
              value={localFormData.duration}
              onChange={handleChange}
              className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-300 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Calories Burned</label>
            <input
              type="number"
              name="calories_burned"
              value={localFormData.calories_burned}
              onChange={handleChange}
              className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-300 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Workout Date</label>
            <input
              type="date"
              name="workout_date"
              value={localFormData.workout_date}
              onChange={handleChange}
              className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-300 focus:outline-none"
            />
          </div>
        </div>

        <button 
          className="mt-5 w-full bg-blue-500 hover:bg-blue-600 text-white text-lg font-medium py-3 rounded-md transition-all"
        >
          {formData ? "Update Workout" : "Add Workout"}
        </button>
      </form>
    </div>
  );
};
