const router = require('express').Router()
const {User} = require('../db/models')
module.exports = router

// ONLY available to Admin users
router.get('/', async (req, res, next) => {
  try {
    if(req.user.admin === true){
      const users = await User.findAll({
        // explicitly select only the id and email fields - even though
        // users' passwords are encrypted, it won't help if we just
        // send everything to anyone who asks!
        attributes: ['id', 'email']
      })
      res.json(users)
    }
    else {
      res.send('You are not authorized to view all users!')
    }
  } catch (err) {
    next(err)
  }
})

// available to ALL users Just sends their session ID
router.get('/session', async (req, res, next) => {
  try {
    res.send(req.session.id)
  } catch (err) {
    next(err)
  }
})

//this route is used when accessing the data of an existing user. Available to logged in users only by default.
router.get('/find', async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id)
    res.json(user)
  } catch (err) {
    next(err)
  }
})

// Allows updating user information.  Available to logged in users only by default.
router.put('/', async(req, res, next) => {
  if(req.body.admin && req.user.admin === false) {
    res.status(401).send('Insufficient Permission to update that piece of user information!')
  }
  else {
    const [instances, rows] = await User.update(req.body,{
    where: {id: req.user.id},
    returning: true,
    plain: true
  })
  res.json(rows)
  }
  
})
