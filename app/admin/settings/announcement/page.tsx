"use client";
import React, { useState } from 'react';
import AnnouncementTable from './AnnouncementTable';

const Page = () => {
  return (
    <div className="container mx-auto p-6 bg-white rounded-lg shadow-md">
      {/* 公告表格 */}
      <AnnouncementTable />
    </div>
  );
};

export default Page;