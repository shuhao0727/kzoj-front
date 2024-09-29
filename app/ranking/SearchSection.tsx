"use client";

import React from "react";

const SearchSection = ({
  searchTerm,
  setSearchTerm,
}: {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
}) => {
  return (
    <div className="flex justify-center mb-6">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="请输入用户名、昵称或真实姓名"
        className="w-1/2 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" 
      />
      <button className="ml-4 bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md transition duration-300 ease-in-out">
        搜索
      </button>
    </div>
  );
};

export default SearchSection;