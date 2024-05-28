const express = require('express');
const app = express();
const sequelize = require('./config/database');
const expenseRoutes = require('./routes/expenseRoutes');

// Body parser middleware
app.use(express.json());

// Define routes
app.use('/api', expenseRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);

  // Sync Sequelize models with database
  try {
    await sequelize.authenticate();
    console.log('Connected to database');
    await sequelize.sync(); // { force: true } to force sync
    console.log('Database synced');
  } catch (error) {
    console.error('Error connecting to database:', error);
  }
});
