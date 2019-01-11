const router = require('express').Router()
const {Order, LineItem, Item} = require('../db/models')
module.exports = router

//These routes are mounted on /api/orders

router.use('/line-items', require('./line-items'))

// this route gets all orders. It's accessible to only ADMIN users. 
router.get('/', async (req, res, next) => {
  try {
      //THIS NEEDS TO BE PROTECTED FOR ADMINS ONLY
      res.json(await Order.findAll({
        include: [{model: LineItem}]
      }))
  } catch (err) {
      next(err)
  }
})

//this route gets a single order. It's accessible to all users.  When logged in as a user, it is their cart data. When logged in as an ADMIN user, it is a specific order (usually a completed order, but could also be in progress)
router.get('/:userId', async (req, res, next) => {
  try {
    if(!isNaN(req.params.userId)) { //number means it's a user id
      if(req.user && req.user.id != req.params.userId){
        //user is getting a 401 because they do not have the same id as the id for whom the order belongs to. Therefor they should not have access to this data.
        res.status(401).send('These bugs are not your bugs!', )
      } else {
        //user has the same id as the id for whom the order belongs to. Therefor they should not have access to this data.
        res.json(await Order.findOne({
          where: {
            userId: req.params.userId
          },
          include: [{model: LineItem, include: [
            {model: Item}
          ]}]
        }))
      }
    } else { // if it's not a number, it's a string. It's a guest user
      //I DO NOT KNOW HOW TO HIT THESE...
      res.json(await Order.findOne({
        where: {
          guestSessionId: req.params.userId
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

// adds a new order to the database. Accessible to all users, but for a logged in user it should only be possible to create an order that is "in-progress" not "complete". ADMIN users should be able to create an order that is "complete".
router.post('/', async (req, res, next) => {
  /*
  Expecting req.body to be something like this:
  {
	  "status": "in-progress", //only necessary if it's an admin user creating a past order for records
    "guestSessionId": "testSessionId2",  // either this or userId
    "userId": "2" // either this or guestSessionId
  }
  */
  try {
    const order = await Order.create(req.body)
    const returnMessage = order.toJSON();
    res.send(returnMessage);
  } catch (err) {
    next(err);
  }
});

// DELETE /api/orders/:orderId
//this would be used if a user empties their cart.
router.delete('/:orderId', async (req, res, next) => {
  try {
    if(req.user.id != req.params.userId){
      //user is getting a 401 because they do not have the same id as the id for whom the order belongs to. Therefor they should not be able to delete this order.
      res.sendStatus(401)
    } else {
      //user has the same id as the id for whom the order belongs to. Therefor they should not have access to delete this data.
      await Order.destroy({
        where: {
          id: req.params.orderId
        }
      })
    }
    res.send('order has been deleted from the database')
  } catch (err) {
    next(err);
  }
});

// PUT /api/orders/:orderId
// users: used for checkout, changing order status to "complete"
// ADMIN users: used for changing orders in general
router.put('/:orderId', async (req, res, next) => {
  try {
    if(!isNaN(req.params.orderId)) { //number means it's a user id
      if(req.user.id != req.params.userId){
        //user is getting a 401 because they do not have the same id as the id for whom the order belongs to. Therefor they should not be able to make posts to this order.
        res.sendStatus(401)
      } else {
        //user has the same id as the id for whom the order belongs to. Therefor they should not have access to this data.
        await Order.update(
          req.body,
          {where: {
            id: req.params.orderId  
        }})
        res.json(await Order.findById(req.params.orderId, {
          include: [{model: LineItem, include: [
            {model: Item}
          ]}]
        }))
      }
    } else { // if it's not a number, it's a string. It's a guest user
      await Order.update(
        req.body,
        {where: {
          guestSessionId: req.params.orderId
      }})
      res.json(await Order.findOne({
        where: {
          guestSessionId: req.params.orderId
        },
        include: [{model: LineItem, include: [
          {model: Item}
        ]}]
      }))
    }
  }
  catch (err) {
    next(err)
  }
})