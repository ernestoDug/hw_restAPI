const express = require("express");
const Joi = require("joi");

const { HttpError } = require("../../helpers");

const router = express.Router();
// для вимог до полів боді
const addShema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),

});

const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
} = require("../../models/servises");

// 1
router.get("/", async (req, res, next) => {
  try {
    const contacts = await listContacts();
    return res.status(200).json(contacts);
  } catch (error) {
     next(error);
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
   next(error);
  }
});
// 3 !! posman raw і не забути про json замість text
router.post("/", async (req, res, next) => {
  try {
      const body = req.body;
      // валідація посту
const {error} = addShema.validate(body);
if(error) {
  throw HttpError(400, error.message);
}
  const newContact = await addContact(body);
  return res.status(201).json(newContact);
  }
  catch (error) {
   next(error);
  }
});
// 4
router.delete("/:contactId", async (req, res, next) => {
 try{
  const { contactId } = req.params;
  const contactRemove = await removeContact(contactId);
  if (!removeContact) {
    throw HttpError(404, "Not found");
  }
  res.json(contactRemove);
} catch (error) {
 next(error);
}
});


router.put("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
});

module.exports = router;
