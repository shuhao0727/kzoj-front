import React from 'react';

const compilers = [
  'C (GCC 9.4.0)',
  'C With O2 (GCC 9.4.0)',
  'C++ (G++ 9.4.0)',
  'C++ With O2 (G++ 9.4.0)',
  'C++ 17 (G++ 9.4.0)',
  'C++ 17 With O2 (G++ 9.4.0)',
  'C++ 20 (G++ 9.4.0)',
  'C++ 20 With O2 (G++ 9.4.0)',
  'Java (OpenJDK 1.8)',
  'Python3 (Python 3.7.5)',
  'Python2 (Python 2.7.17)',
  'Golang (Golang 1.19)',
  'C# (C# Mono 4.6.2)',
  'PHP (PHP 7.2.24)',
  'PyPy2 (PyPy 2.7.18)',
  'PyPy3 (PyPy 3.7.12)',
  'JavaScript Node (Node.js 14.19.0)',
  'JavaScript V8 (JavaScript V8 8.4.109)',
  'Ruby (Ruby 2.5.1)',
  'Rust (Rust 1.65.0)',
];

const results = [
  { label: 'Pending', color: 'bg-yellow-400', description: '您的解答正在排队等待评测中，请等待结果...' },
  { label: 'Submitted Failed', color: 'bg-red-400', description: '您的此次提交失败，请点击按钮重新提交...' },
  { label: 'Compiling', color: 'bg-blue-400', description: '正在对您的源代码进行编译中，请等待结果...' },
  { label: 'Judging', color: 'bg-indigo-400', description: '正在使用测试数据运行您的程序中，请等待结果...' },
  { label: 'Compile Error', color: 'bg-orange-400', description: '无法编译您的源代码，点击链接查看编译器的输出。' },
  { label: 'Presentation Error', color: 'bg-pink-400', description: '您提交的代码已经接近正确答案，请检查格式。' },
  { label: 'Partial Accepted', color: 'bg-yellow-500', description: '加油！您的代码通过了部分测试点，请检查其他可能性。' },
  { label: 'Accepted', color: 'bg-green-400', description: '恭喜！您的解题方法是正确的。' },
  { label: 'Wrong Answer', color: 'bg-red-600', description: '您的程序输出结果与判题程序的答案不符。' },
  { label: 'Runtime Error', color: 'bg-orange-500', description: '您的程序异常终止，可能的原因是段错误或被零除。' },
  { label: 'Time Limit Exceeded', color: 'bg-red-500', description: '您的程序运行时间超过题目限制。' },
  { label: 'Memory Limit Exceeded', color: 'bg-purple-400', description: '您的程序使用的内存超过题目限制。' },
  { label: 'System Error', color: 'bg-gray-500', description: '评测系统出了问题，请报告管理员。' },
  { label: 'Cancelled', color: 'bg-gray-300', description: '您的此次提交已被取消！' },
];

const compileNotes = [
  '_int64在ANSI标准中无定义，VC和GNU C++中的定义为long long类型。',
  'main返回值必须为int类型，不能为void。',
  '请确保程序的最后一行有回车符。',
  'itoa不是ANSI标准函数（在微软C++中定义）。',
];

const Others = () => {
  return (
    <div className="container mx-auto p-6 space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* 编译器 & 例题部分 */}
        <div className="md:col-span-1 bg-white p-6 rounded-lg shadow-md" style={{ width: '100%' }}>
          <h2 className="text-xl font-bold text-gray-700 mb-4">编译器 & 例题</h2>
          <ul className="space-y-2">
            {compilers.map((compiler, index) => (
              <li key={index} className="bg-gray-100 p-3 rounded-md hover:bg-gray-200 transition duration-300">
                <button className="flex justify-between items-center w-full">
                  <span className="text-gray-700">{compiler}</span>
                  <span className="text-gray-500">{'>'}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* 结果说明和编译说明同列 */}
        <div className="md:col-span-2 space-y-6">
          {/* 结果说明 */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold text-gray-700 mb-4">结果说明</h2>
            <ul className="space-y-4">
              {results.map((result, index) => (
                <li key={index} className="flex items-start space-x-4">
                  {/* 颜色块 */}
                  <div className={`inline-flex items-center px-3 py-1.5 rounded-full ${result.color}`}>
                    <span className="text-white font-semibold whitespace-nowrap">{result.label}</span>
                  </div>
                  {/* 文字说明 */}
                  <p className="text-gray-700">{result.description}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* 编译说明 */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold text-gray-700 mb-4">编译说明</h2>
            <ol className="list-decimal list-inside space-y-2 text-gray-700">
              {compileNotes.map((note, index) => (
                <li key={index}>{note}</li>
              ))}
            </ol>
          </div>
        </div>
      </div>

      
    </div>
  );
};

export default Others;