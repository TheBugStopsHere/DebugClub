const Sequelize = require('sequelize')
const db = require('../db')

// OB/JD: for the future consider more validations
const Item = db.define('item', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  imageURL: {
    type: Sequelize.STRING,
    defaultValue:
      'https://www.clipartmax.com/png/middle/245-2454629_ants-clipart-cute-bug-clipart-my-cute-graphics.png'
  },
  // OB/JD: use integers and measure in cents (gold standard for currency data)
  price: {
    type: Sequelize.DECIMAL(10, 2),
    allowNull: false
  },
  // OB/JD: enums can be frustrating
  category: {
    type: Sequelize.ENUM('live bugs', 'bad bugs', 'debugging')
  },
  description: Sequelize.TEXT
})

module.exports = Item

/**
 * instanceMethods
 */

/**
 * classMethods
 */

/**
 * hooks
 */
//Forces the item's name to be capitalized when items are added & updated
Item.beforeValidate = item => {
  let itemName = item.name.split(' ')
  item.name = itemName
    .map(function(name) {
      return name[0].toUpperCase().concat(name.slice(1).toLowerCase())
    })
    .join(' ')
}
