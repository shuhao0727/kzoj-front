"use client";

import React, { useState, useMemo } from "react";
import { Table, Avatar, Pagination, Select } from "@douyinfe/semi-ui";
import SearchBar from "./SearchBar"; // Import the SearchBar component

// Simulated ranking data
const rankingData = Array.from({ length: 50 }, (_, index) => ({
  key: index + 1,
  rank: index + 1,
  username: `user${index + 1}`,
  name: `选手 ${index + 1}`,
  score: 300 - index * 5, // 总分为 T1-T4 的总和
  t1: { score: Math.floor(Math.random() * 101), time: `${Math.floor(Math.random() * 50)}ms` },
  t2: { score: Math.floor(Math.random() * 101), time: `${Math.floor(Math.random() * 50)}ms` },
  t3: { score: Math.floor(Math.random() * 101), time: `${Math.floor(Math.random() * 50)}ms` },
  t4: { score: Math.floor(Math.random() * 101), time: `${Math.floor(Math.random() * 50)}ms` },
  avatarBg: index % 2 === 0 ? "blue" : "green",
}));

const RankingList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchTerm, setSearchTerm] = useState(""); // Keep track of search input

  // 根据搜索条件过滤数据
  const filteredData = useMemo(() => {
    return rankingData.filter(
      (user) =>
        user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  // 根据当前页面和页码大小来分页
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return filteredData.slice(startIndex, startIndex + pageSize);
  }, [currentPage, pageSize, filteredData]);

  // 表格列设置
  const columns = [
    {
      title: "排名",
      dataIndex: "rank",
      width: 60,
      render: (rank) => {
        let medalColor = "";
        if (rank === 1) medalColor = "text-yellow-500"; // 金
        else if (rank === 2) medalColor = "text-gray-400"; // 银
        else if (rank === 3) medalColor = "text-yellow-700"; // 铜

        return <div className={`text-lg ${medalColor}`}>{rank}</div>;
      },
    },
    {
      title: "用户",
      dataIndex: "username",
      width: 150,
      render: (text, record) => (
        <div className="flex items-center">
          <Avatar size="small" color={record.avatarBg} style={{ marginRight: 4 }}>
            {typeof text === "string" && text.slice(0, 1)}
          </Avatar>
          <div>{text}</div>
        </div>
      ),
    },
    {
      title: "姓名",
      dataIndex: "name",
      width: 120,
    },
    {
      title: "总分",
      dataIndex: "score",
      width: 100,
      align: "center",
      sorter: (a, b) => a.score - b.score, // 添加排序功能
      render: (score, record) => (
        <div className={score === 100 ? "bg-green-200" : "bg-blue-200"}>
          {score} <span className="text-xs text-gray-400">({record.t1.time})</span>
        </div>
      ),
    },
    {
      title: "T1",
      dataIndex: "t1",
      width: 100,
      align: "center",
      sorter: (a, b) => a.t1.score - b.t1.score, // 添加排序功能
      render: (t1) => (
        <div className={t1.score === 100 ? "bg-green-200" : "bg-blue-200"}>
          {t1.score} <span className="text-xs text-gray-400">({t1.time})</span>
        </div>
      ),
    },
    {
      title: "T2",
      dataIndex: "t2",
      width: 100,
      align: "center",
      sorter: (a, b) => a.t2.score - b.t2.score, // 添加排序功能
      render: (t2) => (
        <div className={t2.score === 100 ? "bg-green-200" : "bg-blue-200"}>
          {t2.score} <span className="text-xs text-gray-400">({t2.time})</span>
        </div>
      ),
    },
    {
      title: "T3",
      dataIndex: "t3",
      width: 100,
      align: "center",
      sorter: (a, b) => a.t3.score - b.t3.score, // 添加排序功能
      render: (t3) => (
        <div className={t3.score === 100 ? "bg-green-200" : "bg-blue-200"}>
          {t3.score} <span className="text-xs text-gray-400">({t3.time})</span>
        </div>
      ),
    },
    {
      title: "T4",
      dataIndex: "t4",
      width: 100,
      align: "center",
      sorter: (a, b) => a.t4.score - b.t4.score, // 添加排序功能
      render: (t4) => (
        <div className={t4.score === 100 ? "bg-green-200" : "bg-blue-200"}>
          {t4.score} <span className="text-xs text-gray-400">({t4.time})</span>
        </div>
      ),
    },
  ];

  return (
    <div className="p-4 max-w-full mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">详细排名表</h2>

        {/* 集成搜索框 */}
        <SearchBar onSearch={setSearchTerm} />
      </div>

      <Table
        columns={columns}
        dataSource={paginatedData}
        pagination={false}
        bordered
        size="small"
        className="border border-gray-200 rounded-lg shadow"
        style={{ lineHeight: "1.5rem" }}
      />

      {/* 分页控制 */}
      <div className="flex justify-end items-center mt-4">
        <Select
          value={pageSize}
          onChange={(value) => setPageSize(value)}
          style={{ marginRight: 16 }}
          size="small"
        >
          <Select.Option value={10}>每页 10 条</Select.Option>
          <Select.Option value={20}>每页 20 条</Select.Option>
          <Select.Option value={50}>每页 50 条</Select.Option>
        </Select>

        <Pagination
          total={filteredData.length}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          showQuickJumper
        />
      </div>
    </div>
  );
};

export default RankingList;