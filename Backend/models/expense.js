const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Expense = sequelize.define('Expense', {
  amount: {
    type: DataTypes.DECIMAL,
    allowNull: false
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

module.exports = Expense;
