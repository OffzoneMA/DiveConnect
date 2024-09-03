const mongoose = require("mongoose");
const equipmentSchema = require("./Equipment.js");
const paymentSchema = require("./Payment.js");

const bookingSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    divingCenter: { type: mongoose.Schema.Types.ObjectId, ref: "DivingCenter", required: true },
    date: { type: Date, required: true },
    numberOfDivers: { type: Number, required: true, min: 1 },
    clientName: { type: String, required: true },
    email: { type: String, required: true, match: [/\S+@\S+\.\S+/, 'Please use a valid email address.'] },
    phone: { type: String, required: true, match: [/^\d{10,15}$/, 'Please enter a valid phone number.'] },
    payment: paymentSchema,
    status: { type: String, enum: ["Pending", "Confirmed", "Cancelled"], default: "Pending" },
    additionalRequests: { type: String },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

module.exports = mongoose.model("Booking", bookingSchema);