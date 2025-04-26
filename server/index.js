import express from 'express';
import cors from 'cors';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3001;

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'https://localhost:5173'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type']
}));
app.use(express.json());

// Serve static files from the dist directory
app.use(express.static(path.join(__dirname, '../dist')));

// In-memory data store (replace with database in production)
let expenses = [
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

// API Routes
app.get('/api/expenses', (req, res) => {
  res.json(expenses);
});

app.post('/api/expenses', (req, res) => {
  const { amount, category, description, date } = req.body;
  
  // Validate request body
  if (!amount || !category || !description || !date) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  
  const newExpense = {
    id: uuidv4(),
    amount: Number(amount),
    category,
    description,
    date
  };
  
  expenses.push(newExpense);
  res.status(201).json(newExpense);
});

app.put('/api/expenses/:id', (req, res) => {
  const { id } = req.params;
  const { amount, category, description, date } = req.body;
  
  // Find the expense
  const expenseIndex = expenses.findIndex(exp => exp.id === id);
  
  if (expenseIndex === -1) {
    return res.status(404).json({ error: 'Expense not found' });
  }
  
  // Validate request body
  if (!amount || !category || !description || !date) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  
  // Update the expense
  expenses[expenseIndex] = {
    ...expenses[expenseIndex],
    amount: Number(amount),
    category,
    description,
    date
  };
  
  res.json(expenses[expenseIndex]);
});

app.delete('/api/expenses/:id', (req, res) => {
  const { id } = req.params;
  
  // Find the expense
  const expenseIndex = expenses.findIndex(exp => exp.id === id);
  
  if (expenseIndex === -1) {
    return res.status(404).json({ error: 'Expense not found' });
  }
  
  // Remove the expense
  expenses.splice(expenseIndex, 1);
  
  res.status(204).send();
});

// Handle client-side routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});