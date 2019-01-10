const router = require('express').Router()
const {Order, LineItem, Item} = require('../db/models')
module.exports = router

//These routes are mounted on /api/orders

router.use('/line-items', require('./line-items'))

// this route gets all orders. It's accessible to only ADMIN users. 
router.get('/', async (req, res, next) => {
  try {
      res.json(await Order.findAll({
        include: [{model: LineItem}]
      }))
  } catch (err) {
      next(err)
  }
})

//this route gets a single order. It's accessible to all users.  When logged in as a user, it is their cart data. When logged in as an ADMIN user, it is a specific order (usually a completed order, but could also be in progress)
router.get('/:orderId', async (req, res, next) => {
  try {
    if(!isNaN(req.params.orderId)) { //number means it's a user id
      res.json(await Order.findById(req.params.orderId, {
      include: [{model: LineItem, include: [
        {model: Item}
      ]}]
    }))
    } else { // if it's not a number, it's a string. It's a guest user
      res.json(await Order.findOne({
        where: {
          guestSessionId: req.params.orderId
        },
        include: [{model: LineItem, include: [
          {model: Item}
        ]}]
      }))
    }
  } catch (err) {
    next(err)
  }
})

