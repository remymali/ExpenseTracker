const express = require('express');
const router = express.Router();
const expenseController = require('../controllers/expenseController');

router.post('/expenses', expenseController.createExpense);
// Define other routes for CRUD operations

module.exports = router;
