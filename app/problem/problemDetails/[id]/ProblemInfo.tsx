"use client";

import React from "react";

const ProblemInfo = () => {
  return (
    <div className="bg-white p-4 mb-4 shadow rounded">
      <div className="flex justify-between space-x-4">
        <div className="flex-1 text-center">
          <p>
            提交: <span className="font-bold">702.72k</span>
          </p>
        </div>
        <div className="flex-1 text-center">
          <p>
            通过: <span className="font-bold">240.05k</span>
          </p>
        </div>
        <div className="flex-1 text-center">
          <p>
            时间限制: <span className="font-bold">1.0s</span>
          </p>
        </div>
        <div className="flex-1 text-center">
          <p>
            内存限制: <span className="font-bold">125.00MB</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProblemInfo;