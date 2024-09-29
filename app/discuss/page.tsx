"use client";

import React, { useState } from "react";
import SearchSection from "./SearchSection";
import CategorySection from "./CategorySection";
import DiscussionList from "./DiscussionList";

const DiscussPage = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [categoryFilter, setCategoryFilter] = useState<string>("全部");

  return (
    <div className="container mx-auto p-6 space-y-6 bg-gray-50 rounded-lg shadow-md">
      <div className="flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-6">
        <div className="md:w-1/4 space-y-6">
          <CategorySection
            categoryFilter={categoryFilter}
            setCategoryFilter={setCategoryFilter}
          />
        </div>

        <div className="md:w-3/4 space-y-6">
          <SearchSection searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          <DiscussionList searchTerm={searchTerm} categoryFilter={categoryFilter} />
        </div>
      </div>
    </div>
  );
};

export default DiscussPage;