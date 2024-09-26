import React, { useState } from 'react';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/solid';
import { Switch } from '@headlessui/react';

const AnnouncementManagement = () => {
  const [announcements, setAnnouncements] = useState([
    { id: 7, title: '实名制公告', createdAt: '2024-09-24 08:02:57', modifiedAt: '2024-09-24 08:02:57', author: 'root', visible: true },
    { id: 5, title: '喜报! 2023年NOIP竞赛获奖情况', createdAt: '2023-12-27 14:49:22', modifiedAt: '2023-12-27 14:52:14', author: 'root', visible: true },
    { id: 3, title: '校信奥团队招新公告', createdAt: '2023-10-17 10:27:20', modifiedAt: '2023-12-12 11:23:14', author: 'root', visible: true },
    { id: 2, title: '关于恶意刷题的通告', createdAt: '2023-10-11 08:05:47', modifiedAt: '2023-10-11 08:05:58', author: 'root', visible: true },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [newAnnouncement, setNewAnnouncement] = useState({ title: '', author: 'root', visible: true });

  const handleToggleVisibility = (id) => {
    setAnnouncements((prev) =>
      prev.map((announcement) =>
        announcement.id === id ? { ...announcement, visible: !announcement.visible } : announcement
      )
    );
  };

  const handleDelete = (id) => {
    setAnnouncements((prev) => prev.filter((announcement) => announcement.id !== id));
  };

  const handleEdit = (id) => {
    // Add your edit functionality here
    console.log(`Editing announcement with ID: ${id}`);
  };

  const handleCreate = () => {
    const newId = announcements.length ? Math.max(...announcements.map(a => a.id)) + 1 : 1;
    const newAnnouncementEntry = {
      id: newId,
      title: newAnnouncement.title,
      createdAt: new Date().toISOString(),
      modifiedAt: new Date().toISOString(),
      author: newAnnouncement.author,
      visible: newAnnouncement.visible,
    };
    setAnnouncements((prev) => [...prev, newAnnouncementEntry]);
    setShowModal(false);
    setNewAnnouncement({ title: '', author: 'root', visible: true }); // Reset form
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">公告管理</h2>
      <button onClick={() => setShowModal(true)} className="bg-blue-500 text-white px-4 py-2 mb-4 rounded-md hover:bg-blue-600">+ 创建</button>
      
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-md shadow-md">
            <h3 className="text-lg font-bold mb-4">创建新公告</h3>
            <input
              type="text"
              placeholder="公告标题"
              value={newAnnouncement.title}
              onChange={(e) => setNewAnnouncement({ ...newAnnouncement, title: e.target.value })}
              className="border px-3 py-2 mb-4 w-full"
            />
            <div className="flex items-center mb-4">
              <label className="mr-2">是否可见:</label>
              <Switch
                checked={newAnnouncement.visible}
                onChange={() => setNewAnnouncement({ ...newAnnouncement, visible: !newAnnouncement.visible })}
                className={`${newAnnouncement.visible ? 'bg-blue-500' : 'bg-gray-300'} relative inline-flex h-6 w-11 items-center rounded-full`}
              >
                <span className="sr-only">Toggle visibility</span>
                <span
                  className={`${newAnnouncement.visible ? 'translate-x-6' : 'translate-x-1'} inline-block h-4 w-4 transform bg-white rounded-full transition`}
                />
              </Switch>
            </div>
            <div className="flex justify-end">
              <button onClick={handleCreate} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">创建</button>
              <button onClick={() => setShowModal(false)} className="bg-gray-300 text-black px-4 py-2 ml-2 rounded-md hover:bg-gray-400">取消</button>
            </div>
          </div>
        </div>
      )}

      <table className="min-w-full bg-white shadow-md rounded-lg mt-4">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">公告标题</th>
            <th className="px-4 py-2">创建时间</th>
            <th className="px-4 py-2">修改时间</th>
            <th className="px-4 py-2">作者</th>
            <th className="px-4 py-2">是否可见</th>
            <th className="px-4 py-2">Option</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {announcements.map((announcement) => (
            <tr key={announcement.id}>
              <td className="px-4 py-2">{announcement.id}</td>
              <td className="px-4 py-2">{announcement.title}</td>
              <td className="px-4 py-2">{announcement.createdAt}</td>
              <td className="px-4 py-2">{announcement.modifiedAt}</td>
              <td className="px-4 py-2">{announcement.author}</td>
              <td className="px-4 py-2">
                <Switch
                  checked={announcement.visible}
                  onChange={() => handleToggleVisibility(announcement.id)}
                  className={`${announcement.visible ? 'bg-blue-500' : 'bg-gray-300'} relative inline-flex h-6 w-11 items-center rounded-full`}
                >
                  <span className="sr-only">Toggle visibility</span>
                  <span
                    className={`${
                      announcement.visible ? 'translate-x-6' : 'translate-x-1'
                    } inline-block h-4 w-4 transform bg-white rounded-full transition`}
                  />
                </Switch>
              </td>
              <td className="px-4 py-2 flex space-x-2">
                <button
                  onClick={() => handleEdit(announcement.id)}
                  className="bg-blue-500 text-white px-2 py-1 rounded-md hover:bg-blue-600"
                >
                  <PencilIcon className="h-5 w-5" />
                </button>
                <button
                  onClick={() => handleDelete(announcement.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600"
                >
                  <TrashIcon className="h-5 w-5" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination (Placeholder for now) */}
      <div className="flex justify-end mt-4">
        <span className="text-sm text-gray-600">1 / 1</span>
      </div>
    </div>
  );
};

export default AnnouncementManagement;