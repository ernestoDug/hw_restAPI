const express = require("express");

const HttpError  = require("../../helpers");

const router = express.Router();
 
const {
  listContacts,
  getContactById,
  addContact,
} = require("../../models/servises");



// 1
router.get("/", async (req, res, next) => {
  try {
    const contacts = await listContacts();
    return res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ error: "Not found contacts server error" });
  }
});
// 2
router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contactByid = await getContactById(contactId);
    if (!contactByid) {
          throw HttpError(404, "Not found");
          }
    res.json(contactByid);
  } catch (error) {
const {status =  500, message =  "Server error"} = error;
res.status(status).json(message)
}
});

// 3
router.post("/", async (req, res, next) => {
  const body = req.body;
  const newContact = addContact(body);
  return res.status(201).json(newContact);
});

router.delete("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
});

router.put("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
});

module.exports = router;
