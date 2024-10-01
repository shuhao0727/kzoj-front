"use client";

import React, { useMemo } from "react";
import { Pagination } from "@douyinfe/semi-ui";
import Link from "next/link";

// 模拟比赛数据
const contestData = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  title: `比赛 ${i + 1}`,
  type: i % 2 === 0 ? "公开赛" : "私有赛",
  status: i % 2 === 0 ? "赛后提交" : "已结束",
  startDate: `2024-08-${17 - i} 00:00:00`,
  duration: `${i % 2 === 0 ? 1 : 3.5}天`,
  questionCount: Math.floor(Math.random() * 10) + 1, // 随机生成题数
  host: i % 2 === 0 ? "主办方 A" : "主办方 B",
  ended: i % 2 !== 0,
}));

const DisplaySection = ({ searchTerm, selectedType, selectedStatus, currentPage, pageSize, setCurrentPage, setPageSize }) => {
  const filteredData = useMemo(() => {
    return contestData
      .filter(
        (contest) =>
          (selectedType === "全部" || contest.type === selectedType) &&
          (selectedStatus === "全部" || (selectedStatus === "已结束" ? contest.ended : !contest.ended)) &&
          contest.title.includes(searchTerm)
      );
  }, [searchTerm, selectedType, selectedStatus]);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return filteredData.slice(startIndex, startIndex + pageSize);
  }, [currentPage, pageSize, filteredData]);

  return (
    <div className="w-full">
      <table className="min-w-full table-auto bg-white shadow-lg rounded-lg">
        <thead className="bg-gray-200 text-gray-700">
          <tr>
            <th className="px-4 py-3 text-left">编号</th>
            <th className="px-4 py-3 text-left">标题</th>
            <th className="px-4 py-3 text-left">赛制</th>
            <th className="px-4 py-3 text-left">状态</th>
            <th className="px-4 py-3 text-left">起止时间</th>
            <th className="px-4 py-3 text-left">题数</th>
            <th className="px-4 py-3 text-left">举办者</th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((contest) => (
            <tr key={contest.id} className="border-b hover:bg-gray-100 transition-colors duration-200">
              <td className="px-4 py-3 text-left">{contest.id}</td>
              <td className="px-4 py-3 text-left text-blue-500 underline">
                {/* 使用 target="_blank" 和 rel="noopener noreferrer" */}
                <Link href={`/contest/${contest.id}`} target="_blank" rel="noopener noreferrer">
                  {contest.title}
                </Link>
              </td>
              <td className="px-4 py-3 text-left">
                <span className={`px-2 py-1 rounded-lg ${contest.type === "公开赛" ? "bg-green-200 text-green-800" : "bg-yellow-200 text-yellow-800"}`}>
                  {contest.type}
                </span>
              </td>
              <td className="px-4 py-3 text-left">
                <span className={`px-2 py-1 rounded-lg ${contest.ended ? "bg-red-200 text-red-800" : "bg-blue-200 text-blue-800"}`}>
                  {contest.status}
                </span>
              </td>
              <td className="px-4 py-3 text-left">{`${contest.startDate} (${contest.duration})`}</td>
              <td className="px-4 py-3 text-left">{contest.questionCount}</td>
              <td className="px-4 py-3 text-left">{contest.host}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* 分页控件 */}
      <div className="flex justify-end mt-4">
        <Pagination
          total={filteredData.length}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          onPageSizeChange={setPageSize}
          pageSizeOpts={[30, 50, 100]}  // 每页条数选项
          showSizeChanger
          showQuickJumper
        />
      </div>
    </div>
  );
};

export default DisplaySection;