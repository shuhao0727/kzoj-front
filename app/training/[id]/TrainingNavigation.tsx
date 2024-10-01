"use client";

import React from "react";

const TrainingNavigation = ({ activeTab, onTabChange }) => {
  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow-md">
      <nav className="flex space-x-8">
        <button
          onClick={() => onTabChange("description")}
          className={`text-base px-4 py-2 border-b-2 ${
            activeTab === "description" ? "border-blue-500 text-blue-500" : "border-transparent text-gray-800 hover:border-gray-300"
          }`}
        >
          训练说明
        </button>
        <button
          onClick={() => onTabChange("problems")}
          className={`text-base px-4 py-2 border-b-2 ${
            activeTab === "problems" ? "border-blue-500 text-blue-500" : "border-transparent text-gray-800 hover:border-gray-300"
          }`}
        >
          训练题目
        </button>
        <button
          onClick={() => onTabChange("rankings")}
          className={`text-base px-4 py-2 border-b-2 ${
            activeTab === "rankings" ? "border-blue-500 text-blue-500" : "border-transparent text-gray-800 hover:border-gray-300"
          }`}
        >
          训练排名
        </button>
      </nav>
    </div>
  );
};

export default TrainingNavigation;