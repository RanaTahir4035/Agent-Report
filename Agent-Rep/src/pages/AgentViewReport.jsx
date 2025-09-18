import React from 'react';
import ProgressChart from '../ProgressChart/ProgressChart';
import GlobalTable from '../components/GlobalTable/GlobalTable';
import eyeIcon from '../assets/Action-icons/eye-icon.svg';
import removeIcon from '../assets/Action-icons/remove-icon.svg';
import { useNavigate } from 'react-router-dom';
const AgentViewReport = () => {
  const navigate = useNavigate();
  const callsData = [
    {
      id: 'CALL-001',
      duration: '5:00',
      score: 9,
      status: 'Excellent'
    },
    {
      id: 'CALL-002', 
      duration: '3:45',
      score: 8,
      status: 'Good'
    },
    {
      id: 'CALL-003',
      duration: '7:20',
      score: 9,
      status: 'Excellent'
    },
    {
      id: 'CALL-004',
      duration: '4:15',
      score: 7,
      status: 'Good'
    }
  ];

  const callsColumns = [
    {
      key: 'id',
      title: 'Call ID',
      align: 'start'
    },
    {
      key: 'duration',
      title: 'Call Duration',
      align: 'start'
    },
    {
      key: 'score',
      title: 'Score',
      align: 'start'
    },
    {
      key: 'status',
      title: 'Status',
      type: 'badge',
      badgeClass: (value) => {
        switch(value) {
          case 'Excellent':
            return 'bg-[#34C759] text-white w-[86px] text-center';
          case 'Good':
            return 'bg-[#007AFF] text-white w-[86px] text-center';
          case 'Average':
            return 'bg-[#FFCC00] text-white w-[86px] text-center';
          case 'Poor':
            return 'bg-red-100 text-red-800 w-[86px] text-center';
          default:
            return 'bg-gray-100 text-gray-800 w-[86px] text-center';
        }
      },
      align: 'start'
    },
    {
      key: 'actions',
      title: 'Action',
      type: 'actions',
      actions: [
        {
          icon: eyeIcon,
          alt: 'View',
          onClick: (item) => navigate(`/agent-call-details/${item.id}`),
          className: 'text-gray-600 hover:text-gray-900'
        },
        {
          icon: removeIcon,
          alt: 'Delete',
          onClick: (item) => console.log('Delete call:', item.id),
          className: 'text-red-600 hover:text-red-900'
        }
      ],
      align: 'start'
    }
  ];

  return ( 
  <div>
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-base font-semibold text-[#202224]">Agent Name</p>
              <p className="text-base font-weight-400 text-[#202224] mt-1">Total Calls Analyzed</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-base font-semibold text-[#202224]">Total Calls</p>
              <p className="text-base font-weight-400 text-[#202224] mt-1">Failed Calls</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-base font-semibold text-[#202224]">Successful Calls</p>
              <p className="text-base font-weight-400 text-[#202224] mt-1">Average Call Quality Score</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-base font-semibold text-[#202224]">Failed Calls</p>
              <p className="text-base font-weight-400 text-[#202224] mt-1">Average Call Duration</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-base font-semibold text-[#202224]">Average Score</p>
              <p className="text-base font-weight-400 text-[#202224] mt-1">Total Agents</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-base font-semibold text-[#202224]">Average Call Duration</p>
                <p className="text-base font-weight-400 text-[#202224] mt-1">Total Agents</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-base font-semibold text-[#202224]">Status</p>
              <p className="text-xs font-weight-400 bg-[#34C759] text-white w-[86px] text-center rounded-full py-1">Excellent</p>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-8 p-6 bg-white">
      <ProgressChart />
      </div>
      <div className="bg-white">
        <div className="px-6 py-4 bg-gray-50">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-[#202224]">Calls</h2>
            <a href="#" className="text-[#298F84] font-medium">View all</a>
          </div>
        </div>
        <GlobalTable 
          data={callsData}
          columns={callsColumns}
          showActions={false}
        />
      </div>
   
    </div>
  );
};

export default AgentViewReport;