import { useState, useEffect } from "react";
import { useFitness } from "../contexts/FitnessContext";
import { showToast } from "../helpers/ToastHelper";
import { useNavigate } from "react-router-dom";

const FitnessFormPage = () => {
  const { addFitnessGoal, editFitnessGoal, id, setId, formData, setFormData, fetchFitnessGoals } = useFitness();
  const navigate = useNavigate();
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
        status: formData.status || "pending",
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
      showToast("Goal Edited Successfully", "success");
    } else {
      await addFitnessGoal(formattedGoal);
      showToast("Goal Added Successfully", "success");
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

    navigate("/fitnessViews");
    fetchFitnessGoals();
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-2xl shadow-xl w-96"
      >
        <h2 className="text-xl font-semibold mb-4 text-center text-gray-700">
          {id !== null ? "Edit Fitness Goal" : "Add Fitness Goal"}
        </h2>

        <div className="space-y-4">
          <div>
            <label htmlFor="goal_type" className="block text-gray-700 font-medium">Goal Type</label>
            <select
              id="goal_type"
              name="goal_type"
              value={localFormData.goal_type}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
            >
              <option value="weight_loss">Weight Loss</option>
              <option value="workout_per_week">Workout Per Week</option>
            </select>
          </div>

          <div>
            <label htmlFor="target_value" className="block text-gray-700 font-medium">Target Value</label>
            <input
              type="number"
              id="target_value"
              name="target_value"
              value={localFormData.target_value}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label htmlFor="current_progress" className="block text-gray-700 font-medium">Current Progress</label>
            <input
              type="number"
              id="current_progress"
              name="current_progress"
              value={localFormData.current_progress}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label htmlFor="start_date" className="block text-gray-700 font-medium">Start Date</label>
            <input
              type="date"
              id="start_date"
              name="start_date"
              value={localFormData.start_date}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label htmlFor="end_date" className="block text-gray-700 font-medium">End Date</label>
            <input
              type="date"
              id="end_date"
              name="end_date"
              value={localFormData.end_date}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label htmlFor="status" className="block text-gray-700 font-medium">Status</label>
            <select
              id="status"
              name="status"
              value={localFormData.status}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
            >
              <option value="pending">Pending</option>
              <option value="complete">Complete</option>
              <option value="incomplete">Incomplete</option>
            </select>
          </div>

          <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg w-full transition">
            {id !== null ? "Update Goal" : "Add Goal"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default FitnessFormPage;
