// ProgressChart.js
import React from 'react';
import Chart from 'react-apexcharts';

const ProgressChart = () => {
  const options = {
    chart: {
      type: 'area',
      height: 350,
      toolbar: {
        show: false,
      },
    },
    xaxis: {
      categories: [
        'Jul', 'Jul', 'Aug', 'Aug', 'Sep', 'Sep',
        'Oct', 'Oct', 'Nov', 'Nov', 'Dec', 'Dec'
      ],
      labels: {
        rotate: -45
      }
    },
    yaxis: {
      min: 0,
      max: 10,
      tickAmount: 5
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.4,
        opacityTo: 0.1,
        stops: [0, 90, 100]
      }
    },
    stroke: {
      curve: 'straight',
      width: 2
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return val.toFixed(1);
        }
      }
    },
    title: {
      text: 'Progress Bar',
      align: 'left'
    }
  };

  const series = [
    {
      name: 'Progress',
      data: [7, 9, 8, 7.5, 6.8, 7.5, 9.3, 8.2, 9.3, 8.1, 7.2, 6.9],
      color: '#298F84'
    }
  ];

  return (
    <div className="progress-chart">
      <Chart options={options} series={series} type="area" height={350} />
    </div>
  );
};

export default ProgressChart;
