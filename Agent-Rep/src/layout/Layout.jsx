import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../components/Header';
import Sidebar from './Sidebar';

const Layout = ({ children }) => {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Get the current page title based on the route
  const getPageTitle = () => {
    switch (location.pathname) {
      case '/dashboard':
        return 'Dashboard';
      case '/agents':
        return 'Agents';
      default:
        return 'Dashboard';
    }
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-55' : 'w-0'} transition-all duration-300 ease-in-out overflow-hidden`}>
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <Header title={getPageTitle()}>
          {/* Upload Button */}
          <button className="bg-[#298F84] text-white px-6 py-3 rounded-lg font-medium flex items-center space-x-2 transition-colors duration-200 md:w-[180px] md:h-[44px]">
            <img src="/src/assets/Mp3-button/upload-file.svg" alt="Upload" className="w-5 h-5" />
            <span className="font-semibold text-xs" style={{fontWeight: 600, fontSize: '12px'}}>Upload MP3 File</span>
          </button>
          
          {/* Mobile menu button */}
          <button
            onClick={toggleSidebar}
            className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-teal-500"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </Header>

        {/* Page Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-6">
          {children}
        </main>
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        >
          <div className="absolute inset-0 bg-gray-600 opacity-75"></div>
        </div>
      )}
    </div>
  );
};

export default Layout;
