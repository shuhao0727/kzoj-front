"use client";

import React from "react";

const ContestDescription = () => {
  return (
    <div className="bg-white p-6 shadow rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">比赛说明</h2>
      <p className="text-gray-700 leading-relaxed">
        这是一场程序设计比赛，参赛选手需在规定时间内解决尽可能多的算法题目。比赛将采用标准计分规则，按照得分高低进行排名。
        参赛者可以使用多种编程语言参与比赛，比赛期间可以提交多次解答，系统将根据最后一次有效提交进行评估。
      </p>
      <p className="mt-4 text-gray-700 leading-relaxed">
        比赛的详细规则和注意事项将在比赛开始前通知所有参赛者，请确保你已阅读并理解比赛规则。
        祝所有参赛者在比赛中取得好成绩！
      </p>
    </div>
  );
};

export default ContestDescription;