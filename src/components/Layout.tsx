import React, { useState } from 'react';
import { PlusCircle, LayoutDashboard, ListOrdered, DollarSign } from 'lucide-react';

interface LayoutProps {
  onAddExpense: () => void;
  activeView: 'dashboard' | 'expenses';
  onChangeView: (view: 'dashboard' | 'expenses') => void;
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ 
  onAddExpense, 
  activeView, 
  onChangeView, 
  children 
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <DollarSign className="h-8 w-8 text-blue-500" />
              <h1 className="ml-2 text-xl font-bold text-gray-900">ExpenseTracker</h1>
            </div>
            
            <div className="hidden md:flex space-x-4">
              <button
                onClick={() => onChangeView('dashboard')}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  activeView === 'dashboard'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-100'
                } transition-colors`}
              >
                <span className="flex items-center">
                  <LayoutDashboard className="mr-1.5 h-4 w-4" />
                  Dashboard
                </span>
              </button>
              
              <button
                onClick={() => onChangeView('expenses')}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  activeView === 'expenses'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-100'
                } transition-colors`}
              >
                <span className="flex items-center">
                  <ListOrdered className="mr-1.5 h-4 w-4" />
                  Expenses
                </span>
              </button>
              
              <button
                onClick={onAddExpense}
                className="ml-3 px-4 py-2 rounded-md text-sm font-medium bg-blue-500 text-white hover:bg-blue-600 transition-colors"
              >
                <span className="flex items-center">
                  <PlusCircle className="mr-1.5 h-4 w-4" />
                  Add Expense
                </span>
              </button>
            </div>
            
            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={toggleMobileMenu}
                className="p-2 rounded-md text-gray-600 hover:bg-gray-100 focus:outline-none"
              >
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d={isMobileMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200 shadow-lg">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <button
                onClick={() => {
                  onChangeView('dashboard');
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full px-3 py-2 rounded-md text-sm font-medium text-left ${
                  activeView === 'dashboard'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <span className="flex items-center">
                  <LayoutDashboard className="mr-2 h-5 w-5" />
                  Dashboard
                </span>
              </button>
              
              <button
                onClick={() => {
                  onChangeView('expenses');
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full px-3 py-2 rounded-md text-sm font-medium text-left ${
                  activeView === 'expenses'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <span className="flex items-center">
                  <ListOrdered className="mr-2 h-5 w-5" />
                  Expenses
                </span>
              </button>
              
              <button
                onClick={() => {
                  onAddExpense();
                  setIsMobileMenuOpen(false);
                }}
                className="w-full px-3 py-2 rounded-md text-sm font-medium bg-blue-500 text-white hover:bg-blue-600"
              >
                <span className="flex items-center">
                  <PlusCircle className="mr-2 h-5 w-5" />
                  Add Expense
                </span>
              </button>
            </div>
          </div>
        )}
      </header>
      
      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
      
      {/* Floating action button on mobile */}
      <div className="md:hidden fixed right-6 bottom-6">
        <button
          onClick={onAddExpense}
          className="h-14 w-14 rounded-full bg-blue-500 text-white shadow-lg hover:bg-blue-600 transition-colors flex items-center justify-center"
          aria-label="Add expense"
        >
          <PlusCircle className="h-7 w-7" />
        </button>
      </div>
    </div>
  );
};

export default Layout;