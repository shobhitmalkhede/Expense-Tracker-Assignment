import React, { useState, useEffect } from 'react';
import { ExpenseFormData, Expense } from '../types';

interface ExpenseFormProps {
  onSubmit: (data: ExpenseFormData) => void;
  initialData?: Expense;
  onCancel: () => void;
}

// Common expense categories
const CATEGORIES = [
  'Food & Dining',
  'Transportation',
  'Housing',
  'Entertainment',
  'Utilities',
  'Healthcare',
  'Shopping',
  'Travel',
  'Education',
  'Other',
];

const ExpenseForm: React.FC<ExpenseFormProps> = ({ 
  onSubmit, 
  initialData, 
  onCancel 
}) => {
  const [formData, setFormData] = useState<ExpenseFormData>({
    amount: 0,
    category: '',
    description: '',
    date: new Date().toISOString().split('T')[0], // Today's date in YYYY-MM-DD format
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        amount: initialData.amount,
        category: initialData.category,
        description: initialData.description,
        date: initialData.date,
      });
    }
  }, [initialData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: name === 'amount' ? parseFloat(value) || 0 : value }));
    
    // Clear error for this field if it exists
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (formData.amount <= 0) {
      newErrors.amount = 'Amount must be greater than zero';
    }
    
    if (!formData.category) {
      newErrors.category = 'Category is required';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }
    
    if (!formData.date) {
      newErrors.date = 'Date is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className="bg-white rounded-lg shadow-md p-6 max-w-md w-full mx-auto transition-all duration-300 ease-in-out"
    >
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">
        {initialData ? 'Edit Expense' : 'Add New Expense'}
      </h2>
      
      <div className="mb-4">
        <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
          Amount ($)
        </label>
        <input
          type="number"
          id="amount"
          name="amount"
          value={formData.amount || ''}
          onChange={handleChange}
          step="0.01"
          min="0"
          className={`w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
            errors.amount ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {errors.amount && (
          <p className="mt-1 text-sm text-red-500">{errors.amount}</p>
        )}
      </div>
      
      <div className="mb-4">
        <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
          Category
        </label>
        <select
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          className={`w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
            errors.category ? 'border-red-500' : 'border-gray-300'
          }`}
        >
          <option value="">Select a category</option>
          {CATEGORIES.map(category => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        {errors.category && (
          <p className="mt-1 text-sm text-red-500">{errors.category}</p>
        )}
      </div>
      
      <div className="mb-4">
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={3}
          className={`w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
            errors.description ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {errors.description && (
          <p className="mt-1 text-sm text-red-500">{errors.description}</p>
        )}
      </div>
      
      <div className="mb-6">
        <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
          Date
        </label>
        <input
          type="date"
          id="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className={`w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
            errors.date ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {errors.date && (
          <p className="mt-1 text-sm text-red-500">{errors.date}</p>
        )}
      </div>
      
      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
        >
          {initialData ? 'Update' : 'Add'} Expense
        </button>
      </div>
    </form>
  );
};

export default ExpenseForm;