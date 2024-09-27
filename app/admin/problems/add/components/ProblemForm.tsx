// problems/add/components/ProblemForm.tsx

"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const ProblemForm = ({ problemId }) => {
  const router = useRouter();

  const [problemData, setProblemData] = useState({
    title: "",
    description: "",
    difficulty: "easy",
  });

  useEffect(() => {
    if (problemId) {
      // 模拟从服务器获取题目详情
      // 这里可以通过 problemId 来加载题目的详情并填充到表单中
      setProblemData({
        title: `题目 ${problemId}`,
        description: `题目 ${problemId} 的描述`,
        difficulty: "medium",
      });
    }
  }, [problemId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // 提交逻辑
    // 如果有 problemId 就进行更新操作，没有就创建新题目
    router.push("/problems/list");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">标题</label>
        <input
          type="text"
          value={problemData.title}
          onChange={(e) =>
            setProblemData({ ...problemData, title: e.target.value })
          }
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">描述</label>
        <textarea
          value={problemData.description}
          onChange={(e) =>
            setProblemData({ ...problemData, description: e.target.value })
          }
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">难度</label>
        <select
          value={problemData.difficulty}
          onChange={(e) =>
            setProblemData({ ...problemData, difficulty: e.target.value })
          }
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
        >
          <option value="easy">简单</option>
          <option value="medium">中等</option>
          <option value="hard">困难</option>
        </select>
      </div>

      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
      >
        {problemId ? "更新题目" : "创建题目"}
      </button>
    </form>
  );
};

export default ProblemForm;