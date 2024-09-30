"use client";

import React from "react";

const ProblemInfo = () => {
  return (
    <div className="bg-white p-4 mb-4 shadow rounded">
      <div className="flex justify-between">
        <div>
          <p>提交：702.72k</p>
          <p>通过：240.05k</p>
        </div>
        <div>
          <p>时间限制：1.0s</p>
          <p>内存限制：125.00MB</p>
        </div>
      </div>
    </div>
  );
};

export default ProblemInfo;