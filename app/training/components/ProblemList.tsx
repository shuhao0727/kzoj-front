"use client";

import React, { useMemo, useState } from "react";
import { Table } from "@douyinfe/semi-ui";

const ProblemList = () => {
  const [problems, setProblems] = useState([]); // 问题列表数据
  const [currentPage, setCurrentPage] = useState(1); // 当前页码
  const [pageSize, setPageSize] = useState(10); // 每页显示条数

  // 模拟问题数据
  useMemo(() => {
    const _problems = [];
    for (let i = 1; i <= 50; i++) {
      _problems.push({ id: i, title: `题目 ${i}`, difficulty: "简单" });
    }
    setProblems(_problems);
  }, []);

  const columns = [
    { title: "题号", dataIndex: "id", width: 80 },
    { title: "标题", dataIndex: "title", width: 300 },
    { title: "难度", dataIndex: "difficulty", width: 100 },
  ];

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-4">训练题目列表</h2>
      <Table
        columns={columns}
        dataSource={problems}
        pagination={false}
        bordered
      />
    </div>
  );
};

export default ProblemList;