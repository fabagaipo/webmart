import React, { useState } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import { FiRefreshCw, FiDownload } from 'react-icons/fi';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title as ChartTitle,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  ChartTitle,
  Tooltip,
  Legend
);

const StoreAnalytics = () => {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const monthlySalesData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [
      {
        label: 'Monthly Sales (₱)',
        data: [6500, 5900, 8000, 8100, 5600, 7500, 9000],
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };

  const salesTrendData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
      {
        label: 'Weekly Sales Trend (₱)',
        data: [1200, 1900, 1500, 2500],
        fill: false,
        borderColor: 'rgba(75, 192, 192, 1)',
        tension: 0.4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1000);
  };

  const handleDownloadReport = () => {
    console.log('Downloading report...');
  };

  return (
    <div className="min-h-screen bg-gray-50 w-full overflow-x-hidden">
      <div className="w-full max-w-7xl mx-auto px-2 sm:px-4 lg:px-6 py-4 sm:py-6">
        {/* Analytics Header */}
        <div className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl p-4 sm:p-6 text-white mb-6 sm:mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">Store Analytics</h1>
              <p className="text-cyan-100 mt-1">Track your store's performance and sales</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={handleRefresh}
                disabled={isRefreshing}
                className="flex items-center gap-2 px-5 py-2.5 !bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-300 rounded-lg font-medium text-sm border border-white/20"
              >
                <FiRefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
                {isRefreshing ? 'Refreshing...' : 'Refresh Data'}
              </button>
              <button
                onClick={handleDownloadReport}
                className="flex items-center gap-2 px-5 py-2.5 !bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-300 rounded-lg font-medium text-sm border border-white/20"
              >
                <FiDownload className="w-4 h-4" />
                Download Report
              </button>
            </div>
          </div>
        </div>

        {/* Analytics Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4">Monthly Sales</h2>
            <div className="h-64">
              <Bar data={monthlySalesData} options={chartOptions} />
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4">Sales Trend</h2>
            <div className="h-64">
              <Line data={salesTrendData} options={chartOptions} />
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Revenue Trend (Last 30 Days)</h2>
          <div className="h-96 md:h-64">
            <Line 
              data={{
                labels: Array.from({length: 30}, (_, i) => {
                  const date = new Date();
                  date.setDate(date.getDate() - (29 - i));
                  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
                }),
                datasets: [{
                  label: 'Daily Revenue',
                  data: Array.from({length: 30}, () => Math.floor(Math.random() * 1000) + 500), // Random data for demo
                  borderColor: 'rgba(59, 130, 246, 1)',
                  backgroundColor: 'rgba(59, 130, 246, 0.1)',
                  tension: 0.3,
                  fill: true
                }]
              }}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    display: false
                  }
                },
                scales: {
                  x: {
                    grid: {
                      display: false
                    }
                  },
                  y: {
                    beginAtZero: true,
                    grid: {
                      borderDash: [5, 5]
                    },
                    ticks: {
                      callback: function(value) {
                        return '₱' + value.toLocaleString();
                      }
                    }
                  }
                }
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreAnalytics;
