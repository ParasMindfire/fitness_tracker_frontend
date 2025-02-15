import { useEffect, useState } from "react";
import { useWorkout } from "../contexts/WorkoutContext";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

// Define the TypeScript type for workout stats
interface WorkoutData {
  date: string;
  duration: number;
}

export const WorkoutStats = () => {
  const { workouts } = useWorkout();
  
  // Explicitly define the state type
  const [weeklyData, setWeeklyData] = useState<WorkoutData[]>([]);
  const [monthlyData, setMonthlyData] = useState<WorkoutData[]>([]);
  const [yearlyData, setYearlyData] = useState<WorkoutData[]>([]);

  useEffect(() => {
    if (workouts.length > 0) {
      const today = new Date();
      
      // Filter Data
      const weekly = workouts.filter(workout => new Date(workout.workout_date) >= new Date(today.setDate(today.getDate() - 7)));
      const monthly = workouts.filter(workout => new Date(workout.workout_date) >= new Date(today.setMonth(today.getMonth() - 1)));
      const yearly = workouts.filter(workout => new Date(workout.workout_date) >= new Date(today.setFullYear(today.getFullYear() - 1)));

      // Map Data
      setWeeklyData(weekly.map(w => ({ date: w.workout_date, duration: w.duration })));
      setMonthlyData(monthly.map(w => ({ date: w.workout_date, duration: w.duration })));
      setYearlyData(yearly.map(w => ({ date: w.workout_date, duration: w.duration })));
    }
  }, [workouts]);

  return (
    <div className="mt-6">
      <h2 className="text-lg font-semibold text-center">Workout Progress</h2>
      
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={weeklyData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="duration" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={monthlyData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="duration" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={yearlyData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="duration" stroke="#ffc658" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
