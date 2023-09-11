const { addShema } = require("../shemas/contactsShema");

const { HttpError, wrapperCntrl } = require("../helpers");
const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require("../models/servises");
// 1
const getContacts = async (req, res) => {
  const contacts = await listContacts();
  return res.status(200).json(contacts);
};
// 2
const getContactID = async (req, res) => {
  const { contactId } = req.params;
  const contactByid = await getContactById(contactId);
  if (!contactByid) {
    throw HttpError(404, `Not found`);
  }
  res.json(contactByid);
};
// 3
const getContatAdd = async (req, res) => {
  const body = req.body;
  // валідація body
  const { error } = addShema.validate(body);
  if (error) {
    throw HttpError(400,`missing required ${error.details[0].path[0]} field`);

  }
  const newContact = await addContact(body);
  return res.status(201).json(newContact);
};
// 4
const getRemoveContact = async (req, res) => {
  const { contactId } = req.params;
  const contactRemove = await removeContact(contactId);
  if (!contactRemove) {
    throw HttpError(404, `Not found`);
  }
  res.status(200).json({ message: "contact deleted" });
};
// 5
const getContactUpdate = async (req, res) => {
  const body = req.body;
  const { contactId } = req.params;
  const contactUpdate = await updateContact(contactId, body);
  if (!contactUpdate) {
    throw HttpError(404, "Not found");
  }
  // валідація body
  const { error } = addShema.validate(body);
  if (body.email === undefined && body.name === undefined && body.phone ===undefined) {
    throw HttpError(400, 'missing fields');
      }
        if (error) {
    throw HttpError(400,`missing required ${error.details[0].path[0]} field`);
  }

 
  res.status(200).json(contactUpdate);
};
module.exports = {
  getContacts: wrapperCntrl(getContacts),
  getContactID: wrapperCntrl(getContactID),
  getContatAdd: wrapperCntrl(getContatAdd),
  getRemoveContact: wrapperCntrl(getRemoveContact),
  getContactUpdate: wrapperCntrl(getContactUpdate),
};
