"use client";

import React from 'react';
import { Pagination as SemiPagination } from '@douyinfe/semi-ui';

const Pagination = ({ currentPage, totalItems, itemsPerPage, onPageChange }) => {
  const handlePageChange = (page, pageSize) => {
    onPageChange(page); // 调用父组件传递的分页函数
  };

  return (
    <div className="flex justify-center mt-4">
      <SemiPagination
        currentPage={currentPage}  // 当前页码
        total={totalItems}  // 数据总数
        pageSize={itemsPerPage}  // 每页条数
        onPageChange={handlePageChange}  // 页码变更时触发
        pageSizeOpts={[30, 50, 100]}  // 每页显示条数的选项
        showSizeChanger  // 显示切换每页显示条数的功能
        showQuickJumper  // 显示快速跳转到指定页数的功能
        defaultPageSize={itemsPerPage}  // 默认每页条数
      />
    </div>
  );
};

export default Pagination;