const invoiceModel = require('../models/invoice.model');

exports.getInvoices = async () => {
  return await invoiceModel.find({});
};

exports.createInvoice = async (invoiceData) => {
  const invoice = new invoiceModel(invoiceData);
  return await invoice.save();
};

exports.updateInvoice = async (id, invoiceData) => {
  return await invoiceModel.findByIdAndUpdate(id, invoiceData);
};

exports.deleteInvoice = async (id) => {
  return await invoiceModel.findByIdAndDelete(id);
};