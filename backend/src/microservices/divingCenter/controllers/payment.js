const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const DivingCenter = require('../models/DivingCenter');

exports.createPayment = async (req, res) => {
  try {
    const divingCenter = await DivingCenter.findById(req.params.id);
    const payment = await stripe.charges.create({
      amount: req.body.amount * 100,
      currency: 'usd',
      source: req.body.token,
      description: 'Dive booking payment',
      metadata: {
        divingCenterId: divingCenter._id,
      },
    });
    res.status(200).json({ message: 'Payment created successfully', payment });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
