"use client";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';  // 从 next/navigation 获取 useRouter

const SettingsPage = () => {
  const router = useRouter();  // 获取路由对象

  // 使用 useEffect 在页面加载时自动导航
  useEffect(() => {
    // 默认跳转到用户管理页面
    router.push('/admin/settings/usermanagement');
  }, [router]);  // 依赖 router，确保只在首次加载时执行

  return null;  // 页面会自动跳转，不需要渲染其他内容
};

export default SettingsPage;