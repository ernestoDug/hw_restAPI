const mongoose = require("mongoose");
const { mongooseError } = require("../helpers");

// схема
const phoneRegexp = /^\(\d{3}\)-\d{3}-\d{5}$/;

const contactsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Set name for contact"],
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    match: phoneRegexp,
    required: true,

  },
  favorite: {
    type: Boolean,
    default: false,
  },
},
// обєкт налаштувань
{ versionKey: false, timestamps: true });

// м/в для викиду статусниx помилок
contactsSchema.post("save", mongooseError); 


// модель (колекція,  валідаційна схема)
const Contacts = mongoose.model("contacts", contactsSchema);

module.exports = Contacts;