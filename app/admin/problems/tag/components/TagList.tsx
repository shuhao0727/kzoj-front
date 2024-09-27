"use client";
import React, { useState } from "react";

const TagList = ({ tagTypes, handleDeleteTag, handleEditTag }) => {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="mt-4">
      {tagTypes.map((type, typeIndex) => (
        <div key={typeIndex} className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-xl font-semibold">{type.type}</h2>
            <button
              onClick={() => toggleExpand(typeIndex)}
              className="rounded-full bg-white px-4 py-2.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            >
              {expandedIndex === typeIndex ? "折叠" : "展开"}
            </button>
          </div>
          {expandedIndex === typeIndex && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {type.tags.map((tag, tagIndex) => (
                <span
                  key={tagIndex}
                  onClick={() => handleEditTag(tag, type.type)}  // 点击标签进入编辑模式
                  className={`cursor-pointer inline-flex items-center gap-x-1.5 rounded-full px-3 py-2 text-sm font-medium ${tag.color}`}
                >
                  <svg
                    className="h-2 w-2 fill-current"
                    viewBox="0 0 6 6"
                    aria-hidden="true"
                  >
                    <circle cx={3} cy={3} r={3} />
                  </svg>
                  {tag.name}
                  <button
                    onClick={() => handleDeleteTag(typeIndex, tagIndex)}
                    className="group relative h-4 w-4 rounded-full hover:bg-gray-500/20 ml-2"
                  >
                    <svg
                      className="h-3.5 w-3.5 stroke-gray-700/50 group-hover:stroke-gray-700/75"
                      viewBox="0 0 14 14"
                    >
                      <path d="M4 4l6 6m0-6l-6 6" />
                    </svg>
                    <span className="absolute -inset-1" />
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default TagList;