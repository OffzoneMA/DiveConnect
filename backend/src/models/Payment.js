const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  amount: { type: Number, required: true },
  method: { type: String, enum: ["Credit Card", "PayPal", "Bank Transfer"], required: true },
  status: { type: String, enum: ["Pending", "Completed", "Failed"], required: true },
  transactionId: { type: String },
});

module.exports = paymentSchema;