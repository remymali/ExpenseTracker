const express = require('express');
const dotenv =require('dotenv')
dotenv.config();
const cors= require('cors')
const bodyParser = require('body-parser');
const db = require('./models');
const authRoute = require('./routes/auth');
const expenseRoutes = require('./routes/expenses');
const authMiddleware = require('./middleware/auth');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/api/auth', authRoute);
app.use('/api/expenses', authMiddleware, expenseRoutes); // Protect the expense route

app.get('/', (req, res) => {
  res.send('Welcome to the Expense Tracker API');
});

const PORT = process.env.PORT || 5000;

db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
