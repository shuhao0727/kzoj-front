"use client";
import React, { useState } from "react";
import ColumnFilter from "./ColumnFilter";
import ArticleList from "./ArticleList";
import CustomPagination from "./Pagination";  // 使用自定义的分页组件

// 模拟文章数据
const allArticles = [
  { id: 1, title: "P2817 宋荣子的城堡", description: "通过乘法原理将答案拆成两部分讨论...", tags: ["题解"], date: "2024-09-29", likes: 0, comments: 0 },
  { id: 2, title: "CF435B Pasha Maximizes", description: "把更大的数移动到更靠前的位置显然是更优的...", tags: ["题解"], date: "2024-09-17", likes: 1, comments: 1 },
  // 其他文章...
];

const ColumnPage = () => {
  const [articles, setArticles] = useState(allArticles);  // 文章数据
  const [currentPage, setCurrentPage] = useState(1);  // 当前页码
  const [filteredArticles, setFilteredArticles] = useState(allArticles);  // 筛选后的文章

  const articlesPerPage = 2;  // 每页显示的文章数量

  // 搜索功能
  const handleSearch = (query) => {
    const filtered = allArticles.filter(
      (article) =>
        article.title.includes(query) || article.description.includes(query)
    );
    setFilteredArticles(filtered);
  };

  // 栏目筛选功能
  const handleFilterChange = (category) => {
    if (category === "全部") {
      setFilteredArticles(allArticles);
    } else {
      const filtered = allArticles.filter((article) =>
        article.tags.includes(category)
      );
      setFilteredArticles(filtered);
    }
  };

  // 获取当前页显示的文章
  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = filteredArticles.slice(indexOfFirstArticle, indexOfLastArticle);

  return (
    <div className="max-w-screen-lg mx-auto p-4">
      {/* 栏目过滤和搜索部分 */}
      <ColumnFilter onFilterChange={handleFilterChange} onSearch={handleSearch} />

      {/* 文章列表部分 */}
      <ArticleList articles={currentArticles} />

      {/* 页码部分 */}
      <CustomPagination
        currentPage={currentPage}
        totalPages={Math.ceil(filteredArticles.length / articlesPerPage)}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default ColumnPage;