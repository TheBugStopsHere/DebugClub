const router = require('express').Router()
const {Order, LineItem, Item} = require('../db/models')
module.exports = router

//These routes are mounted on /api/orders

router.use('/line-items', require('./line-items'))

// this route gets all orders. It's accessible to only ADMIN users.
router.get('/', async (req, res, next) => {
  try {
    if (req.user && req.user.admin === true) {
      res.json(
        await Order.findAll({
          include: [{model: LineItem}]
        })
      )
    } else {
      res.status(401).send('You are not authorized to access these bugs!')
    }
  } catch (err) {
    next(err)
  }
})


// this route gets a single order. It's accessible to logged in users or admin users.  When logged in as a user, it is their cart data. When logged in as an ADMIN user, it is a specific order (usually a completed order, but could also be in progress).
router.get('/user', async (req, res, next) => {
  try {
    if (req.user) {
        //user has the same id as the id for whom the order belongs to or is an admin and they should not have access to this data.
        const order = await Order.findOne({
            where: {
              userId: req.user.id,
              status: 'in-progress'
            },
            include: [
              {
                model: LineItem,
                include: [{model: Item}]
              }
            ]
          })
        if(order) res.json(order)
        else {
          res.status(404).send('You dont have an order yet!')
        }
      } else {
        //user is getting a 401 because they do not have the same id as the id for whom the order belongs to and should not have access to this data.
        res.status(401).send('These bugs are not your bugs!')
      }
    } catch (err) {
    next(err)
  }
})

// This route is available to guest users and admin users. For guests, it is their cart data. When logged in as an ADMIN user, it is a specific order (usually a completed order, but could also be in progress).
router.get('/guest', async (req, res, next) => {
  try {
    if(req.session) {
      const order = await Order.findOne({
        where: {
          guestSessionId: req.session.id,
          status: 'in-progress'
        },
        include: [
          {
            model: LineItem,
            include: [{model: Item}]
          }
        ]
      }
    )   
      if(order) res.json(order)
      else {
        res.status(404).send('You dont have an order yet!')
      }
    } 
  } catch (err) {
    next(err)
  }
})


// adds a new order to the database. Accessible to all users, but non-admin users/guests should only be able to create an order that is "in-progress" not "complete". ADMIN users should be able to create an order that is "complete".
router.post('/', async (req, res, next) => {
  if(req.body.status === 'in-progress' || req.user.admin === true) {
    try {
       const order = await Order.create(req.body)
       const returnMessage = order.toJSON()
       res.send(returnMessage)
     } catch (err) {
       next(err)
     }
  }
  else {
    res.status(401).send('Cannot start an order as complete!')
  }
})

// DELETE /api/orders/:orderId
// Only accessible by admin users.
router.delete('/:orderId', async (req, res, next) => {
  try {
    const order = await Order.findByPk(req.params.orderId)
    if ((order && (order.userId === req.user.id)) || req.user.admin === true) {
      //user has the same id as the id for whom the order belongs to and should not have access to delete this data.
      await Order.destroy({
        where: {
          id: req.params.orderId
        }
      })
    } else {
      //user is getting a 401 because they do not have the same id as the id for whom the order belongs to and should not be able to delete this order.
      res.status(401).send('Insufficient Permission!')
    }
    res.send('order has been deleted from the database')
  } catch (err) {
    next(err)
  }
})


// PUT /api/orders/:orderId
// users: used for checkout, changing order status to "complete"
// ADMIN users: used for changing orders in general
router.put('/:orderId', async (req, res, next) => {
  try {
    if (!isNaN(req.params.orderId)) {
      //number means it's a user id
      // if(req.user){
        //user has the same id as the id for whom the order belongs to and should not have access to this data.
        await Order.update(req.body, {
        where: {
          id: req.params.orderId
        }
      })
      res.json(
        await Order.findByPk(req.params.orderId, {
          include: [
            {
              model: LineItem,
              include: [{model: Item}]
            }
          ]
        })
      )
      // } else {
      //   //user is getting a 401 because they do not have the same id as the id for whom the order belongs to and should not be able to make posts to this order.
      //   res.sendStatus(401)
      // }
    } else {
      // if it's not a number, it's a string. It's a guest user
      await Order.update(req.body, {
        where: {
          guestSessionId: req.params.orderId
        }
      })
      res.json(
        await Order.findOne({
          where: {
            guestSessionId: req.params.orderId
          },
          include: [
            {
              model: LineItem,
              include: [{model: Item}]
            }
          ]
        })
        )
    }
  } catch (err) {
    next(err)
  }
})

// Get order by Order ID (this is NOT for shopping cart. This will be used for order history)
router.get('/:orderId', async (req, res, next) => {
  try {
    
    if (req.user) {
      //user has the same id as the id for whom the order belongs to and should not have access to delete this data.
      const order = await Order.findByPk(req.params.orderId)
      if(order.userId === req.user.id || req.user.admin === true) {
        res.json(order)
      }
      else {
        res.status(401).send('These are not your bugs!')
      }
    } 
    else if (req.session.id === req.body.guestSessionId) {
      //user has the same id as the id for whom the order belongs to and should not have access to delete this data.
      const order = await Order.findByPk(req.params.orderId)
      res.json(order)
    } 
    else {
      //user is getting a 401 because they do not have the same id as the id for whom the order belongs to and should not be able to delete this order.
      res.status(401).send('These are not your bugs!')
    }
  } catch (err) {
    next(err)
  }
})

// PUT /api/orders/:orderId
// users: used for checkout, changing order status to "complete"
// ADMIN users: used for changing orders in general
router.put('/checkout/:orderId', async (req, res, next) => {
  try {
      
    if(req.user){
      //user has the same id as the id for whom the order belongs to and should not have access to this data.
      await Order.update(req.body, {
      where: {
        id: req.params.orderId,
        userId: req.body.userId
      }
    })
      res.json(
        await Order.findByPk(req.params.orderId, {
          include: [
            {
              model: LineItem,
              include: [{model: Item}]
            }
          ]
        })
      )
    } 
    else if(req.session.id === req.body.guestSessionId) {
      //user has the same id as the id for whom the order belongs to and should not have access to this data.
      await Order.update(req.body, {
        where: {
          id: req.params.orderId,
          guestSessionId: req.body.guestSessionId
        }
      })
        res.json(
          await Order.findByPk(req.params.orderId, {
            include: [
              {
                model: LineItem,
                include: [{model: Item}]
              }
            ]
          })
        )
    } 
    else {
      //user is getting a 401 because they do not have the same id as the id for whom the order belongs to and should not be able to make posts to this order.
      res.sendStatus(401)
    }
  } catch (err) {
    next(err)
  }
})
