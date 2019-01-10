const router = require('express').Router()
const {Order} = require('../db/models')
module.exports = router

//These routes are mounted on /api/orders

router.use('/line-items', require('./line-items'))

// this route gets all orders. It's accessible to only ADMIN users. 
router.get('/', async (req, res, next) => {
  try {
      res.json(await Order.findAll())
  } catch (err) {
      next(err)
  }
})

//this route gets a single order. It's accessible to either a logged in user or an ADMIN user.  When logged in as a user, it is their cart data. When logged in as an ADMIN user, it is a specific order (usually a completed order, but could also be in progress)
router.get('/:orderId', async (req, res, next) => {
  try {
    res.json(await Order.findById(req.params.orderId))
  } catch (err) {
    next(err)
  }
})

//this route gets a single order. It's accessible to either a GUEST user or an ADMIN user.  When as a GUEST user, it is their cart data. When logged in as an ADMIN user, it is a specific order (usually a completed order, but could also be in progress)
router.get('/:guestSessionId', async (req, res, next) => {
  try {
    res.json(await Order.findOne({
      where: {
        guestSessionId: req.params.guestSessionId
      }
    }))
  } catch (err) {
    next(err)
  }
})
