import React, { useState } from "react";
import Draggable from "react-draggable";

const DraggableToc = ({ tocContent }) => {
  const [visible, setVisible] = useState(false);

  const toggleTocVisibility = () => {
    setVisible(!visible);
  };

  return (
    <div>
      {/* 控制目录显示/隐藏按钮 */}
      <Draggable>
        <button
          className="fixed left-4 top-4 bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600 transition duration-300 z-50 cursor-move"
          onClick={toggleTocVisibility}
        >
          {visible ? "隐藏目录" : "显示目录"}
        </button>
      </Draggable>

      {/* 使用 Draggable 实现可拖动 */}
      {visible && (
        <Draggable>
          <div className="fixed top-20 left-4 p-4 bg-gray-100 shadow-md rounded-lg z-50 w-64 cursor-move">
            <h3 className="font-bold text-lg">文章目录</h3>
            <div className="overflow-auto max-h-64">
              <div dangerouslySetInnerHTML={{ __html: tocContent }} />
            </div>
          </div>
        </Draggable>
      )}
    </div>
  );
};

export default DraggableToc;