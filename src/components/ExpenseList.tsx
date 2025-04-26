import React, { useState } from 'react';
import { Expense } from '../types';
import ExpenseItem from './ExpenseItem';
import { Search, Filter } from 'lucide-react';

interface ExpenseListProps {
  expenses: Expense[];
  onEditExpense: (expense: Expense) => void;
  onDeleteExpense: (id: string) => void;
}

const ExpenseList: React.FC<ExpenseListProps> = ({ 
  expenses, 
  onEditExpense, 
  onDeleteExpense 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  
  // Extract unique categories from expenses
  const categories = Array.from(
    new Set(expenses.map(expense => expense.category))
  ).sort();
  
  // Filter expenses based on search term and category filter
  const filteredExpenses = expenses.filter(expense => {
    const matchesSearch = expense.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          expense.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === '' || expense.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });
  
  // Sort expenses by date (most recent first)
  const sortedExpenses = [...filteredExpenses].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Your Expenses</h2>
      
      {/* Search and filter */}
      <div className="flex flex-col md:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search expenses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        
        <div className="relative md:w-64">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Filter size={18} className="text-gray-400" />
          </div>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="pl-10 w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none"
          >
            <option value="">All Categories</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
      </div>
      
      {/* Display expenses or empty state */}
      {sortedExpenses.length > 0 ? (
        <div className="space-y-3">
          {sortedExpenses.map(expense => (
            <ExpenseItem
              key={expense.id}
              expense={expense}
              onEdit={onEditExpense}
              onDelete={onDeleteExpense}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="text-gray-500">
            {expenses.length > 0 
              ? 'No expenses match your search criteria.' 
              : 'You haven\'t added any expenses yet.'}
          </p>
        </div>
      )}
    </div>
  );
};

export default ExpenseList;