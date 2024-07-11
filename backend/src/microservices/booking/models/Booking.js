const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  divingCenter: { type: mongoose.Schema.Types.ObjectId, ref: "DivingCenter" },
  date: Date,
  numberOfDivers: Number,
  equipments: [
    {
      equipment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Equipment",
      },
      quantity: Number,
    },
  ],
});

module.exports = mongoose.model("Booking", bookingSchema);
