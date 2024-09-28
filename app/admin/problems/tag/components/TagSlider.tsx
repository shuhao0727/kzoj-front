"use client";

import React, { useState } from 'react';
import { Card, Typography } from '@douyinfe/semi-ui';

const TagSlider = ({ cards, setCards, setEditingTag }) => {
  const [expandedCards, setExpandedCards] = useState(Array(cards.length).fill(false));
  const { Text } = Typography;

  const toggleCardExpansion = (index) => {
    const updatedExpansion = [...expandedCards];
    updatedExpansion[index] = !updatedExpansion[index];
    setExpandedCards(updatedExpansion);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
      {cards.map((card, idx) => (
        <Card
          key={idx}
          shadows="hover"
          title={card.title}
          headerLine={false}
          style={{ width: '100%' }}
          headerExtraContent={
            <Text link onClick={() => toggleCardExpansion(idx)}>
              {expandedCards[idx] ? '收起' : '展开'}
            </Text>
          }
        >
          <div className={`flex flex-wrap gap-2 sm:gap-4`}>
            {expandedCards[idx]
              ? card.tags.map((tag, tagIdx) => (
                  <span
                    key={tagIdx}
                    onClick={() => setEditingTag(tag)}
                    style={{ backgroundColor: tag.color || '#d1d5db' }} // 设置标签背景颜色
                    className="cursor-pointer inline-flex items-center gap-x-2 rounded-full px-3 py-1 text-sm font-medium text-white"
                  >
                    {tag.name}
                  </span>
                ))
              : card.tags.slice(0, 3).map((tag, tagIdx) => (
                  <span
                    key={tagIdx}
                    onClick={() => setEditingTag(tag)}
                    style={{ backgroundColor: tag.color || '#d1d5db' }} // 设置标签背景颜色
                    className="cursor-pointer inline-flex items-center gap-x-2 rounded-full px-3 py-1 text-sm font-medium text-white"
                  >
                    {tag.name}
                  </span>
                ))}
            {card.tags.length > 3 && !expandedCards[idx] && (
              <button
                className="text-blue-500 text-sm mt-2"
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