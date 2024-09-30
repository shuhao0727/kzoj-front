"use client";

import React, { useState, useMemo } from "react";
import { Table, Pagination } from "@douyinfe/semi-ui";

const rankingData = Array.from({ length: 100 }, (_, index) => ({
  id: index + 1,
  username: `user${index + 1}`,
  nickname: `选手 ${index + 1}`,
  score: Math.floor(Math.random() * 5000),
  passed: Math.floor(Math.random() * 300),
  total: Math.floor(Math.random() * 500 + 100),
  rate: Math.random() * 100,
  bio: "这是一个用户简介，展示用户的个性和经历。",
}));

const RankingTable = ({ searchTerm }: { searchTerm: string }) => {
  const [sortKey, setSortKey] = useState<string>("");
  const [isAsc, setIsAsc] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(20);

  const handleSort = (key: string) => {
    if (sortKey === key) {
      setIsAsc(!isAsc);
    } else {
      setSortKey(key);
      setIsAsc(true);
    }
  };

  const sortedData = useMemo(() => {
    const filteredData = rankingData.filter(
      (user) =>
        user.username.includes(searchTerm) || user.nickname.includes(searchTerm)
    );

    return filteredData.sort((a, b) => {
      if (sortKey === "score") {
        return isAsc ? a.score - b.score : b.score - a.score;
      } else if (sortKey === "passed") {
        return isAsc ? a.passed - b.passed : b.passed - a.passed;
      } else if (sortKey === "rate") {
        return isAsc ? a.rate - b.rate : b.rate - a.rate;
      }
      return 0;
    });
  }, [searchTerm, sortKey, isAsc]);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return sortedData.slice(startIndex, startIndex + pageSize);
  }, [currentPage, pageSize, sortedData]);

  return (
    <div>
      <table className="min-w-full table-auto bg-white shadow-lg rounded-lg">
        <thead className="bg-gray-50 text-gray-600 text-sm uppercase tracking-wider border-b">
          <tr>
            <th className="px-4 py-3 text-left">#</th>
            <th className="px-4 py-3 text-left">用户</th>
            <th className="px-4 py-3 text-left">昵称</th>
            <th className="px-4 py-3 text-left cursor-pointer" onClick={() => handleSort("score")}>
              分数 {sortKey === "score" && (isAsc ? "↑" : "↓")}
            </th>
            <th className="px-4 py-3 text-left cursor-pointer" onClick={() => handleSort("passed")}>
              通过/总数 {sortKey === "passed" && (isAsc ? "↑" : "↓")}
            </th>
            <th className="px-4 py-3 text-left cursor-pointer" onClick={() => handleSort("rate")}>
              通过率 {sortKey === "rate" && (isAsc ? "↑" : "↓")}
            </th>
            <th className="px-4 py-3 text-left w-1/3">个性简介</th>
          </tr>
        </thead>
        <tbody className="text-sm text-gray-700">
          {paginatedData.map((user, index) => (
            <tr
              key={user.id}
              className={`border-b hover:bg-gray-50 transition-colors duration-200 ${index % 2 === 0 ? "bg-gray-100" : ""}`}
            >
              <td className="px-4 py-3">{index + 1 + (currentPage - 1) * pageSize}</td>
              <td className="px-4 py-3 text-blue-500">{user.username}</td>
              <td className="px-4 py-3">{user.nickname}</td>
              <td className="px-4 py-3">{user.score}</td>
              <td className="px-4 py-3">{`${user.passed}/${user.total}`}</td>
              <td className="px-4 py-3">{user.rate.toFixed(2)}%</td>
              <td className="px-4 py-3 w-1/3">{user.bio}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-end mt-4">
        <Pagination
          total={sortedData.length}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          onPageSizeChange={setPageSize}
          pageSizeOpts={[20, 50, 100]} // 每页条数选项
          showSizeChanger
          showQuickJumper
        />
      </div>
    </div>
  );
};

export default RankingTable;