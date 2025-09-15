import React from 'react';
import callIcon from '../assets/Dashbaord-stats/call-icon.svg'
import callDurationIcon from '../assets/Dashbaord-stats/call-duration.svg'
import missedCallsIcon from '../assets/Dashbaord-stats/missed-call.svg'
import callQualityIcon from '../assets/Dashbaord-stats/call-quality.svg'
import agentsIcon from '../assets/Dashbaord-stats/total-agent.svg'
import GlobalTable from '../components/GlobalTable/GlobalTable'

const Dashboard = () => {
  // Sample data for the Recent Agents table
  const recentAgentsData = [
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

  // Column configuration for the Recent Agents table
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
      align: "start"
    },
    {
      title: "Average Score",
      key: "averageScore", 
      type: "default",
      align: "start"
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
      align: "start"
    }
  ];

  // Action handlers
  const handleView = (item) => {
    console.log("View agent:", item);
  };

  const handleEdit = (item) => {
    console.log("Edit agent:", item);
  };

  const handleDelete = (item) => {
    console.log("Delete agent:", item);
  };

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xl font-bold text-[#202224]">150</p>
              <p className="text-xs font-weight-400 text-[#757575]">Total Calls Analyzed</p>
            </div>
            <img src={callIcon} alt="total-calls-analyzed" className="w-12 h-12" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xl font-bold text-[#202224]">20</p>
              <p className="text-xs font-weight-400 text-[#757575]">Failed Calls</p>
            </div>
            <img src={missedCallsIcon} alt="total-calls-analyzed" className="w-12 h-12" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xl font-bold text-[#202224]">85%</p>
              <p className="text-xs font-weight-400 text-[#757575]">Average Call Quality Score</p>
            </div>
            <img src={callQualityIcon} alt="total-calls-analyzed" className="w-12 h-12" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xl font-bold text-[#202224]">4m 30s</p>
              <p className="text-xs font-weight-400 text-[#757575]">Average Call Duration</p>
            </div>
            <img src={callDurationIcon} alt="total-calls-analyzed" className="w-12 h-12" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xl font-bold text-[#202224]">25</p>
              <p className="text-xs font-weight-400 text-[#757575]">Total Agents</p>
            </div>
            <img src={agentsIcon} alt="total-calls-analyzed" className="w-12 h-12" />
          </div>
        </div>
      </div>

      {/* Recent Agents Table */}
      <div className="bg-white">
        <div className="px-6 py-4 bg-gray-50">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-[#202224]">Recent Agents</h2>
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
