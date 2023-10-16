const express = require('express');
const router = express.Router();
const { formatString } = require('../utils/util');
const DatabaseService = require('../services/DatabaseService');
const PopulationService = require('../services/PopulationService');
const RedisService = require('../services/RedisService');

// Create instances of PopulationService and RedisService
const databaseService = new DatabaseService();
const populationService = new PopulationService(databaseService);
const redisService = new RedisService();
redisService.connectRedis();

// GET endpoint to retrieve population value
router.get('/population/state/:state/city/:city', async (req, res) => {
  let { state, city } = req.params;
  state = formatString(state);
  city = formatString(city);

  try {
    // Check if data is in Redis cache
    const cachedData = await redisService.get(`${state}-${city}`);

    if (cachedData) {
      console.log('Cache hit!');
      return res.status(200).json({ population: JSON.parse(cachedData) });
    }

    // If not in cache, fetch data from SQLite
    const populationData = await populationService.getData(state, city);

    if (populationData) {
      // Cache the fetched data in Redis
      await redisService.setEx(`${state}-${city}`, 3600, populationData.population.toString());
      console.log('Cache miss!');
      return res.status(200).json(populationData);
    } else {
      // If data not found, return a 400 status with an error message
      return res.status(400).json({ error: 'Population data not found' });
    }
  } catch (error) {
    console.error('Error in GET request:', error);
    return res.status(400).json({ error: error.message });
  }
});

router.put('/population/state/:state/city/:city', async (req, res) => {
  let { state, city } = req.params;
  const { population } = req.body;
  state = formatString(state);
  city = formatString(city);

  try {
    // Check if the data already exists
    const existingData = await populationService.getData(state, city);

    if (existingData) {
      // Data already exists, update it
      await populationService.putData(state, city, population);
      await redisService.setEx(`${state}-${city}`, 3600, population.toString());
      console.log('Data updated successfully!');
      return res.status(200).send('Data updated successfully!');
    } else {
      // Data does not exist, create it
      await populationService.putData(state, city, population);
      await redisService.setEx(`${state}-${city}`, 3600, population.toString());
      console.log('Data created successfully!');
      return res.status(201).send('Data created successfully!');
    }
  } catch (error) {
    console.error('Error in PUT request:', error);
    return res.status(400).json({ error: error.message });
  }
});

module.exports = router;
