import React, { useState } from 'react';

/**
 * Global SearchBar Component
 * 
 * A reusable search input component with customizable styling and functionality.
 * 
 * @param {string} placeholder - Placeholder text for the input field
 * @param {function} onSearch - Callback function called when search term changes
 * @param {string} className - Additional CSS classes to apply
 * @param {boolean} showIcon - Whether to show the search icon
 * @param {string} size - Size variant: "small", "medium", or "large"
 * 
 * @example
 * // Basic usage
 * <SearchBar onSearch={(term) => console.log(term)} />
 * 
 * @example
 * // Custom placeholder and size
 * <SearchBar 
 *   placeholder="Search agents..." 
 *   size="large"
 *   onSearch={handleSearch}
 * />
 * 
 * @example
 * // Without icon
 * <SearchBar 
 *   showIcon={false}
 *   placeholder="Enter search term..."
 *   onSearch={handleSearch}
 * />
 */
const SearchBar = ({ 
  placeholder = "Search...", 
  onSearch, 
  className = "",
  showIcon = true,
  size = "medium" // small, medium, large
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    
    // Call the onSearch callback if provided
    if (onSearch) {
      onSearch(value);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (onSearch) {
        onSearch(searchTerm);
      }
    }
  };

  const handleClear = () => {
    setSearchTerm('');
    if (onSearch) {
      onSearch('');
    }
  };

  // Size classes
  const sizeClasses = {
    small: "h-8 px-3 text-sm",
    medium: "h-10 px-4 text-sm",
    large: "h-12 px-5 text-base"
  };

  const iconSizes = {
    small: "w-4 h-4",
    medium: "w-5 h-5", 
    large: "w-6 h-6"
  };

  return (
    <div className={`relative ${className}`}>
      <div className="relative">
        {showIcon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg 
              className={`${iconSizes[size]} text-gray-400`} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
              />
            </svg>
          </div>
        )}
        
        <input
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          placeholder={placeholder}
          className={`
            ${sizeClasses[size]}
            ${showIcon ? 'pl-10' : 'pl-3'}
            ${searchTerm ? 'pr-10' : 'pr-3'}
            w-full border border-gray-300 rounded-lg 
            bg-white text-gray-900 placeholder-gray-500
            focus:outline-none focus:ring-2 focus:ring-[#298F84] focus:border-transparent
            transition-all duration-200 ease-in-out
            hover:border-gray-400
          `}
        />
        
        {searchTerm && (
          <button
            onClick={handleClear}
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
            type="button"
          >
            <svg 
              className={`${iconSizes[size]} text-gray-400 hover:text-gray-600 transition-colors`} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M6 18L18 6M6 6l12 12" 
              />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
