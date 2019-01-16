const crypto = require('crypto')
const Sequelize = require('sequelize')
const db = require('../db')


const defaultImgURL = '/img/defaultImg.png'
const User = db.define('user', {
  firstName: {
    type: Sequelize.STRING,
  },
  lastName: {
    type: Sequelize.STRING,
  },
  imageURL: {
    type: Sequelize.STRING,
    defaultValue: defaultImgURL
  },
  address: {
    type: Sequelize.STRING
  },
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    validate: {
      isEmail: true
    }
  },
  password: {
    type: Sequelize.STRING,
    // Making `.password` act like a func hides it when serializing to JSON.
    // This is a hack to get around Sequelize's lack of a "private" option.
    get() {
      return () => this.getDataValue('password')
    }
  },
  salt: {
    type: Sequelize.STRING,
    // Making `.salt` act like a function hides it when serializing to JSON.
    // This is a hack to get around Sequelize's lack of a "private" option.
    get() {
      return () => this.getDataValue('salt')
    }
  },
  googleId: {
    type: Sequelize.STRING
  },
  admin: { 
    type: Sequelize.BOOLEAN, 
    allowNull: false, 
    defaultValue: false 
  },
}, 
{
  hooks: {
    beforeValidate: user => {
      if(user.imageURL === '') user.imageURL = defaultImgURL
      if(user.address === '') user.address = null
    }
  }
}
)

module.exports = User

/**
 * instanceMethods
 */
User.prototype.correctPassword = function(candidatePwd) {
  return User.encryptPassword(candidatePwd, this.salt()) === this.password()
}

/**
 * classMethods
 */
User.beforeValidate('Capitalize', user => {
  if(user.firstName || user.lastName){
    let firstName = user.firstName.split(' ');
  let lastName = user.lastName.split(' ');
  user.firstName = firstName.map(function(firstName){
      return firstName[0].toUpperCase().concat(firstName.slice(1).toLowerCase())
  }).join(' ')
  user.lastName = lastName.map(function(lastName){
      return lastName[0].toUpperCase().concat(lastName.slice(1).toLowerCase())
  }).join(' ')
  }
})

User.generateSalt = function() {
  return crypto.randomBytes(16).toString('base64')
}

User.encryptPassword = function(plainText, salt) {
  console.log('***********>>>>>>>>         encryption is happening!')
  return crypto
    .createHash('RSA-SHA256')
    .update(plainText)
    .update(salt)
    .digest('hex')
}

/**
 * hooks
 */
const setSaltAndPassword = user => {
  console.log('***********>>>>>>>>         before update should be happening')
  if (user.changed('password')) {
    user.salt = User.generateSalt()
    user.password = User.encryptPassword(user.password(), user.salt())
  }
}

User.beforeCreate(setSaltAndPassword)
User.beforeUpdate(setSaltAndPassword)
User.beforeBulkUpdate(setSaltAndPassword)
