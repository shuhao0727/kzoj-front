"use client";

import React, { useState } from "react";
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-c";
import "prismjs/components/prism-cpp";
import "prismjs/themes/prism.css"; // 导入 Prism 样式

// 用于生成带有行号的代码显示
const addLineNumbers = (code) =>
  code
    .split("\n")
    .map((line, i) => `<span class="editor-line-number">${i + 1}</span> ${line}`)
    .join("\n");

const CodeEditorComponent = () => {
  const initialCode = `#include <iostream>
using namespace std;

int main() {
    int n;
    cout << "Enter a number: ";
    cin >> n;

    bool isPrime = true;
    if (n <= 1) {
        isPrime = false;
    } else {
        for (int i = 2; i <= n / 2; ++i) {
            if (n % i == 0) {
                isPrime = false;
                break;
            }
        }
    }

    if (isPrime)
        cout << n << " is a prime number.";
    else
        cout << n << " is not a prime number.";

    return 0;
}`;

  const [code, setCode] = useState(initialCode);

  return (
    <div className="bg-white p-4 shadow rounded">
      <div className="flex justify-between items-center mb-4">
        {/* 语言选择和O2优化 */}
        <div>
          <label className="mr-2">语言：</label>
          <select className="border p-2">
            <option value="cpp">C++17</option>
            <option value="python">Python</option>
          </select>
        </div>
        <div>
          <label className="mr-2">开启 O2 优化</label>
          <input type="checkbox" />
        </div>
      </div>

      {/* 代码编辑器 */}
      <Editor
        value={code}
        onValueChange={(code) => setCode(code)}
        highlight={(code) =>
          highlight(code, languages.cpp, "cpp")
            .split("\n")
            .map((line, i) => `<span class="editor-line-number">${i + 1}</span> ${line}`)
            .join("\n")
        }
        padding={15}
        style={{
          fontSize: 16, // 增大字体
          backgroundColor: "#f5f5f5",
          fontFamily: 'ui-monospace, SFMono-Regular, SF Mono, Consolas, Liberation Mono, Menlo, monospace',
          lineHeight: "1.6em", // 行距调整，确保代码可读性
          width: "100%",
          whiteSpace: "pre", // 保持代码原有的格式
          overflowWrap: "break-word", // 防止长代码超出边界
        }}
      />

      {/* 提交按钮 */}
      <div className="flex justify-end mt-4">
        <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
          提交评测
        </button>
      </div>

      {/* 行号样式 */}
      <style jsx>{`
        .editor-line-number {
          display: inline-block;
          width: 3em; /* 扩大行号列的宽度 */
          user-select: none;
          opacity: 0.5;
          text-align: right;
          margin-right: 10px;
        }
        .editor {
          width: 100%;
          max-width: 100%;
          overflow: auto;
        }
      `}</style>
    </div>
  );
};

export default CodeEditorComponent;