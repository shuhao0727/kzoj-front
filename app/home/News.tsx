"use client";

import React from "react";

const newsList = [
  { title: "2024年CSP认证新闻", date: "2024-09-25", author: "Admin" },
  { title: "2023年NOIP资格赛新闻", date: "2023-12-17", author: "Admin" },
  { title: "提醒：2023年NOIP复赛新闻", date: "2023-10-11", author: "Admin" },
];

const NewsSection = () => {
  return (
    <div className="bg-white hover:bg-gray-100 rounded-lg shadow-lg p-8 mb-8 transition-shadow duration-300">
      <h2 className="text-xl font-bold text-blue-600 mb-4">新闻</h2>
      <ul>
        {newsList.map((news, index) => (
          <li key={index} className="mb-2">
            {news.title} - {news.date} - {news.author}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NewsSection;