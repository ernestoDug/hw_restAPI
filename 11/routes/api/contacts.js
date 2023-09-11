const express = require("express");
const router = express.Router();
const controls = require("../../controllers/contactsCntrl");
// 1
router.get("/", controls.getContacts);
// 2
router.get("/:contactId", controls.getContactID);
// 3
// !! posman raw та json замість text
router.post("/", controls.getContatAdd);
// 4
router.delete("/:contactId", controls.getRemoveContact);

// 5
router.put("/:contactId", controls.getContactUpdate);

module.exports = router;
