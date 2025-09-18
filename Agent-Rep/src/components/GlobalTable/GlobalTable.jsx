import React from 'react';
import eyeIcon from '../../assets/Action-icons/eye-icon.svg';
import editIcon from '../../assets/Action-icons/edit-icon.svg';
import removeIcon from '../../assets/Action-icons/remove-icon.svg';
import Pagination from '../Pagination/Pagination';

const GlobalTable = ({ 
  data = [], 
  columns = [], 
  showActions = true,
  onView = () => {},
  onEdit = () => {},
  onDelete = () => {},
  className = "",
  title = "",
  showHeader = true,
  showSearch = false,
  searchPlaceholder = "Search...",
  onSearch = () => {},
  showFilters = false,
  filterOptions = [],
  onFilter = () => {},
  // Pagination props
  currentPage = 1,
  itemsPerPage = 10,
  totalItems = 0,
  onPageChange = () => {},
  showPagination = false
}) => {
  const defaultActions = [
    {
      icon: eyeIcon,
      alt: "View",
      onClick: onView,
      className: "text-teal-600 hover:text-teal-900"
    },
    {
      icon: editIcon,
      alt: "Edit", 
      onClick: onEdit,
      className: "text-blue-600 hover:text-blue-900"
    },
    {
      icon: removeIcon,
      alt: "Delete",
      onClick: onDelete,
      className: "text-red-600 hover:text-red-900"
    }
  ];
  
  // Calculate pagination data
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = data.slice(startIndex, endIndex);

  const renderCellContent = (item, column) => {
    const value = item[column.key];
    
    switch (column.type) {
      case 'badge':
        const badgeClass = typeof column.badgeClass === 'function' 
          ? column.badgeClass(value) 
          : column.badgeClass || 'bg-green-100 text-green-800';
        return (
          <span className={`inline-flex items-center justify-center px-2 py-1 text-xs font-semibold rounded-full ${badgeClass}`}>
            {value}
          </span>
        );
      case 'avatar':
        return (
          <div className="flex items-center">
            <div className="flex-shrink-0 h-10 w-10">
              <div className={`h-10 w-10 rounded-full ${column.avatarBgClass || 'bg-teal-100'} flex items-center justify-center`}>
                <span className={`text-sm font-medium ${column.avatarTextClass || 'text-teal-600'}`}>
                  {column.getInitials ? column.getInitials(value) : value?.charAt(0) || '?'}
                </span>
              </div>
            </div>
            <div className="ml-4">
              <div className="text-sm font-medium text-gray-900">{value}</div>
              {column.subtitle && (
                <div className="text-sm text-gray-500">{column.subtitle(item)}</div>
              )}
            </div>
          </div>
        );
      case 'actions':
        return (
          <div className="flex space-x-2">
            {column.actions ? column.actions.map((action, index) => (
              <button 
                key={index}
                onClick={() => action.onClick(item)}
                className={`${action.className || "text-gray-600 hover:text-gray-900"} cursor-pointer`}
                title={action.alt || action.title}
              >
                <img src={action.icon} alt={action.alt || action.title} className="w-[20px] h-[20px]" />
              </button>
            )) : defaultActions.map((action, index) => (
              <button 
                key={index}
                onClick={() => action.onClick(item)}
                className={`${action.className} cursor-pointer`}
                title={action.alt}
              >
                <img src={action.icon} alt={action.alt} className="w-[20px] h-[20px]" />
              </button>
            ))}
          </div>
        );
      case 'conversation':
        return (
          <div className="flex items-start space-x-3">
            {column.showAvatar && (
              <div className="flex-shrink-0">
                <div className={`h-8 w-8 rounded-full ${column.avatarBgClass || 'bg-teal-100'} flex items-center justify-center`}>
                  <span className={`text-xs font-medium ${column.avatarTextClass || 'text-teal-600'}`}>
                    {column.getInitials ? column.getInitials(value) : value?.charAt(0) || '?'}
                  </span>
                </div>
              </div>
            )}
            <div className="flex-1 min-w-0">
              <p className={`text-sm ${column.textColor || 'text-gray-900'} truncate`} title={value}>
                {value}
              </p>
            </div>
          </div>
        );
      case 'score':
        return (
          <span className="text-sm font-semibold text-gray-900">
            {value}
          </span>
        );
      case 'category':
        return (
          <span className="text-sm text-gray-900">
            {value}
          </span>
        );
      case 'custom':
        return column.render ? column.render(item) : value;
      default:
        return value;
    }
  };

  return (
    <div className={`bg-white ${className}`}>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-white">
            <tr>
              {columns.map((column, index) => {
                const getAlignmentClass = (align) => {
                  switch(align) {
                    case 'start': return 'text-left';
                    case 'center': return 'text-center';
                    case 'end': return 'text-right';
                    default: return 'text-left';
                  }
                };
                
                return (
                  <th 
                    key={index}
                    className={`px-4 py-3 ${getAlignmentClass(column.align)} text-sm font-semibold text-black bg-gray-50`}
                  >
                    {column.title}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((item, rowIndex) => (
              <tr key={rowIndex} className="border-b-4 border-gray-100 hover:bg-gray-50">
                {columns.map((column, colIndex) => {
                  const getAlignmentClass = (align) => {
                    switch(align) {
                      case 'start': return 'text-left';
                      case 'center': return 'text-center';
                      case 'end': return 'text-right';
                      default: return 'text-left';
                    }
                  };
                  
                  return (
                    <td 
                      key={colIndex}
                      className={`px-2 sm:px-4 py-4 md:text-sm text-xs ${getAlignmentClass(column.align)} ${column.textColor || 'text-gray-900'}`}
                    >
                      {renderCellContent(item, column)}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {data.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">No data available</p>
        </div>
      )}
      
      {/* Pagination Component */}
      {showPagination && data.length > 0 && (
        <div className=" bg-gray-50">
          <Pagination 
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={totalItems}
            itemsPerPage={itemsPerPage}
            onPageChange={onPageChange}
          />
        </div>
      )}
    </div>
  );
};

export default GlobalTable;
