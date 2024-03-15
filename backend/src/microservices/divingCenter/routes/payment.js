const express = require('express');
const router = express.Router();
const { createPayment } = require('../controllers/payment');

router.post('/:id', createPayment);

module.exports = router;
