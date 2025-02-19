import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUserContext } from "../contexts/UserContext";
import {  
  NAVBAR_TITLE,  
  WORKOUTS,  
  FITNESS_GOALS_TITLE,  
  STATS_TITLE,  
  VIEW_WORKOUTS,  
  ADD_WORKOUT_TITLE,  
  VIEW_FITNESS_GOALS,  
  ADD_FITNESS_GOAL_TITLE,  
  CALORIE_STATS,  
  DURATION_STATS,  
  LOGOUT_BUTTON,  
  LOGIN_BUTTON,  
  SIGNUP_BUTTON,
} from "../constants";


//Navbar Component having all the routings of the pages
const Navbar: React.FC = () => {
  const { user } = useUserContext();
  const navigate = useNavigate();

  //deletes token from local storage and handles logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="bg-blue-600 p-4">
      <div className="flex justify-between items-center">
        <div className="text-white text-2xl font-bold">
          <Link to="/">{NAVBAR_TITLE}</Link>
        </div>

        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <div className="relative group">
                <button className="text-white hover:bg-blue-500 px-4 py-2 rounded-lg">
                  {WORKOUTS}
                </button>
                <div className="absolute left-0 hidden bg-white text-black shadow-lg rounded-lg w-48 group-hover:block">
                  <Link to="/workoutViews" className="block px-4 py-2 hover:bg-gray-200">
                    {VIEW_WORKOUTS}
                  </Link>
                  <Link to="/workoutFormPage" className="block px-4 py-2 hover:bg-gray-200">
                    {ADD_WORKOUT_TITLE}
                  </Link>
                </div>
              </div>

              <div className="relative group">
                <button className="text-white hover:bg-blue-500 px-4 py-2 rounded-lg">
                  {FITNESS_GOALS_TITLE}
                </button>
                <div className="absolute left-0 hidden bg-white text-black shadow-lg rounded-lg w-48 group-hover:block">
                  <Link to="/fitnessViews" className="block px-4 py-2 hover:bg-gray-200">
                    {VIEW_FITNESS_GOALS}
                  </Link>
                  <Link to="/fitnessFormPage" className="block px-4 py-2 hover:bg-gray-200">
                    {ADD_FITNESS_GOAL_TITLE}
                  </Link>
                </div>
              </div>

              <div className="relative group">
                <button className="text-white hover:bg-blue-500 px-4 py-2 rounded-lg">
                  {STATS_TITLE}
                </button>
                <div className="absolute left-0 hidden bg-white text-black shadow-lg rounded-lg w-40 group-hover:block">
                  <Link to="/calories" className="block px-4 py-2 hover:bg-gray-200">
                    {CALORIE_STATS}
                  </Link>
                  <Link to="/durations" className="block px-4 py-2 hover:bg-gray-200">
                    {DURATION_STATS}
                  </Link>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="text-white hover:bg-blue-500 px-4 py-2 rounded-lg"
              >
                {LOGOUT_BUTTON}
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-white hover:bg-blue-500 px-4 py-2 rounded-lg">
                {LOGIN_BUTTON}
              </Link>
              <Link to="/signup" className="text-white hover:bg-blue-500 px-4 py-2 rounded-lg">
                {SIGNUP_BUTTON}
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
