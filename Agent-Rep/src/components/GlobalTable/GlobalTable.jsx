import React from 'react';
import eyeIcon from '../../assets/Action-icons/eye-icon.svg';
import editIcon from '../../assets/Action-icons/edit-icon.svg';
import removeIcon from '../../assets/Action-icons/remove-icon.svg';

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
  onFilter = () => {}
}) => {
  // Default action buttons if showActions is true
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

  // Render cell content based on column type
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
                className={action.className || "text-gray-600 hover:text-gray-900"}
                title={action.alt || action.title}
              >
                <img src={action.icon} alt={action.alt || action.title} className="w-[20px] h-[20px]" />
              </button>
            )) : defaultActions.map((action, index) => (
              <button 
                key={index}
                onClick={() => action.onClick(item)}
                className={action.className}
                title={action.alt}
              >
                <img src={action.icon} alt={action.alt} className="w-[20px] h-[20px]" />
              </button>
            ))}
          </div>
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
          <thead className="bg-gray-50">
            <tr>
              {columns.map((column, index) => (
                <th 
                  key={index}
                  className={`px-6 py-3 text-${column.align || 'left'} text-sm font-semibold text-[#202224]`}
                >
                  {column.title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((item, rowIndex) => (
              <tr key={rowIndex}>
                {columns.map((column, colIndex) => (
                  <td 
                    key={colIndex}
                    className={`px-6 py-4 whitespace-nowrap text-sm ${column.textColor || 'text-gray-500'}`}
                  >
                    {renderCellContent(item, column)}
                  </td>
                ))}
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
    </div>
  );
};

export default GlobalTable;
