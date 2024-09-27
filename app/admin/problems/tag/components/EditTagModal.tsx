import React, { useState } from "react";

const EditTagModal = ({ onClose, tagData = {}, editTag, tagTypes = [] }) => {
  const [tagName, setTagName] = useState(tagData.name || ""); // 确保 name 存在
  const [tagColor, setTagColor] = useState(tagData.color || "#1f2937"); // 如果没有颜色，使用默认颜色

  // 检查 tagTypes 是否为空并且有至少一个元素
  const [tagType, setTagType] = useState(
    tagData.type || (tagTypes.length > 0 ? tagTypes[0].name : "") // 如果 tagTypes 为空，则设置默认空字符串
  );

  const handleSave = () => {
    const updatedTag = {
      ...tagData,
      name: tagName,
      color: tagColor,
      type: tagType,
    };
    editTag(updatedTag);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
        <h2 className="text-xl font-semibold mb-4">编辑标签</h2>
        <label className="block mb-2 text-sm font-medium">标签名称</label>
        <input
          type="text"
          value={tagName}
          onChange={(e) => setTagName(e.target.value)}
          className="w-full border border-gray-300 rounded-md p-2 mb-4"
        />

        <label className="block mb-2 text-sm font-medium">标签颜色</label>
        <input
          type="color"
          value={tagColor}
          onChange={(e) => setTagColor(e.target.value)}
          className="w-full border border-gray-300 rounded-md p-2 mb-4"
        />

        <label className="block mb-2 text-sm font-medium">标签类型</label>
        <select
          value={tagType}
          onChange={(e) => setTagType(e.target.value)}
          className="w-full border border-gray-300 rounded-md p-2 mb-4"
        >
          {tagTypes.length > 0 ? (
            tagTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))
          ) : (
            <option value="" disabled>
              无可用标签类型
            </option>
          )}
        </select>

        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="rounded-full bg-white px-4 py-2.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          >
            取消
          </button>
          <button
            onClick={handleSave}
            className="rounded-full bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-700"
          >
            保存
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditTagModal;