const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Example: add userRoutes
const userRoutes = require('./routes/users');
app.use('/api/users', userRoutes);

const dashboardRoutes = require('./routes/dashboard');
app.use('/api/dashboard', dashboardRoutes);

const transactionRoutes = require('./routes/transactions');
app.use('/api/transactions', transactionRoutes);

const accountRoutes = require('./routes/accounts');
app.use('/api/accounts', accountRoutes);

const budgetRoutes = require("./routes/budgets");
app.use("/api/budgets", budgetRoutes); 

const recurringRoutes = require('./routes/recurring');
app.use('/api/recurring', recurringRoutes);




module.exports = app;
