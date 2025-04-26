import axios from 'axios';
import { Expense, ExpenseFormData } from '../types';

const API_URL = 'http://localhost:3001/api';

export const fetchExpenses = async (): Promise<Expense[]> => {
  try {
    const response = await axios.get(`${API_URL}/expenses`);
    return response.data;
  } catch (error) {
    console.error('Error fetching expenses:', error);
    return [];
  }
};

export const createExpense = async (expense: ExpenseFormData): Promise<Expense | null> => {
  try {
    const response = await axios.post(`${API_URL}/expenses`, expense);
    return response.data;
  } catch (error) {
    console.error('Error creating expense:', error);
    return null;
  }
};

export const updateExpense = async (id: string, expense: ExpenseFormData): Promise<Expense | null> => {
  try {
    const response = await axios.put(`${API_URL}/expenses/${id}`, expense);
    return response.data;
  } catch (error) {
    console.error('Error updating expense:', error);
    return null;
  }
};

export const deleteExpense = async (id: string): Promise<boolean> => {
  try {
    await axios.delete(`${API_URL}/expenses/${id}`);
    return true;
  } catch (error) {
    console.error('Error deleting expense:', error);
    return false;
  }
};