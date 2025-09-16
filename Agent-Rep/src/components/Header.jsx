import React from 'react';
import { SearchBar } from './index';

const Header = ({ title, children, onSearch, showSearch = true, onToggleSidebar, sidebarOpen }) => {
  return (
    <header className="bg-gray-50 border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={onToggleSidebar}
            className="lg:hidden p-2 rounded-md text-gray-600 hover:text-gray-800 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-teal-500 transition-colors duration-200"
            aria-label="Toggle sidebar"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {sidebarOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
          
          <h1 className="text-base sm:text-xl font-bold text-#202224">
            {title}
          </h1>
        </div>
        
        <div className="flex items-center space-x-4">
          {children}
        </div>
      </div>
    </header>
  );
};

export default Header;
