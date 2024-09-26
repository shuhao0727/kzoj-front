import React from 'react';
import ReactDOM from 'react-dom';
import App from './app/App';  // 路径更新为 ./app/App; 

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root') // 确保 public/index.html 中有 id 为 "root" 的 div
);