const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app');

dotenv.config({ path: './config.env' });

// Connect to the database
mongoose.connect(process.env.DATABASE)
  .then(() => console.log('Database connected successfully'))
  .catch((err) => console.error('Database connection error:', err));

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
