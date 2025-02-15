import { useWorkout } from "../contexts/WorkoutContext";
import { createWorkout, updateWorkout } from "../services/WorkoutAPI";
import { useEffect, useState } from "react";

export const WorkoutForm = () => {
  const { formData, setFormData, fetchWorkouts,id } = useWorkout();
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
      // Update workout
      await updateWorkout(token, {
        ...localFormData,
        workout_id:id,
        duration: Number(localFormData.duration),
        calories_burned: Number(localFormData.calories_burned),
      });
    } else {
      // Create new workout
      await createWorkout(token, {
        ...localFormData,
        duration: Number(localFormData.duration),
        calories_burned: Number(localFormData.calories_burned),
      });
    }

    setFormData(null);
    setLocalFormData({
      exercise_type: "",
      duration: "",
      calories_burned: "",
      workout_date: "",
    });
    fetchWorkouts();
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded-lg shadow-lg">
      <input
        type="text"
        name="exercise_type"
        placeholder="Exercise Type"
        value={localFormData.exercise_type}
        onChange={handleChange}
        className="w-full p-2 border rounded mb-2"
      />
      <input
        type="number"
        name="duration"
        placeholder="Duration (mins)"
        value={localFormData.duration}
        onChange={handleChange}
        className="w-full p-2 border rounded mb-2"
      />
      <input
        type="number"
        placeholder="Calories Burned"
        name="calories_burned"
        value={localFormData.calories_burned}
        onChange={handleChange}
        className="w-full p-2 border rounded mb-2"
      />
      <input
        type="date"
        name="workout_date"
        value={localFormData.workout_date}
        onChange={handleChange}
        className="w-full p-2 border rounded mb-2"
      />
      <button className="bg-blue-500 text-white px-3 py-2 rounded w-full cursor-pointer">
        {formData ? `Update Workout` : `Add Workout`}
      </button>
    </form>
  );
};
