const mongoose = require('mongoose');

const invoiceSchema = new mongoose.Schema({
  // invoice schema
});

module.exports = mongoose.model('Invoice', invoiceSchema);