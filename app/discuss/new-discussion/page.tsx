"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import DraggableToc from "./DraggableToc";
import { useRouter } from "next/navigation"; // 确保这里是 next/navigation 而不是 next/router
import "github-markdown-css";

// 动态加载 MarkdownEditor，禁用 SSR
const MdEditor = dynamic(() => import("../shared/MarkdownEditor"), {
  ssr: false,
});

const NewDiscussionPage = () => {
  const router = useRouter();  // 使用 next/navigation 的 useRouter
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [category, setCategory] = useState<string>("笔记");
  const [content, setContent] = useState<string>("");

  // 保存至 localStorage，以防刷新丢失
  useEffect(() => {
    const savedTitle = localStorage.getItem("discussion_title");
    const savedCategory = localStorage.getItem("discussion_category");
    const savedDescription = localStorage.getItem("discussion_description");
    const savedContent = localStorage.getItem("discussion_content");

    if (savedTitle) setTitle(savedTitle);
    if (savedCategory) setCategory(savedCategory);
    if (savedDescription) setDescription(savedDescription);
    if (savedContent) setContent(savedContent);
  }, []);

  useEffect(() => {
    localStorage.setItem("discussion_title", title);
    localStorage.setItem("discussion_category", category);
    localStorage.setItem("discussion_description", description);
    localStorage.setItem("discussion_content", content);
  }, [title, category, description, content]);

  const handleSave = () => {
    alert("讨论暂时保存");
  };

  const handleSubmit = () => {
    const newDiscussion = {
      id: Date.now(), // 模拟唯一 ID
      title,
      description,
      category,
      author: "当前用户", // 这个可以改为动态用户
      role: "普通用户",
      comments: 0,
      likes: 0,
      views: 0,
      date: new Date().toLocaleDateString(),
      fullContent: "/discussions/new",
      isTop: false,
    };

    // 保存到 localStorage 模拟提交
    const discussions = JSON.parse(localStorage.getItem("discussions") || "[]");
    discussions.push(newDiscussion);
    localStorage.setItem("discussions", JSON.stringify(discussions));

    alert("讨论已提交");

    // 提交后关闭当前页面，返回讨论列表
    router.push("/discuss"); // 使用正确的 useRouter 推动导航
  };

  // 模拟生成的目录内容
  const tocContent = `
    <ul>
      <li><a href="#section1">一级标题</a></li>
      <li><a href="#section2">二级标题</a></li>
      <li><a href="#section3">三级标题</a></li>
    </ul>
  `;

  return (
    <div className="container mx-auto p-6 bg-gray-50 rounded-lg shadow-md relative">
      {/* 类别和标题在一行 */}
      <div className="mb-4 flex space-x-4">
        <div className="w-1/4">
          <label className="block text-gray-700 text-sm font-bold mb-2">类别</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="笔记">笔记</option>
            <option value="闲聊">闲聊</option>
            <option value="求助">求助</option>
            <option value="建议">建议</option>
            <option value="寄语">寄语</option>
          </select>
        </div>

        <div className="flex-1">
          <label className="block text-gray-700 text-sm font-bold mb-2">标题</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="请输入讨论标题"
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* 简介 */}
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">简介</label>
        <MdEditor content={description} setContent={setDescription} />
      </div>

      {/* 内容 */}
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">内容</label>
        <MdEditor content={content} setContent={setContent} />
      </div>

      {/* 按钮 */}
      <div className="flex justify-between mt-6">
        <button
          onClick={handleSave}
          className="bg-gray-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-gray-600 transition duration-300"
        >
          保存
        </button>
        <button
          onClick={handleSubmit}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
        >
          提交
        </button>
      </div>

      {/* 可拖动的目录 */}
      <DraggableToc tocContent={tocContent} />
    </div>
  );
};

export default NewDiscussionPage;