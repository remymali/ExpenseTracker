const express = require('express');
const bodyParser = require('body-parser');
const db = require('./models');
const expenseRoutes = require('./routes/expenses');

const app = express();
app.use(bodyParser.json());

app.use('/expenses', expenseRoutes);

app.get('/', (req, res) => {
  res.send('Welcome to the Expense Tracker API');
});

const PORT = process.env.PORT || 3000;

db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
