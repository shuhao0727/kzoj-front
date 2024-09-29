"use client";
import React from "react";

const SearchSection = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="输入关键词"
        className="border p-3 rounded-lg w-full md:w-1/2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
};

export default SearchSection;