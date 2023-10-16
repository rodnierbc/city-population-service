# City Population Service

![GitHub package.json version](https://img.shields.io/github/package-json/v/rodnierbc/city-population-service)
![GitHub](https://img.shields.io/github/license/rodnierbc/city-population-service)

## Description

This Service allows users to get a cities population by state + city
while also letting you set a cities population.

## Features

- Get Population Data: Retrieve population data by specifying a state and city combination.

- **Update Population Data**: Update population data for an existing state and city.

- **Create Population Data**: Add population data for a new state and city combination.

## Built With

- Node.js
- Express.js
- SQLite
- Redis

## Data Management

Our data management strategy is designed to optimize performance and data integrity:

- **SQLite Database**: Population data is securely stored in an SQLite database located at `./src/data/population.db`. The database is initialized and migrated upon server startup to ensure data is up to date.

- **Redis Cache**: To enhance response times, we leverage Redis for caching. When you request data, Redis delivers lightning-fast responses, ensuring a seamless user experience.

## Prerequisites

Before running the service, please ensure you have the following prerequisites:

- Node.js: [Install Node.js](https://nodejs.org/)
- Redis: [Install Redis](https://redis.io/download)

## Installation

To get a local copy up and running, follow these steps:

1. Clone the repository:

```bash
git clone https://github.com/rodnierbc/city-population-service.git
cd city-population-service
```

2. Install the dependencies:

```bash
npm install
```

## Usage

To start the development server:

```
npm start
```

## Running Tests

You can run tests using the following command:

```
npm test
```

## Author

Rodnier Borrego
