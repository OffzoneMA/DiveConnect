const express = require('express');
const router = express.Router();
const invoiceService = require('../services/invoices.service');

router.get('/', invoiceService.getInvoices);
router.post('/', invoiceService.createInvoice);
router.put('/:id', invoiceService.updateInvoice);
router.delete('/:id', invoiceService.deleteInvoice);

module.exports = router;