"use client";

import React, { useState } from "react";

const FormThemeSection = () => {
  const [selectedCategory, setSelectedCategory] = useState("主题库");
  const [selectedDifficulty, setSelectedDifficulty] = useState("全部");

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
  };

  const handleDifficultyClick = (difficulty: string) => {
    setSelectedDifficulty(difficulty);
  };

  return (
    <div className="w-full space-y-4">
      {/* 题库部分 */}
      <div className="flex items-center space-x-4">
        <h2 className="text-sm font-semibold text-gray-700">题库</h2>
        <div className="flex gap-2"> {/* 保持一行布局 */}
          {[
            { name: "全部", color: "bg-indigo-700 text-white" },  // 题库的全部按钮颜色设置为深蓝色
            { name: "主题库", color: "bg-teal-400 text-white" },
            { name: "隐藏题库", color: "bg-pink-400 text-white" },
            { name: "比赛题库", color: "bg-yellow-600 text-white" },
            { name: "团队题库", color: "bg-cyan-500 text-white" },
          ].map((category) => (
            <button
              key={category.name}
              onClick={() => handleCategoryClick(category.name)}
              className={`px-3 py-1 text-sm rounded border ${
                selectedCategory === category.name
                  ? category.color
                  : "bg-white text-blue-500 border-blue-500"
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* 难度部分 */}
      <div className="flex items-center space-x-4">
        <h2 className="text-sm font-semibold text-gray-700">难度</h2>
        <div className="flex gap-2 overflow-x-auto"> {/* 保持一行且不换行 */}
          {[
            { name: "全部", color: "bg-indigo-700 text-white" },  // 难度部分的全部按钮颜色也设置为深蓝色
            { name: "暂无评价", color: "bg-gray-200 text-gray-500" },  // 保留原本的“暂无评价”
            { name: "入门", color: "bg-red-400 text-white" },
            { name: "普及-", color: "bg-orange-400 text-white" },
            { name: "普及/提高-", color: "bg-yellow-400 text-white" },
            { name: "普及+/提高", color: "bg-green-400 text-white" },
            { name: "提高+/省选-", color: "bg-blue-400 text-white" },
            { name: "省选/NOI-", color: "bg-purple-400 text-white" },
            { name: "NOI/NOI+/CTSC", color: "bg-indigo-900 text-white" },
          ].map((difficulty) => (
            <button
              key={difficulty.name}
              onClick={() => handleDifficultyClick(difficulty.name)}
              className={`px-3 py-1 text-sm rounded border ${
                selectedDifficulty === difficulty.name
                  ? difficulty.color
                  : "bg-white text-blue-500 border-blue-500"
              }`}
            >
              {difficulty.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FormThemeSection;