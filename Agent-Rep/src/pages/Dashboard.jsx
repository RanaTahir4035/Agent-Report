import React, { useState } from 'react';
import callIcon from '../assets/Dashbaord-stats/call-icon.svg'
import callDurationIcon from '../assets/Dashbaord-stats/call-duration.svg'
import missedCallsIcon from '../assets/Dashbaord-stats/missed-call.svg'
import callQualityIcon from '../assets/Dashbaord-stats/call-quality.svg'
import agentsIcon from '../assets/Dashbaord-stats/total-agent.svg'
import GlobalTable from '../components/GlobalTable/GlobalTable'
import { useGetUsersQuery } from '../store/api/usersApi'

const Dashboard = () => {
  const { data: usersData, error, isLoading } = useGetUsersQuery();
  
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  
  const recentAgentsData = usersData || [];
  
  const totalAgents = usersData ? usersData.length : 0;
  const totalCalls = usersData ? usersData.reduce((sum, agent) => sum + agent.totalCalls, 0) : 0;
  const averageScore = usersData && usersData.length > 0 
    ? Math.round(usersData.reduce((sum, agent) => sum + agent.averageScore, 0) / usersData.length) 
    : 0;
  const excellentAgents = usersData ? usersData.filter(agent => agent.status === 'Excellent').length : 0;
  const failedCalls = usersData ? usersData.filter(agent => agent.status === 'Average').length : 0;

  const recentAgentsColumns = [
    {
      title: "Agent Name",
      key: "name",
      type: "default"
    },
    {
      title: "Email", 
      key: "email",
      type: "default"
    },
    {
      title: "Total Calls",
      key: "totalCalls",
      type: "default",
      align: "left"
    },
    {
      title: "Average Score",
      key: "averageScore", 
      type: "default",
      align: "left"
    },
    {
      title: "Status",
      key: "status",
      type: "badge",
      badgeClass: (value) => {
        switch(value) {
          case "Excellent": return "bg-[#34C759] text-white w-[86px] text-center";
          case "Good": return "bg-[#007AFF] text-white w-[86px] text-center";
          case "Average": return "bg-[#FFCC00] text-white w-[86px] text-center";
          default: return "bg-gray-100 text-gray-800 text-center";
        }
      }
    },
    {
      title: "Action",
      key: "actions",
      type: "actions",
      align: "left"
    }
  ];

  const handleView = (item) => {
    console.log("View agent:", item);
  };

  const handleEdit = (item) => {
    console.log("Edit agent:", item);
  };

  const handleDelete = (item) => {
    console.log("Delete agent:", item);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-base sm:text-xl  font-bold text-[#202224]">150</p>
                <p className="text-xs font-weight-400 text-[#757575]">Total Calls Analyzed</p>
              </div>
              <img src={callIcon} alt="total-calls-analyzed" className="md:w-12 w-8 md:h-12 h-8" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-base sm:text-xl  font-bold text-[#202224]">20</p>
                <p className="text-xs font-weight-400 text-[#757575]">Failed Calls</p>
              </div>
              <img src={missedCallsIcon} alt="total-calls-analyzed" className="md:w-12 w-8 md:h-12 h-8" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-base sm:text-xl  font-bold text-[#202224]">85%</p>
                <p className="text-xs font-weight-400 text-[#757575]">Average Call Quality Score</p>
              </div>
              <img src={callQualityIcon} alt="total-calls-analyzed" className="md:w-12 w-8 md:h-12 h-8" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-base sm:text-xl  font-bold text-[#202224]">4m 30s</p>
                <p className="text-xs font-weight-400 text-[#757575]">Average Call Duration</p>
              </div>
              <img src={callDurationIcon} alt="total-calls-analyzed" className="md:w-12 w-8 md:h-12 h-8" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-base sm:text-xl  font-bold text-[#202224]">25</p>
                <p className="text-xs font-weight-400 text-[#757575]">Total Agents</p>
              </div>
              <img src={agentsIcon} alt="total-calls-analyzed" className="md:w-12 w-8 md:h-12 h-8" />
            </div>
          </div>
        </div>

        <div className="bg-white">
          <div className="px-6 py-4 bg-gray-50">
            <div className="flex items-center justify-between">
              <h2 className="text-base sm:text-xl font-semibold text-[#202224]">Recent Agents</h2>
              <a href="#" className="text-[#298F84] font-medium">View all</a>
            </div>
          </div>
        </div>
        
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#298F84] mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading agents...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-base sm:text-xl  font-bold text-[#202224]">150</p>
                <p className="text-xs font-weight-400 text-[#757575]">Total Calls Analyzed</p>
              </div>
              <img src={callIcon} alt="total-calls-analyzed" className="md:w-12 w-8 md:h-12 h-8" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-base sm:text-xl  font-bold text-[#202224]">20</p>
                <p className="text-xs font-weight-400 text-[#757575]">Failed Calls</p>
              </div>
              <img src={missedCallsIcon} alt="total-calls-analyzed" className="md:w-12 w-8 md:h-12 h-8" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-base sm:text-xl  font-bold text-[#202224]">85%</p>
                <p className="text-xs font-weight-400 text-[#757575]">Average Call Quality Score</p>
              </div>
              <img src={callQualityIcon} alt="total-calls-analyzed" className="md:w-12 w-8 md:h-12 h-8" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-base sm:text-xl  font-bold text-[#202224]">4m 30s</p>
                <p className="text-xs font-weight-400 text-[#757575]">Average Call Duration</p>
              </div>
              <img src={callDurationIcon} alt="total-calls-analyzed" className="md:w-12 w-8 md:h-12 h-8" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-base sm:text-xl  font-bold text-[#202224]">25</p>
                <p className="text-xs font-weight-400 text-[#757575]">Total Agents</p>
              </div>
              <img src={agentsIcon} alt="total-calls-analyzed" className="md:w-12 w-8 md:h-12 h-8" />
            </div>
          </div>
        </div>

        <div className="bg-white">
          <div className="px-6 py-4 bg-gray-50">
            <div className="flex items-center justify-between">
              <h2 className="text-base sm:text-xl font-semibold text-[#202224]">Recent Agents</h2>
              <a href="#" className="text-[#298F84] font-medium">View all</a>
            </div>
          </div>
        </div>
        
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <p className="text-red-600 mb-4">Failed to load agents</p>
            <p className="text-gray-600">Unable to fetch data from API</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-base sm:text-xl  font-bold text-[#202224]">{totalCalls}</p>
              <p className="text-xs font-weight-400 text-[#757575]">Total Calls Analyzed</p>
            </div>
            <img src={callIcon} alt="total-calls-analyzed" className="md:w-12 w-8 md:h-12 h-8" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-base sm:text-xl  font-bold text-[#202224]">{failedCalls}</p>
              <p className="text-xs font-weight-400 text-[#757575]">Failed Calls</p>
            </div>
            <img src={missedCallsIcon} alt="total-calls-analyzed" className="md:w-12 w-8 md:h-12 h-8" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-base sm:text-xl  font-bold text-[#202224]">{averageScore}/10</p>
              <p className="text-xs font-weight-400 text-[#757575]">Average Call Quality Score</p>
            </div>
            <img src={callQualityIcon} alt="total-calls-analyzed" className="md:w-12 w-8 md:h-12 h-8" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-base sm:text-xl  font-bold text-[#202224]">4m 30s</p>
              <p className="text-xs font-weight-400 text-[#757575]">Average Call Duration</p>
            </div>
            <img src={callDurationIcon} alt="total-calls-analyzed" className="md:w-12 w-8 md:h-12 h-8" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-base sm:text-xl  font-bold text-[#202224]">{totalAgents}</p>
              <p className="text-xs font-weight-400 text-[#757575]">Total Agents</p>
            </div>
            <img src={agentsIcon} alt="total-calls-analyzed" className="md:w-12 w-8 md:h-12 h-8" />
          </div>
        </div>
      </div>

      <div className="bg-white">
        <div className="px-6 py-4 bg-gray-50">
          <div className="flex items-center justify-between">
            <h2 className="text-base sm:text-xl font-semibold text-[#202224]">Recent Agents</h2>
            <a href="#" className="text-[#298F84] font-medium">View all</a>
          </div>
        </div>
      </div>
      <GlobalTable
        data={recentAgentsData}
        columns={recentAgentsColumns}
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
    </div>
  );
};

export default Dashboard;
