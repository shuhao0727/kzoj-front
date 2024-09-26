import { Fragment, useState, useEffect } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';

import Home from './home/Home';  
import Problem from './problem/Problem';
import Contest from './contest/Contest';
import Train from './train/Train';
import Ranking from './ranking/Ranking';
import Discuss from './discuss/Discuss';
import Team from './team/Team';
import Others from './others/Others';
import Review from './review/Review';

// 新增引入我的页面以及后台管理页面
import MyProfile from './profile/profile/Profile';
import MySubmissions from './profile/mysubmissions/MySubmissions';
import MySettings from './profile/mysettings/MySettings';
import AdminPanel from './profile/adminpanel/AdminPanel'; // 后台管理页面

import "./ui/global.css";

const user = {
  name: 'Tom Cook',
  email: 'tom@example.com',
  imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
};

const navigationItems = [
  { name: '首页', href: '/', key: 'home' },
  { name: '题目', href: '/problem', key: 'problem' },
  { name: '训练', href: '/train', key: 'train' },
  { name: '比赛', href: '/contest', key: 'contest' },
  { name: '测评', href: '/review', key: 'review' },
  { name: '排名', href: '/ranking', key: 'ranking' },
  { name: '讨论', href: '/discuss', key: 'discuss' },
  { name: '团队', href: '/team', key: 'team' },
  { name: '其他', href: '/others', key: 'others' },
];

const userNavigation = [
  { name: '我的主页', href: '/profile' }, 
  { name: '我的提交', href: '/submissions' },
  { name: '我的设置', href: '/settings' },
  { name: '后台管理', href: '/admin' }, // 后台管理
  { name: '退出登录', href: '#' },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

function Navigation() {
  const location = useLocation();
  const [currentNav, setCurrentNav] = useState('home');

  // 判断是否处于后台管理界面，隐藏顶部导航
  const isAdminPanel = location.pathname.startsWith('/admin');

  // 更新当前的导航项
  useEffect(() => {
    const currentPath = location.pathname;
    const currentItem = navigationItems.find(item => item.href === currentPath);
    if (currentItem) {
      setCurrentNav(currentItem.key);
    }
  }, [location]);

  return (
    !isAdminPanel && ( // 当不是在后台管理页面时显示顶部导航栏
      <Disclosure as="nav" className="bg-gray-800">
        {({ open }) => (
          <>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="flex h-16 items-center justify-between">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <img
                      className="h-8 w-8"
                      src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                      alt="Your Company"
                    />
                  </div>
                  <div className="hidden md:block">
                    <div className="ml-10 flex items-baseline space-x-4">
                      {navigationItems.map((item) => (
                        <Link
                          key={item.key}
                          to={item.href}
                          className={classNames(
                            currentNav === item.key ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                            'rounded-md px-3 py-2 text-sm font-medium'
                          )}
                          aria-current={currentNav === item.key ? 'page' : undefined}
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="hidden md:block">
                  <div className="ml-4 flex items-center md:ml-6">
                    <button
                      type="button"
                      className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                    >
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">View notifications</span>
                      <BellIcon className="h-6 w-6" aria-hidden="true" />
                    </button>

                    {/* Profile dropdown */}
                    <Menu as="div" className="relative ml-3">
                      <div>
                        <Menu.Button className="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                          <span className="absolute -inset-1.5" />
                          <span className="sr-only">Open user menu</span>
                          <img className="h-8 w-8 rounded-full" src={user.imageUrl} alt="" />
                        </Menu.Button>
                      </div>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="absolute right-2 z-10 mt-2 min-w-max origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                          {userNavigation.map((item) => (
                            <Menu.Item key={item.name}>
                              {({ active }) => (
                                <a
                                  href={item.name === '后台管理' ? '#' : item.href}
                                  onClick={(e) => {
                                    if (item.name === '后台管理') {
                                      e.preventDefault();
                                      window.open('/admin', '_blank'); // 新窗口打开后台管理页面
                                    }
                                  }}
                                  className={classNames(
                                    active ? 'bg-gray-100' : '',
                                    'block px-4 py-2 text-sm text-gray-700'
                                  )}
                                >
                                  {item.name}
                                </a>
                              )}
                            </Menu.Item>
                          ))}
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </div>
                </div>
                <div className="-mr-2 flex md:hidden">
                  {/* Mobile menu button */}
                  <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                    <span className="absolute -inset-0.5" />
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
              </div>
            </div>

            <Disclosure.Panel className="md:hidden">
              <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                {navigationItems.map((item) => (
                  <Disclosure.Button
                    key={item.key}
                    as={Link}
                    to={item.href}
                    className={classNames(
                      currentNav === item.key ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                      'block rounded-md px-3 py-2 text-base font-medium'
                    )}
                    aria-current={currentNav === item.key ? 'page' : undefined}
                  >
                    {item.name}
                  </Disclosure.Button>
                ))}
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    )
  );
}

export default function App() {
  return (
    <Router>
      <div className="min-h-full">
        <Navigation />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/problem" element={<Problem />} />
            <Route path="/train" element={<Train />} />
            <Route path="/contest" element={<Contest />} />
            <Route path="/review" element={<Review />} />
            <Route path="/ranking" element={<Ranking />} />
            <Route path="/discuss" element={<Discuss />} />
            <Route path="/team" element={<Team />} />
            <Route path="/others" element={<Others />} />
            {/* 新增的路由 */}
            <Route path="/profile" element={<MyProfile />} />
            <Route path="/submissions" element={<MySubmissions />} />
            <Route path="/settings" element={<MySettings />} />
            {/* 后台管理页面不会在此直接渲染 */}
            <Route path="/admin" element={<AdminPanel />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}