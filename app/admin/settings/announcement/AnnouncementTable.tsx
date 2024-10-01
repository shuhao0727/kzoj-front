"use client";
import React, { useState, useEffect, Fragment, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Editor } from "@toast-ui/react-editor"; 
import "@toast-ui/editor/dist/toastui-editor.css";

// Tailwind CSS 开关组件的自定义样式
const ToggleSwitch = ({ checked, onChange }) => (
  <div
    onClick={() => onChange(!checked)}
    className={`relative inline-flex items-center h-6 rounded-full w-11 cursor-pointer transition-colors ${
      checked ? "bg-blue-500" : "bg-gray-300"
    }`}
  >
    <span
      className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${
        checked ? "translate-x-6" : "translate-x-1"
      }`}
    />
  </div>
);

const AnnouncementTable = ({ onAnnouncementsUpdate }) => {
  const [announcements, setAnnouncements] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const [newAnnouncement, setNewAnnouncement] = useState({
    title: "",
    content: "",
    startDate: "",
    endDate: "",
  });

  const editorRef = useRef(null);

  // Fetch existing announcements with three example announcements
  useEffect(() => {
    const exampleAnnouncements = [
      {
        id: 1,
        title: "系统维护公告",
        content: "由于系统维护，平台将在2023年10月10日 00:00 到 06:00 期间无法访问。",
        startDate: "2023-10-10",
        endDate: "2023-10-10",
        author: "管理员",
        visible: true,
      },
      {
        id: 2,
        title: "平台更新公告",
        content: "我们即将在2023年11月推出一系列新功能，敬请期待。",
        startDate: "2023-11-01",
        endDate: "2023-11-30",
        author: "管理员",
        visible: true,
      },
      {
        id: 3,
        title: "用户满意度调查",
        content: "请参与我们的满意度调查，帮助我们改进平台。",
        startDate: "2023-09-15",
        endDate: "2023-09-30",
        author: "管理员",
        visible: false,
      },
    ];
    setAnnouncements(exampleAnnouncements);
  }, []);

  // 打开创建/编辑公告的弹窗
  const openModal = (announcement = null) => {
    setEditData(announcement);
    setNewAnnouncement(
      announcement || { title: "", content: "", startDate: "", endDate: "" }
    );
    setIsOpen(true);
  };

  // 关闭弹窗
  const closeModal = () => {
    setIsOpen(false);
    setEditData(null);
  };

  // 保存公告
  const handleSave = () => {
    const method = editData ? "PUT" : "POST";
    const url = editData ? `/api/announcements` : `/api/announcements`;

    fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newAnnouncement),
    })
      .then((res) => res.json())
      .then((data) => {
        if (editData) {
          setAnnouncements(
            announcements.map((ann) => (ann.id === editData.id ? data : ann))
          );
        } else {
          setAnnouncements([...announcements, data]);
        }
        onAnnouncementsUpdate(announcements);
        closeModal();
      });
  };

  // 切换可见状态
  const handleToggleVisibility = (id) => {
    const announcement = announcements.find((ann) => ann.id === id);
    fetch(`/api/announcements`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...announcement, visible: !announcement.visible }),
    })
      .then((res) => res.json())
      .then((updatedAnnouncement) => {
        setAnnouncements(
          announcements.map((ann) =>
            ann.id === id ? updatedAnnouncement : ann
          )
        );
        onAnnouncementsUpdate(updatedAnnouncement);
      });
  };

  // 删除公告
  const handleDelete = (id) => {
    fetch(`/api/announcements`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    }).then(() => {
      setAnnouncements(announcements.filter((ann) => ann.id !== id));
      onAnnouncementsUpdate(announcements);
    });
  };

  return (
    <div className="overflow-x-auto">
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-md mb-4"
        onClick={() => openModal()}
      >
        + 创建公告
      </button>

      <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
        <thead className="bg-gray-50 text-left text-sm">
          <tr>
            <th className="px-6 py-3 font-semibold">ID</th>
            <th className="px-6 py-3 font-semibold">公告标题</th>
            <th className="px-6 py-3 font-semibold">起始时间</th>
            <th className="px-6 py-3 font-semibold">结束时间</th>
            <th className="px-6 py-3 font-semibold">作者</th>
            <th className="px-6 py-3 font-semibold">是否可见</th>
            <th className="px-6 py-3 font-semibold">操作</th>
          </tr>
        </thead>
        <tbody className="text-sm text-gray-700">
          {announcements.map((ann) => (
            <tr key={ann.id} className="border-t">
              <td className="px-6 py-3">{ann.id}</td>
              <td className="px-6 py-3">{ann.title}</td>
              <td className="px-6 py-3">{ann.startDate}</td>
              <td className="px-6 py-3">{ann.endDate}</td>
              <td className="px-6 py-3">{ann.author}</td>
              <td className="px-6 py-3">
                <ToggleSwitch
                  checked={ann.visible}
                  onChange={() => handleToggleVisibility(ann.id)}
                />
              </td>
              <td className="px-6 py-3">
                {/* 将按钮替换为文字 */}
                <span
                  className="text-blue-500 cursor-pointer hover:underline mr-4"
                  onClick={() => openModal(ann)}
                >
                  编辑
                </span>
                <span
                  className="text-red-500 cursor-pointer hover:underline"
                  onClick={() => handleDelete(ann.id)}
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
                    {editData ? "编辑公告" : "创建公告"}
                  </Dialog.Title>

                  <div className="mt-4">
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700">
                        公告标题
                      </label>
                      <input
                        type="text"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        value={newAnnouncement.title}
                        onChange={(e) =>
                          setNewAnnouncement({
                            ...newAnnouncement,
                            title: e.target.value,
                          })
                        }
                      />
                    </div>

                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700">
                        公告内容
                      </label>
                      <Editor
                        ref={editorRef}
                        initialValue={newAnnouncement.content}
                        previewStyle="vertical"
                        height="300px"
                        initialEditType="markdown"
                        useCommandShortcut={true}
                        onChange={() => {
                          const content = editorRef.current
                            .getInstance()
                            .getMarkdown();
                          setNewAnnouncement({
                            ...newAnnouncement,
                            content,
                          });
                        }}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          开始时间
                        </label>
                        <input
                          type="date"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                          value={newAnnouncement.startDate}
                          onChange={(e) =>
                            setNewAnnouncement({
                              ...newAnnouncement,
                              startDate: e.target.value,
                            })
                          }
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          结束时间
                        </label>
                        <input
                          type="date"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                          value={newAnnouncement.endDate}
                          onChange={(e) =>
                            setNewAnnouncement({
                              ...newAnnouncement,
                              endDate: e.target.value,
                            })
                          }
                        />
                      </div>
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

export default AnnouncementTable;