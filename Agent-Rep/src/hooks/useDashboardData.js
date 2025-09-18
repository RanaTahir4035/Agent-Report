import { useMemo } from 'react';
import { STATS_CONFIG } from '../constants/dashboardConstants';

export const useDashboardData = (usersData) => {
  const statsData = useMemo(() => {
    return STATS_CONFIG.map(stat => {
      const calculatedValue = stat.calculate(usersData);
      const value = calculatedValue !== null ? calculatedValue : stat.fallback;
      const formattedValue = stat.format ? stat.format(value) : value;
      
      return {
        ...stat,
        value: formattedValue
      };
    });
  }, [usersData]);

  return {
    statsData,
    recentAgentsData: usersData || []
  };
};
