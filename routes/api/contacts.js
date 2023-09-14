const express = require("express");
const router = express.Router();
const controls = require("../../controllers/contactsCntrl");
const { bodyValidator, idValidator } = require("../../middlewares");
const { addShema } = require("../../models/contactModel");

// 1
router.get("/", controls.getContacts);
// 2
router.get("/:contactId", idValidator, controls.getContactID);
// 3   
// !! posman raw та json замість text
router.post("/", bodyValidator(addShema), controls.getContatAdd);
// 4
router.delete("/:contactId", idValidator, controls.getRemoveContact);
   
// 5
router.put("/:contactId",idValidator, bodyValidator(addShema), controls.getContactUpdate);

router.patch("/:contactId/favorite",idValidator, bodyValidator(addShema), controls.updateStatusContact);
module.exports = router;
