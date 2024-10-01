"use client";

import React from "react";
import NotificationTable from "./NotificationTable"; // 引入刚刚创建的通知表格组件

const NotificationPage = () => {
  return (
    <div className="container mx-auto p-6 bg-white rounded-lg shadow-md">
      {/* 渲染通知表格 */}
      <NotificationTable />
    </div>
  );
};

export default NotificationPage;