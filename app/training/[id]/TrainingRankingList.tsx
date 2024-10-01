"use client";

import React, { useState, useMemo } from "react";
import { Table, Avatar, Pagination, Select } from "@douyinfe/semi-ui";

// 模拟训练排名数据
const trainingRankingData = Array.from({ length: 50 }, (_, index) => ({
  key: index + 1,
  rank: index + 1, // 初始排名
  username: `trainee${index + 1}`,
  name: `学员 ${index + 1}`,
  answers: Math.floor(Math.random() * 10) + 1,  // 模拟答题数
  t1: { score: Math.floor(Math.random() * 101), time: `${Math.floor(Math.random() * 50)}ms` },
  t2: { score: Math.floor(Math.random() * 101), time: `${Math.floor(Math.random() * 50)}ms` },
  t3: { score: Math.floor(Math.random() * 101), time: `${Math.floor(Math.random() * 50)}ms` },
  t4: { score: Math.floor(Math.random() * 101), time: `${Math.floor(Math.random() * 50)}ms` },
  t5: { score: Math.floor(Math.random() * 101), time: `${Math.floor(Math.random() * 50)}ms` },
  t6: { score: Math.floor(Math.random() * 101), time: `${Math.floor(Math.random() * 50)}ms` },
  t7: { score: Math.floor(Math.random() * 101), time: `${Math.floor(Math.random() * 50)}ms` },
  t8: { score: Math.floor(Math.random() * 101), time: `${Math.floor(Math.random() * 50)}ms` },
  t9: { score: Math.floor(Math.random() * 101), time: `${Math.floor(Math.random() * 50)}ms` },
  t10: { score: Math.floor(Math.random() * 101), time: `${Math.floor(Math.random() * 50)}ms` },
  avatarBg: index % 2 === 0 ? "blue" : "green",
}));

const TrainingRankingList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchTerm, setSearchTerm] = useState(""); // 追踪搜索输入内容
  const [sorter, setSorter] = useState({ field: "answers", order: "desc" }); // 默认按照答题数降序排序

  // 根据搜索条件过滤数据
  const filteredData = useMemo(() => {
    return trainingRankingData.filter(
      (user) =>
        user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||  // 根据用户名过滤
        user.name.toLowerCase().includes(searchTerm.toLowerCase())         // 根据姓名过滤
    );
  }, [searchTerm]);

  // 根据答题数重新计算排名
  const rankedData = useMemo(() => {
    const sortedData = [...filteredData].sort((a, b) => b.answers - a.answers); // 按照答题数降序排序
    return sortedData.map((item, index) => ({
      ...item,
      rank: index + 1, // 根据答题数生成新的排名
    }));
  }, [filteredData]);

  // 根据当前页面和页码大小来分页
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return rankedData.slice(startIndex, startIndex + pageSize);
  }, [currentPage, pageSize, rankedData]);

  // 表格列设置
  const columns = [
    {
      title: "排名",
      dataIndex: "rank",
      width: 70, // 调整宽度
      fixed: 'left', // 固定列
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
      width: 140, // 调整宽度
      fixed: 'left', // 固定列
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
      width: 100, // 缩小宽度
      fixed: 'left', // 固定列
    },
    {
      title: "答题数",
      dataIndex: "answers", // 答题数
      width: 100, // 调整宽度
      fixed: 'left', // 固定列
      align: "center",
      sorter: (a, b) => a.answers - b.answers, // 排序功能
      defaultSortOrder: "descend", // 默认排序
    },
    // 动态生成 T1-T10 列
    ...Array.from({ length: 10 }, (_, i) => ({
      title: `T${i + 1}`,
      dataIndex: `t${i + 1}`,
      width: 100,
      align: "center",
      sorter: (a, b) => a[`t${i + 1}`].score - b[`t${i + 1}`].score, // 添加排序功能
      render: (t) => (
        <div className={t.score === 100 ? "bg-green-200" : "bg-blue-200"}>
          {t.score} <span className="text-xs text-gray-400">({t.time})</span>
        </div>
      ),
    })),
  ];

  return (
    <div className="p-4 max-w-full mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">训练排名列表</h2>

        {/* 搜索框集成在此处 */}
        <input
          type="text"
          placeholder="搜索用户或姓名..."
          className="border rounded-md p-2"
          onChange={(e) => setSearchTerm(e.target.value)}  // 动态更新搜索词
        />
      </div>

      <Table
        columns={columns}
        dataSource={paginatedData}
        pagination={false}
        bordered
        size="small"
        scroll={{ x: 2000 }}  // 添加水平滚动条，适应宽度
        onChange={(pagination, filters, sorter) => setSorter(sorter)}  // 设置排序器
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
          total={rankedData.length}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          showQuickJumper
        />
      </div>
    </div>
  );
};

export default TrainingRankingList;