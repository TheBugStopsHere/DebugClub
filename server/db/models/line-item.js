const Sequelize = require('sequelize')
const db = require('../db')

const LineItem = db.define('lineItem', {
  price: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: 0
    }
  },
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: 1
    }
  }
})

module.exports = LineItem

