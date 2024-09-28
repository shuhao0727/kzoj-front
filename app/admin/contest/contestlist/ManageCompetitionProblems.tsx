"use client";

import React, { useState } from "react";
import { Button, TextField } from "@mui/material";

interface Problem {
  id: number;
  displayId: string;
  title: string;
  difficulty: string;
  order: number;
}

const initialProblems: Problem[] = [
  { id: 1, displayId: "P1001", title: "二叉树遍历", difficulty: "中等", order: 1 },
  { id: 2, displayId: "P1002", title: "动态规划", difficulty: "困难", order: 2 },
  { id: 3, displayId: "P1003", title: "最短路径", difficulty: "简单", order: 3 },
];

const ManageCompetitionProblems = ({ competition, closeModal, onSave }: { competition: any, closeModal: any, onSave: any }) => {
  const [problems, setProblems] = useState(initialProblems);
  const [filteredProblems, setFilteredProblems] = useState(problems);
  const [searchQuery, setSearchQuery] = useState('');

  // 搜索题目
  const handleSearch = () => {
    const result = problems.filter((p) =>
      p.displayId.includes(searchQuery) || p.title.includes(searchQuery)
    );
    setFilteredProblems(result);
  };

  // 保存题目
  const handleSave = () => {
    onSave(filteredProblems);
    closeModal();
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-3xl mx-auto">
      <h2 className="text-lg font-semibold mb-4">管理比赛题目</h2>

      {/* 搜索框 */}
      <div className="flex space-x-4 mb-4">
        <TextField
          fullWidth
          label="搜索题目"
          variant="outlined"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Button variant="contained" color="primary" onClick={handleSearch}>
          搜索
        </Button>
      </div>

      {/* 题目列表 */}
      <table className="min-w-full bg-white border">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-2 px-4 border-b">展示ID</th>
            <th className="py-2 px-4 border-b">标题</th>
            <th className="py-2 px-4 border-b">难度</th>
            <th className="py-2 px-4 border-b">序号</th>
          </tr>
        </thead>
        <tbody>
          {filteredProblems.map((problem) => (
            <tr key={problem.id} className="text-center">
              <td className="py-2 px-4 border-b">{problem.displayId}</td>
              <td className="py-2 px-4 border-b">{problem.title}</td>
              <td className="py-2 px-4 border-b">{problem.difficulty}</td>
              <td className="py-2 px-4 border-b">
                <TextField
                  value={problem.order}
                  onChange={(e) => setProblems(
                    problems.map((p) =>
                      p.id === problem.id ? { ...p, order: parseInt(e.target.value) } : p
                    )
                  )}
                  variant="outlined"
                  size="small"
                  style={{ width: "60px" }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* 确定按钮 */}
      <div className="flex justify-end mt-4">
        <Button variant="contained" color="primary" onClick={handleSave}>
          确定
        </Button>
      </div>
    </div>
  );
};

export default ManageCompetitionProblems;