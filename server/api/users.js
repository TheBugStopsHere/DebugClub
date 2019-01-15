const router = require('express').Router()
const {User} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.get('/session', async (req, res, next) => {
  try {
    res.send(req.session.id)
  } catch (err) {
    next(err)
  }
})

//this route is used when accessing the data of an existing user.
router.get('/find', async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id)
    res.json(user)
  } catch (err) {
    next(err)
  }
})

router.put('/', async(req, res, next) => {
  const [instances, rows] = await User.update(req.body,{
    where: {id: req.user.id},
    returning: true,
    plain: true
  })
  res.json(rows)
})
