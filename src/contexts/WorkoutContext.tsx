import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { Workout } from "../interfaces/workoutInterface";
import { getUserWorkouts } from "../services/WorkoutAPI";

interface WorkoutContextProps {
  workouts: Workout[];
  loading: boolean;
  error: string | null;
  fetchWorkouts: () => void;
  formData: Workout | null;
  setFormData: (workout: Workout | null) => void;
  setId:any,
  id:any
}

const WorkoutContext = createContext<WorkoutContextProps | undefined>(undefined);

export const WorkoutProvider = ({ children }: { children: ReactNode }) => {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<Workout | null>(null);
  const [id,setId]=useState<any>();

  const fetchWorkouts = async () => {
    try {
      setLoading(true);
      const data = await getUserWorkouts();
      setWorkouts(data);
      setError(null);
    } catch (error) {
      console.error("Error fetching workouts:", error);
      setError("Failed to load workouts");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWorkouts();
  }, []);

  return (
    <WorkoutContext.Provider value={{ workouts, loading, error, fetchWorkouts, formData, setFormData ,id,setId }}>
      {children}
    </WorkoutContext.Provider>
  );
};

export const useWorkout = () => {
  const context = useContext(WorkoutContext);
  if (!context) throw new Error("useWorkout must be used within a WorkoutProvider");
  return context;
};
