"use client";

import React, { useEffect, useState } from "react";

const AnnouncementsSection = () => {
  const [announcements, setAnnouncements] = useState([]);

  // Fetch announcements from API
  useEffect(() => {
    fetch("/api/announcements")
      .then((res) => res.json())
      .then((data) => setAnnouncements(data));
  }, []);

  return (
    <div className="bg-white hover:bg-gray-100 rounded-lg shadow-lg p-8 mb-8 transition-shadow duration-300">
      <h2 className="text-xl font-bold text-blue-600 mb-4">公告</h2>
      <ul>
        {announcements
          .filter((announcement) => announcement.visible)
          .map((announcement, index) => (
            <li key={index} className="mb-2">
              {announcement.title} - {announcement.startDate} -{" "}
              {announcement.author}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default AnnouncementsSection;