"use client";

import React from "react";

const TrainingNavigation = ({ activeTab, onTabChange }) => {
  return (
    <div className="bg-white shadow p-4 rounded-lg mb-6">
      <nav className="flex space-x-4">
        <button
          onClick={() => onTabChange("description")}
          className={`px-4 py-2 ${activeTab === "description" ? "font-bold border-b-2 border-blue-500" : ""}`}
        >
          训练说明
        </button>
        <button
          onClick={() => onTabChange("problems")}
          className={`px-4 py-2 ${activeTab === "problems" ? "font-bold border-b-2 border-blue-500" : ""}`}
        >
          题目列表
        </button>
        <button
          onClick={() => onTabChange("ranking")}
          className={`px-4 py-2 ${activeTab === "ranking" ? "font-bold border-b-2 border-blue-500" : ""}`}
        >
          训练排行
        </button>
      </nav>
    </div>
  );
};

export default TrainingNavigation;