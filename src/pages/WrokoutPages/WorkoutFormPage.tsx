  import { useWorkout } from "../../contexts/WorkoutContext";
  import { createWorkout, updateWorkout } from "../../services/WorkoutAPI";
  import { useEffect, useState } from "react";
  import { showToast } from "../../helpers/ToastHelper";
  import { useNavigate } from "react-router-dom";
  import { 
    ADD_WORKOUT_PAGE, 
    EDIT_WORKOUT_PAGE, 
    EXERCISE_TYPE, 
    DURATION, 
    CALORIES_BURNED, 
    WORKOUT_DATE, 
    UPDATE_WORKOUT, 
    BACK_TO_DASHBOARD, 
  } from "../../constants";
  

  // This page allows users to input and add workout.
  export const WorkoutFormPage = () => {
    const navigate = useNavigate();
    const { formData, setFormData, fetchWorkouts, id } = useWorkout();
    
    const [localFormData, setLocalFormData] = useState({
      exercise_type: "",
      duration: "",
      calories_burned: "",
      workout_date: "",
    });

    // This hook listens for any changes to the formData When formData is updated, 
    // it automatically populates the form fields with the existing workout details.
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


    //handles workout form change
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setLocalFormData({ ...localFormData, [e.target.name]: e.target.value });
    };

    const token = localStorage.getItem("token");

    //handles addworkout and update workout calls
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

    //handles navigation to dasboard
    const handleBack = () => {
      navigate("/");
    };

    return (
      <div className="mt-64">
        <form 
          onSubmit={handleSubmit} 
          className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg border border-gray-200"
        >
          <h2 className="text-xl font-semibold text-gray-700 text-center mb-4">
            {formData ? EDIT_WORKOUT_PAGE : ADD_WORKOUT_PAGE}
          </h2>

          <div className="space-y-3">
            <div>
              <label className="block text-gray-700 font-medium mb-1">{EXERCISE_TYPE}</label>
              <input
                type="text"
                name="exercise_type"
                value={localFormData.exercise_type}
                onChange={handleChange}
                className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-300 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">{DURATION}</label>
              <input
                type="number"
                name="duration"
                value={localFormData.duration}
                onChange={handleChange}
                className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-300 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">{CALORIES_BURNED}</label>
              <input
                type="number"
                name="calories_burned"
                value={localFormData.calories_burned}
                onChange={handleChange}
                className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-300 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">{WORKOUT_DATE}</label>
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
            {formData ? UPDATE_WORKOUT : ADD_WORKOUT_PAGE}
          </button>

          <button
        onClick={handleBack}
        className=" w-full mt-4 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 rounded-md transition duration-200"
      >
        {BACK_TO_DASHBOARD}
      </button>
        </form>

        

        
        
      </div>
    );
  };
