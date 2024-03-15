const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
  divingAssociation: { type: mongoose.Schema.Types.ObjectId, ref: 'DivingAssociation' },
  name: { type: String, required: true },
  email: { type: String, required: true },
  // add more fields as needed
});

module.exports = mongoose.model('Member', memberSchema);
