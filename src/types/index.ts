export interface Expense {
  id: string;
  amount: number;
  category: string;
  description: string;
  date: string;
}

export interface ExpenseFormData {
  amount: number;
  category: string;
  description: string;
  date: string;
}

export type CategoryTotal = {
  category: string;
  total: number;
  color: string;
};

export type MonthlyTotal = {
  month: string;
  total: number;
};