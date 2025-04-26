import React from 'react';
import { Expense } from '../types';
import { format, parse } from 'date-fns';
import { Pencil, Trash2 } from 'lucide-react';

interface ExpenseItemProps {
  expense: Expense;
  onEdit: (expense: Expense) => void;
  onDelete: (id: string) => void;
}

// Category-based background colors
const getCategoryColor = (category: string): string => {
  const colors: Record<string, string> = {
    'Food & Dining': 'bg-blue-100 text-blue-800',
    'Transportation': 'bg-green-100 text-green-800',
    'Housing': 'bg-purple-100 text-purple-800',
    'Entertainment': 'bg-yellow-100 text-yellow-800',
    'Utilities': 'bg-indigo-100 text-indigo-800',
    'Healthcare': 'bg-red-100 text-red-800',
    'Shopping': 'bg-pink-100 text-pink-800',
    'Travel': 'bg-cyan-100 text-cyan-800',
    'Education': 'bg-teal-100 text-teal-800',
  };
  
  return colors[category] || 'bg-gray-100 text-gray-800';
};

const ExpenseItem: React.FC<ExpenseItemProps> = ({ expense, onEdit, onDelete }) => {
  const { id, amount, category, description, date } = expense;
  
  // Format date for display
  const formattedDate = format(
    parse(date, 'yyyy-MM-dd', new Date()),
    'MMM dd, yyyy'
  );
  
  // Format amount as currency
  const formattedAmount = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);

  return (
    <div className="bg-white rounded-lg shadow p-4 mb-3 hover:shadow-md transition-shadow duration-200 border border-gray-100">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div className="flex-1">
          <div className="flex items-center mb-2">
            <span className={`px-2 py-1 text-xs rounded-full ${getCategoryColor(category)}`}>
              {category}
            </span>
            <span className="text-gray-500 text-sm ml-2">{formattedDate}</span>
          </div>
          
          <h3 className="font-medium text-gray-900">{description}</h3>
        </div>
        
        <div className="flex items-center gap-3">
          <span className="font-semibold text-lg">{formattedAmount}</span>
          
          <div className="flex gap-1">
            <button 
              onClick={() => onEdit(expense)}
              className="p-1.5 rounded-full hover:bg-gray-100 text-gray-600 hover:text-blue-500 transition-colors"
              aria-label="Edit expense"
            >
              <Pencil size={18} />
            </button>
            
            <button 
              onClick={() => onDelete(id)}
              className="p-1.5 rounded-full hover:bg-gray-100 text-gray-600 hover:text-red-500 transition-colors"
              aria-label="Delete expense"
            >
              <Trash2 size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpenseItem;