const router = require('express').Router()
const {Item} = require('../db/models')
module.exports = router

//These routes are mounted on /api/items

//this route gets all items. It's accessible to all users
router.get('/', async (req, res, next) => {
  try {
    res.json(await Item.findAll())
  } catch (err) {
    next(err)
  }
})

