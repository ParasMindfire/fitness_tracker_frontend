import React from "react";
import { useUserContext } from "../../contexts/UserContext";
import { Link } from "react-router-dom";
import { WELCOME,PERSONAL_TRACKER,ALREADY_A_USER,WORKOUT,MANAGE_WORKOUT,ADD_WORKOUT,VIEW_WORKOUT,FITNESS,FITNESS_TITLE,ADD_FITNESS_GOAL,VIEW_FITNESS_GOAL,STAT,ANA_PROGRESS,VIEW_CALORIES,DURATIONS_STATS, SIGNUP } from "../../constants";
import UserGoals from "../../components/UserGoalComponent";

/*This is the entry page for the app. and contains three main component
if token is there Fitness,Workouts,Stats and if no token then it shows login and signup component*/
const Landing: React.FC = () => {
  const { user } = useUserContext();

  return (
    <div className="min-h-screen flex flex-col">

      <div className="flex-1 flex items-center justify-center bg-gray-200">
        {!user ? (
          <div className="bg-white p-8 rounded-lg shadow-lg text-center">
            <h2 className="text-2xl font-bold text-gray-800">{WELCOME}</h2>
            <p className="text-gray-600 mt-2">{PERSONAL_TRACKER}</p>
            
            <div className="mt-6">
              <Link to="/signup">
                <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg m-2">{SIGNUP}</button>
              </Link>

              <p className="text-gray-500 mt-2">{ALREADY_A_USER}</p>

              <Link to="/login">
                <button className="bg-gray-700 hover:bg-gray-800 text-white px-4 py-2 rounded-lg m-2">Login</button>
              </Link>
            </div>
          </div>
        ) : (
          <div>
            <h2 className="text-2xl font-bold text-center text-green-600">Welcome Back, {user.name}!</h2>
            <UserGoals /> 
          </div>
        )}
      </div>
    </div>
  );
};

export default Landing;
