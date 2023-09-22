const express = require("express");
const router = express.Router();
const controls = require("../../controllers/contactsCntrl");
const {
  bodyValidator,
  bodyValidFavorite,
  idValidator,
  authenticator,
} = require("../../middlewares");
const { addShema, favoriteSchema } = require("../../models/contactModel");

// 1
router.get("/", authenticator, controls.getContacts);
// 2
router.get("/:contactId", authenticator, idValidator, controls.getContactID);
// 3
// !! posman raw та json замість text
router.post("/",authenticator, bodyValidator(addShema), controls.getContatAdd);
// 4
router.delete("/:contactId", authenticator, idValidator, controls.getRemoveContact);

// 5
router.put(
  "/:contactId",
  authenticator,
  idValidator,
  bodyValidator(addShema),
  controls.getContactUpdate
);
// 6
router.patch(
  "/:contactId/favorite",
  authenticator,
  idValidator,
  bodyValidFavorite(favoriteSchema),
  controls.updateStatusContact
);

module.exports = router;
