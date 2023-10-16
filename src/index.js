const express = require('express');
const dotenv = require('dotenv');
const populationController = require('./controllers/PopulationController');
const DatabaseService = require('./services/DatabaseService');
const PopulationService = require('./services/PopulationService');

const app = express();
dotenv.config();

// Middleware to parse request body as JSON and handle URL-encoded data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Middleware to set up CORS headers for allowing cross-origin requests
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

const port = process.env.PORT || 5555;

const databaseService = new DatabaseService();
const populationService = new PopulationService(databaseService);

// Use the populationController for handling API routes under '/api'
app.use('/api', populationController);

// Start the server and perform data migration on startup
app.listen(port, async () => {
  await populationService.migrateData();
  console.log(`Server is running on port ${port}`);
});
