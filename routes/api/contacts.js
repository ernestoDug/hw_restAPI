const express = require("express");
const router = express.Router();
const controls = require("../../controllers/contactsCntrl");
const { bodyValidator } = require("../../middlewares");
const { addShema } = require("../../models/contactModel");

// 1
router.get("/", controls.getContacts);
// 2
router.get("/:contactId", controls.getContactID);
// 3   
// !! posman raw та json замість text
router.post("/", bodyValidator(addShema), controls.getContatAdd);
// 4
router.delete("/:contactId", controls.getRemoveContact);
   
// 5
router.put("/:contactId", bodyValidator(addShema), controls.getContactUpdate);

router.patch("/:contactId/favorite", bodyValidator(addShema), controls.updateStatusContact);
module.exports = router;
