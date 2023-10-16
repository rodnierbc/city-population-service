const sqlite3 = require('sqlite3').verbose();

class DatabaseService {
  constructor() {
    const dbFilePath = './src/data/population.db';
    this.db = new sqlite3.Database(dbFilePath);
  }

  async createTableIfNotExists() {
    return new Promise((resolve, reject) => {
      this.db.run('CREATE TABLE IF NOT EXISTS populations (state TEXT, city TEXT, population INT)', (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }

  async insertData(state, city, population) {
    return new Promise((resolve, reject) => {
      const query = 'INSERT OR REPLACE INTO populations (state, city, population) VALUES (?, ?, ?)';
      this.db.run(query, [state, city, population], (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }

  async getData(state, city) {
    return new Promise((resolve, reject) => {
      const query = 'SELECT population FROM populations WHERE state = ? AND city = ?';
      this.db.get(query, [state, city], (err, row) => {
        if (err) {
          reject(err);
        } else {
          if (row) {
            resolve({ population: row.population });
          } else {
            resolve(null);
          }
        }
      });
    });
  }

  closeDatabase() {
    this.db.close();
  }
}

module.exports = DatabaseService;
