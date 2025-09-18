import React from 'react';
import callIcon from '../../assets/Dashbaord-stats/call-icon.svg';
import callDurationIcon from '../../assets/Dashbaord-stats/call-duration.svg';
import missedCallsIcon from '../../assets/Dashbaord-stats/missed-call.svg';
import callQualityIcon from '../../assets/Dashbaord-stats/call-quality.svg';
import agentsIcon from '../../assets/Dashbaord-stats/total-agent.svg';

const ICON_MAP = {
  callIcon,
  callDurationIcon,
  missedCallsIcon,
  callQualityIcon,
  agentsIcon
};

const StatsCard = ({ value, label, icon, alt }) => (
  <div className="bg-white p-6 rounded-xl border border-gray-200">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-base sm:text-xl font-bold text-[#202224]">{value}</p>
        <p className="text-xs font-weight-400 text-[#757575]">{label}</p>
      </div>
      <img src={icon} alt={alt} className="md:w-12 w-8 md:h-12 h-8" />
    </div>
  </div>
);

const StatsSection = ({ statsData }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
    {statsData.map((stat) => (
      <StatsCard
        key={stat.id}
        value={stat.value}
        label={stat.label}
        icon={ICON_MAP[stat.icon]}
        alt={stat.alt}
      />
    ))}
  </div>
);

export default StatsSection;
