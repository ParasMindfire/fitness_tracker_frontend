import React from "react";
import { Link } from "react-router-dom";
import { useUserContext } from "../contexts/UserContext";
// import WorkoutDashboard from "../pages/WokourDasboard"
// import FitnessGoalDashboard from "../components/FitnessGoalDashboard";

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
        <div className="w-full p-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Dashboard</h2>

          <button>
            <Link to="/dashboard">
              Go to Workout Dashboard
            </Link>
          </button>

          
          <button>
            <Link to="/fitness">
              Go to Fitness Dashboard
            </Link>
          </button>

          <button>
            <Link to="/stats">
              Go to Stats Dashboard
            </Link>
          </button>
          
        </div>
      )}
    </div>
  );
};

export default Landing;
