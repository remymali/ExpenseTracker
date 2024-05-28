const express = require('express');
const router = express.Router();
const db = require('../models');

// Create a new expense
router.post('/', async (req, res) => {
  try {
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
    res.json(expenses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//create new categories

module.exports = router;
