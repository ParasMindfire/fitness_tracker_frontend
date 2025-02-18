import React from "react";
import { Link } from "react-router-dom";
import { useUserContext } from "../../contexts/UserContext";

const Landing: React.FC = () => {
  const { user } = useUserContext();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200">
      {!user ? (
        <div className="bg-white p-8 rounded-lg shadow-lg text-center">
          <h2 className="text-2xl font-bold text-gray-800">Welcome to Fitness App</h2>
          <p className="text-gray-600 mt-2">Your personal fitness tracker</p>
          
          <div className="mt-6">
            <Link to="/signup">
              <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg m-2">Signup</button>
            </Link>

            <p className="text-gray-500 mt-2">Already a user?</p>

            <Link to="/login">
              <button className="bg-gray-700 hover:bg-gray-800 text-white px-4 py-2 rounded-lg m-2">Login</button>
            </Link>
          </div>
        </div>
      ) : (
        <div className="w-full p-6">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">Dashboard</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <h3 className="text-xl font-semibold text-blue-600">Workout</h3>
              <p className="text-gray-500 mt-1">Manage your workouts</p>
              
              <div className="mt-4">
                <Link to="/workoutFormPage">
                  <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg m-2">
                    Add Workout
                  </button>
                </Link>

                <Link to="/workoutViews">
                  <button className="bg-gray-700 hover:bg-gray-800 text-white px-4 py-2 rounded-lg m-2">
                    View Workouts
                  </button>
                </Link>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <h3 className="text-xl font-semibold text-green-600">Fitness</h3>
              <p className="text-gray-500 mt-1">Set & track your fitness goals</p>

              <div className="mt-4">
                <Link to="/fitnessFormPage">
                  <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg m-2">
                    Add Fitness Goal
                  </button>
                </Link>

                <Link to="/fitnessViews">
                  <button className="bg-gray-700 hover:bg-gray-800 text-white px-4 py-2 rounded-lg m-2">
                    View Fitness Goals
                  </button>
                </Link>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <h3 className="text-xl font-semibold text-red-600">Stats</h3>
              <p className="text-gray-500 mt-1">Analyze your progress</p>

              <div className="mt-4">
                <Link to="/calories">
                  <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg m-2">
                    View Calorie Stats
                  </button>
                </Link>

                <Link to="/durations">
                  <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg m-2">
                    View Duration Stats
                  </button>
                </Link>
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};

export default Landing;
