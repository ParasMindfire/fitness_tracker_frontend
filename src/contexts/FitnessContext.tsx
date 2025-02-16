import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { getAllFitnessGoals, createFitnessGoal, updateFitnessGoal, deleteFitnessGoal, getSingleFitnessGoal } from "../services/FitnessAPI";
import { showToast } from "../helpers/toastHelper";

export interface FitnessGoal {
  goal_id: number;
  user_id: number;
  goal_type: "weight_loss" | "workout_per_week";
  target_value: number;
  current_progress: number;
  start_date: string;
  end_date: string | null;
  status: "pending" | "complete" | "incomplete";
}

interface FitnessContextProps {
  fitnessGoals: FitnessGoal[];
  loading: boolean;
  error: string | null;
  fetchFitnessGoals: () => void;
  addFitnessGoal: any;
  editFitnessGoal: any;
  removeFitnessGoal:any;
  fetchSingleFitnessGoal: any;
  id: number | null;
  setId: any;
  formData: any;
  setFormData:any;
}

const FitnessContext = createContext<FitnessContextProps | undefined>(undefined);

export const FitnessProvider = ({ children }: { children: ReactNode }) => {
  const [fitnessGoals, setFitnessGoals] = useState<FitnessGoal[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [id, setId] = useState<number | null>(null);
  const [formData, setFormData] = useState<Omit<FitnessGoal, "goal_id" | "user_id" | "status">>({
    goal_type: "weight_loss",
    target_value: 0,
    current_progress: 0,
    start_date: "",
    end_date: null,
  });

  const fetchFitnessGoals = async () => {
    try {
      setLoading(true);
      const data = await getAllFitnessGoals();
      setFitnessGoals(data);
      setError(null);
    } catch (error) {
      console.error("Error fetching fitness goals:", error);
      setError("Failed to load fitness goals");
    } finally {
      setLoading(false);
    }
  };

  const addFitnessGoal = async (goal: any) => {
    try {
        console.log("add fitness goals ",goal);
      await createFitnessGoal(goal);
      fetchFitnessGoals();
    } catch (error) {
      console.error("Error adding fitness goal:", error);
    }
  };

  const editFitnessGoal = async (goal: any) => {
    try {
      await updateFitnessGoal(goal);
      fetchFitnessGoals();
    } catch (error) {
      console.error("Error updating fitness goal:", error);
    }
  };

  const removeFitnessGoal = async (goal_id: number) => {
    try {
      await deleteFitnessGoal(goal_id);
      showToast("Goal Deleted Successfully","success");
      fetchFitnessGoals();
    } catch (error) {
      console.error("Error deleting fitness goal:", error);
    }
  };

  const fetchSingleFitnessGoal = async (goal_id: number) => {
    try {
      return await getSingleFitnessGoal(goal_id);
    } catch (error) {
      console.error("Error fetching single fitness goal:", error);
      return null;
    }
  };

  useEffect(() => {
    fetchFitnessGoals();
  }, []);

  return (
    <FitnessContext.Provider value={{ 
      fitnessGoals, loading, error, fetchFitnessGoals, addFitnessGoal, editFitnessGoal, removeFitnessGoal, fetchSingleFitnessGoal, 
      id, setId, formData, setFormData
    }}>
      {children}
    </FitnessContext.Provider>
  );
};

export const useFitness = () => {
  const context = useContext(FitnessContext);
  if (!context) throw new Error("useFitness must be used within a FitnessProvider");
  return context;
};
