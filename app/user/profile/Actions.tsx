import React from "react";

const Actions = () => {
  return (
    <div className="flex justify-end space-x-8 items-center mt-2"> {/* 添加 margin-top */}
      <div className="flex items-center space-x-1"> {/* 每个统计项和数字 */}
        <span className="text-sm text-gray-500">提交</span>
        <span className="font-bold text-sm">10</span>
      </div>
      <div className="flex items-center space-x-1"> {/* 每个统计项和数字 */}
        <span className="text-sm text-gray-500">通过</span>
        <span className="font-bold text-sm">5</span>
      </div>
      <div className="flex items-center space-x-1"> {/* 每个统计项和数字 */}
        <span className="text-sm text-gray-500">排名</span>
        <span className="font-bold text-sm">3</span>
      </div>
      <div className="flex items-center space-x-1"> {/* 每个统计项和数字 */}
        <span className="text-sm text-gray-500">关注</span>
        <span className="font-bold text-sm">15</span>
      </div>
    </div>
  );
};

export default Actions;