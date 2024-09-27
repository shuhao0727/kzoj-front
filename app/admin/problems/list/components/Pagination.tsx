"use client";
import React from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';

const Pagination = ({ currentPage, totalItems, itemsPerPage, onPageChange }) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);  // 计算总页数

  // 动态生成页码按钮
  const generatePageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5;  // 最多显示5个页码
    const startPage = Math.max(1, currentPage - 2);  // 起始页
    const endPage = Math.min(totalPages, currentPage + 2);  // 结束页

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return pageNumbers;
  };

  return (
    <div className="flex items-center justify-between border-t border-transparent px-4 py-3">
      <div className="flex-1 flex justify-between sm:hidden">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="relative inline-flex items-center px-4 py-2 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-50 transition"
        >
          上一页
        </button>
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="relative inline-flex items-center px-4 py-2 ml-3 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-50 transition"
        >
          下一页
        </button>
      </div>

      <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
        <p className="text-sm text-gray-700">
          显示第{' '}
          <span className="font-medium">{(currentPage - 1) * itemsPerPage + 1}</span>{' '}
          到{' '}
          <span className="font-medium">
            {Math.min(currentPage * itemsPerPage, totalItems)}
          </span>{' '}
          项，共 <span className="font-medium">{totalItems}</span> 项
        </p>
        
        <nav className="inline-flex rounded-md shadow-sm -space-x-px">
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 text-sm font-medium text-gray-500 hover:bg-gray-50 transition"
          >
            <span className="sr-only">上一页</span>
            <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
          </button>

          {generatePageNumbers().map((pageNumber) => (
            <button
              key={pageNumber}
              onClick={() => onPageChange(pageNumber)}
              className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                currentPage === pageNumber ? 'bg-indigo-600 text-white' : 'text-gray-500 hover:bg-gray-50 border-gray-300'
              }`}
            >
              {pageNumber}
            </button>
          ))}

          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 text-sm font-medium text-gray-500 hover:bg-gray-50 transition"
          >
            <span className="sr-only">下一页</span>
            <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
          </button>
        </nav>
      </div>
    </div>
  );
};

export default Pagination;