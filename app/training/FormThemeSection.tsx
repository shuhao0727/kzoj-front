"use client";
import React, { useState } from "react";

const FormThemeSection = ({
  selectedCategory,
  setSelectedCategory,
  selectedPrivilege,
  setSelectedPrivilege,
}) => {
  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const handlePrivilegeClick = (privilege) => {
    setSelectedPrivilege(privilege);
  };

  return (
    <div className="w-full space-y-4">
      {/* 训练权限部分，放到最上面 */}
      <div className="flex items-center space-x-4">
        <h2 className="text-sm font-semibold text-gray-700">训练权限</h2>
        <div className="flex gap-2">
          {[
            { name: "全部", color: "bg-indigo-700 text-white" },
            { name: "公开训练", color: "bg-red-400 text-white" },
            { name: "私有训练", color: "bg-blue-400 text-white" },
          ].map((privilege) => (
            <button
              key={privilege.name}
              onClick={() => handlePrivilegeClick(privilege.name)}
              className={`px-3 py-1 text-sm rounded border ${
                selectedPrivilege === privilege.name
                  ? privilege.color
                  : "bg-white text-blue-500 border-blue-500"
              }`}
            >
              {privilege.name}
            </button>
          ))}
        </div>
      </div>

      {/* 训练分类部分，放到训练权限的下面 */}
      <div className="flex items-center space-x-4">
        <h2 className="text-sm font-semibold text-gray-700">训练分类</h2>
        <div className="flex gap-2">
          {[
            { name: "全部", color: "bg-indigo-700 text-white" }, // 全部按钮颜色设置为深蓝色
            { name: "C++基础", color: "bg-teal-400 text-white" },
            { name: "初级数据结构", color: "bg-pink-400 text-white" },
            { name: "高级数据结构", color: "bg-yellow-600 text-white" },
            { name: "算法进阶", color: "bg-green-500 text-white" },
            { name: "动态规划", color: "bg-purple-500 text-white" },
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
    </div>
  );
};

export default FormThemeSection;