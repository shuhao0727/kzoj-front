"use client";

import React, { useMemo, useState } from "react";
import { Table, Checkbox, Pagination } from "@douyinfe/semi-ui";
import * as dateFns from "date-fns";

const ProblemTable = ({
  data,
  searchId,
  searchTitle,
  isEditing,
  selectedRows,
  setSelectedRows,
}) => {
  const [currentPage, setCurrentPage] = useState(1); // 当前页码
  const [pageSize, setPageSize] = useState(15); // 每页显示条数

  // 搜索过滤功能
  const filteredData = useMemo(() => {
    let filtered = data;

    // 根据展示ID搜索
    if (searchId) {
      filtered = filtered.filter(item =>
        item.displayId.toLowerCase().includes(searchId.toLowerCase())
      );
    }

    // 根据题目名称搜索
    if (searchTitle) {
      filtered = filtered.filter(item =>
        item.name.toLowerCase().includes(searchTitle.toLowerCase())
      );
    }

    return filtered;
  }, [searchId, searchTitle, data]);

  // 分页后的数据：根据当前页码和每页条数来切割数据
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return filteredData.slice(startIndex, startIndex + pageSize);
  }, [currentPage, pageSize, filteredData]);

  // 处理行选择
  const handleRowSelection = (id, checked) => {
    if (checked) {
      setSelectedRows([...selectedRows, id]);
    } else {
      setSelectedRows(selectedRows.filter((rowId) => rowId !== id));
    }
  };

  // 表格列配置
  const columns = useMemo(
    () => [
      ...(isEditing
        ? [
            {
              title: "状态",
              dataIndex: "status",
              width: 50,
              render: (text, record) => (
                <Checkbox
                  checked={selectedRows.includes(record.id)}
                  onChange={(checked) => handleRowSelection(record.id, checked)}
                />
              ),
            },
          ]
        : []),
      { title: "ID", dataIndex: "id", width: 80, sorter: (a, b) => a.id - b.id },
      { title: "展示ID", dataIndex: "displayId", width: 150, sorter: (a, b) => a.displayId.localeCompare(b.displayId) },
      { title: "标题", dataIndex: "name", width: 300, sorter: (a, b) => a.name.localeCompare(b.name) },
      { title: "题目类型", dataIndex: "type", width: 150, sorter: (a, b) => a.type.localeCompare(b.type) },
      { title: "作者", dataIndex: "owner", width: 150, sorter: (a, b) => a.owner.localeCompare(b.owner) },
      {
        title: "创建时间",
        dataIndex: "createdAt",
        width: 200,
        render: (value) => dateFns.format(new Date(value), "yyyy-MM-dd"),
        sorter: (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
      },
      {
        title: "操作",
        dataIndex: "actions",
        width: 200,
        render: (_, record) => (
          <div style={{ display: "flex", gap: "8px" }}>
            <button className="text-blue-500 hover:underline">修改</button>
            <button className="text-red-500 hover:underline">删除</button>
            <button className="text-green-500 hover:underline">下载</button>
          </div>
        ),
      },
    ],
    [isEditing, selectedRows]
  );

  return (
    <div>
      {/* 表格展示 */}
      <Table
        columns={columns}
        dataSource={paginatedData}
        pagination={false} // 分页控制在表格外
        bordered
        scroll={{ y: 700 }} // 表格内容滚动
        size="middle"
      />

      {/* 分页组件 */}
      <Pagination
        currentPage={currentPage}
        total={filteredData.length}
        pageSize={pageSize}
        onChange={(page, size) => {
          setCurrentPage(page);
          setPageSize(size); // 更新每页显示条数
        }}
        pageSizeOpts={[15, 30, 50, 100]} // 可选的每页条数选项
        showSizeChanger
        showQuickJumper
        defaultPageSize={15} // 设置默认显示15条
      />
    </div>
  );
};

export default ProblemTable;