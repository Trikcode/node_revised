const stripe = require('stripe')(process.env.SECRET_KEY)
const StripeController = async (req, res) => {
  const { purchase, total_amount, shipping_fee } = req.body
  const calculatetotalOrder = () => {
    return total_amount + shipping_fee //add more here. connect to database
  }
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculatetotalOrder(),
    currency: 'usd',
  })
  res.json({ clientSecret: paymentIntent.client_secret })
}
module.exports = StripeController
