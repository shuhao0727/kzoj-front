"use client";

import React, { useState, useEffect, Fragment, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Editor } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor.css";

const NotificationTable = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "系统维护通知",
      content: "系统将在今晚12点进行维护，预计维护时长为2小时。",
      roleType: "管理员",
      date: "2023-10-01",
    },
    {
      id: 2,
      title: "新功能上线通知",
      content: "我们上线了全新的题目编辑器，欢迎大家使用并提出反馈。",
      roleType: "所有用户",
      date: "2023-10-02",
    },
  ]);

  const [isOpen, setIsOpen] = useState(false);
  const [editNotification, setEditNotification] = useState(null); // 用于区分创建和编辑
  const [newNotification, setNewNotification] = useState({
    title: "",
    content: "",
    roleType: "",
    date: "", // 新增字段：创建/修改时间
  });

  const editorRef = useRef(null);

  // 打开创建/编辑通知的弹窗
  const openModal = (notification = null) => {
    if (notification) {
      setEditNotification(notification);
      setNewNotification(notification);
    } else {
      setNewNotification({
        title: "",
        content: "",
        roleType: "",
        date: new Date().toISOString().slice(0, 10), // 设置默认创建时间
      });
    }
    setIsOpen(true);
  };

  // 关闭弹窗
  const closeModal = () => {
    setIsOpen(false);
    setEditNotification(null);
  };

  // 保存通知（新建或编辑）
  const handleSave = () => {
    const updatedNotification = { ...newNotification };
    if (editNotification) {
      // 编辑模式
      setNotifications(
        notifications.map((notif) =>
          notif.id === editNotification.id ? updatedNotification : notif
        )
      );
    } else {
      // 创建模式
      updatedNotification.id = notifications.length + 1;
      setNotifications([...notifications, updatedNotification]);
    }
    closeModal();
  };

  // 删除通知
  const handleDelete = (id) => {
    setNotifications(notifications.filter((notif) => notif.id !== id));
  };

  return (
    <div className="overflow-x-auto">
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-md mb-4"
        onClick={() => openModal()}
      >
        + 创建通知
      </button>

      <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
        <thead className="bg-gray-50 text-left text-sm">
          <tr>
            <th className="px-6 py-3 font-semibold">通知标题</th>
            <th className="px-6 py-3 font-semibold">通知内容</th>
            <th className="px-6 py-3 font-semibold">角色类型</th>
            <th className="px-6 py-3 font-semibold">时间</th> {/* 新增时间列 */}
            <th className="px-6 py-3 font-semibold">操作</th> {/* 新增操作列 */}
          </tr>
        </thead>
        <tbody className="text-sm text-gray-700">
          {notifications.map((notification) => (
            <tr key={notification.id} className="border-t">
              <td className="px-6 py-3">{notification.title}</td>
              <td className="px-6 py-3">{notification.content}</td>
              <td className="px-6 py-3">{notification.roleType}</td>
              <td className="px-6 py-3">{notification.date}</td> {/* 显示时间 */}
              <td className="px-6 py-3">
                <span
                  className="text-blue-500 cursor-pointer hover:underline mr-4"
                  onClick={() => openModal(notification)}
                >
                  编辑
                </span>
                <span
                  className="text-red-500 cursor-pointer hover:underline"
                  onClick={() => handleDelete(notification.id)}
                >
                  删除
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* 弹窗部分 */}
      <Transition show={isOpen} as={Fragment}>
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
            <div className="fixed inset-0 bg-black bg-opacity-25" />
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
                <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    {editNotification ? "编辑通知" : "创建通知"}
                  </Dialog.Title>

                  <div className="mt-4">
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700">
                        通知标题
                      </label>
                      <input
                        type="text"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        value={newNotification.title}
                        onChange={(e) =>
                          setNewNotification({
                            ...newNotification,
                            title: e.target.value,
                          })
                        }
                      />
                    </div>

                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700">
                        通知内容
                      </label>
                      <Editor
                        ref={editorRef}
                        initialValue={newNotification.content}
                        previewStyle="vertical"
                        height="300px"
                        initialEditType="markdown"
                        useCommandShortcut={true}
                        onChange={() => {
                          const content = editorRef.current
                            .getInstance()
                            .getMarkdown();
                          setNewNotification({
                            ...newNotification,
                            content,
                          });
                        }}
                      />
                    </div>

                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700">
                        角色类型
                      </label>
                      <input
                        type="text"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        value={newNotification.roleType}
                        onChange={(e) =>
                          setNewNotification({
                            ...newNotification,
                            roleType: e.target.value,
                          })
                        }
                      />
                    </div>

                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700">
                        时间
                      </label>
                      <input
                        type="date"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        value={newNotification.date}
                        onChange={(e) =>
                          setNewNotification({
                            ...newNotification,
                            date: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>

                  <div className="mt-6 flex justify-end">
                    <button
                      type="button"
                      className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md mr-2"
                      onClick={closeModal}
                    >
                      取消
                    </button>
                    <button
                      type="button"
                      className="bg-blue-500 text-white px-4 py-2 rounded-md"
                      onClick={handleSave}
                    >
                      保存
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default NotificationTable;