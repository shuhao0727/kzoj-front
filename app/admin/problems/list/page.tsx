"use client";
import React from "react";
import ProblemTable from "./components/ProblemTable";
import Pagination from "./components/Pagination";
import SearchBar from "./components/SearchBar";

const ProblemListPage = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">题目列表</h1>
      <SearchBar />
      <ProblemTable />
     
    </div>
  );
};

export default ProblemListPage;