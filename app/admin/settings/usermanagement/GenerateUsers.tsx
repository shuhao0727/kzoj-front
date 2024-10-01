"use client";
import React, { useState, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import * as XLSX from "xlsx";

// 随机生成密码函数
const generateRandomPassword = (length: number): string => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let password = "";
  for (let i = 0; i < length; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return password;
};

interface User {
  id: number;
  username: string;
  name: string;
  school: string;
  role: string;
  grade: string;
  gender: string;
  email: string;
  status: boolean;
  password?: string;
}

interface GenerateUsersProps {
  users: User[];
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
}

const GenerateUsers: React.FC<GenerateUsersProps> = ({ users, setUsers }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [startNumber, setStartNumber] = useState<number>(1);
  const [endNumber, setEndNumber] = useState<number>(10);
  const [prefix, setPrefix] = useState<string>("");
  const [suffix, setSuffix] = useState<string>("");
  const [passwordLength, setPasswordLength] = useState<number>(8);
  const [error, setError] = useState<string | null>(null);

  const closeModal = () => setIsOpen(false);
  const openModal = () => setIsOpen(true);

  const isUsernameTaken = (username: string): boolean => {
    return users.some(user => user.username === username);
  };

  // 动态生成唯一用户名，避免重复
  const generateUniqueUsername = (baseUsername: string): string => {
    let uniqueUsername = baseUsername;
    let counter = 1;
    while (isUsernameTaken(uniqueUsername)) {
      uniqueUsername = `${baseUsername}_${counter}`;
      counter++;
    }
    return uniqueUsername;
  };

  const handleGenerateUsers = () => {
    const newUsers: User[] = [];
    for (let i = startNumber; i <= endNumber; i++) {
      const baseUsername = `${prefix}${i}${suffix}`;
      const uniqueUsername = generateUniqueUsername(baseUsername);

      const newUser: User = {
        id: users.length + i,
        username: uniqueUsername,
        name: "新用户",
        school: "未知学校",
        role: "用户（默认）",
        grade: "未知",
        gender: "未知",
        email: `${uniqueUsername}@example.com`,
        status: true,
        password: generateRandomPassword(passwordLength),
      };
      newUsers.push(newUser);
    }

    setUsers([...users, ...newUsers]);

    const worksheet = XLSX.utils.json_to_sheet(newUsers);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "新用户列表");
    XLSX.writeFile(workbook, "generated_users.xlsx");

    closeModal();
  };

  return (
    <>
      {/* 生成用户按钮 */}
      <button
        onClick={openModal}
        className="bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:from-green-500 hover:to-green-700 text-white px-5 py-2 rounded-lg shadow-lg transition duration-300 ease-in-out"
      >
        生成新用户
      </button>

      {/* 弹窗 */}
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-md" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-full p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white p-8 text-left shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-2xl font-semibold leading-6 text-gray-900 mb-6"
                  >
                    生成新用户
                  </Dialog.Title>

                  <div className="space-y-6">
                    <div>
                      <label className="block text-base font-medium text-gray-700">
                        账号前缀
                      </label>
                      <input
                        type="text"
                        className="mt-2 block w-full rounded-lg border-gray-300 p-3 shadow-sm focus:border-blue-500 focus:ring-blue-500 transition-all"
                        value={prefix}
                        onChange={(e) => setPrefix(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-base font-medium text-gray-700">
                        账号后缀
                      </label>
                      <input
                        type="text"
                        className="mt-2 block w-full rounded-lg border-gray-300 p-3 shadow-sm focus:border-blue-500 focus:ring-blue-500 transition-all"
                        value={suffix}
                        onChange={(e) => setSuffix(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-base font-medium text-gray-700">
                        开始编号
                      </label>
                      <input
                        type="number"
                        className="mt-2 block w-full rounded-lg border-gray-300 p-3 shadow-sm focus:border-blue-500 focus:ring-blue-500 transition-all"
                        value={startNumber}
                        onChange={(e) => setStartNumber(Number(e.target.value))}
                      />
                    </div>
                    <div>
                      <label className="block text-base font-medium text-gray-700">
                        结束编号
                      </label>
                      <input
                        type="number"
                        className="mt-2 block w-full rounded-lg border-gray-300 p-3 shadow-sm focus:border-blue-500 focus:ring-blue-500 transition-all"
                        value={endNumber}
                        onChange={(e) => setEndNumber(Number(e.target.value))}
                      />
                    </div>
                    <div>
                      <label className="block text-base font-medium text-gray-700">
                        密码长度
                      </label>
                      <input
                        type="number"
                        className="mt-2 block w-full rounded-lg border-gray-300 p-3 shadow-sm focus:border-blue-500 focus:ring-blue-500 transition-all"
                        value={passwordLength}
                        onChange={(e) => setPasswordLength(Number(e.target.value))}
                      />
                    </div>
                    {error && (
                      <p className="text-red-500 text-sm">{error}</p>
                    )}
                  </div>

                  <div className="mt-8 flex justify-end space-x-4">
                    <button
                      type="button"
                      className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-6 py-2 rounded-lg transition-all"
                      onClick={closeModal}
                    >
                      取消
                    </button>
                    <button
                      type="button"
                      className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-all"
                      onClick={handleGenerateUsers}
                    >
                      生成
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default GenerateUsers;