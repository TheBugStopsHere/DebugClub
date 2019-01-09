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

//this route gets all a single item. It's accessible to all users
router.get('/:itemId', async (req, res, next) => {
    try {
      res.json(await Item.findById(req.params.itemId))
    } catch (err) {
      next(err)
    }
})

//this route is only accessible to admin users. This route allows admin users to create new items and add them to the database.
router.post('/', async (req, res, next) => {
    try {
        if (!req.body){
            res.sendStatus(400)
        } else {
            res.status(201).json(await Item.create(req.body))
        }
    } catch (error) {
        next(error)
    }
})

//this route is only accessible to admin users. This route allows a user to delete an item from the database and returns a 204 response ('The server successfully processed the request and is not returning any content') as destroying returns a promise for the number of rows deleted.
router.delete('/:itemId', async (req, res, next) => {
    try {
        const deleted = await Item.destroy({
            where: {
                id: req.params.itemId
            }
        })
        if (!deleted){
            res.sendStatus(400)
        } else {
            res.sendStatus(204)
        }
    } catch (error) {
        next(error)
    }
})

//this route is only accessible to admin users. This route allows admin users to update items on the database and returns a 200 response as updating returns a promsie for the number of rows updated and an array of the updated items if multiple items were updated.
router.put('/:itemId', async (req, res, next) => {
    try {
        const [numAffected, affected] = await Item.update(
            req.body,
            {
                where: {id: req.params.itemId},
                returning: true,
                plain: true
            })
        if (numAffected && affected) {
            res.sendStatus(200)
        } else {
            res.sendStatus(400)
        }
    } catch (error) {
        next(error)
    }
})




