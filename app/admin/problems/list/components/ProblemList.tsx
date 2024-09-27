"use client";
import React, { useState } from 'react';
import Pagination from './Pagination'; // 分页组件

// 示例题目数据
const exampleProblems = [
  { id: 3724, displayId: "SFJS 1002", title: "八数码", author: "root", type: "比赛题目", permission: "团队题目", lastModified: "2024-09-09 10:29:40" },
  { id: 3723, displayId: "SFJS 1001", title: "猪和短路", author: "root", type: "公开题目", permission: "团队题目", lastModified: "2024-09-09 10:23:27" },
  { id: 3722, displayId: "COCI 1197", title: "[COCI2016-2017#7] KLAVIR", author: "root", type: "各类真题", permission: "团队题目", lastModified: "2024-09-07 15:02:23" },
  { id: 3721, displayId: "COCI 1196", title: "[COCI2016-2017#7] POKLON", author: "root", type: "比赛题目", permission: "团队题目", lastModified: "2024-09-07 14:58:29" },
  { id: 3720, displayId: "COCI 1195", title: "[COCI2016-2017#7] IGRA", author: "root", type: "公开题目", permission: "团队题目", lastModified: "2024-09-07 14:55:31" },
  // 更多示例数据...
];

const ProblemList = () => {
  const [currentPage, setCurrentPage] = useState(1);  // 当前页码
  const [itemsPerPage, setItemsPerPage] = useState(5);  // 每页显示题目数
  const totalItems = exampleProblems.length;  // 总题目数量

  // 计算当前页显示的题目
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProblems = exampleProblems.slice(indexOfFirstItem, indexOfLastItem);

  // 处理每页显示数量变化
  const handleItemsPerPageChange = (event) => {
    setItemsPerPage(Number(event.target.value));  // 更新每页显示数量
    setCurrentPage(1);  // 每次更改后重置到第一页
  };

  // 处理页码变化
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="overflow-x-auto">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">题目列表</h1>
        <div className="flex space-x-4">
          <input type="text" placeholder="输入关键词" className="border rounded px-2 py-1" />
          <select className="border rounded px-2 py-1">
            <option>全部题目</option>
            <option>公开题目</option>
            <option>比赛题目</option>
            <option>各类真题</option>
          </select>
        </div>
      </div>
      <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
        <thead className="bg-gray-50 text-left text-sm">
          <tr>
            <th className="px-6 py-3 font-semibold">ID</th>
            <th className="px-6 py-3 font-semibold">展示ID</th>
            <th className="px-6 py-3 font-semibold">标题</th>
            <th className="px-6 py-3 font-semibold">作者</th>
            <th className="px-6 py-3 font-semibold">题目类型</th>
            <th className="px-6 py-3 font-semibold">最后修改</th>
            <th className="px-6 py-3 font-semibold">操作</th>
          </tr>
        </thead>
        <tbody className="text-sm text-gray-700">
          {currentProblems.map((problem) => (
            <tr key={problem.id} className="border-t">
              <td className="px-6 py-3">{problem.id}</td>
              <td className="px-6 py-3">{problem.displayId}</td>
              <td className="px-6 py-3">{problem.title}</td>
              <td className="px-6 py-3">{problem.author}</td>
              <td className="px-6 py-3">
                <select className="border rounded-md">
                  <option value="全部题目" selected={problem.type === "全部题目"}>全部题目</option>
                  <option value="公开题目" selected={problem.type === "公开题目"}>公开题目</option>
                  <option value="各类真题" selected={problem.type === "各类真题"}>各类真题</option>
                  <option value="比赛题目" selected={problem.type === "比赛题目"}>比赛题目</option>
                </select>
              </td>
              <td className="px-6 py-3">{problem.lastModified}</td>
              <td className="px-6 py-3 flex space-x-2">
                <button className="bg-blue-500 text-white px-2 py-1 rounded">编辑</button>
                <button className="bg-green-500 text-white px-2 py-1 rounded">下载</button>
                <button className="bg-red-500 text-white px-2 py-1 rounded">删除</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* 每页显示数量选择 */}
      <div className="flex justify-between items-center mt-4">
        <div>
          <label htmlFor="itemsPerPage" className="text-sm font-medium text-gray-700 mr-2">每页显示:</label>
          <select
            id="itemsPerPage"
            value={itemsPerPage}
            onChange={handleItemsPerPageChange}
            className="border border-gray-300 rounded-md p-1"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
          </select>
        </div>

        {/* 分页 */}
        <Pagination
          currentPage={currentPage}
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default ProblemList;