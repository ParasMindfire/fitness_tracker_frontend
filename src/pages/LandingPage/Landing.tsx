import React from "react";
// import Navbar from "../../components/Navbar";
import { useUserContext } from "../../contexts/UserContext";
import { Link } from "react-router-dom";
import { WELCOME,PERSONAL_TRACKER,ALREADY_A_USER,WORKOUT,MANAGE_WORKOUT,ADD_WORKOUT,VIEW_WORKOUT,FITNESS,FITNESS_TITLE,ADD_FITNESS_GOAL,VIEW_FITNESS_GOAL,STAT,ANA_PROGRESS,VIEW_CALORIES,DURATIONS_STATS, SIGNUP } from "../../constants";


/*This is the entry page for the app. and contains three main component
if token is there Fitness,Workouts,Stats and if no token then it shows login and signup component*/
const Landing: React.FC = () => {
  const { user } = useUserContext();

  return (
    <div className="min-h-screen flex flex-col">
      {/* <Navbar /> */}

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
          <div className="w-full p-6">
            <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">Dashboard</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <h3 className="text-xl font-semibold text-blue-600">{WORKOUT}</h3>
                <p className="text-gray-500 mt-1">{MANAGE_WORKOUT}</p>
                
                <div className="mt-4">
                  <Link to="/workoutFormPage">
                    <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg m-2">
                      {ADD_WORKOUT}
                    </button>
                  </Link>

                  <Link to="/workoutViews">
                    <button className="bg-gray-700 hover:bg-gray-800 text-white px-4 py-2 rounded-lg m-2">
                      {VIEW_WORKOUT}
                    </button>
                  </Link>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <h3 className="text-xl font-semibold text-green-600">{FITNESS}</h3>
                <p className="text-gray-500 mt-1">{FITNESS_TITLE}</p>

                <div className="mt-4">
                  <Link to="/fitnessFormPage">
                    <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg m-2">
                      {ADD_FITNESS_GOAL}
                    </button>
                  </Link>

                  <Link to="/fitnessViews">
                    <button className="bg-gray-700 hover:bg-gray-800 text-white px-4 py-2 rounded-lg m-2">
                      {VIEW_FITNESS_GOAL}
                    </button>
                  </Link>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <h3 className="text-xl font-semibold text-red-600">{STAT}</h3>
                <p className="text-gray-500 mt-1">{ANA_PROGRESS}</p>

                <div className="mt-4">
                  <Link to="/calories">
                    <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg m-2">
                      {VIEW_CALORIES}
                    </button>
                  </Link>

                  <Link to="/durations">
                    <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg m-2">
                      {DURATIONS_STATS}
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Landing;
