import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../components/Header';
import Sidebar from './Sidebar';
import { UploadAudioModal } from '../components';

const Layout = ({ children }) => {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const getPageTitle = () => {
    switch (location.pathname) {
      case '/dashboard':
        return 'Dashboard';
      case '/agents':
        return 'Agents';
      case '/agent-call-details':
        return 'Agent Call Details';
      default:
        if (location.pathname.startsWith('/agent/')) {
          return 'Agent Report';
        }
        if (location.pathname.startsWith('/agent-call-details/')) {
          return 'Agent Call Details';
        }
        return 'Dashboard';
    }
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
    console.log('Global search term:', term);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <div className={`${sidebarOpen ? 'w-55' : 'w-0'} transition-all duration-300 ease-in-out overflow-hidden`}>
        <Sidebar />
      </div>
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title={getPageTitle()} onSearch={handleSearch}>
          <button 
            onClick={() => setUploadModalOpen(true)}
            className="bg-[#298F84] text-white px-6 py-3 rounded-lg font-medium flex items-center space-x-2 transition-colors duration-200 md:w-[180px] md:h-[44px] hover:bg-[#298F84]/90"
          >
            <img src="/src/assets/Mp3-button/upload-file.svg" alt="Upload" className="w-5 h-5" />
            <span className="font-semibold text-xs" style={{fontWeight: 600, fontSize: '12px'}}>Upload MP3 File</span>
          </button>
          
          <button
            onClick={toggleSidebar}
            className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-teal-500"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </Header>

        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-6">
          {children}
        </main>
      </div>

      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        >
          <div className="absolute inset-0 bg-gray-600 opacity-75"></div>
        </div>
      )}

      <UploadAudioModal 
        isOpen={uploadModalOpen}
        onClose={() => setUploadModalOpen(false)}
      />
    </div>
  );
};

export default Layout;
