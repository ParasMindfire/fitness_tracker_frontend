import React, { useState } from "react";
import { WorkoutCard } from "../components/WorkoutCard";
import { useWorkout } from "../contexts/WorkoutContext";

const WorkoutViews: React.FC = () => {
  const { workouts, loading, error } = useWorkout();
  const [currentPage, setCurrentPage] = useState(1);
  const workoutsPerPage = 4;

  const totalPages = Math.ceil(workouts.length / workoutsPerPage);

  const indexOfLastWorkout = currentPage * workoutsPerPage;
  const indexOfFirstWorkout = indexOfLastWorkout - workoutsPerPage;
  const currentWorkouts = workouts.slice(indexOfFirstWorkout, indexOfLastWorkout);

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100 p-8">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-6xl text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Your Workouts</h2>

        {loading && <p className="text-gray-500">Loading workouts...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {workouts.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 justify-center items-center">
              {currentWorkouts.map((workout) => (
                <WorkoutCard key={workout.workout_id} workout={workout} />
              ))}
            </div>

            {totalPages > 1 && (
              <div className="flex justify-center items-center mt-10 space-x-6">
                <button
                  onClick={prevPage}
                  disabled={currentPage === 1}
                  className={`px-6 py-2 rounded-lg text-white font-medium transition ${
                    currentPage === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
                  }`}
                >
                  Previous
                </button>

                <span className="text-gray-700 font-semibold text-lg">
                  Page {currentPage} of {totalPages}
                </span>

                <button
                  onClick={nextPage}
                  disabled={currentPage === totalPages}
                  className={`px-6 py-2 rounded-lg text-white font-medium transition ${
                    currentPage === totalPages ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
                  }`}
                >
                  Next
                </button>
              </div>
            )}
          </>
        ) : (
          <p className="text-gray-500 mt-4">No workouts found.</p>
        )}
      </div>
    </div>
  );
};

export default WorkoutViews;
