"use client";

const problems: {
  id: string;
  title: string;
  difficulty: string;
  total: number;
  acRate: string;
}[] = [
  {
    id: "P1000",
    title: "Hello, World!",
    difficulty: "入门",
    total: 546,
    acRate: "38.46%",
  },
  {
    id: "P1001",
    title: "地球人口承载力估计",
    difficulty: "入门",
    total: 158,
    acRate: "31.65%",
  },
  {
    id: "P1002",
    title: "输出第二个整数",
    difficulty: "入门",
    total: 209,
    acRate: "55.02%",
  },
  {
    id: "P1003",
    title: "对齐输出",
    difficulty: "入门",
    total: 71,
    acRate: "53.52%",
  },
  {
    id: "P1005",
    title: "计算(a+b)xc的值",
    difficulty: "入门",
    total: 180,
    acRate: "60.56%",
  },
  {
    id: "P1006",
    title: "带余除法",
    difficulty: "入门",
    total: 49,
    acRate: "87.76%",
  },
  {
    id: "P1007",
    title: "计算(a+b)/c的值",
    difficulty: "入门",
    total: 101,
    acRate: "81.19%",
  },
  {
    id: "P1008",
    title: "计算多效蒸发浮点数",
    difficulty: "入门",
    total: 32,
    acRate: "78.13%",
  },
  {
    id: "P1009",
    title: "流感感染率",
    difficulty: "入门",
    total: 27,
    acRate: "74.07%",
  },
  {
    id: "P1010",
    title: "计算多项式的值",
    difficulty: "入门",
    total: 70,
    acRate: "45.71%",
  },
];

const ProblemList = () => {
  return (
    <div className="container mx-auto p-6 space-y-6 bg-gray-50 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold text-gray-800">题目列表</h1>
        <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md transition duration-300 ease-in-out">
          重置
        </button>
      </div>

      {/* Filter Section */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
        <input
          type="text"
          placeholder="输入关键词"
          className="col-span-4 border p-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="flex items-center justify-end">
          <label className="mr-2 text-gray-700">显示标签</label>
          <input type="checkbox" className="h-5 w-5 text-blue-600" />
        </div>
      </div>

      {/* Problems Table */}
      <table className="table-auto w-full bg-white shadow-lg rounded-lg">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="px-4 py-3 text-gray-600">题目ID</th>
            <th className="px-4 py-3 text-gray-600">题目</th>
            <th className="px-4 py-3 text-gray-600">难度</th>
            <th className="px-4 py-3 text-gray-600">总数</th>
            <th className="px-4 py-3 text-gray-600">AC 通过率</th>
          </tr>
        </thead>
        <tbody>
          {problems.map((problem, index) => (
            <tr
              key={index}
              className="border-b hover:bg-gray-100 transition-colors duration-200"
            >
              <td className="px-4 py-3">{problem.id}</td>
              <td className="px-4 py-3">{problem.title}</td>
              <td className="px-4 py-3">{problem.difficulty}</td>
              <td className="px-4 py-3">{problem.total}</td>
              <td className="px-4 py-3">
                <div className="flex items-center">
                  <div
                    className="h-4 bg-green-400 rounded-full"
                    style={{ width: problem.acRate }}
                  ></div>
                  <span className="ml-2 text-gray-700">{problem.acRate}</span>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Tags and Difficulty Buttons */}
      <div className="mt-8">
        <h2 className="text-lg font-semibold mb-2 text-gray-800">难度</h2>
        <div className="flex space-x-2 mb-4">
          <button className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition duration-300">
            全部
          </button>
          <button className="px-4 py-2 bg-blue-200 text-blue-800 rounded-lg hover:bg-blue-300 transition duration-300">
            入门
          </button>
          <button className="px-4 py-2 bg-blue-300 text-blue-900 rounded-lg hover:bg-blue-400 transition duration-300">
            普及/提高
          </button>
          <button className="px-4 py-2 bg-blue-400 text-white rounded-lg hover:bg-blue-500 transition duration-300">
            难题
          </button>
        </div>

        <h2 className="text-lg font-semibold mb-2 text-gray-800">题库</h2>
        <div className="flex flex-wrap gap-2">
          <button className="px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition duration-300">
            HDU
          </button>
          <button className="px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition duration-300">
            Codeforces
          </button>
          <button className="px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition duration-300">
            POJ
          </button>
          <button className="px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition duration-300">
            GYM
          </button>
          <button className="px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition duration-300">
            AtCoder
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProblemList;
