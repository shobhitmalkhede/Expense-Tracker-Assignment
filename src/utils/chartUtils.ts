import { format, parse } from 'date-fns';
import { Expense, CategoryTotal, MonthlyTotal } from '../types';

const COLORS = [
  '#3B82F6', // blue-500
  '#10B981', // emerald-500
  '#F59E0B', // amber-500
  '#EF4444', // red-500
  '#8B5CF6', // violet-500
  '#EC4899', // pink-500
  '#06B6D4', // cyan-500
  '#F97316', // orange-500
];

export const getCategoryData = (expenses: Expense[]): CategoryTotal[] => {
  // Group expenses by category and sum amounts
  const categoryMap = expenses.reduce<Record<string, number>>((acc, expense) => {
    const { category, amount } = expense;
    acc[category] = (acc[category] || 0) + amount;
    return acc;
  }, {});

  // Convert to array and assign colors
  return Object.entries(categoryMap).map(([category, total], index) => ({
    category,
    total,
    color: COLORS[index % COLORS.length],
  }));
};

export const getMonthlyData = (expenses: Expense[]): MonthlyTotal[] => {
  // Group expenses by month and sum amounts
  const monthlyMap = expenses.reduce<Record<string, number>>((acc, expense) => {
    const date = parse(expense.date, 'yyyy-MM-dd', new Date());
    const monthKey = format(date, 'yyyy-MM');
    acc[monthKey] = (acc[monthKey] || 0) + expense.amount;
    return acc;
  }, {});

  // Convert to array and sort by month
  return Object.entries(monthlyMap)
    .map(([monthKey, total]) => {
      const date = parse(monthKey, 'yyyy-MM', new Date());
      return {
        month: format(date, 'MMM yyyy'),
        total,
        rawMonth: monthKey, // Keep for sorting
      };
    })
    .sort((a, b) => (a as any).rawMonth.localeCompare((b as any).rawMonth))
    .map(({ month, total }) => ({ month, total }));
};

export const getCategoryChartData = (expenses: Expense[]) => {
  const categoryData = getCategoryData(expenses);
  
  return {
    labels: categoryData.map(item => item.category),
    datasets: [
      {
        data: categoryData.map(item => item.total),
        backgroundColor: categoryData.map(item => item.color),
        borderWidth: 1,
      },
    ],
  };
};

export const getMonthlyChartData = (expenses: Expense[]) => {
  const monthlyData = getMonthlyData(expenses);
  
  return {
    labels: monthlyData.map(item => item.month),
    datasets: [
      {
        label: 'Monthly Expenses',
        data: monthlyData.map(item => item.total),
        backgroundColor: '#3B82F6',
        borderColor: '#2563EB',
        borderWidth: 1,
      },
    ],
  };
};