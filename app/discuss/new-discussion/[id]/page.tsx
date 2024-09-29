"use client";

import React, { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Comments from "./Comments";

// 示例讨论数据
const discussions = [
  {
    id: 1,
    title: "退役杂记",
    author: "henpolorAC",
    description: "这是关于退役后的感想和总结。",
    content: "退役之后，我开始了全新的生活......",
  },
  {
    id: 2,
    title: "关于“什么是一篇好的题解”",
    author: "henpolorAC",
    description: "讨论什么是一篇好的题解，分享个人经验和思考。",
    content: "我认为一篇好的题解应该包含清晰的步骤......",
  },
];

const DiscussionDetailPage = ({ params }) => {
  const { id } = params; // 获取路由中的 id 参数

  const discussion = discussions.find(
    (discussion) => discussion.id.toString() === id
  );

  if (!discussion) {
    return <div>404 - 讨论未找到</div>;
  }

  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className="flex h-screen">
      <div
        className={`${
          isCollapsed ? "w-16" : "w-64"
        } bg-gray-100 h-full p-4 transition-width duration-300`}
      >
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-bold mb-4">
            {isCollapsed ? "" : "目录"}
          </h2>
          <button
            onClick={toggleSidebar}
            className="focus:outline-none p-2 hover:bg-gray-300 rounded-full"
          >
            {isCollapsed ? (
              <FaChevronRight size={20} />
            ) : (
              <FaChevronLeft size={20} />
            )}
          </button>
        </div>
        {!isCollapsed && (
          <ul className="space-y-2">
            <li>
              <a href="#section1" className="text-blue-500 hover:underline">
                标题和简介
              </a>
            </li>
            <li>
              <a href="#section2" className="text-blue-500 hover:underline">
                正文
              </a>
            </li>
          </ul>
        )}
      </div>

      <div className="flex-1 p-6 bg-white shadow-lg overflow-auto">
        <div id="section1" className="mb-6">
          <h1 className="text-4xl font-bold mb-4">{discussion.title}</h1>
          <p className="text-gray-600">{discussion.description}</p>
        </div>

        <div id="section2" className="mt-10">
          <h2 className="text-2xl font-semibold mb-4">正文内容</h2>
          <p className="text-gray-700 leading-relaxed">{discussion.content}</p>
        </div>

        <Comments />
      </div>
    </div>
  );
};

export default DiscussionDetailPage;