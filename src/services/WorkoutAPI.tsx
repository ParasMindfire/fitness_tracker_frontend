import axios from "axios";

const API_BASE_URL = "http://localhost:3000";

// Fetches all available workouts
export const getAllWorkouts = async () => {
  const response = await axios.get(`${API_BASE_URL}/all/workouts`);
  return response.data;
};

// Fetches workouts specific to the current user
export const getUserWorkouts = async () => {
  const token = localStorage.getItem("token");

  const response = await axios.get(`${API_BASE_URL}/workouts`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// Creates a new workout for the user
export const createWorkout = async (token: string, workout: any) => {
  const response = await axios.post(`${API_BASE_URL}/workouts`, workout, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// Updates an existing workout for the user
export const updateWorkout = async (token: string, workout: any) => {
  console.log("Update Aya ??")
  console.log("workout ", workout);
  const response = await axios.patch(`${API_BASE_URL}/workouts`, workout, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// Deletes a specific workout for the user
export const deleteWorkout = async (token: string, workout_id: number) => {
  const response = await axios.delete(`${API_BASE_URL}/workouts`, {
    headers: { Authorization: `Bearer ${token}` },
    data: { workout_id },
  });
  return response.data;
};
