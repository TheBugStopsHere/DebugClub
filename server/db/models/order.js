const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  status: {
    type: Sequelize.STRING,
    defaultValue: 'in-progress',
    validate: {
      isIn: [['in-progress', 'complete']]
    }
  },
  guestSessionId: {
    type: Sequelize.STRING
  }
})

module.exports = Order

