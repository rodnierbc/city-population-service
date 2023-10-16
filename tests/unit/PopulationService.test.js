const axios = require('axios');
const PopulationService = require('../../src/services/PopulationService'); // Replace with the actual path

// Mock Axios
jest.mock('axios');

describe('PopulationService', () => {
  let populationService;
  let mockDatabaseService;

  beforeEach(() => {
    // Create a mock DatabaseService
    mockDatabaseService = {
      createTableIfNotExists: jest.fn(),
      insertData: jest.fn(),
      getData: jest.fn(),
    };

    // Create a new PopulationService instance with the mock DatabaseService
    populationService = new PopulationService(mockDatabaseService);
  });

  it('migrateData should fetch data and insert it into the database', async () => {
    // Mock Axios response
    axios.get.mockResolvedValue({
      data: 'state,city,population\nCA,Los Angeles,39776830\nTX,Houston,29207229',
    });

    // Mock insertData function in DatabaseService
    mockDatabaseService.createTableIfNotExists.mockResolvedValue();
    mockDatabaseService.insertData.mockResolvedValue();

    // Call migrateData
    await populationService.migrateData();

    // Check if createTableIfNotExists and insertData were called
    expect(mockDatabaseService.createTableIfNotExists).toHaveBeenCalledTimes(1);
    expect(mockDatabaseService.insertData).toHaveBeenCalledTimes(3); // Two rows in the CSV
  });

  it('getData should fetch data from the database', async () => {
    // Mock getData function in DatabaseService
    mockDatabaseService.getData.mockResolvedValue({ population: 12345 });

    // Call getData
    const result = await populationService.getData('CA', 'Los Angeles');

    // Check if getData was called with the correct arguments
    expect(mockDatabaseService.getData).toHaveBeenCalledWith('CA', 'Los Angeles');

    // Check the returned result
    expect(result).toEqual({ population: 12345 });
  });

  it('putData should insert data into the database', async () => {
    // Mock insertData function in DatabaseService
    mockDatabaseService.insertData.mockResolvedValue();

    // Call putData
    await populationService.putData('TX', 'Houston', 98765);

    // Check if insertData was called with the correct arguments
    expect(mockDatabaseService.insertData).toHaveBeenCalledWith('TX', 'Houston', 98765);
  });
});
