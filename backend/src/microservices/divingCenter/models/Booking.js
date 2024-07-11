const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  divingCenter: { type: mongoose.Schema.Types.ObjectId, ref: "DivingCenter" },
  date: { type: Date, required: true },
  numberOfDivers: { type: Number, required: true },
  equipments: [
    {
      equipment: { type: mongoose.Schema.Types.ObjectId, ref: "Equipment" },
      quantity: { type: Number, required: true },
    },
  ],
});

module.exports = mongoose.model("Booking", bookingSchema);
