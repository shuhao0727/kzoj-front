"use client";

import React, { useState } from "react";

const Tags = () => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  return (
    <div className="bg-white p-4 shadow rounded mb-4">
      <h3 className="font-bold mb-2">标签</h3>
      {isCollapsed ? (
        <button onClick={() => setIsCollapsed(false)} className="text-blue-500">
          展开
        </button>
      ) : (
        <div>
          <p>NOIP 普及组, 2002</p>
          <button onClick={() => setIsCollapsed(true)} className="text-blue-500">
            收起
          </button>
        </div>
      )}
    </div>
  );
};

export default Tags;