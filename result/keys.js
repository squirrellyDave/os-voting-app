// Mapping the container environment variables defined in the pod/deployment definition file to JavaScript variables here.
// In your code you need to import this file, like f.e.: const keys = require('./keys');
// After that you can use the variables like this: var redisHost = keys.redisHost;
module.exports = {
  appPort: process.env.PORT || 4000,
  pgHost: process.env.POSTGRES_HOST || 'db',
  pgPort: process.env.POSTGRES_PORT || '5432',
  pgDatabase: process.env.POSTGRES_DATABASE || 'postgres',
  pgUser: process.env.POSTGRES_USER || 'postgres_user',
  pgPassword: process.env.POSTGRES_PASSWORD || 'postgres_password'
};
