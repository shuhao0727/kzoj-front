"use client";
import React from "react";
import { Pagination } from "@douyinfe/semi-ui";

const CustomPagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="flex justify-center mt-6">
      <Pagination
        total={totalPages * 10}  // 根据总页数动态计算总条目数
        currentPage={currentPage}
        onPageChange={onPageChange}  // 传递页码变更函数
        showSizeChanger
        style={{ marginBottom: 12 }}
      />
    </div>
  );
};

export default CustomPagination;