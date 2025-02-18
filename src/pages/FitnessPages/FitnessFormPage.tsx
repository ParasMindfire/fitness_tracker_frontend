import { useState, useEffect } from "react";
import { useFitness } from "../../contexts/FitnessContext";
import { showToast } from "../../helpers/ToastHelper";
import { useNavigate } from "react-router-dom";
import { GOAL_TYPE,WEIGHT_LOSS,TARGET_VALUE,CURRENT_PROGRESS,START_DATE,END_DATA,STATUS,PENDING,COMPLETE,INCOMPLETE,UPDATE_GOAL,ADD_GOAL,BACK_TO_DASHBOARD } from "../../constants";


//A page where users can input fitness goals.
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

    /*This hook listens for any changes to the formData When formData is updated, 
    it automatically populates the form fields with the existing fitness details.*/
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


  //handle form changes of fitness goal input
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setLocalFormData({ ...localFormData, [e.target.name]: e.target.value });
  };

  //handles submit of goal form and navigates to viewAllGoals
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


  //handles navigation to dashbaord
  const handleBack = () => {
    navigate("/");
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
            <label htmlFor="goal_type" className="block text-gray-700 font-medium">{GOAL_TYPE}</label>
            <select
              id="goal_type"
              name="goal_type"
              value={localFormData.goal_type}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
            >
              <option value="weight_loss">{WEIGHT_LOSS}</option>
              <option value="workout_per_week">Workout Per Week</option>
            </select>
          </div>

          <div>
            <label htmlFor="target_value" className="block text-gray-700 font-medium">{TARGET_VALUE}</label>
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
            <label htmlFor="current_progress" className="block text-gray-700 font-medium">{CURRENT_PROGRESS}</label>
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
            <label htmlFor="start_date" className="block text-gray-700 font-medium">{START_DATE}</label>
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
            <label htmlFor="end_date" className="block text-gray-700 font-medium">{END_DATA}</label>
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
            <label htmlFor="status" className="block text-gray-700 font-medium">{STATUS}</label>
            <select
              id="status"
              name="status"
              value={localFormData.status}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
            >
              <option value="pending">{PENDING}</option>
              <option value="complete">{COMPLETE}</option>
              <option value="incomplete">{INCOMPLETE}</option>
            </select>
          </div>

          <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg w-full transition">
            {id !== null ? UPDATE_GOAL : ADD_GOAL}
          </button>

          <button
        onClick={handleBack}
        type="button"
        className=" w-full mt-4 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 rounded-md transition duration-200"
      >
        {BACK_TO_DASHBOARD}
      </button>
        </div>
      </form>
    </div>
  );
};

export default FitnessFormPage;
