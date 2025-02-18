import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUserContext } from "../contexts/UserContext";

const Navbar: React.FC = () => {
  const { user } = useUserContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="bg-blue-600 p-4">
      <div className="flex justify-between items-center">
        <div className="text-white text-2xl font-bold">
          <Link to="/">Fitness App</Link>
        </div>

        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <div className="relative group">
                <button className="text-white hover:bg-blue-500 px-4 py-2 rounded-lg">
                  Workouts
                </button>
                <div className="absolute left-0 hidden bg-white text-black shadow-lg rounded-lg w-48 group-hover:block">
                  <Link to="/workoutViews" className="block px-4 py-2 hover:bg-gray-200">
                    View Workouts
                  </Link>
                  <Link to="/workoutFormPage" className="block px-4 py-2 hover:bg-gray-200">
                    Add Workout
                  </Link>
                </div>
              </div>

              <div className="relative group">
                <button className="text-white hover:bg-blue-500 px-4 py-2 rounded-lg">
                  Fitness Goals
                </button>
                <div className="absolute left-0 hidden bg-white text-black shadow-lg rounded-lg w-48 group-hover:block">
                  <Link to="/fitnessViews" className="block px-4 py-2 hover:bg-gray-200">
                    View Fitness Goals
                  </Link>
                  <Link to="/fitnessFormPage" className="block px-4 py-2 hover:bg-gray-200">
                    Add Fitness Goal
                  </Link>
                </div>
              </div>

              <div className="relative group">
                <button className="text-white hover:bg-blue-500 px-4 py-2 rounded-lg">
                  Stats
                </button>
                <div className="absolute left-0 hidden bg-white text-black shadow-lg rounded-lg w-40 group-hover:block">
                  <Link to="/calories" className="block px-4 py-2 hover:bg-gray-200">
                    Calorie Stats
                  </Link>
                  <Link to="/durations" className="block px-4 py-2 hover:bg-gray-200">
                    Duration Stats
                  </Link>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="text-white hover:bg-blue-500 px-4 py-2 rounded-lg"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-white hover:bg-blue-500 px-4 py-2 rounded-lg">
                Login
              </Link>
              <Link to="/signup" className="text-white hover:bg-blue-500 px-4 py-2 rounded-lg">
                Signup
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
