import { useState } from "react";
import { useFitness } from "../contexts/FitnessContext";
import FitnessCard from "../components/FitnessCard";

const FitnessViews = () => {
  const { fitnessGoals, loading, error,removeFitnessGoal } = useFitness();
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedGoalId, setSelectedGoalId] = useState(null);
  const goalsPerPage = 3;

  const indexOfLastGoal = currentPage * goalsPerPage;
  const indexOfFirstGoal = indexOfLastGoal - goalsPerPage;
  const currentGoals = fitnessGoals.slice(indexOfFirstGoal, indexOfLastGoal);

  const nextPage = () => {
    if (indexOfLastGoal < fitnessGoals.length) setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleDeleteClick = (goalId:any) => {
    setSelectedGoalId(goalId);
    setIsModalOpen(true);
  };

  const confirmDelete = () => {
    if (selectedGoalId) {
      removeFitnessGoal(selectedGoalId); 
      console.log("Deleting goal with ID:", selectedGoalId);
      setIsModalOpen(false);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100 p-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Fitness Goals</h2>

      {loading && <p className="text-gray-500">Loading fitness goals...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {currentGoals.length > 0 ? (
          currentGoals.map((goal) => (
            <FitnessCard key={goal.goal_id} goal={goal} onDelete={handleDeleteClick} />
          ))
        ) : (
          <p className="text-gray-500">No fitness goals found.</p>
        )}
      </div>

      <div className="flex justify-center mt-6 space-x-4">
        <button
          onClick={prevPage}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded-lg text-white font-medium ${
            currentPage === 1 ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          ◀ Previous
        </button>
        <button
          onClick={nextPage}
          disabled={indexOfLastGoal >= fitnessGoals.length}
          className={`px-4 py-2 rounded-lg text-white font-medium ${
            indexOfLastGoal >= fitnessGoals.length
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          Next ▶
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-lg font-bold">Confirm Delete</h2>
            <p>Are you sure you want to delete this goal?</p>
            <div className="flex justify-end mt-4">
              <button onClick={() => setIsModalOpen(false)} className="bg-gray-300 px-4 py-2 rounded mr-2">
                Cancel
              </button>
              <button onClick={confirmDelete} className="bg-red-500 text-white px-4 py-2 rounded">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FitnessViews;
