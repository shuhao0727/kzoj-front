import React, { useState } from "react";

const AddTagModal = ({ onClose, addTag, tagTypes }) => {
  const [tagName, setTagName] = useState("");
  const [tagType, setTagType] = useState(tagTypes[0].name || ""); 
  const [tagColor, setTagColor] = useState("#1f2937"); 

  const handleSubmit = (e) => {
    e.preventDefault();
    if (tagName) {
      const newTag = {
        id: Math.random().toString(36).substr(2, 9),
        name: tagName,
        type: tagType,
        color: tagColor,
      };
      addTag(newTag);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold mb-4">添加标签</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              标签名称
            </label>
            <input
              type="text"
              value={tagName}
              onChange={(e) => setTagName(e.target.value)}
              className="w-full mt-1 px-3 py-2 border rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              标签类型
            </label>
            <select
              value={tagType}
              onChange={(e) => setTagType(e.target.value)}
              className="w-full mt-1 px-3 py-2 border rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              {tagTypes.map((type) => (
                <option key={type.name} value={type.name}>
                  {type.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              标签颜色
            </label>
            <input
              type="color"
              value={tagColor}
              onChange={(e) => setTagColor(e.target.value)}
              className="w-full mt-1 px-3 py-2 border rounded-lg shadow-sm"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="rounded-full bg-white px-4 py-2.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            >
              添加
            </button>
            <button
              type="button"
              onClick={onClose}
              className="ml-4 rounded-full bg-white px-4 py-2.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            >
              取消
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTagModal;