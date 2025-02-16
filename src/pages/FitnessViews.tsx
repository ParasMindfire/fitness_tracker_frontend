import { useFitness } from "../contexts/FitnessContext";
import FitnessCard from "../components/FitnessCard";

const FitnessViews = () => {
  const { fitnessGoals, loading, error } = useFitness();

  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Fitness Goals</h2>

      {/* Loading & Error Messages */}
      {loading && <p className="text-gray-500">Loading fitness goals...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {/* Display List of Goals */}
      <div className="mt-4 space-y-4">
        {fitnessGoals.length > 0 ? (
          fitnessGoals.map((goal) => <FitnessCard key={goal.goal_id} goal={goal} />)
        ) : (
          <p className="text-gray-500">No fitness goals found.</p>
        )}
      </div>
    </div>
  );
};

export default FitnessViews;
