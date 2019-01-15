const router = require('express').Router()
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

module.exports = router

router.post('/', async (req, res, next) => {
  try {
    // OB/JD: unnecessary logs, chop down
    console.log(req.body);
    const { status } = await stripe.charges.create(req.body);
    console.log({ status })
    res.json({ status });
  }
  catch (err) { next(err) }
})
