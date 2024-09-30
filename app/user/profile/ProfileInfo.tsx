"use client";

import React from "react";

const ProfileInfo = () => {
  return (
    <div className="flex items-center mb-4">
      <img
        src="/path/to/avatar.jpg" // 替换为用户头像的实际路径
        alt="用户头像"
        className="w-24 h-24 rounded-full mr-4"
      />
      <div>
        <h2 className="text-xl font-bold">用户昵称</h2>
        <p className="text-gray-600">这是用户的简介，展示一些基本信息。</p>
      </div>
    </div>
  );
};

export default ProfileInfo;