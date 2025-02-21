// components/UserGoals.tsx
import React, { useEffect, useState } from 'react';
import { getAllWorkouts } from '../services/WorkoutAPI';
import { workoutByAll } from '../interfaces/WorkoutInterface';

const UserGoals: React.FC = () => {
  const [usersWorkouts, setUsersWokrouts] = useState<workoutByAll[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersData:workoutByAll[]= await getAllWorkouts();
        setUsersWokrouts(usersData);
      } catch (err) {
        setError("Failed to fetch user goals");
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  if (loading) return <p className="text-center text-blue-500">Loading user goals...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg mt-8">
      <h2 className="text-2xl font-bold text-center mb-4">🔥 Community Goals</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {usersWorkouts.map((user:any) => (
          <div className="border p-4 rounded-lg shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold text-blue-600">{user.name}</h3>
            <p className="text-gray-700"><strong>Excercise Type:</strong> {user.exercise_type}</p>
            <p className="text-gray-700"><strong>duration:</strong> {user.duration}</p>
            <p className="text-gray-700"><strong>calories_burned:</strong> {user.calories_burned}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserGoals;
