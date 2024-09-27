"use client";
import React from "react";

const SearchBar = () => {
  return (
    <div className="flex space-x-2 mb-4">
      <input type="text" placeholder="输入关键词" className="border rounded-md px-3 py-2 w-15" />
      <select className="border rounded-md px-3 py-2">
        <option>全部题目</option>
        <option>公开题目</option>
        <option>比赛题目</option>
        <option>各类真题</option>
      </select>
    </div>
  );
};

export default SearchBar;