"use client";

import React from "react";
import { Input, Button, Select } from "@douyinfe/semi-ui";

const SearchFilter = ({
  searchId,
  setSearchId,
  searchTitle,
  setSearchTitle,
  isEditing,
  toggleEditMode,
  handleBatchUpdate,
  dataLength,  // 接收题目总数
}) => {
  return (
    <div className="flex items-center space-x-4 mb-4">
      {/* 两个搜索框 */}
      <Input
        placeholder="搜索展示ID..."
        value={searchId}
        onChange={(e) => setSearchId(e)}
        style={{ width: 200 }}
      />
      <Input
        placeholder="搜索标题..."
        value={searchTitle}
        onChange={(e) => setSearchTitle(e)}
        style={{ width: 200 }}
      />

      {/* 修改按钮 */}
      <Button type="primary" onClick={toggleEditMode}>
        {isEditing ? "确定修改" : "修改题目类型"}  {/* 更改按钮文本 */}
      </Button>

      {/* 如果正在编辑模式，显示题目类型选择框 */}
      {isEditing && (
        <Select
          placeholder="选择新题目类型"
          onChange={handleBatchUpdate}
          style={{ width: 200 }}
        >
          <Select.Option value="公开题目">公开题目</Select.Option>
          <Select.Option value="比赛题目">比赛题目</Select.Option>
          <Select.Option value="团队题目">团队题目</Select.Option>
          <Select.Option value="隐藏题目">隐藏题目</Select.Option>
        </Select>
      )}

      {/* 显示题目总数 */}
      <div className="ml-4">
        <span>题目总数: {dataLength}</span>
      </div>
    </div>
  );
};

export default SearchFilter;