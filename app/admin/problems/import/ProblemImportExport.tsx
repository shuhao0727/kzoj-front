"use client";

import React from 'react';
import UploadComponent from './UploadComponent';
import ExportComponent from './ExportComponent';

const ProblemImportExport = () => {
  return (
    <div className="w-full space-y-6"> {/* 上方对齐 */}
      <h1 className="text-2xl font-semibold text-center mb-4">题目导入与导出</h1>
      <div className="w-full px-4">
        <UploadComponent /> {/* 导入放在第一行 */}
      </div>
      <div className="w-full px-4">
        <ExportComponent /> {/* 导出放在第二行 */}
      </div>
    </div>
  );
};

export default ProblemImportExport;