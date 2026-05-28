const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');

const app = express();


// MIDDLEWARES
app.use(cors());

app.use(express.json());



// ROUTES
app.use('/api/auth', authRoutes);

// MONGODB CONNECTION
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {

    console.log('Connected to MongoDB successfully!');

    app.listen(process.env.PORT || 5000, () => {

      console.log(
        `Server running on port ${
          process.env.PORT || 5000
        }`
      );
    });

  })
  .catch((error) => {

    console.log(
      'MongoDB connection failed:',
      error.message
    );
  });


// TEST ROUTE
app.get('/', (req, res) => {

  res.send(
    'Backend is running and connected to MongoDB!'
  );
});