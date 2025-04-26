import React from 'react';
import { Expense, CategoryTotal, MonthlyTotal } from '../types';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';
import { getCategoryChartData, getMonthlyChartData, getCategoryData, getMonthlyData } from '../utils/chartUtils';

// Register ChartJS components
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

interface DashboardProps {
  expenses: Expense[];
}

const Dashboard: React.FC<DashboardProps> = ({ expenses }) => {
  // Prepare chart data
  const categoryData = getCategoryData(expenses);
  const monthlyData = getMonthlyData(expenses);
  
  // Calculate total expenses
  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  
  // Format for display
  const formattedTotal = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(totalExpenses);
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Spending Dashboard</h2>
      
      {expenses.length > 0 ? (
        <>
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-2 text-gray-700">Total Spending</h3>
            <p className="text-3xl font-bold text-blue-600">{formattedTotal}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Category breakdown */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-medium mb-4 text-gray-700">Spending by Category</h3>
              <div className="h-64">
                <Pie 
                  data={getCategoryChartData(expenses)} 
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        position: 'right',
                        labels: {
                          boxWidth: 15,
                          font: {
                            size: 12
                          }
                        }
                      }
                    }
                  }}
                />
              </div>
              
              <div className="mt-4 max-h-40 overflow-y-auto">
                <table className="min-w-full text-sm">
                  <thead>
                    <tr>
                      <th className="text-left py-2">Category</th>
                      <th className="text-right py-2">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {categoryData.map((item) => (
                      <tr key={item.category}>
                        <td className="py-1.5">
                          <div className="flex items-center">
                            <span
                              className="w-3 h-3 rounded-full mr-2"
                              style={{ backgroundColor: item.color }}
                            ></span>
                            {item.category}
                          </div>
                        </td>
                        <td className="text-right py-1.5">
                          {new Intl.NumberFormat('en-US', {
                            style: 'currency',
                            currency: 'USD',
                          }).format(item.total)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            
            {/* Monthly breakdown */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-medium mb-4 text-gray-700">Monthly Spending</h3>
              <div className="h-64">
                <Bar 
                  data={getMonthlyChartData(expenses)} 
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        display: false,
                      },
                    },
                    scales: {
                      x: {
                        grid: {
                          display: false,
                        },
                      },
                      y: {
                        beginAtZero: true,
                        ticks: {
                          callback: (value) => {
                            return '$' + value;
                          },
                        },
                      },
                    },
                  }}
                />
              </div>
              
              <div className="mt-4 max-h-40 overflow-y-auto">
                <table className="min-w-full text-sm">
                  <thead>
                    <tr>
                      <th className="text-left py-2">Month</th>
                      <th className="text-right py-2">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {monthlyData.map((item) => (
                      <tr key={item.month}>
                        <td className="py-1.5">{item.month}</td>
                        <td className="text-right py-1.5">
                          {new Intl.NumberFormat('en-US', {
                            style: 'currency',
                            currency: 'USD',
                          }).format(item.total)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="text-center py-10">
          <p className="text-gray-500 mb-2">No expense data to display</p>
          <p className="text-sm text-gray-400">Add some expenses to see your spending analytics</p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;