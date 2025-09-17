import React from 'react';
import callIcon from '../assets/Dashbaord-stats/call-icon.svg'
import callDurationIcon from '../assets/Dashbaord-stats/call-duration.svg'
import missedCallsIcon from '../assets/Dashbaord-stats/missed-call.svg'
import callQualityIcon from '../assets/Dashbaord-stats/call-quality.svg'
import agentsIcon from '../assets/Dashbaord-stats/total-agent.svg'
import GlobalTable from '../components/GlobalTable/GlobalTable'
import { useGetUsersQuery } from '../store/api/usersApi'

const Dashboard = () => {
  // Fetch users from API
  const { data: usersData, error, isLoading } = useGetUsersQuery();
  
  // Use API data if available, otherwise fallback to static data
  const recentAgentsData = usersData || [
    { id: 1, name: "John Doe", email: "johndoe@gmail.com", totalCalls: 50, averageScore: 9, status: "Excellent" },
    { id: 2, name: "John Doe", email: "johndoe@gmail.com", totalCalls: 50, averageScore: 7, status: "Good" },
    { id: 3, name: "John Doe", email: "johndoe@gmail.com", totalCalls: 50, averageScore: 6, status: "Average" },
    { id: 4, name: "John Doe", email: "johndoe@gmail.com", totalCalls: 50, averageScore: 9, status: "Excellent" },
    { id: 5, name: "John Doe", email: "johndoe@gmail.com", totalCalls: 50, averageScore: 7, status: "Good" },
    { id: 6, name: "John Doe", email: "johndoe@gmail.com", totalCalls: 50, averageScore: 6, status: "Average" },
    { id: 7, name: "John Doe", email: "johndoe@gmail.com", totalCalls: 50, averageScore: 9, status: "Excellent" },
    { id: 8, name: "John Doe", email: "johndoe@gmail.com", totalCalls: 50, averageScore: 7, status: "Good" },
    { id: 9, name: "John Doe", email: "johndoe@gmail.com", totalCalls: 50, averageScore: 6, status: "Average" },
    { id: 10, name: "John Doe", email: "johndoe@gmail.com", totalCalls: 50, averageScore: 9, status: "Excellent" }
  ];

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

  // Show loading state
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

  // Show error state
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
            <p className="text-gray-600">Using fallback data</p>
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
      />
    </div>
  );
};

export default Dashboard;
