"use client";
import React from "react";

const ProblemActions = ({ problemId }) => {
  const handleEdit = () => {
    // 跳转到编辑页面
    window.location.href = `/problems/add?id=${problemId}`;
  };

  const handleDownload = () => {
    console.log(`下载题目 ${problemId}`);
  };

  const handleDelete = () => {
    console.log(`删除题目 ${problemId}`);
  };

  return (
    <div className="flex space-x-2">
      <button onClick={handleEdit} className="bg-blue-500 text-white px-3 py-1 rounded">
        编辑
      </button>
      <button onClick={handleDownload} className="bg-green-500 text-white px-3 py-1 rounded">
        下载
      </button>
      <button onClick={handleDelete} className="bg-red-500 text-white px-3 py-1 rounded">
        删除
      </button>
    </div>
  );
};

export default ProblemActions;