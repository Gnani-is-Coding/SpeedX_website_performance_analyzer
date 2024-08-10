import React from 'react';
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
  console.log(data, "data")

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
          '#FF5733',
          '#FFC300',
          '#28B463',
          '#3498DB',
          '#AF7AC5',
        ],
      },
    ],
  };

  const barChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Website Performance Metrics',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Time (seconds)',
        },
      },
      x: {
        title: {
          display: true,
          text: 'Metrics',
        },
      },
    },
  };

  const doughnutChartData = {
    labels: ['Performance Score'],
    datasets: [
      {
        data: [data.performanceScore, 100 - data.performanceScore],
        backgroundColor: ['#4CAF50', '#F44336'],
      },
    ],
  };

  const doughnutChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
      },
      title: {
        display: true,
        text: 'Overall Performance Score',
      },
    },
  };

  return (
    <div className="Dashboard">
      <h2>Performance Dashboard</h2>

      <div className="charts">
        <div className="chart">
          <h3>Performance Metrics</h3>
          <Bar data={barChartData} options={barChartOptions} style={{marginBottom: '30px'}}/>

          <ul>
            <li className="li">First Contentful Paint (FCP in s)</li> 
            <li className="li">Speed Index (SI in s)</li> 
            <li className="li">Largest Contentful Paint (LCP in s)</li> 
            <li className="li">Total Blocking Time (TBT in ms)</li> 
            <li className="li">Cumulative Layout Shift (CLS)</li> 
          </ul>
        </div>
        <div className="chart">
          <h3>Performance Score</h3>
          <Doughnut data={doughnutChartData} options={doughnutChartOptions} />
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