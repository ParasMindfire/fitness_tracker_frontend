import React from "react";
import { Routes,Route } from 'react-router-dom'

import Landing from "../pages/Landing";
import Signup from "../pages/Signup";
import Login from "../pages/Login";
import WorkoutDashboard from "../pages/WokourDasboard";
import FitnessGoalDashboard from "../pages/Fitness";
import { WorkoutStats } from "../components/WorkoutStat";

export const Home:React.FC=()=>{
    return (
        <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/dashboard" element={<WorkoutDashboard />} />
            <Route path="/fitness" element={<FitnessGoalDashboard />} />
            <Route path="/stats" element={<WorkoutStats />} />
      </Routes>
    )
}
