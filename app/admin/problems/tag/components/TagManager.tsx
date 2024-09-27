"use client";
import React, { useState } from "react";
import AddTagModal from "./AddTagModal";
import AddTagTypeModal from "./AddTagTypeModal";
import EditTagModal from "./EditTagModal"; // 编辑标签弹窗
import { tagData, tagTypesData } from "./TagData"; // 假设数据存储在这个文件中

const TagManager = () => {
  const [tags, setTags] = useState(tagData);
  const [tagTypes, setTagTypes] = useState(tagTypesData);
  const [showAddTagModal, setShowAddTagModal] = useState(false);
  const [showAddTagTypeModal, setShowAddTagTypeModal] = useState(false);
  const [editTagData, setEditTagData] = useState(null);

  // 添加标签
  const addTag = (newTag) => {
    setTags([...tags, newTag]);
  };

  // 编辑标签
  const editTag = (updatedTag) => {
    const updatedTags = tags.map((tag) =>
      tag.id === updatedTag.id ? updatedTag : tag
    );
    setTags(updatedTags);
  };

  // 删除标签
  const deleteTag = (id) => {
    const updatedTags = tags.filter((tag) => tag.id !== id);
    setTags(updatedTags);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-start items-center mb-6 space-x-4">
        <button
          onClick={() => setShowAddTagModal(true)}
          className="rounded-full bg-white px-4 py-2.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
        >
          添加标签
        </button>
        <button
          onClick={() => setShowAddTagTypeModal(true)}
          className="rounded-full bg-white px-4 py-2.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
        >
          添加标签类型
        </button>
      </div>

      {/* 标签显示 */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {tagTypes.map((type, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">{type.name}</h2>
            <div className="flex flex-wrap gap-2">
              {tags
                .filter((tag) => tag.type === type.name)
                .map((tag) => (
                  <span
                    key={tag.id}
                    className="inline-flex items-center gap-x-1.5 rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600"
                    style={{ backgroundColor: tag.color }}
                  >
                    <svg
                      className="h-1.5 w-1.5 fill-current"
                      viewBox="0 0 6 6"
                      aria-hidden="true"
                    >
                      <circle cx={3} cy={3} r={3} />
                    </svg>
                    {tag.name}
                    <button
                      type="button"
                      className="group relative -mr-1 h-3.5 w-3.5 rounded-sm hover:bg-gray-500/20"
                      onClick={() => setEditTagData(tag)}
                    >
                      <span className="sr-only">编辑</span>
                      <svg
                        viewBox="0 0 14 14"
                        className="h-3.5 w-3.5 stroke-gray-700/50 group-hover:stroke-gray-700/75"
                      >
                        <path d="M4 4l6 6m0-6l-6 6" />
                      </svg>
                    </button>
                    <button
                      type="button"
                      className="group relative -mr-1 h-3.5 w-3.5 rounded-sm hover:bg-red-500/20"
                      onClick={() => deleteTag(tag.id)}
                    >
                      <span className="sr-only">删除</span>
                      <svg
                        viewBox="0 0 14 14"
                        className="h-3.5 w-3.5 stroke-red-700/50 group-hover:stroke-red-700/75"
                      >
                        <path d="M4 4l6 6m0-6l-6 6" />
                      </svg>
                    </button>
                  </span>
                ))}
            </div>
          </div>
        ))}
      </div>

      {/* 添加标签的弹窗 */}
      {showAddTagModal && (
        <AddTagModal
          onClose={() => setShowAddTagModal(false)}
          addTag={addTag}
          tagTypes={tagTypes}
        />
      )}

      {/* 编辑标签的弹窗 */}
      {editTagData && (
        <EditTagModal
          onClose={() => setEditTagData(null)}
          tagData={editTagData}
          editTag={editTag}
          tagTypes={tagTypes}
        />
      )}

      {/* 添加标签类型弹窗 */}
      {showAddTagTypeModal && (
        <AddTagTypeModal
          onClose={() => setShowAddTagTypeModal(false)}
          setTagTypes={setTagTypes}
        />
      )}
    </div>
  );
};

export default TagManager;