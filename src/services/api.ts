const API_BASE_URL = 'http://localhost:5000/api';

// Accounts
export const getAccounts = async (userId: string) => {
  const response = await fetch(`${API_BASE_URL}/accounts?user_id=${userId}`);
  if (!response.ok) throw new Error('Failed to fetch accounts');
  return response.json();
};

export const createAccount = async (data: any) => {
  const response = await fetch(`${API_BASE_URL}/accounts`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Failed to create account');
  return response.json();
};

export const deleteAccount = async (id: string, userId: string) => {
  const response = await fetch(`${API_BASE_URL}/accounts/${id}?user_id=${userId}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Failed to delete account');
  return response.json();
};

// Transactions
export const getTransactions = async (userId: string) => {
  const response = await fetch(`${API_BASE_URL}/transactions?userId=${userId}`);
  if (!response.ok) throw new Error('Failed to fetch transactions');
  return response.json();
};

export const createTransaction = async (data: any) => {
  const response = await fetch(`${API_BASE_URL}/transactions`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Failed to create transaction');
  return response.json();
};

export const deleteTransaction = async (id: string) => {
  const response = await fetch(`${API_BASE_URL}/transactions/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Failed to delete transaction');
  return response.json();
};

// Budgets
export const getBudgets = async () => {
  const response = await fetch(`${API_BASE_URL}/budgets`);
  if (!response.ok) throw new Error('Failed to fetch budgets');
  return response.json();
};

export const createBudget = async (data: any) => {
  const response = await fetch(`${API_BASE_URL}/budgets`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Failed to create budget');
  return response.json();
};

export const deleteBudget = async (id: string) => {
  const response = await fetch(`${API_BASE_URL}/budgets/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Failed to delete budget');
  return response.json();
};

// Dashboard
export const getDashboardSummary = async (userId: string) => {
  const response = await fetch(`${API_BASE_URL}/dashboard/summary/${userId}`);
  if (!response.ok) throw new Error('Failed to fetch dashboard summary');
  return response.json();
};

export const getDashboardAreaChart = async (userId: string) => {
  const response = await fetch(`${API_BASE_URL}/dashboard/area/${userId}`);
  if (!response.ok) throw new Error('Failed to fetch area chart data');
  return response.json();
};

export const getDashboardPieChart = async (userId: string) => {
  const response = await fetch(`${API_BASE_URL}/dashboard/pie/${userId}`);
  if (!response.ok) throw new Error('Failed to fetch pie chart data');
  return response.json();
};

// Recurring Transactions
export const getRecurringTransactions = async (userId: string) => {
  const response = await fetch(`${API_BASE_URL}/recurring/${userId}`);
  if (!response.ok) throw new Error('Failed to fetch recurring transactions');
  return response.json();
};

export const createRecurringTransaction = async (data: any) => {
  const response = await fetch(`${API_BASE_URL}/recurring`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Failed to create recurring transaction');
  return response.json();
};

export const deleteRecurringTransaction = async (id: string) => {
  const response = await fetch(`${API_BASE_URL}/recurring/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Failed to delete recurring transaction');
  return response.json();
};

// Auth
export const login = async (credentials: { email: string; password: string }) => {
  const response = await fetch(`${API_BASE_URL}/users/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });
  if (!response.ok) throw new Error('Login failed');
  return response.json();
};

export const register = async (userData: any) => {
  const response = await fetch(`${API_BASE_URL}/users/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  });
  if (!response.ok) throw new Error('Registration failed');
  return response.json();
};