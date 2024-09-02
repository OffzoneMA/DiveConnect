const express = require('express');
const router = express.Router();
const { sendEmail } = require('../controllers/email');

router.post('/:id', sendEmail);

module.exports = router;
