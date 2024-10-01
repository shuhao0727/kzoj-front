"use client";
import React from "react";

const FormThemeSection = ({
  selectedCategory,
  setSelectedCategory,
  selectedPrivilege,
  setSelectedPrivilege,
}) => {
  const handleCategoryClick = (category) => {
    setSelectedCategory(category);  // 更新选中的训练分类
  };

  const handlePrivilegeClick = (privilege) => {
    setSelectedPrivilege(privilege);  // 更新选中的训练权限
  };

  return (
    <div className="w-full space-y-4">
      {/* 训练权限部分 */}
      <div className="space-y-2">
        <h2 className="text-sm font-semibold text-gray-700">训练权限</h2>
        <div className="flex gap-2 flex-wrap">
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

      {/* 训练分类部分 */}
      <div className="space-y-2">
        <h2 className="text-sm font-semibold text-gray-700">训练分类</h2>
        <div className="flex flex-wrap gap-2">
          {[
            { name: "全部", color: "bg-indigo-700 text-white" },
            { name: "C++基础", color: "bg-teal-400 text-white" },
            { name: "初级数据结构", color: "bg-pink-400 text-white" },
            { name: "高级数据结构", color: "bg-yellow-600 text-white" },
            { name: "算法进阶", color: "bg-green-500 text-white" },
            { name: "动态规划", color: "bg-purple-500 text-white" },
            { name: "高级算法", color: "bg-green-700 text-white" },
            { name: "图论算法", color: "bg-red-500 text-white" },
            { name: "USACO", color: "bg-purple-300 text-white" },
            { name: "CCC", color: "bg-red-500 text-white" },
            { name: "COCI", color: "bg-red-600 text-white" },
            { name: "AtCoder", color: "bg-blue-700 text-white" },
            { name: "蓝桥杯", color: "bg-blue-500 text-white" },
            { name: "CSP-J", color: "bg-orange-400 text-white" },
            { name: "CSP-S", color: "bg-blue-400 text-white" },
            { name: "NOI", color: "bg-black text-white" },
            { name: "NOIP", color: "bg-purple-600 text-white" },
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