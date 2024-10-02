"use client";

import React, { useState, useMemo } from "react";
import SearchFilter from "./SearchFilter";
import ProblemTable from "./ProblemTable";

// 示例数据：创建了 500 条示例数据，用于模拟问题列表
const ProblemListPage = () => {
  const [searchId, setSearchId] = useState("");
  const [searchTitle, setSearchTitle] = useState("");
  const [isEditing, setIsEditing] = useState(false); // 是否进入修改模式
  const [selectedRows, setSelectedRows] = useState([]); // 被选中的行

  const data = useMemo(() => {
    const _data = [];
    const DAY = 24 * 60 * 60 * 1000;
    for (let i = 0; i < 500; i++) {
      _data.push({
        key: "" + i,
        id: i + 1,
        displayId: `ID-${i + 1}`,
        name: `题目标题 ${i + 1}`,
        type: i % 2 === 0 ? "公开题目" : "比赛题目",
        owner: `用户 ${i + 1}`,
        createdAt: new Date().valueOf() - i * DAY,
      });
    }
    return _data;
  }, []);

  const toggleEditMode = () => {
    setIsEditing(!isEditing);
    setSelectedRows([]); // 清空已选择的行
  };

  const handleBatchUpdate = (newType) => {
    const updatedData = data.map((item) =>
      selectedRows.includes(item.id) ? { ...item, type: newType } : item
    );
    setSelectedRows([]);
    console.log("批量修改后的数据", updatedData);
  };

  return (
    <div>
      <SearchFilter
        searchId={searchId}
        setSearchId={setSearchId}
        searchTitle={searchTitle}
        setSearchTitle={setSearchTitle}
        isEditing={isEditing}
        toggleEditMode={toggleEditMode}
        handleBatchUpdate={handleBatchUpdate}
        dataLength={data.length}  // 传递题目总数
      />

      <ProblemTable
        data={data}
        searchId={searchId}
        searchTitle={searchTitle}
        isEditing={isEditing}
        selectedRows={selectedRows}
        setSelectedRows={setSelectedRows}
      />
    </div>
  );
};

export default ProblemListPage;