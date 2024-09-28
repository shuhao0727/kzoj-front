"use client";

import React, { useState } from 'react';
import { Card, Typography } from '@douyinfe/semi-ui';

const TagSlider = ({ cards, setCards, setEditingTag, setShowAddTagModal, setEditingTagType, setShowEditTagTypeModal }) => {
  const [expandedCards, setExpandedCards] = useState(Array(cards.length).fill(false));
  const { Text } = Typography;

  const toggleCardExpansion = (index) => {
    const updatedExpansion = [...expandedCards];
    updatedExpansion[index] = !updatedExpansion[index];
    setExpandedCards(updatedExpansion);
  };

  const handleDeleteTag = (cardIndex, tagIndex) => {
    const updatedCards = [...cards];
    updatedCards[cardIndex].tags.splice(tagIndex, 1); // 删除指定标签
    setCards(updatedCards);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
      {cards.map((card, idx) => (
        <Card
          key={idx}
          shadows="hover"
          title={
            <span
              onClick={() => {
                setEditingTagType(card); // 设置当前要编辑的标签分类
                setShowEditTagTypeModal(true); // 打开编辑标签分类的弹窗
              }}
              className="cursor-pointer font-semibold text-lg text-gray-800 hover:text-blue-600 transition-all duration-300"
            >
              {card.title}
            </span>
          }
          headerLine={false}
          style={{ width: '100%' }}
          headerExtraContent={
            <Text link onClick={() => toggleCardExpansion(idx)} className="text-blue-500 hover:text-blue-700">
              {expandedCards[idx] ? '收起' : '展开'}
            </Text>
          }
          className="rounded-lg shadow-lg bg-white hover:shadow-xl transition-shadow duration-300"
        >
          <div className={`flex flex-wrap gap-2 sm:gap-4`}>
            {expandedCards[idx]
              ? card.tags.map((tag, tagIdx) => (
                  <span
                    key={tagIdx}
                    onClick={() => {
                      setEditingTag(tag); // 设置当前要编辑的标签
                      setShowAddTagModal(true); // 打开编辑标签的弹窗
                    }}
                    style={{ backgroundColor: tag.color || '#d1d5db' }} // 设置标签背景颜色
                    className="cursor-pointer inline-flex items-center gap-x-2 rounded-full px-3 py-1 text-sm font-medium text-white relative hover:bg-opacity-90 transition-all duration-200"
                  >
                    {tag.name}
                    {/* 删除按钮 */}
                    <span
                      onClick={(e) => {
                        e.stopPropagation(); // 阻止点击事件冒泡
                        if (window.confirm(`确定删除标签 "${tag.name}" 吗？`)) {
                          handleDeleteTag(idx, tagIdx); // 删除标签
                        }
                      }}
                      className="absolute top-0 right-0 cursor-pointer text-red-500 hover:text-red-700 transition-colors duration-200"
                    >
                      &times;
                    </span>
                  </span>
                ))
              : card.tags.slice(0, 3).map((tag, tagIdx) => (
                  <span
                    key={tagIdx}
                    onClick={() => {
                      setEditingTag(tag); // 设置当前要编辑的标签
                      setShowAddTagModal(true); // 打开编辑标签的弹窗
                    }}
                    style={{ backgroundColor: tag.color || '#d1d5db' }}
                    className="cursor-pointer inline-flex items-center gap-x-2 rounded-full px-3 py-1 text-sm font-medium text-white relative hover:bg-opacity-90 transition-all duration-200"
                  >
                    {tag.name}
                    {/* 删除按钮 */}
                    <span
                      onClick={(e) => {
                        e.stopPropagation();
                        if (window.confirm(`确定删除标签 "${tag.name}" 吗？`)) {
                          handleDeleteTag(idx, tagIdx);
                        }
                      }}
                      className="absolute top-0 right-0 cursor-pointer text-red-500 hover:text-red-700 transition-colors duration-200"
                    >
                      &times;
                    </span>
                  </span>
                ))}
            {card.tags.length > 3 && !expandedCards[idx] && (
              <button
                className="text-blue-500 text-sm mt-2 hover:text-blue-700 transition-all duration-200"
                onClick={() => toggleCardExpansion(idx)}
              >
                {expandedCards[idx] ? '收起' : '更多'}
              </button>
            )}
          </div>
        </Card>
      ))}
    </div>
  );
};

export default TagSlider;