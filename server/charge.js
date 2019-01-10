const router = require('express').Router()
const stripe = require('stripe')('API_KEY_HERE!!!!!') // Test key: 'pk_test_TYooMQauvdEDq54NiTphI7jx'
module.exports = router

router.post('/', async (req, res, next) => {
  try {
    console.log(req.body);
    const { status } = await stripe.charges.create(req.body);
    console.log({ status })
    res.json({ status });
  }
  catch (err) { next(err) }
})