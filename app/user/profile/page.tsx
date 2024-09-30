import React from "react";
import ProfileInfo from "./ProfileInfo";
import Actions from "./Actions";
import ProfileTabs from "./ProfileTabs";

const ProfilePage = () => {
  return (
    <div className="container max-w-screen-lg mx-auto px-4 mt-8">
      {/* 用户信息和统计数据 */}
      <div className="flex justify-between items-center"> {/* 调整这里的 mb 值 */}
        <ProfileInfo />
        <Actions />
      </div>

      {/* 导航栏和内容部分 */}
      <div className="mt-2"> {/* 减少 margin-top */}
        <ProfileTabs />
      </div>
    </div>
  );
};

export default ProfilePage;