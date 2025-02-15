import axios from "axios";

const API_URL = "http://localhost:3000"; 

export const getAllFitnessGoals = async () => {
    const token=localStorage.getItem("token");
  try {
    const response = await axios.get(`${API_URL}/goals`, {
        headers: { Authorization: `Bearer ${token}` },
      });
    return response.data;
  } catch (error) {
    console.error("Error fetching fitness goals:", error);
    throw error;
  }
};

export const createFitnessGoal = async (goal:any) => {
    console.log("createFitness ",goal);
    const token=localStorage.getItem("token");
  try {
    await axios.post(`${API_URL}/goals`, goal,{
        headers: { Authorization: `Bearer ${token}` },
      });
  } catch (error) {
    console.error("Error creating fitness goal:", error);
    throw error;
  }
};

export const updateFitnessGoal = async (goal:any) => {
  try {
    console.log("goal update ",goal);
    await axios.patch(`${API_URL}/goals`, goal);
  } catch (error) {
    console.error("Error updating fitness goal:", error);
    throw error;
  }
};

export const deleteFitnessGoal = async (id: any) => {
  try {
    const obj:any={id:id}
    console.log("delete Fess ",id);
    await axios.delete(`${API_URL}/goals/${id}`, obj);
  } catch (error) {
    console.error("Error deleting fitness goal:", error);
    throw error;
  }
};

export const getSingleFitnessGoal = async (goal_id: number) => {
  try {
    const response = await axios.get(`${API_URL}/goals/${goal_id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching single fitness goal:", error);
    throw error;
  }
};
