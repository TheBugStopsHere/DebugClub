const Sequelize = require('sequelize')
const pkg = require('../../package.json')

const {DATABASE_NAME = pkg.name + (process.env.NODE_ENV === 'test' ? '-test' : '') } = process.env;
const {DATABASE_URL = `postgres://localhost:5432/${DATABASE_NAME}`} = process.env;

const env = process.env.NODE_ENV || 'development';

const dialectOptions = env === 'production' 
  ? {
    ssl: {
      rejectUnauthorized: false
    }
  }
  : {};

const db = new Sequelize(DATABASE_URL,
  {
    logging: false,
    dialectOptions
  }
)
module.exports = db

// This is a global Mocha hook used for resource cleanup.
// Otherwise, Mocha v4+ does not exit after tests.
if (process.env.NODE_ENV === 'test') {
  after('close database connection', () => db.close())
}
