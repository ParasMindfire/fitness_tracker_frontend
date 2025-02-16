import React from "react";
import { Routes,Route } from 'react-router-dom'

import Landing from "../pages/Landing";
import Signup from "../pages/Signup";
import Login from "../pages/Login";
import { WorkoutFormPage } from "../pages/WorkoutFormPage";
import WorkoutViews from "../pages/WorkoutViews";
import { WorkoutCaloriesStats } from "../components/WorkoutCalorieStat";
import { WorkoutDurationStats } from "../components/WorkoutDurationStat";
import FitnessFormPage from "../pages/FitnessFormPage";
import FitnessViews from "../pages/FitnessViews";

export const Home:React.FC=()=>{
    return (
        <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/workoutFormPage" element={<WorkoutFormPage />} />
            <Route path="/workoutViews" element={<WorkoutViews />} />
            <Route path="/fitnessFormPage" element={<FitnessFormPage />} />
            <Route path="/fitnessViews" element={<FitnessViews />} />
            <Route path="/calories" element={<WorkoutCaloriesStats />} />
            <Route path="/durations" element={<WorkoutDurationStats />} />
      </Routes>
    )
}
