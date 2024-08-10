
import React, { useState } from 'react';
import { Bar, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import './index.css' 

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

function Dashboard({ data }) {

  const barChartData = {
    labels: ['FCP', 'SI', 'LCP', 'TBT', 'CLS'],
    datasets: [
      {
        label: 'Performance Metrics',
        data: [
          parseFloat(data.firstContentfulPaint),
          parseFloat(data.speedIndex),
          parseFloat(data.largestContentfulPaint),
          parseFloat(data.totalBlockingTime),
          parseFloat(data.cumulativeLayoutShift),
        ],
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
        ],
      },
    ],
  };

  const doughnutChartData = {
    labels: ['Performance Score', 'Remaining'],
    datasets: [
      {
        data: [data.performanceScore, 100 - data.performanceScore],
        backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(211, 211, 211, 0.6)'],
      },
    ],
  };

  return (
    <div className="Dashboard">
        <h2>Performance Dashboard</h2>
        <div className="charts">
          <div className="chart">
            <h3>Performance Metrics</h3>
            <Bar data={barChartData} />
          </div>
          <div className="chart">
            <h3>Performance Score</h3>
            <Doughnut data={doughnutChartData} />
          </div>
        </div>
        <div className="metrics">
          <div className="metric">
            <h4>Total Requests</h4>
            <p>{data.totalRequests}</p>
          </div>
          <div className="metric">
            <h4>Page Size</h4>
            <p>{data.pageSize} KB</p>
          </div>
        </div>
      </div>
  );
}

export default Dashboard;