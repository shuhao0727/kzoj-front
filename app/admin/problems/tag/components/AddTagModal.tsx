import React, { useState } from 'react';

const AddTagModal = ({ onClose }) => {
  const [tagName, setTagName] = useState('');
  const [tagColor, setTagColor] = useState('#ffffff');

  const handleSubmit = (e) => {
    e.preventDefault();
    // 这里处理添加标签的逻辑
    // 在成功添加标签后，更新标签列表并关闭模态框
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <form className="bg-white p-6 rounded-lg shadow-md w-96" onSubmit={handleSubmit}>
        <h2 className="text-lg font-semibold mb-4">添加标签</h2>
        <label className="block mb-2">标签名称</label>
        <input
          type="text"
          value={tagName}
          onChange={(e) => setTagName(e.target.value)}
          className="border rounded-md w-full p-2 mb-4"
          required
        />
        
        <label className="block mb-2">标签颜色</label>
        <input
          type="color"
          value={tagColor}
          onChange={(e) => setTagColor(e.target.value)}
          className="border rounded-md mb-4"
        />

        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition">
          添加
        </button>
        <button type="button" onClick={onClose} className="mt-2 w-full bg-gray-200 py-2 rounded-md hover:bg-gray-300 transition">
          取消
        </button>
      </form>
    </div>
  );
};

export default AddTagModal;