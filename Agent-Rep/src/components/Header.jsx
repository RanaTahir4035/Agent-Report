import React from 'react';
import { SearchBar } from './index';

const Header = ({ title, children, onSearch, showSearch = true }) => {
  return (
    <header className="bg-gray-50 border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <h1 className="text-xl font-bold text-#202224">
            {title}
          </h1>
       
        </div>
        <div className="flex items-center">
          {children}
        </div>
      </div>
    </header>
  );
};

export default Header;
