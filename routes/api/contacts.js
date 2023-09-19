const express = require("express");
const router = express.Router();
const controls = require("../../controllers/contactsCntrl");
const {
  bodyValidator,
  bodyValidFavorite,
  idValidator,
} = require("../../middlewares");
const { addShema, favoriteSchema } = require("../../models/contactModel");

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
router.put(
  "/:contactId",
  idValidator,
  bodyValidator(addShema),
  controls.getContactUpdate
);
// 6
router.patch(
  "/:contactId/favorite",
  idValidator,
  bodyValidFavorite(favoriteSchema),
  controls.updateStatusContact
);

module.exports = router;
