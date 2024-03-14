const mongoose = require('mongoose');

const invoiceSchema = new mongoose.Schema({
  // define your invoice schema here
});

module.exports = mongoose.model('Invoice', invoiceSchema);