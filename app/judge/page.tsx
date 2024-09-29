"use client";

import React, { useState } from "react";
import SearchSection from "./SearchSection";
import DisplaySection from "./DisplaySection";

const JudgePage = () => {
  const [searchId, setSearchId] = useState<string>("");
  const [searchTitle, setSearchTitle] = useState<string>("");
  const [onlyMine, setOnlyMine] = useState<boolean>(false);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8 bg-white rounded-lg shadow-md">
      <SearchSection
        searchId={searchId}
        setSearchId={setSearchId}
        searchTitle={searchTitle}
        setSearchTitle={setSearchTitle}
        onlyMine={onlyMine}
        setOnlyMine={setOnlyMine}
      />
      <DisplaySection
        searchId={searchId}
        searchTitle={searchTitle}
        onlyMine={onlyMine}
      />
    </div>
  );
};

export default JudgePage;