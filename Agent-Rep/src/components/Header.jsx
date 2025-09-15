import React from 'react';

const Header = ({ title, children }) => {
  return (
    <header className="bg-gray-50 border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <h1 className="text-xl font-bold text-#202224">
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
