const Expense = require('../models/expense');

exports.createExpense = async (req, res) => {
  try {
    const expense = await Expense.create(req.body);
    res.status(201).json({ expense });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Implement other CRUD operations (read, update, delete) similarly
