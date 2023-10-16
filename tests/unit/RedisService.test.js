const RedisService = require('../../src/services/RedisService');

describe('RedisService', () => {
  let redisService;

  beforeAll(async () => {
    // Initialize the RedisService before running tests
    redisService = new RedisService();
    await redisService.connectRedis();
  });

  afterAll(() => {
    // Close the Redis connection after all tests
    redisService.close();
  });

  test('should set and get a value in Redis', async () => {
    const key = 'Alabama-Huntsville';
    const value = '1000';
    const seconds = 3600;

    // Set a value in Redis
    await redisService.setEx(key, seconds, value);

    // Get the value from Redis
    const retrievedValue = await redisService.get(key);

    // Check if the retrieved value matches the expected value
    expect(retrievedValue).toBe(value);
  });

  test('should return null for a non-existent key', async () => {
    const key = 'non-existent-key';

    // Get a non-existent key from Redis
    const retrievedValue = await redisService.get(key);

    // Check if the retrieved value is null
    expect(retrievedValue).toBeNull();
  });
});
