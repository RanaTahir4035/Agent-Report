import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import userHeadset from '../assets/SideBar_icons/user-headset.svg'
import dashboardIcon from '../assets/SideBar_icons/dashboard-icon.svg'
import agentsIcon from '../assets/SideBar_icons/agents-icon.svg'
import logoutIcon from '../assets/SideBar_icons/logout-icon.svg'

const Sidebar = ({ onClose }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };
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
    if (onClose) {
      onClose();
    }
  };

  return (
    <aside className="w-55 bg-white h-screen flex flex-col border-r border-gray-200 shadow-lg">
      <div className="p-6 flex items-center justify-center my-6 relative">
        <img src={userHeadset} alt="userHeadset" className="w-[36px] h-[36px]" />
        
        {onClose && (
          <button
            onClick={onClose}
            className="lg:hidden absolute right-6 p-2 rounded-md text-gray-600 hover:text-gray-800 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-teal-500 transition-colors duration-200"
            aria-label="Close sidebar"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <li key={item.id}>
                <button
                  onClick={() => handleItemClick(item.path)}
                  className={`w-[184px] flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors duration-200 relative group ${
                    isActive
                      ? 'text-white'
                      : 'text-menu-text hover:bg-gray-100'
                  }`}
                  style={isActive ? { backgroundColor: '#298F84' } : {}}
                  title={item.label}
                >
                  <div className={`${isActive ? 'brightness-0 invert' : ''}`}>
                    {item.icon}
                  </div>
                  <span className="text-base font-semibold">{item.label}</span>
                  
                  {/* Tooltip */}
                  {/* <div className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-sm rounded shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50">
                    {item.label}
                    <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1 w-2 h-2 bg-gray-800 rotate-45"></div>
                  </div> */}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="p-4">
        <button 
          onClick={handleLogout}
          className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors duration-200"
        >
          <img src={logoutIcon} alt="logoutIcon" className="w-5 h-5" />
          <span className="font-base">Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
