import { useState, useEffect } from "react";
import { useFitness } from "../contexts/FitnessContext";

const FitnessForm = () => {
  const { addFitnessGoal, editFitnessGoal, id, setId, formData, setFormData, fetchFitnessGoals } = useFitness();

  const [localFormData, setLocalFormData] = useState({
    goal_type: "",
    target_value: 0,
    current_progress: 0,
    start_date: "",
    end_date: "",
    status: "pending",
  });

  useEffect(() => {
    if (formData) {
      setLocalFormData({
        goal_type: formData.goal_type,
        target_value: formData.target_value.toString(),
        current_progress: formData.current_progress.toString(),
        start_date: formData.start_date,
        end_date: formData.end_date || "",
        status: formData.status || "pending", // Default to pending if not provided
      });
    }
  }, [formData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setLocalFormData({ ...localFormData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formattedGoal = {
      ...localFormData,
      target_value: Number(localFormData.target_value),
      current_progress: Number(localFormData.current_progress),
    };

    if (id !== null) {
      await editFitnessGoal({ goal_id: id, ...formattedGoal });
      setId(null);
    } else {
      await addFitnessGoal(formattedGoal);
    }

    setFormData(null);
    setLocalFormData({
      goal_type: "weight_loss",
      target_value: 0,
      current_progress: 0,
      start_date: "",
      end_date: "",
      status: "pending",
    });

    fetchFitnessGoals();
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded-lg shadow-lg">
      <select name="goal_type" value={localFormData.goal_type} onChange={handleChange} className="w-full p-2 border rounded mb-2">
        <option value="weight_loss">Weight Loss</option>
        <option value="workout_per_week">Workout Per Week</option>
      </select>

      <input
        type="number"
        name="target_value"
        placeholder="Target Value"
        value={localFormData.target_value}
        onChange={handleChange}
        className="w-full p-2 border rounded mb-2"
      />

      <input
        type="number"
        name="current_progress"
        placeholder="Current Progress"
        value={localFormData.current_progress}
        onChange={handleChange}
        className="w-full p-2 border rounded mb-2"
      />

      <input
        type="date"
        name="start_date"
        value={localFormData.start_date}
        onChange={handleChange}
        className="w-full p-2 border rounded mb-2"
      />

      <input
        type="date"
        name="end_date"
        value={localFormData.end_date}
        onChange={handleChange}
        className="w-full p-2 border rounded mb-2"
      />

      <select name="status" value={localFormData.status} onChange={handleChange} className="w-full p-2 border rounded mb-2">
        <option value="pending">Pending</option>
        <option value="complete">Complete</option>
        <option value="incomplete">Incomplete</option>
      </select>

      <button className="bg-blue-500 text-white px-3 py-2 rounded w-full cursor-pointer">
        {id !== null ? `Update Goal` : `Add Goal`}
      </button>
    </form>
  );
};

export default FitnessForm;
