import React, { useState } from 'react';
import GlobalTable from '../components/GlobalTable/GlobalTable';
import StatsSection from '../components/StatsSection/StatsSection';
import BasicDialog from '../components/BasicDialog/BasicDialog';
import { useGetDashboardUsersQuery } from '../store/api/dashboardApi';
import { useDashboardData } from '../hooks/useDashboardData';
import { useDashboardTableHandlers } from '../hooks/useDashboardTableHandlers';
import { DASHBOARD_CONFIG, AGENTS_TABLE_COLUMNS } from '../constants/dashboardConstants';

const Dashboard = () => {
  const { data: usersData, error, isLoading } = useGetDashboardUsersQuery();
  const { statsData, recentAgentsData } = useDashboardData(usersData);
  const { 
    handleView, 
    handleEdit, 
    handleDelete, 
    viewModalOpen, 
    deleteModalOpen, 
    selectedAgent, 
    closeViewModal, 
    closeDeleteModal, 
    confirmDelete 
  } = useDashboardTableHandlers();
  
  const [currentPage, setCurrentPage] = useState(DASHBOARD_CONFIG.PAGINATION.DEFAULT_PAGE);
  const [itemsPerPage] = useState(DASHBOARD_CONFIG.PAGINATION.ITEMS_PER_PAGE);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };


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

      <BasicDialog
        isOpen={viewModalOpen}
        onClose={closeViewModal}
        title="Agent Details"
        size="md"
      >
        {selectedAgent && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              <div className="flex justify-between items-center py-2 border-b border-gray-200">
                <span className="font-medium text-gray-700">Agent Name:</span>
                <span className="text-gray-900">{selectedAgent.name}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-200">
                <span className="font-medium text-gray-700">Email:</span>
                <span className="text-gray-900">{selectedAgent.email}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-200">
                <span className="font-medium text-gray-700">Total Calls:</span>
                <span className="text-gray-900">{selectedAgent.totalCalls}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-200">
                <span className="font-medium text-gray-700">Average Score:</span>
                <span className="text-gray-900">{selectedAgent.averageScore}/10</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="font-medium text-gray-700">Status:</span>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  selectedAgent.status === 'Excellent' ? 'bg-[#34C759] text-white' :
                  selectedAgent.status === 'Good' ? 'bg-[#007AFF] text-white' :
                  selectedAgent.status === 'Average' ? 'bg-[#FFCC00] text-white' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {selectedAgent.status}
                </span>
              </div>
            </div>
          </div>
        )}
      </BasicDialog>

      <BasicDialog
        isOpen={deleteModalOpen}
        onClose={closeDeleteModal}
        title="Delete Agent"
        size="sm"
      >
        {selectedAgent && (
          <div className="space-y-4">
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
                <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Are you sure you want to delete this agent?
              </h3>
              <p className="text-sm text-gray-500 mb-4">
                This action cannot be undone. The agent <strong>{selectedAgent.name}</strong> will be permanently removed.
              </p>
            </div>
            
            <div className="flex justify-end space-x-3">
              <button
                onClick={closeDeleteModal}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors duration-200 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200 cursor-pointer"
              >
                Delete Agent
              </button>
            </div>
          </div>
        )}
      </BasicDialog>
    </div>
  );
};

export default Dashboard;
