const mongoose = require("mongoose");
const equipmentSchema = require("./Equipment");

const requestSchema = new mongoose.Schema(
  {
    divingCenter: { type: mongoose.Schema.Types.ObjectId, ref: "DivingCenter", required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    numberOfDiversLevel1: { type: Number, required: true, min: 0, default: 0 }, // Beginner level divers
    numberOfDiversLevel2: { type: Number, required: true, min: 0, default: 0 }, // Intermediate level divers
    numberOfDiversLevel3: { type: Number, required: true, min: 0, default: 0 }, // Advanced level divers
    clientName: { type: String, required: true },
    email: { type: String, required: true, match: [/\S+@\S+\.\S+/, 'Please use a valid email address.'] },
    phone: { type: String, required: true, match: [/^\d{10,15}$/, 'Please enter a valid phone number.'] },
    status: { type: String, enum: ["Pending", "Quoted", "Rejected"], default: "Pending" },
    quotation: {
      amount: { type: Number },
      details: { type: String },
      issuedAt: { type: Date },
    },
    additionalRequests: { type: String },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

module.exports = mongoose.model("Request", requestSchema);