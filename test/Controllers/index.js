const stripe = require('stripe')('sk_test_51IbPuXH6yYcILY3f7ol7ocIOUKn4P61XApXijAKp01WhxTR9kHYPIq0Tw31j9ZBocqt4TD2GLHxAn1l6d5kTvkWk00oIa5G4Ih')

app.post('/api/shop/order', async (req, res) => {
  const order = req.body.order
  const source = req.body.source
  try {
    const stripeOrder = await stripe.orders.create(order)
    console.log(`Order created: ${stripeOrder.id}`)
    await stripe.orders.pay(stripeOrder.id, {source})
  } catch (err) {
    // Handle stripe errors here: No such coupon, sku, ect
    console.log(`Order error: ${err}`)
    return res.sendStatus(404)
  }
  return res.sendStatus(200)
})