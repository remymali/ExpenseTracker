const express = require('express');
const router = express.Router();
const db = require('../models');

// Create a new expense
router.post('/', async (req, res) => {
    try {
        const { title, category, description, date, amount } = req.body;
    
        // Validate required fields
        if (!title || !category || !description || !date || !amount) {
          return res.status(400).json({ message: 'All fields are required!' });
        }
    
        // Validate amount
        if (isNaN(amount) || amount <= 0) {
          return res.status(400).json({ message: 'Amount must be a positive number!' });
        }
    const expense = await db.Expense.create(req.body);
    res.status(201).json(expense);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all expenses
router.get('/', async (req, res) => {
  try {
    const expenses = await db.Expense.findAll();
    console.log(expenses);
    res.json(expenses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete an expense
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const expense = await db.Expense.findByPk(id);

    // Check if expense exists
    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }

    // Delete the expense
    await expense.destroy();

    res.status(200).json({ message: 'Expense deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// Create a new income
router.post('/income', async (req, res) => {
    try {
      const income = await db.Income.create(req.body);
      res.status(201).json(income);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  
  // Get all incomes
  router.get('/income', async (req, res) => {
    try {
      const incomes = await db.Income.findAll();
      console.log(incomes);
      res.json(incomes);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  // Delete an income
router.delete('/income/:id', async (req, res) => {
    const { id } = req.params;
  
    try {
      const income = await db.Income.findByPk(id);
  
      // Check if income exists
      if (!income) {
        return res.status(404).json({ message: 'Income not found' });
      }
  
      // Delete the income
      await income.destroy();
  
      res.status(200).json({ message: 'Income deleted successfully' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  
  // Get combined data
router.get('/combined', async (req, res) => {
  try {
    const expenses = await db.Expense.findAll();
    const incomes = await db.Income.findAll();
    res.json({ expenses, incomes });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
