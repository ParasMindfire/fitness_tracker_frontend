import { useEffect, useState } from "react";
import { useWorkout } from "../../contexts/WorkoutContext";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import dayjs from "dayjs";

interface CaloriesData {
  date: string;
  calories: number;
}

export const WorkoutCaloriesStats = () => {
  const { workouts } = useWorkout();
  
  const [weeklyData, setWeeklyData] = useState<CaloriesData[]>([]);
  const [monthlyData, setMonthlyData] = useState<CaloriesData[]>([]);
  const [yearlyData, setYearlyData] = useState<CaloriesData[]>([]);

  useEffect(() => {
    if (workouts.length > 0) {
      const today = new Date();
      
      const weekly = workouts.filter(workout => new Date(workout.workout_date) >= new Date(today.setDate(today.getDate() - 7)));
      const monthly = workouts.filter(workout => new Date(workout.workout_date) >= new Date(today.setMonth(today.getMonth() - 1)));
      const yearly = workouts.filter(workout => new Date(workout.workout_date) >= new Date(today.setFullYear(today.getFullYear() - 1)));

      setWeeklyData(weekly.map(w => ({ date: w.workout_date, calories: w.calories_burned })));
      setMonthlyData(monthly.map(w => ({ date: w.workout_date, calories: w.calories_burned })));
      setYearlyData(yearly.map(w => ({ date: w.workout_date, calories: w.calories_burned })));
    }
  }, [workouts]);

  return (
    <div className="mt-6">
      <h2 className="text-2xl font-bold text-center">Your Calories Burned Progress</h2>
      <p className="text-gray-600 text-center">Track the calories you've burned over time.</p>
  
      {(() => {
        const today = dayjs().format("YYYY-MM-DD");
        const lastWeek = dayjs().subtract(7, "day").format("YYYY-MM-DD");
        const lastMonth = dayjs().subtract(1, "month").format("YYYY-MM-DD");
        const lastYear = dayjs().subtract(365, "day").format("YYYY-MM-DD");
  
        return (
          <>
            <div className="mt-8">
              <h3 className="text-lg font-semibold text-center text-red-600">Weekly Calories Burned</h3>
              <p className="text-sm text-center text-gray-500">
                Data from <strong>{lastWeek}</strong> to <strong>{today}</strong>
              </p>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={weeklyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="calories" stroke="#FF5733" />
                </LineChart>
              </ResponsiveContainer>
            </div>
  
            <div className="mt-8">
              <h3 className="text-lg font-semibold text-center text-purple-600">Monthly Calories Burned</h3>
              <p className="text-sm text-center text-gray-500">
                Data from <strong>{lastMonth}</strong> to <strong>{today}</strong>
              </p>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="calories" stroke="#A020F0" />
                </LineChart>
              </ResponsiveContainer>
            </div>
  =
            <div className="mt-8">
              <h3 className="text-lg font-semibold text-center text-orange-600">Yearly Calories Burned</h3>
              <p className="text-sm text-center text-gray-500">
                Data from <strong>{lastYear}</strong> to <strong>{today}</strong>
              </p>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={yearlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="calories" stroke="#FF8C00" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </>
        );
      })()}
    </div>
  );
}
