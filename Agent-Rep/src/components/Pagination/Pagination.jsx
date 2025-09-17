import React from 'react';

const Pagination = ({ 
  currentPage = 1, 
  totalPages = 5, 
  onPageChange,
  showInfo = true,
  className = "",
  itemsPerPage = 10,
  totalItems = 0
}) => {
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const formatPageNumber = (page) => {
    return page.toString().padStart(2, '0');
  };

  const getDisplayInfo = () => {
    if (totalItems > 0) {
      const startItem = (currentPage - 1) * itemsPerPage + 1;
      const endItem = Math.min(currentPage * itemsPerPage, totalItems);
      return `Showing ${formatPageNumber(startItem)}-${formatPageNumber(endItem)} of ${formatPageNumber(totalItems)}`;
    }
    return `Showing ${formatPageNumber(currentPage)} of ${formatPageNumber(totalPages)}`;
  };

  return (
    <div className={`flex items-center justify-between ${className}`}>
      {/* Page Info */}
      {showInfo && (
        <div className="text-gray-600 text-sm font-medium mt-6">
          {getDisplayInfo()}
        </div>
      )}

      {/* Navigation Controls */}
      <div className="flex items-center bg-gray-100 rounded-lg border border-gray-200 shadow-sm mt-6">
        {/* Previous Button */}
        <button
          onClick={handlePrevious}
          disabled={currentPage <= 1}
          className={`px-3 py-2 rounded-l-lg transition-colors duration-200 ${
            currentPage <= 1
              ? 'text-gray-400 cursor-not-allowed'
              : 'text-gray-600 hover:text-gray-800 hover:bg-gray-200'
          }`}
          aria-label="Previous page"
        >
          <svg 
            className="w-4 h-4" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M15 19l-7-7 7-7" 
            />
          </svg>
        </button>

        {/* Divider */}
        <div className="w-px h-5 bg-gray-300"></div>

        {/* Next Button */}
        <button
          onClick={handleNext}
          disabled={currentPage >= totalPages}
          className={`px-3 py-2 rounded-r-lg transition-colors duration-200 ${
            currentPage >= totalPages
              ? 'text-gray-400 cursor-not-allowed'
              : 'text-gray-600 hover:text-gray-800 hover:bg-gray-200'
          }`}
          aria-label="Next page"
        >
          <svg 
            className="w-4 h-4" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M9 5l7 7-7 7" 
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Pagination;
