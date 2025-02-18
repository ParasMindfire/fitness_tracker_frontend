import axios from 'axios';
import { User, LoginData, APIResponse } from '../interfaces/UserInterface';

const API_URL = "http://localhost:3000";

// Signs up a new user
export const signup = async (data: User): Promise<APIResponse<User>> => {
  try {
    console.log("userSignup ", data);
    const response = await axios.post<APIResponse<User>>(`${API_URL}/auth/signup`, data);
    console.log("Signup response:", response.data);
    return response.data;
  } catch (error) {
    console.log("error ", error);
    throw error;
  }
};

// Logs in an existing user
export const login = async (data: LoginData): Promise<APIResponse<User>> => {
  try {
    console.log("userLogin ", data);
    const response = await axios.post<APIResponse<User>>(`${API_URL}/auth/login`, data);
    console.log("Login response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};
