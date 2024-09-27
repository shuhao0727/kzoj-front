"use client";
import React, { useState } from 'react';

const TagForm = ({ addTag }) => {
  const [tagName, setTagName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (tagName.trim()) {
      addTag(tagName);
      setTagName('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex mb-4">
      <input
        type="text"
        value={tagName}
        onChange={(e) => setTagName(e.target.value)}
        className="border border-gray-300 rounded-md p-2 w-full"
        placeholder="添加新标签"
      />
      <button
        type="submit"
        className="ml-2 bg-blue-600 text-white rounded-md px-4 py-2"
      >
        添加
      </button>
    </form>
  );
};

export default TagForm;