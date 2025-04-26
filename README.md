# Expense Tracker Application

A full-stack expense tracking application built with React, Express, and Node.js. This application allows users to add, edit, and delete expenses, as well as visualize their spending patterns through interactive charts.

## Features

- Add, edit, and delete expense records
- Categorize expenses with predefined categories
- Filter and search functionality
- Visual dashboard with pie and bar charts for expense analysis
- Responsive design for all devices
- Real-time data updates

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v18 or higher)
- npm (Node Package Manager)

## Installation

1. Clone the repository
```bash
git clone <repository-url>
cd expense-tracker
```

2. Install dependencies
```bash
npm install
```

## Running the Application

1. Start the backend server
```bash
npm run server
```
The server will run on http://localhost:3001

2. In a new terminal, start the frontend development server
```bash
npm run dev
```
The application will be available at http://localhost:5173

3. Alternatively, run both frontend and backend concurrently
```bash
npm run dev:full
```

## Project Structure

```
expense-tracker/
├── src/                    # Frontend source files
│   ├── components/        # React components
│   ├── services/         # API services
│   ├── types/           # TypeScript interfaces
│   └── utils/           # Utility functions
├── server/               # Backend Express application
└── public/              # Static assets
```

## API Endpoints

- `GET /api/expenses` - Retrieve all expenses
- `POST /api/expenses` - Add a new expense
- `PUT /api/expenses/:id` - Update an existing expense
- `DELETE /api/expenses/:id` - Delete an expense

## Tech Stack

### Frontend
- React 18 with TypeScript
- Tailwind CSS for styling
- Chart.js and react-chartjs-2 for data visualization
- Lucide React for icons
- Axios for API requests

### Backend
- Express.js
- Node.js
- CORS for cross-origin resource sharing

## Development

The application uses:
- Vite for frontend development and building
- ESLint for code linting
- TypeScript for type safety
- Concurrent running of frontend and backend servers

## Building for Production

1. Build the frontend
```bash
npm run build
```

2. The built files will be in the `dist` directory

## License

MIT