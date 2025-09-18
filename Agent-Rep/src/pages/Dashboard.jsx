import React, { useState } from 'react';
import GlobalTable from '../components/GlobalTable/GlobalTable';
import StatsSection from '../components/StatsSection/StatsSection';
import { useGetUsersQuery } from '../store/api/usersApi';
import { useDashboardData } from '../hooks/useDashboardData';
import { useTableHandlers } from '../hooks/useTableHandlers';
import { DASHBOARD_CONFIG, AGENTS_TABLE_COLUMNS } from '../constants/dashboardConstants';

const Dashboard = () => {
  const { data: usersData, error, isLoading } = useGetUsersQuery();
  const { statsData, recentAgentsData } = useDashboardData(usersData);
  const { handleView, handleEdit, handleDelete } = useTableHandlers();
  
  const [currentPage, setCurrentPage] = useState(DASHBOARD_CONFIG.PAGINATION.DEFAULT_PAGE);
  const [itemsPerPage] = useState(DASHBOARD_CONFIG.PAGINATION.ITEMS_PER_PAGE);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };


  // Render content based on API state
  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#298F84] mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading agents...</p>
          </div>
        </div>
      );
    }

    if (error) {
      return (
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <p className="text-red-600 mb-4">Failed to load agents</p>
            <p className="text-gray-600">Unable to fetch data from API</p>
          </div>
        </div>
      );
    }

    return (
      <GlobalTable
        data={recentAgentsData}
        columns={AGENTS_TABLE_COLUMNS}
        title="Recent Agents"
        showActions={true}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
        showHeader={true}
        showSearch={false}
        showFilters={false}
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        totalItems={recentAgentsData.length}
        onPageChange={handlePageChange}
        showPagination={true}
      />
    );
  };

  return (
    <div className="space-y-6">
      <StatsSection statsData={statsData} />

      <div className="bg-white">
        <div className="px-6 py-4 bg-gray-50">
          <div className="flex items-center justify-between">
            <h2 className="text-base sm:text-xl font-semibold text-[#202224]">Recent Agents</h2>
            <a href="#" className="text-[#298F84] font-medium">View all</a>
          </div>
        </div>
      </div>
      
      {renderContent()}
    </div>
  );
};

export default Dashboard;
