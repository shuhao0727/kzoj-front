"use client";

import { useCallback, useState } from "react";
import Editor from "react-simple-code-editor";

import Prism from "prismjs";

import "prismjs/components/prism-clike";

import classNames from "classnames";
import "prismjs/components/prism-c";
import "prismjs/components/prism-cpp";
import "prismjs/components/prism-python";
import "prismjs/themes/prism.css";

import "./editor.css";

type language = "cpp17" | "python3";
const languages: Record<language, { grammar: any; language: string }> = {
  cpp17: {
    grammar: Prism.languages.cpp,
    language: "cpp",
  },
  python3: {
    grammar: Prism.languages.python,
    language: "python",
  },
};

export const CodeEditor = () => {
  const [lang, setLang] = useState<language>("cpp17");
  const [code, setCode] = useState<string>("");

  const highlight = useCallback(
    (_code: string) => {
      return Prism.highlight(
        _code,
        languages[lang].grammar,
        languages[lang].language
      )
        .split("\n")
        .map(
          (line, row) =>
            `<span class="editor-line-number">${row + 1}</span> ${line}`
        )
        .join("\n");
    },
    [lang]
  );

  return (
    <div className="bg-white p-4 shadow rounded">
      <div className="flex justify-between items-center mb-4">
        <div>
          <label className="mr-2">语言：</label>
          <select
            className="border p-2"
            onChange={(e) => setLang(e.target.value as language)}
          >
            <option value="cpp17">C++17</option>
            <option value="python3">Python</option>
          </select>
        </div>
      </div>

      {/* 代码编辑器 */}
      <Editor
        id="editor"
        value={code}
        onValueChange={(code) => setCode(code)}
        highlight={(code) => highlight(code)}
        padding="1.5rem"
        placeholder="YOUR CODE HERE"
        className={classNames(
          "w-full min-w-full min-h-[16rem] overflow-auto",
          "bg-[#f5f5f5] text-base font-mono leading-7 whitespace-pre"
        )}
        preClassName={classNames("!pl-[3.1rem]")}
        textareaClassName={classNames("!pl-[3.8rem] outline-none")}
      />

      {/* 提交按钮 */}
      <div className="flex justify-end mt-4">
        <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
          提交评测
        </button>
      </div>
    </div>
  );
};
