"use client";

import React, { useState } from "react";

interface SearchBarProps {
  onSearch: (searchTerm: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <div className="my-4">
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearch}
        placeholder="搜索参赛者..."
        className="border rounded-lg px-4 py-2 w-full"
      />
    </div>
  );
};

export default SearchBar;