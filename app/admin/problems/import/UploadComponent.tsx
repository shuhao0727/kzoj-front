"use client";

import React, { useState } from 'react';
import { Upload, Button } from '@douyinfe/semi-ui';
import { IconUpload } from '@douyinfe/semi-icons';

const UploadComponent = () => {
  const [fileList, setFileList] = useState([]);

  const handleUpload = (file) => {
    // 保持原有的上传功能
    setFileList([...fileList, file]);
  };

  return (
    <div className="bg-white p-6 shadow-lg rounded-lg w-full flex flex-col">
      <Upload
        action="https://api.semi.design/upload"
        fileList={fileList}
        onChange={(fileList) => setFileList(fileList)}
      >
        <Button icon={<IconUpload />} theme="light" className="ml-0 my-4">
          点击上传
        </Button>
      </Upload>
      {fileList.length > 0 && (
        <div className="mt-4 w-full">
          <p className="text-gray-700 font-semibold mb-2">已上传的文件:</p>
          <ul>
            {fileList.map((file, idx) => (
              <li key={idx} className="text-gray-600">
                {file.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default UploadComponent;