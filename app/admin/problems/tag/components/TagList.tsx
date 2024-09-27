import React, { useState } from 'react';

const TagList = () => {
  const [tags, setTags] = useState([
    { type: 'C++基础', tags: ['入门', '一维数组', '二维数组', 'STL'] },
    { type: '初等数学', tags: ['初等数论', '数论', '图论'] },
    { type: '动态规划', tags: ['背包问题', '最短路径'] }
  ]);

  return (
    <div className="space-y-4">
      {tags.map((category, index) => (
        <div key={index} className="bg-white rounded-lg p-4 shadow-md">
          <div className="flex justify-between items-center">
            <h2 className="font-semibold">{category.type}</h2>
            <button className="text-gray-500">-</button>
          </div>
          <div className="mt-2 flex flex-wrap">
            {category.tags.map((tag, i) => (
              <span key={i} className="inline-block bg-blue-100 text-blue-800 text-sm font-semibold mr-2 px-2.5 py-0.5 rounded">
                {tag}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TagList;