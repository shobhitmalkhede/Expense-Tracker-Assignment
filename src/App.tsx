import React, { useState, useEffect } from 'react';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import Dashboard from './components/Dashboard';
import Layout from './components/Layout';
import { Expense, ExpenseFormData } from './types';
import { fetchExpenses, createExpense, updateExpense, deleteExpense } from './services/api';
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddingExpense, setIsAddingExpense] = useState(false);
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);
  const [activeView, setActiveView] = useState<'dashboard' | 'expenses'>('dashboard');

  // Load expenses on component mount
  useEffect(() => {
    const loadExpenses = async () => {
      try {
        // For development/demo purposes, simulate data if the API is not available
        let data: Expense[] = [];
        
        try {
          data = await fetchExpenses();
        } catch (error) {
          console.log('Using sample data due to API error');
          
          // Sample data for demonstration
          data = [
            {
              id: '1',
              amount: 45.99,
              category: 'Food & Dining',
              description: 'Grocery shopping',
              date: '2023-04-15'
            },
            {
              id: '2',
              amount: 12.50,
              category: 'Transportation',
              description: 'Bus fare',
              date: '2023-04-12'
            },
            {
              id: '3',
              amount: 89.99,
              category: 'Entertainment',
              description: 'Concert tickets',
              date: '2023-04-05'
            },
            {
              id: '4',
              amount: 150,
              category: 'Housing',
              description: 'Electricity bill',
              date: '2023-04-02'
            },
            {
              id: '5',
              amount: 35.75,
              category: 'Healthcare',
              description: 'Pharmacy',
              date: '2023-03-28'
            }
          ];
        }
        
        setExpenses(data);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadExpenses();
  }, []);

  // Handle adding a new expense
  const handleAddExpense = async (formData: ExpenseFormData) => {
    try {
      // Optimistic update
      const newExpense: Expense = {
        id: uuidv4(),
        ...formData
      };
      
      setExpenses(prev => [...prev, newExpense]);
      setIsAddingExpense(false);
      
      // API call
      const result = await createExpense(formData);
      
      if (!result) {
        // Revert if failed
        setExpenses(prev => prev.filter(exp => exp.id !== newExpense.id));
        alert('Failed to add expense. Please try again.');
      }
    } catch (error) {
      console.error('Error adding expense:', error);
      alert('Failed to add expense. Please try again.');
    }
  };

  // Handle updating an existing expense
  const handleUpdateExpense = async (formData: ExpenseFormData) => {
    if (!editingExpense) return;
    
    try {
      // Optimistic update
      const updatedExpense = { ...editingExpense, ...formData };
      
      setExpenses(prev => 
        prev.map(exp => exp.id === editingExpense.id ? updatedExpense : exp)
      );
      setEditingExpense(null);
      
      // API call
      const result = await updateExpense(editingExpense.id, formData);
      
      if (!result) {
        // Revert if failed
        setExpenses(prev => 
          prev.map(exp => exp.id === editingExpense.id ? editingExpense : exp)
        );
        alert('Failed to update expense. Please try again.');
      }
    } catch (error) {
      console.error('Error updating expense:', error);
      alert('Failed to update expense. Please try again.');
    }
  };

  // Handle deleting an expense
  const handleDeleteExpense = async (id: string) => {
    // Store the expense being deleted in case we need to restore it
    const expenseToDelete = expenses.find(exp => exp.id === id);
    if (!expenseToDelete) return;
    
    try {
      // Optimistic update
      setExpenses(prev => prev.filter(exp => exp.id !== id));
      
      // API call
      const success = await deleteExpense(id);
      
      if (!success) {
        // Revert if failed
        setExpenses(prev => [...prev, expenseToDelete]);
        alert('Failed to delete expense. Please try again.');
      }
    } catch (error) {
      console.error('Error deleting expense:', error);
      alert('Failed to delete expense. Please try again.');
    }
  };

  const handleEditExpense = (expense: Expense) => {
    setEditingExpense(expense);
  };

  return (
    <Layout 
      onAddExpense={() => setIsAddingExpense(true)}
      activeView={activeView}
      onChangeView={setActiveView}
    >
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <>
          {isAddingExpense && (
            <div className="mb-8">
              <ExpenseForm 
                onSubmit={handleAddExpense} 
                onCancel={() => setIsAddingExpense(false)} 
              />
            </div>
          )}
          
          {editingExpense && (
            <div className="mb-8">
              <ExpenseForm 
                initialData={editingExpense} 
                onSubmit={handleUpdateExpense} 
                onCancel={() => setEditingExpense(null)} 
              />
            </div>
          )}
          
          {activeView === 'dashboard' ? (
            <Dashboard expenses={expenses} />
          ) : (
            <ExpenseList 
              expenses={expenses} 
              onEditExpense={handleEditExpense} 
              onDeleteExpense={handleDeleteExpense} 
            />
          )}
        </>
      )}
    </Layout>
  );
}

export default App;