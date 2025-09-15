import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import userHeadset from '../assets/SideBar_icons/user-headset.svg'
import dashboardIcon from '../assets/SideBar_icons/dashboard-icon.svg'
import agentsIcon from '../assets/SideBar_icons/agents-icon.svg'
import logoutIcon from '../assets/SideBar_icons/logout-icon.svg'

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const menuItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      path: '/dashboard',
      icon: (
        <img src={dashboardIcon} alt="dashboardIcon" className="w-5 h-5" />
      )
    },
    {
      id: 'agents',
      label: 'Agents',
      path: '/agents',
      icon: (
        <img src={agentsIcon} alt="agentsIcon" className="w-5 h-5" />
      )
    }
  ];

  const handleItemClick = (path) => {
    navigate(path);
  };

  return (
    <aside className="w-55 bg-white min-h-screen flex flex-col border-r border-gray-200">
      {/* Logo */}
      <div className="p-6 flex justify-center items-center my-6">
        <img src={userHeadset} alt="userHeadset" className="w-[36px] h-[36px]" />
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <li key={item.id}>
                <button
                  onClick={() => handleItemClick(item.path)}
                  className={`w-[184px] flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors duration-200 ${
                    isActive
                      ? 'text-white'
                      : 'text-menu-text hover:bg-gray-100'
                  }`}
                  style={isActive ? { backgroundColor: '#298F84' } : {}}
                >
                  <div className={`${isActive ? 'brightness-0 invert' : ''}`}>
                    {item.icon}
                  </div>
                  <span className="text-base font-semibold">{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Logout */}
      <div className="p-4">
        <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors duration-200">
          <img src={logoutIcon} alt="logoutIcon" className="w-5 h-5" />
          <span className="font-base">Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
