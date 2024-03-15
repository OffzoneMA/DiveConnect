const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  divingAssociation: { type: mongoose.Schema.Types.ObjectId, ref: 'DivingAssociation' },
  title: { type: String, required: true },
  description: { type: String, required: true },
  // add more fields as needed
});

module.exports = mongoose.model('Job', jobSchema);
