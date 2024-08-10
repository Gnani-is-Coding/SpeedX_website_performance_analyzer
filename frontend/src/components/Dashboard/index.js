import React from 'react';
import { Bar, Doughnut, Radar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
} from 'chart.js';

import './index.css'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler
);

function Dashboard({ data }) {
  console.log(data, "data")

  const barChartData = {
    labels: ['FCP', 'SI', 'LCP', 'TBT', 'CLS', 'TTI', 'FMP'],
    datasets: [
      {
        label: 'Performance Metrics',
        data: [
          parseFloat(data.firstContentfulPaint),
          parseFloat(data.speedIndex),
          parseFloat(data.largestContentfulPaint),
          parseFloat(data.totalBlockingTime),
          parseFloat(data.cumulativeLayoutShift),
          parseFloat(data.timeToInteractive),
          parseFloat(data.firstMeaningfulPaint),
        ],
        backgroundColor: [
          '#FF5733',
          '#FFC300',
          '#28B463',
          '#3498DB',
          '#AF7AC5',
          '#F1C40F',
          '#16A085',
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

  const radarChartData = {
    labels: ['Performance', 'Accessibility', 'Best Practices', 'SEO'],
    datasets: [
      {
        label: 'Scores',
        data: [
          data.performanceScore,
          data.accessibilityScore,
          data.bestPracticesScore,
          data.seoScore
        ],
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgb(54, 162, 235)',
        pointBackgroundColor: 'rgb(54, 162, 235)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgb(54, 162, 235)'
      }
    ]
  };

  const radarChartOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Lighthouse Scores'
      }
    },
    scales: {
      r: {
        angleLines: {
          display: false
        },
        suggestedMin: 0,
        suggestedMax: 100
      }
    }
  };

  return (
    <div className="Dashboard">
      <h2>Performance Dashboard</h2>

      <div className="charts">
        <div className="chart">
          <h3>Performance Metrics</h3>
          <Bar data={barChartData} options={barChartOptions} style={{marginBottom: '30px'}}/>

          <ul>
            <li className="li">First Contentful Paint (FCP)</li> 
            <li className="li">Speed Index (SI)</li> 
            <li className="li">Largest Contentful Paint (LCP)</li> 
            <li className="li">Total Blocking Time (TBT in ms)</li> 
            <li className="li">Cumulative Layout Shift (CLS)</li> 
            <li className="li">Time to Interactive (TTI)</li>
            <li className="li">First Meaningful Paint (FMP)</li>
          </ul>
        </div>
        <div className="chart">
          <h3>Performance Score</h3>
          <Doughnut data={doughnutChartData} options={doughnutChartOptions} />
        </div>
      </div>

      <div className="chart full-width">
        <h3>Lighthouse Scores</h3>
        <Radar data={radarChartData} options={radarChartOptions} />
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
        <div className="metric">
          <h4>Image Count</h4>
          <p>{data.imageCount}</p>
        </div>
        <div className="metric">
          <h4>Script Count</h4>
          <p>{data.scriptCount}</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;