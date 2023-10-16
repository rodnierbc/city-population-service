const redis = require('redis');

class RedisService {
  constructor() {
    // Get Redis server host and port from environment variables
    this.host = process.env.REDIS_HOST || 'localhost';
    this.port = process.env.REDIS_PORT || 6379;
    // Initialize the Redis client as null
    this.client = null;
  }

  // Helper function to create a Redis client
  createClient() {
    return redis.createClient({
      host: this.host,
      port: this.port,
    });
  }

  // Establish a connection to the Redis server
  async connectRedis() {
    this.client = this.createClient();
    await this.client.connect();
    this.client.on('error', (err) => {
      console.error(`An error occurred with Redis: ${err}`);
    });

    console.log('Redis connected successfully...');
  }

  // Get a value from Redis by key
  async get(key) {
    try {
      const value = await this.client.get(key);
      return value;
    } catch (error) {
      console.error('Error getting value from Redis:', error);
      throw error;
    }
  }

  // Set a value in Redis with an expiration time in seconds
  async setEx(key, seconds, value) {
    try {
      this.client.setEx(key, seconds, value);
    } catch (error) {
      console.error('Error setting value in Redis:', error);
      throw error;
    }
  }

  async close() {
    if (this.client) {
      this.client.quit(); // Close the Redis client connection
      console.log('Redis connection closed.');
    }
  }
}

module.exports = RedisService;
