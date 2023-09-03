import React from 'react';
import { Line, Bar, Radar, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  Tooltip,
  PointElement,
  LineElement,
  ArcElement,
  ChartOptions,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  ArcElement
);

interface LineChartProps {
    data: number[] | undefined;
    labels: string[] | undefined;
    backgroundColor?: string | string[];
    label?: string;
    xAxisLabel?: string;
    yAxisLabel?: string;
    chartType: 'line' | 'bar' | 'doughnut';
    options?: ChartOptions;
  }
  
  const LineChart: React.FC<LineChartProps> = ({ data, labels, backgroundColor = 'purple', label = 'Data Label', xAxisLabel, yAxisLabel, chartType, options }) => {
    const chartData = {
      labels: labels,
      datasets: [
        {
          label: label,
          data: data,
          backgroundColor: backgroundColor,
        },
      ],
    };   
  
    const chartOptions = {
        scales: {
          x: {
            title: {
              display: xAxisLabel ? true : false,
              text: xAxisLabel
            }
          },
          y: {
            title: {
              display: yAxisLabel ? true : false,
              text: yAxisLabel
            }
          }
        }
      };

      const renderChart = () => {
        switch (chartType) {
          case 'line':
            return <Line data={chartData} options={chartOptions} />;
          case 'bar':
            return <Bar data={chartData} options={chartOptions} />;
          case 'doughnut':
            return <Doughnut data={chartData} options={{...chartOptions, ...options} as any} />;
          default:
            return <p>Invalid chart type</p>;
        }
      };
  
      return (
        <div className="max-w-[500px] max-h-[500px]">
          { data && labels ? renderChart() : <p>No data available</p>}
        </div>
      );
  };
  
  export default LineChart;
  
