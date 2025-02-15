import React from "react";
import { WorkoutForm } from "../components/WorkoutForm";
import { WorkoutCard } from "../components/WorkoutCard";
import { useWorkout } from "../contexts/WorkoutContext";

const WorkoutDashboard: React.FC = () => {
  const { workouts, loading, error } = useWorkout();

  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Your Workouts</h2>

      <WorkoutForm />

      {loading && <p className="text-gray-500">Loading workouts...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="mt-4 space-y-4">
        {workouts.length > 0 ? (
          workouts.map((workout) => <WorkoutCard key={workout.workout_id} workout={workout} />)
        ) : (
          <p className="text-gray-500">No workouts found.</p>
        )}
      </div>
    </div>
  );
};

export default WorkoutDashboard;
