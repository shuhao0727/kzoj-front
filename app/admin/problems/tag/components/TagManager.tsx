"use client";

import React, { useState } from "react";
import { Dialog } from "@headlessui/react";

const initialCategories = [
  {
    id: 1,
    name: "C++基础",
    tags: ["入门", "二维数组", "STL", "字符数组"],
  },
  {
    id: 2,
    name: "初等数学",
    tags: ["代数", "几何"],
  },
  {
    id: 3,
    name: "高级算法",
    tags: ["动态规划", "图论", "贪心算法"],
  },
];

const TagManager = () => {
  const [categories, setCategories] = useState(initialCategories);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editCategory, setEditCategory] = useState(null);
  const [newCategoryName, setNewCategoryName] = useState("");

  // 打开编辑模态框
  const openEditModal = (category) => {
    setEditCategory(category);
    setNewCategoryName(category.name);
    setIsEditOpen(true);
  };

  // 保存编辑的分类
  const saveCategory = () => {
    setCategories(
      categories.map((cat) =>
        cat.id === editCategory.id ? { ...cat, name: newCategoryName } : cat
      )
    );
    setIsEditOpen(false);
  };

  // 删除分类
  const deleteCategory = (categoryId) => {
    setCategories(categories.filter((cat) => cat.id !== categoryId));
  };

  // 添加标签分类
  const addCategory = () => {
    const newCategory = {
      id: categories.length + 1,
      name: "新分类",
      tags: [],
    };
    setCategories([...categories, newCategory]);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">标签管理</h1>
      
      {/* 添加按钮 */}
      <div className="flex space-x-4 mb-4">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
          onClick={addCategory}
        >
          + 添加标签分类
        </button>
        <button className="bg-green-500 text-white px-4 py-2 rounded-md">
          + 添加标签
        </button>
      </div>

      {/* 标签分类列表 */}
      {categories.map((category) => (
        <div
          key={category.id}
          className="bg-white shadow-md rounded-lg mb-6 p-4"
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">{category.name}</h2>
            <div>
              <button
                className="bg-blue-500 text-white px-4 py-1 rounded-full m-1"
                onClick={() => openEditModal(category)}
              >
                编辑
              </button>
              <button
                className="bg-red-500 text-white px-4 py-1 rounded-full m-1"
                onClick={() => deleteCategory(category.id)}
              >
                删除
              </button>
            </div>
          </div>

          {/* 标签列表 */}
          <div className="flex flex-wrap">
            {category.tags.map((tag, index) => (
              <span
                key={index}
                className="bg-gray-200 text-gray-700 rounded-full px-4 py-1 m-1"
              >
                {tag}
              </span>
            ))}
            <button className="bg-blue-500 text-white px-4 py-1 rounded-full m-1">
              + 添加标签
            </button>
          </div>
        </div>
      ))}

      {/* 编辑模态框 */}
      <Dialog open={isEditOpen} onClose={() => setIsEditOpen(false)}>
        <div className="fixed inset-0 bg-black bg-opacity-25" />
        <div className="fixed inset-0 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 shadow-lg w-1/3">
            <Dialog.Title>编辑分类名称</Dialog.Title>
            <input
              type="text"
              className="border p-2 w-full mt-4"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
            />
            <div className="flex justify-end mt-4">
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded-md mr-2"
                onClick={() => setIsEditOpen(false)}
              >
                取消
              </button>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-md"
                onClick={saveCategory}
              >
                保存
              </button>
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default TagManager;