import React, { useState } from "react";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import "github-markdown-css";

// 初始化 markdown-it 并加载必要的插件
const mdParser = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
});

const MarkdownEditor = ({ content, setContent }) => {
  const [isPreview, setIsPreview] = useState(false);

  const handleEditorChange = ({ text }) => {
    setContent(text);
  };

  // 切换预览模式
  const togglePreview = () => {
    setIsPreview(!isPreview);
  };

  return (
    <div>
      {/* 切换预览按钮 */}
      <div className="flex justify-end mb-2">
        <button
          onClick={togglePreview}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
        >
          {isPreview ? "编辑模式" : "预览模式"}
        </button>
      </div>

      {isPreview ? (
        <div className="markdown-body p-4 border rounded bg-white">
          <div dangerouslySetInnerHTML={{ __html: mdParser.render(content) }} />
        </div>
      ) : (
        <MdEditor
          value={content}
          renderHTML={(text) => mdParser.render(text)}
          onChange={handleEditorChange}
          style={{ height: "400px" }} // 设置高度
        />
      )}
    </div>
  );
};

export default MarkdownEditor;