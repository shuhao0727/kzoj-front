"use client";
import React, { useState } from "react";

const AddTagTypeModal = ({ onClose, addTagType }) => {
  const [tagTypeName, setTagTypeName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    addTagType(tagTypeName);
    setTagTypeName("");
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-md shadow-lg w-80">
        <h2 className="text-xl font-bold mb-4">添加标签类型</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">标签类型名称</label>
            <input
              type="text"
              value={tagTypeName}
              onChange={(e) => setTagTypeName(e.target.value)}
              className="border border-gray-300 rounded-md p-2 w-full"
              required
            />
          </div>
          <div className="flex justify-between">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md"
            >
              取消
            </button>
            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition"
            >
              添加
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTagTypeModal;