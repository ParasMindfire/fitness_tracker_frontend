
import React, { useState } from "react";

const FitnessTracker: React.FC = () => {
  
  const goal = 10000; 
  const [progress, setProgress] = useState(6000); 

  const percentage = (progress / goal) * 100;

  return (
    <div className="mt-6 bg-white p-6 rounded-lg shadow-md">
      <h4 className="text-lg font-semibold text-gray-700">Progress Tracker</h4>
      <div className="mt-2 relative pt-1">
        <div className="flex mb-2 items-center justify-between">
          <span className="text-sm font-semibold inline-block py-1 px-2 uppercase rounded-full text-green-600 bg-green-100">
            {Math.round(percentage)}% Achieved
          </span>
        </div>
        <div className="flex mb-2 items-center justify-between">
          <span className="text-sm font-semibold inline-block py-1 px-2 uppercase rounded-full text-gray-600 bg-gray-100">
            {progress} / {goal} Steps
          </span>
        </div>
        <div className="relative pt-1">
          <div className="flex mb-2 items-center justify-between">
            <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-gray-600 bg-gray-100">
              Goal
            </span>
          </div>
          <div className="flex">
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-green-500 h-2.5 rounded-full"
                style={{ width: `${percentage}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FitnessTracker;
