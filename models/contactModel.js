const mongoose = require("mongoose");
// схема
const contactsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Set name for contact"],
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  favorite: {
    type: Boolean,
    default: false,
  },
  // owner: {
  //   type: mongoose.Types.ObjectId,
  //   ref: "User",
  //   required: [true, "Contact must have an owner"],
  // },
});
// модель
const Contacts = mongoose.model("contacts", contactsSchema);

module.exports = Contacts;