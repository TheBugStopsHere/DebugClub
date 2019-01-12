const router = require('express').Router()
const {LineItem} = require('../db/models')
module.exports = router

//These routes are mounted on /api/orders/line-items


//this route gets a single item in an order. It's accessible to all users.
router.get('/:lineItemId', async (req, res, next) => {
    console.log('req.session.id',req.session.id)
    try {
        // if (req.session.id === )
        res.json(await LineItem.findById(req.params.lineItemId))
    } catch (err) {
        next(err)
    }
})

//this route is accessible to all users. This route allows users to add an item to their cart.
router.post('/', async (req, res, next) => {
    try {
        res.status(201).json(await LineItem.create(req.body))
    } catch (error) {
        next(error)
    }
})

//this route is accessible to all users. This route allows a user to delete an item from their order and returns a 204 response ('The server successfully processed the request and is not returning any content') as destroying returns a promise for the number of rows deleted.
router.delete('/:lineItemId', async (req, res, next) => {
    try {
        const deleted = await LineItem.destroy({
            where: {
                id: req.params.lineItemId
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

//this route is accessible to all users. This route allows  users to update items in their cart and returns a 200 response as updating returns a promsie for the number of rows updated and an array of the updated items if multiple items were updated.  As a GUEST or LOGGED-IN user, we should only allow to change quantity.
router.put('/:lineItemId', async (req, res, next) => {
    try {
        const [numAffected, affected] = await LineItem.update(
            req.body,
            {
                where: {id: req.params.lineItemId},
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
