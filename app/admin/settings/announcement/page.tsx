"use client";
import React, { useState } from 'react';
import AnnouncementTable from './AnnouncementTable';

const Page = () => {
  return (
    <div className="container mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-blue-600">公告管理</h1>

      
     

      {/* 公告表格 */}
      <AnnouncementTable />
    </div>
  );
};

export default Page;