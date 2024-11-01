import "github-markdown-css/github-markdown.css";
import "katex/dist/katex.css";
import "./global.css";

import React from "react";
import { Application } from "./app";

export default function RootLayout({ children }: React.PropsWithChildren) {
  return (
    <html lang="zh_CN" className="h-full">
      <body className="flex flex-col min-h-screen h-full">
        <Application>{children}</Application>
      </body>
    </html>
  );
}
