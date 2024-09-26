"use client";

import React, { useEffect, useState } from 'react';
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';

const MyProfile = () => {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const fetchActivities = async () => {
      const response = await fetch('/api/user/activity'); // 这里需要您替换成真实的 API 地址
      const data = await response.json();
      setActivities(data);
    };

    fetchActivities();
  }, []);

  return (
    <div>
      <h1>我的主页</h1>
      <CalendarHeatmap
        startDate={new Date('2023-01-01')}
        endDate={new Date()}
        values={activities} // activities should be an array of objects with date and count fields
        classForValue={(value) => {
          if (!value) {
            return 'color-empty';
          }
          return `color-scale-${value.count}`;
        }}
      />
    </div>
  );
};

export default MyProfile;