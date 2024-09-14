const mongoose = require("mongoose");

// Define allowed agencies and languages
const allowedAgencies = [
  "padi", "cmas", "ssi", "naui", "bsac", "sdii", "iadrs", "gue",
  "nasi", "aida", "pdic", "cedip", "raid", "and", "idt", "isa",
  "dive master", "iatd", "tdisdi", "scuba schools international",
  "global underwater explorers", "national association of underwater instructors",
  "international diving research and exploration organization",
  "fédération française d'études et de sports sous-marins"];
const allowedLanguages = [
  "english", "french", "spanish", "german", "italian", "portuguese",
  "russian", "chinese", "japanese", "korean", "arabic", "hindi",
  "bengali", "urdu", "indonesian", "malay", "thai", "vietnamese",
  "dutch", "greek", "polish", "swedish", "norwegian", "finnish",
  "turkish", "hebrew", "hungarian", "czech", "slovak", "romanian",
  "bulgarian", "serbian", "croatian", "bosnian", "albanian", "georgian",
  "armenian", "azerbaijani", "farsi", "pashto", "tagalog", "filipino"
];

const divingCenterSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String,required: true },
  address: { type: String },

  image: { type: String },
  description: { type: String},
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