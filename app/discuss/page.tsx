"use client";

import { useCallback, useState } from "react";

// 示例讨论数据
const discussions = [
  {
    id: 1,
    title: "退役杂记",
    author: "henpolorAC",
    role: "ADM",
    comments: 10,
    likes: 1,
    views: 79,
    category: "寄语",
    date: "1个月前",
    isTop: true,
  },
  {
    id: 2,
    title: "关于“什么是一篇好的题解”",
    author: "henpolorAC",
    role: "ADM",
    comments: 4,
    likes: 0,
    views: 89,
    category: "闲聊",
    date: "6个月前",
    isTop: false,
  },
  // 其他讨论数据...
];

const Discuss = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [categoryFilter, setCategoryFilter] = useState<string>("全部");
  const [categories, setCategories] = useState<string[]>([
    "闲聊",
    "题解",
    "求助",
    "建议",
    "笔记",
    "寄语",
  ]);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [newCategory, setNewCategory] = useState<string>("");

  // 用于存储分类是否处于编辑模式
  const [editState, setEditState] = useState<Record<string, boolean>>(
    categories.reduce((acc, category) => {
      acc[category] = false;
      return acc;
    }, {} as Record<string, boolean>)
  );

  const handleChangeCategory = useCallback(
    (index: number, newValue: string) => {
      const updatedCategories = [...categories];
      updatedCategories[index] = newValue;
      setCategories(updatedCategories);
    },
    [categories, setCategories]
  );

  // 添加新的分类
  const handleAddCategory = useCallback(
    (newValue: string) => {
      if (!categories.includes(newValue)) {
        setCategories([...categories, newValue]);
      }
    },
    [categories, setCategories]
  );

  return (
    <div className="container mx-auto p-6">
      <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 mb-4">
        <h1 className="text-2xl font-semibold text-gray-800">
          全部讨论 ({discussions.length})
        </h1>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="输入关键词"
          className="border p-2 rounded w-full md:w-1/3"
        />
      </div>

      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6">
        {/* 右侧发布和分类 */}
        <div className="md:w-1/5 space-y-4">
          {/* 发布按钮 */}
          <button className="w-full bg-blue-500 text-white px-4 py-2 text-sm rounded-lg shadow hover:bg-blue-600 transition duration-300">
            ✏️ 发布一个讨论
          </button>

          {/* 我的讨论按钮 */}
          <button className="w-full bg-red-500 text-white px-4 py-2 text-sm rounded-lg shadow hover:bg-red-600 transition duration-300">
            🔍 我的讨论
          </button>

          <div className="bg-white p-4 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-md font-semibold">分类</h4>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="text-blue-500 hover:underline"
              >
                {isEditing ? "完成" : "编辑"}
              </button>
            </div>

            <ul className="space-y-2">
              {categories.map((category, index) => (
                <li key={index} className="flex justify-between items-center">
                  {isEditing ? (
                    <input
                      type="text"
                      value={category}
                      onChange={(e) =>
                        handleChangeCategory(index, e.target.value)
                      }
                      className="border p-2 rounded w-3/4"
                    />
                  ) : (
                    <button
                      onClick={() => setCategoryFilter(category)}
                      className={`block text-left w-full px-3 py-1 text-sm rounded-lg transition ${
                        categoryFilter === category
                          ? "bg-blue-500 text-white"
                          : "bg-gray-100 hover:bg-gray-200"
                      }`}
                    >
                      {category}
                    </button>
                  )}
                </li>
              ))}
            </ul>

            {/* 添加新分类 */}
            {isEditing && (
              <div className="mt-4">
                <input
                  type="text"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  placeholder="添加新分类"
                  className="border p-2 rounded w-full mb-2"
                />
                <button
                  onClick={() => handleAddCategory(newCategory)}
                  className="w-full bg-green-500 text-white px-4 py-2 text-sm rounded-lg hover:bg-green-600 transition duration-300"
                >
                  添加分类
                </button>
              </div>
            )}
          </div>
        </div>

        {/* 左侧讨论列表 */}
        <div className="md:w-4/5 space-y-6">
          {discussions
            .filter(
              (discussion) =>
                discussion.title.includes(searchTerm) ||
                discussion.category === categoryFilter ||
                categoryFilter === "全部"
            )
            .map((discussion) => (
              <div
                key={discussion.id}
                className="border rounded-lg shadow-md p-4 bg-white hover:bg-gray-50 transition duration-300"
              >
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center space-x-2">
                    {discussion.isTop && (
                      <span className="bg-red-500 text-white px-2 py-1 rounded-lg text-xs font-bold">
                        TOP
                      </span>
                    )}
                    <h3 className="text-md font-semibold">
                      {discussion.title}
                    </h3>
                  </div>
                  <span className="text-gray-500 text-sm">
                    {discussion.date}
                  </span>
                </div>
                <div className="text-sm text-gray-500 mb-2">
                  <span>👤 {discussion.author}</span>
                  <span className="ml-4">{discussion.role}</span>
                  <span className="ml-4">🗣️ {discussion.comments} 评论</span>
                  <span className="ml-4">👍 {discussion.likes} 点赞</span>
                  <span className="ml-4">👁️ {discussion.views} 浏览</span>
                  <span className="ml-4">📂 {discussion.category}</span>
                </div>
                <div className="flex justify-end">
                  <button className="text-gray-400 hover:text-gray-600">
                    ⋮
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Discuss;
