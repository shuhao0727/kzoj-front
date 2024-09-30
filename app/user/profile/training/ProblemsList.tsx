import React from "react";

const ProblemsList = () => {
  return (
    <div className="bg-white p-4 shadow rounded">
      {/* 尝试过的题目 */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-4">尝试过的题目</h2>
        <div className="space-x-2">
          <a href="#" className="text-blue-500 hover:underline">B2007</a>
          <a href="#" className="text-blue-500 hover:underline">P1219</a>
          <a href="#" className="text-blue-500 hover:underline">P1223</a>
          <a href="#" className="text-blue-500 hover:underline">P1309</a>
          <a href="#" className="text-blue-500 hover:underline">P2615</a>
          <a href="#" className="text-blue-500 hover:underline">P4873</a>
          <a href="#" className="text-blue-500 hover:underline">P5731</a>
        </div>
        <p className="text-gray-500 mt-2 text-sm">统计数据非实时更新。</p>
      </div>

      {/* 已通过的题目 */}
      <div>
        <h2 className="text-lg font-semibold mb-4">已通过的题目</h2>
        
        <div className="mb-4">
          <span className="bg-red-200 text-white px-2 py-1 rounded-sm text-xs inline-block mb-2">入门</span>
          <div className="space-x-2">
            <a href="#" className="text-blue-500 hover:underline">B2002</a>
            <a href="#" className="text-blue-500 hover:underline">B2005</a>
            <a href="#" className="text-blue-500 hover:underline">B2025</a>
            {/* 更多题目链接 */}
          </div>
        </div>
        
        <div className="mb-4">
          <span className="bg-yellow-200 text-white px-2 py-1 rounded-sm text-xs inline-block mb-2">普及/提高-</span>
          <div className="space-x-2">
            <a href="#" className="text-blue-500 hover:underline">P1036</a>
            <a href="#" className="text-blue-500 hover:underline">P1981</a>
            <a href="#" className="text-blue-500 hover:underline">P2957</a>
            {/* 更多题目链接 */}
          </div>
        </div>
        
        <div className="mb-4">
          <span className="bg-green-200 text-white px-2 py-1 rounded-sm text-xs inline-block mb-2">普及/提高+</span>
          <div className="space-x-2">
            <a href="#" className="text-blue-500 hover:underline">P1096</a>
            <a href="#" className="text-blue-500 hover:underline">P1135</a>
            <a href="#" className="text-blue-500 hover:underline">P1229</a>
            {/* 更多题目链接 */}
          </div>
        </div>

        <p className="text-gray-500 mt-4 text-sm">统计数据非实时更新。</p>
      </div>
    </div>
  );
};

export default ProblemsList;