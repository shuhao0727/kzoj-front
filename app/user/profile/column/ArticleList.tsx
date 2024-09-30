"use client";
import React, { useState } from "react";

const ArticleList = ({ articles }) => {
  const [likes, setLikes] = useState(articles.map(article => article.likes));
  const [comments, setComments] = useState(articles.map(article => article.comments));

  const handleLike = (index) => {
    const updatedLikes = [...likes];
    updatedLikes[index] += 1;
    setLikes(updatedLikes);
  };

  const handleComment = (index) => {
    const updatedComments = [...comments];
    updatedComments[index] += 1;
    setComments(updatedComments);
  };

  return (
    <div>
      {articles.map((article, index) => (
        <div key={article.id} className="border-b py-4 flex justify-between items-start">
          <div>
            <h2 className="text-lg font-bold text-blue-500">
              {article.title}
            </h2>
            <p className="text-gray-600">{article.description}</p>
            <div className="text-gray-500 text-sm">
              {article.tags.map((tag) => (
                <span key={tag} className="mr-2">{tag}</span>
              ))}
              <span>题解 {article.id}</span>
              <span className="ml-4">发布时间 {article.date}</span>
            </div>
          </div>
          <div className="text-gray-500 text-sm">
            <span className="cursor-pointer" onClick={() => handleLike(index)}>
              {likes[index]} 点赞
            </span>
            <span className="ml-4 cursor-pointer" onClick={() => handleComment(index)}>
              {comments[index]} 评论
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ArticleList;