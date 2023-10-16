const axios = require('axios');

class PopulationService {
  constructor(databaseService) {
    this.datasource = process.env.DATA_SOURCE || 'https://raw.githubusercontent.com/Trazi-Ventures/sample-data-interview/main/city_populations.csv';
    this.databaseService = databaseService;
  }

  async migrateData() {
    try {
      const response = await axios.get(this.datasource);

      const csvData = response.data.split('\n');

      await this.databaseService.createTableIfNotExists();

      csvData.forEach(async (row) => {
        const [city, state, population] = row.split(',');
        await this.databaseService.insertData(state, city, parseInt(population));
      });

      console.log('Data migrated to SQLite3 successfully');
    } catch (error) {
      console.error('Error fetching data from CSV:', error);
    }
  }

  async getData(state, city) {
    return this.databaseService.getData(state, city);
  }

  async putData(state, city, population) {
    return this.databaseService.insertData(state, city, population);
  }
}

module.exports = PopulationService;
