import { useEffect, useState } from "react";
import { useWorkout } from "../../contexts/WorkoutContext";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import dayjs from "dayjs";
import { WorkoutData } from "../../interfaces/StatsInterface";

import { 
  WORKOUT_PROGRESS, 
  TRACK_WORKOUT_DURATION, 
  WEEKLY_PROGRESS, 
  MONTHLY_PROGRESS, 
  YEARLY_PROGRESS, 
} from "../../constants";


// This page displays workout duration statistics.
export const WorkoutDurationStats = () => {
  const { workouts } = useWorkout();
  
  const [weeklyData, setWeeklyData] = useState<WorkoutData[]>([]);
  const [monthlyData, setMonthlyData] = useState<WorkoutData[]>([]);
  const [yearlyData, setYearlyData] = useState<WorkoutData[]>([]);

  /*This useEffect hook filters workouts Duration based on the time periods: weekly, monthly, and yearly.
  It updates the state with the filtered workout duration data 
  for each period, allowing for dynamic display of workout statistics.*/
  useEffect(() => {
    if (workouts.length > 0) {
      const today = new Date();
      
      const weekly = workouts.filter(workout => new Date(workout.workout_date) >= new Date(today.setDate(today.getDate() - 7)));
      const monthly = workouts.filter(workout => new Date(workout.workout_date) >= new Date(today.setMonth(today.getMonth() - 1)));
      const yearly = workouts.filter(workout => new Date(workout.workout_date) >= new Date(today.setFullYear(today.getFullYear() - 1)));

      setWeeklyData(weekly.map(w => ({ date: w.workout_date, duration: w.duration })));
      setMonthlyData(monthly.map(w => ({ date: w.workout_date, duration: w.duration })));
      setYearlyData(yearly.map(w => ({ date: w.workout_date, duration: w.duration })));
    }
  }, [workouts]);

  return (
    <div className="mt-6">
      <h2 className="text-2xl font-bold text-center">{WORKOUT_PROGRESS}</h2>
      <p className="text-gray-600 text-center">{TRACK_WORKOUT_DURATION}</p>
  
      {(() => {
        const today = dayjs().format("YYYY-MM-DD");
        const lastWeek = dayjs().subtract(7, "day").format("YYYY-MM-DD");
        const lastMonth = dayjs().subtract(1, "month").format("YYYY-MM-DD"); // Same date last month
        const lastYear = dayjs().subtract(365, "day").format("YYYY-MM-DD");
  
        return (
          <>
            <div className="mt-8">
              <h3 className="text-lg font-semibold text-center text-blue-600">{WEEKLY_PROGRESS}</h3>
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
                  <Line type="monotone" dataKey="duration" stroke="#8884d8" />
                </LineChart>
              </ResponsiveContainer>
            </div>
  
            <div className="mt-8">
              <h3 className="text-lg font-semibold text-center text-green-600">{MONTHLY_PROGRESS}</h3>
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
                  <Line type="monotone" dataKey="duration" stroke="#82ca9d" />
                </LineChart>
              </ResponsiveContainer>
            </div>
  
            <div className="mt-8">
              <h3 className="text-lg font-semibold text-center text-yellow-600">{YEARLY_PROGRESS}</h3>
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
                  <Line type="monotone" dataKey="duration" stroke="#ffc658" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </>
        );
      })()}
    </div>
  );
}
