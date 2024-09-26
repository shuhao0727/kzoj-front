import { Fragment, useState } from 'react';
import { Dialog, Transition, Menu } from '@headlessui/react';
import { ChevronDownIcon, ChevronUpIcon, XMarkIcon } from '@heroicons/react/24/outline';

// 引入各个组件
import UserManagement from './Settings/UserManagement';
import AnnouncementManagement from './Settings/AnnouncementManagement';
import NotificationManagement from './Settings/NotificationManagement';
import SystemConfig from './Settings/SystemConfig';
import SystemDevelopment from './Settings/SystemDevelopment';
import ContestList from './ContestManagement/ContestList';
import CreateContest from './ContestManagement/CreateContest';
import DiscussionList from './DiscussionManagement/DiscussionList';
import AddProblem from './ProblemManagement/AddProblem';
import ImportExportProblem from './ProblemManagement/ImportExportProblem';
import ProblemList from './ProblemManagement/ProblemList';
import TagManagement from './ProblemManagement/TagManagement';
import TeamProblemApproval from './ProblemManagement/TeamProblemApproval';
import CategoryManagement from './TrainingManagement/CategoryManagement';
import TrainingList from './TrainingManagement/TrainingList';
import Dashboard from './Dashboard'; // 仪表盘组件

const navigation = [
  {
    name: '仪表盘',
    component: <Dashboard />, // 直接显示仪表盘
  },
  {
    name: '常用设置',
    children: [
      { name: '用户管理', component: <UserManagement /> },
      { name: '公告管理', component: <AnnouncementManagement /> },
      { name: '通知管理', component: <NotificationManagement /> },
      { name: '系统配置', component: <SystemConfig /> },
      { name: '系统开发', component: <SystemDevelopment /> },
    ],
  },
  {
    name: '题目管理',
    children: [
      { name: '题目列表', component: <ProblemList /> },
      { name: '增加题目', component: <AddProblem /> },
      { name: '标签管理', component: <TagManagement /> },
      { name: '团队题目审批', component: <TeamProblemApproval /> },
      { name: '导入/导出题目', component: <ImportExportProblem /> },
    ],
  },
  {
    name: '训练管理',
    children: [
      { name: '训练列表', component: <TrainingList /> },
      { name: '分类管理', component: <CategoryManagement /> },
    ],
  },
  {
    name: '比赛管理',
    children: [
      { name: '比赛列表', component: <ContestList /> },
      { name: '创建比赛', component: <CreateContest /> },
    ],
  },
  {
    name: '讨论管理',
    children: [
      { name: '讨论列表', component: <DiscussionList /> },
    ],
  },
];

export default function AdminPanel() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [openSections, setOpenSections] = useState({});  // 控制一级导航的展开/收起
  const [activeComponent, setActiveComponent] = useState(<Dashboard />);  // 控制当前显示的组件，默认显示仪表盘

  // 切换一级导航的展开/收起
  const toggleSection = (section) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  // 点击二级导航，显示对应的组件
  const handleItemClick = (component) => {
    setActiveComponent(component);  // 更新显示的组件
  };

  // 直接切换到仪表盘内容
  const handleDashboardClick = () => {
    setActiveComponent(<Dashboard />);
  };

  return (
    <>
      <div className="flex h-screen">
        {/* 侧边栏 */}
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog as="div" className="relative z-50 lg:hidden" onClose={setSidebarOpen}>
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-900/80" />
            </Transition.Child>

            <div className="fixed inset-0 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="relative flex w-full max-w-xs flex-1 flex-col bg-gray-900">
                  <div className="flex h-16 items-center justify-between px-4">
                    <XMarkIcon className="h-6 w-6 text-white" onClick={() => setSidebarOpen(false)} />
                  </div>
                  <nav className="flex flex-1 flex-col px-2">
                    <ul className="flex flex-col gap-y-7">
                      {/* 仪表盘点击事件 */}
                      <li>
                        <button
                          className="flex w-full text-left items-center text-sm font-semibold text-gray-200 hover:bg-gray-800 p-2 rounded-md"
                          onClick={handleDashboardClick}
                        >
                          仪表盘
                        </button>
                      </li>
                      {navigation.slice(1).map((section, index) => (
                        <li key={index}>
                          <button
                            className="flex justify-between w-full text-left items-center text-sm font-semibold text-gray-200 hover:bg-gray-800 p-2 rounded-md"
                            onClick={() => toggleSection(section.name)}
                          >
                            <span>{section.name}</span>
                            {openSections[section.name] ? (
                              <ChevronUpIcon className="h-5 w-5" />
                            ) : (
                              <ChevronDownIcon className="h-5 w-5" />
                            )}
                          </button>
                          {openSections[section.name] && section.children && (
                            <ul className="mt-2 space-y-1 pl-6">
                              {section.children.map((item) => (
                                <li key={item.name}>
                                  <button
                                    className="block text-gray-400 hover:text-white hover:bg-gray-800 p-2 rounded-md"
                                    onClick={() => handleItemClick(item.component)}
                                  >
                                    {item.name}
                                  </button>
                                </li>
                              ))}
                            </ul>
                          )}
                        </li>
                      ))}
                    </ul>
                  </nav>

                  {/* 用户信息 */}
                  <div className="flex-shrink-0 border-t border-gray-700 p-4">
                    <Menu as="div" className="relative">
                      <Menu.Button className="flex items-center gap-x-4">
                        <img
                          className="h-8 w-8 rounded-full bg-gray-800"
                          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                          alt=""
                        />
                        <span className="text-sm font-medium leading-6 text-gray-300">Tom Cook</span>
                      </Menu.Button>

                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="absolute bottom-full mb-2 right-0 w-32 origin-bottom-right rounded-md bg-white py-2 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                          <Menu.Item>
                            {({ active }) => (
                              <button
                                onClick={() => window.close()}  // 关闭页面
                                className={`${
                                  active ? 'bg-gray-100' : ''
                                } w-full text-left px-4 py-2 text-sm text-gray-700`}
                              >
                                退出
                              </button>
                            )}
                          </Menu.Item>
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        <div className="hidden lg:flex lg:w-64 lg:flex-col bg-gray-900">
          <div className="flex grow flex-col gap-y-5 overflow-y-auto px-4 py-6">
            <nav className="flex flex-1 flex-col px-2">
              <ul className="flex flex-col gap-y-7">
                {/* 仪表盘点击事件 */}
                <li>
                  <button
                    className="flex w-full text-left items-center text-sm font-semibold text-gray-200 hover:bg-gray-800 p-2 rounded-md"
                    onClick={handleDashboardClick}
                  >
                    仪表盘
                  </button>
                </li>
                {navigation.slice(1).map((section, index) => (
                  <li key={index}>
                    <button
                      className="flex justify-between w-full text-left items-center text-sm font-semibold text-gray-200 hover:bg-gray-800 p-2 rounded-md"
                      onClick={() => toggleSection(section.name)}
                    >
                      <span>{section.name}</span>
                      {openSections[section.name] ? (
                        <ChevronUpIcon className="h-5 w-5" />
                      ) : (
                        <ChevronDownIcon className="h-5 w-5" />
                      )}
                    </button>
                    {openSections[section.name] && section.children && (
                      <ul className="mt-2 space-y-1 pl-6">
                        {section.children.map((item) => (
                          <li key={item.name}>
                            <button
                              className="block text-gray-400 hover:text-white hover:bg-gray-800 p-2 rounded-md"
                              onClick={() => handleItemClick(item.component)}
                            >
                              {item.name}
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            </nav>

            {/* 用户信息 */}
            <div className="flex-shrink-0 border-t border-gray-700 p-4">
              <Menu as="div" className="relative">
                <Menu.Button className="flex items-center gap-x-4">
                  <img
                    className="h-8 w-8 rounded-full bg-gray-800"
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt=""
                  />
                  <span className="text-sm font-medium leading-6 text-gray-300">Tom Cook</span>
                </Menu.Button>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute bottom-full mb-2 right-0 w-32 origin-bottom-right rounded-md bg-white py-2 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          onClick={() => window.close()}  // 关闭页面
                          className={`${
                            active ? 'bg-gray-100' : ''
                          } w-full text-left px-4 py-2 text-sm text-gray-700`}
                        >
                          退出
                        </button>
                      )}
                    </Menu.Item>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
          </div>
        </div>

        {/* 右侧内容区域 */}
        <div className="flex-1 p-10">
          {activeComponent || <p className="text-gray-600">请选择一个二级导航</p>}
        </div>
      </div>
    </>
  );
}