const mongoose = require("mongoose");

// Define allowed agencies and languages
const allowedAgencies = ["padi", "cmas", "ssi", "naui", "bsac"];
const allowedLanguages = ["english", "french", "spanish", "german", "italian"];

const divingCenterSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String },
  address: { type: String, required: true },

  image: { type: String },
  description: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

  address2: { type: String },
  postalCode: { type: String },
  city: { type: String, required: true },
  website: { type: String },
  country: { type: String, required: true },
  phone: { type: String },

  agencies: [
    {
      type: String,
      enum: allowedAgencies, // Only allow predefined agencies
      lowercase: true, // Convert input to lowercase
      validate: {
        validator: function(v) {
          return allowedAgencies.includes(v.toLowerCase());
        },
        message: props => `${props.value} is not a valid agency`
      }
    }
  ],
  languages: [
    {
      type: String,
      enum: allowedLanguages, // Only allow predefined languages
      lowercase: true, // Convert input to lowercase
      validate: {
        validator: function(v) {
          return allowedLanguages.includes(v.toLowerCase());
        },
        message: props => `${props.value} is not a valid language`
      }
    }
  ],
  socialMedia: {
    facebook: { type: String },
    instagram: { type: String },
    twitter: { type: String },
    youtube: { type: String },
    linkedin: { type: String },
  },
});

module.exports = mongoose.model("DivingCenter", divingCenterSchema);