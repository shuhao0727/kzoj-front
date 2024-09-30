"use client";

import React from "react";

// 示例题目数据，只保留 4 道题目
const problemData = [
  { 
    id: 1, 
    title: '「FSLOI Round I」 单挑', 
    score: 100, 
    submissions: 120, 
    passes: 90, 
    passRate: '75%', 
    status: '已提交' 
  },
  { 
    id: 2, 
    title: '「FSLOI Round I」 石子', 
    score: 100, 
    submissions: 100, 
    passes: 85, 
    passRate: '85%', 
    status: '未提交' 
  },
  { 
    id: 3, 
    title: '「FSLOI Round I」 迷雾', 
    score: 100, 
    submissions: 150, 
    passes: 120, 
    passRate: '80%', 
    status: '已提交' 
  },
  { 
    id: 4, 
    title: '「FSLOI Round I」 山巅', 
    score: 100, 
    submissions: 130, 
    passes: 100, 
    passRate: '77%', 
    status: '未提交' 
  },
];

const ProblemList = () => {
  // 表格列配置：定义每个列的标题和内容
  const columns = [
    { 
      title: '状态', 
      dataIndex: 'status', 
      render: (status) => (
        <span className={`text-xl ${status === "已提交" ? "text-green-500" : "text-gray-500"}`}>
          {status === "已提交" ? "√" : "—"}
        </span>
      ) 
    },
    { title: '序号', dataIndex: 'id' }, 
    { title: '分数', dataIndex: 'score' }, 
    { 
      title: '标题', 
      dataIndex: 'title', 
      render: (text, record) => (
        <a href={`/contest/problem/${record.id}`} className="text-blue-500 underline">
          {text}
        </a>
      ) 
    },
    { title: '提交数', dataIndex: 'submissions' }, 
    { title: '通过数', dataIndex: 'passes' }, 
    { title: '通过率', dataIndex: 'passRate' }, 
  ];

  return (
    <div className="bg-white p-4 shadow rounded-lg w-full"> {/* 调整宽度与比赛说明一致 */}
      <table className="min-w-full table-auto bg-white border border-gray-200 rounded-lg">
        <thead className="bg-gray-100">
          <tr>
            {columns.map((col, index) => (
              <th key={index} className="px-4 py-2 text-left">{col.title}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {problemData.map((problem, index) => (
            <tr key={problem.id} className="border-b">
              <td className="px-4 py-2">{problem.status === '已提交' ? '√' : '—'}</td>
              <td className="px-4 py-2">{problem.id}</td>
              <td className="px-4 py-2">{problem.score}</td>
              <td className="px-4 py-2 text-blue-500 underline">
                <a href={`/contest/problem/${problem.id}`}>{problem.title}</a>
              </td>
              <td className="px-4 py-2">{problem.submissions}</td>
              <td className="px-4 py-2">{problem.passes}</td>
              <td className="px-4 py-2">{problem.passRate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProblemList;