// Dashboard constants and configuration
export const DASHBOARD_CONFIG = {
  PAGINATION: {
    DEFAULT_PAGE: 1,
    ITEMS_PER_PAGE: 5
  },
  
  FALLBACK_VALUES: {
    TOTAL_AGENTS: 25,
    TOTAL_CALLS: 150,
    AVERAGE_SCORE: 85,
    FAILED_CALLS: 20,
    CALL_DURATION: "4m 30s"
  }
};

export const STATS_CONFIG = [
  {
    id: 'totalCalls',
    label: 'Total Calls Analyzed',
    icon: 'callIcon',
    alt: 'total-calls-analyzed',
    fallback: DASHBOARD_CONFIG.FALLBACK_VALUES.TOTAL_CALLS,
    calculate: (data) => data ? data.reduce((sum, agent) => sum + agent.totalCalls, 0) : null
  },
  {
    id: 'failedCalls',
    label: 'Failed Calls',
    icon: 'missedCallsIcon',
    alt: 'failed-calls',
    fallback: DASHBOARD_CONFIG.FALLBACK_VALUES.FAILED_CALLS,
    calculate: (data) => data ? data.filter(agent => agent.status === 'Average').length : null
  },
  {
    id: 'averageScore',
    label: 'Average Call Quality Score',
    icon: 'callQualityIcon',
    alt: 'call-quality',
    fallback: DASHBOARD_CONFIG.FALLBACK_VALUES.AVERAGE_SCORE,
    calculate: (data) => {
      if (!data || data.length === 0) return null;
      return Math.round(data.reduce((sum, agent) => sum + agent.averageScore, 0) / data.length);
    },
    format: (value) => `${value}/10`
  },
  {
    id: 'callDuration',
    label: 'Average Call Duration',
    icon: 'callDurationIcon',
    alt: 'call-duration',
    fallback: DASHBOARD_CONFIG.FALLBACK_VALUES.CALL_DURATION,
    calculate: () => null, 
    format: (value) => value
  },
  {
    id: 'totalAgents',
    label: 'Total Agents',
    icon: 'agentsIcon',
    alt: 'total-agents',
    fallback: DASHBOARD_CONFIG.FALLBACK_VALUES.TOTAL_AGENTS,
    calculate: (data) => data ? data.length : null
  }
];


export const AGENTS_TABLE_COLUMNS = [
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
