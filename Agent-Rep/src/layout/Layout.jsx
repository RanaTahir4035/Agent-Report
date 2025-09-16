import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../components/Header';
import Sidebar from './Sidebar';
import { UploadAudioModal } from '../components';

const Layout = ({ children }) => {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
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
      <div className="hidden lg:block">
        <Sidebar />
      </div>
      
      <div className={`lg:hidden fixed inset-y-0 left-0 z-50 w-55 transform transition-transform duration-300 ease-in-out ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <Sidebar onClose={() => setSidebarOpen(false)} />
      </div>

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
          title={getPageTitle()} 
          onSearch={handleSearch}
          onToggleSidebar={toggleSidebar}
          sidebarOpen={sidebarOpen}
        >
          <button 
            onClick={() => setUploadModalOpen(true)}
            className="bg-[#298F84] text-white md:px-6 px-2 py-3 rounded-lg font-medium flex items-center space-x-2 transition-colors duration-200 md:w-[180px] w-[120px] md:h-[44px] hover:bg-[#298F84]/90"
          >
            <img src="/src/assets/Mp3-button/upload-file.svg" alt="Upload" className="w-5 h-5" />
            <span className="font-semibold text-[10px] md:text-[12px] " >Upload MP3 File</span>
          </button>
        </Header>

        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-6">
          {children}
        </main>
      </div>

      {sidebarOpen && (
        <div 
          className="lg:hidden fixed inset-0 z-40 bg-gray-600 opacity-75"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <UploadAudioModal 
        isOpen={uploadModalOpen}
        onClose={() => setUploadModalOpen(false)}
      />
    </div>
  );
};

export default Layout;
