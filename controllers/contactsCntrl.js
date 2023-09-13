const Contacts = require("../models/contactModel");
const { wrapperCntrl, HttpError } = require("../helpers");

// const {
//   listContacts,
//   getContactById,
//   addContact,
//   removeContact,
//   updateContact,
// } = require("../models/servises");

// 1
const getContacts = async (req, res) => {
  const contacts = await Contacts.find();
  return res.status(200).json(contacts);
};
// // 2
const getContactID = async (req, res) => {
  const { contactId } = req.params;
  const contactByid = await Contacts.findById(contactId);
  if (!contactByid) {
    throw HttpError(404, `Not found`);
  }
  res.json(contactByid);
};
// 3
const getContatAdd = async (req, res, next) => {
  const body = req.body;
  const newContact = await Contacts.create(body);
  return res.status(201).json(newContact);
};
// // 4
const getRemoveContact = async (req, res) => {
  const { contactId } = req.params;
  const contactRemove = await Contacts.findByIdAndRemove(contactId);
  if (!contactRemove) {
    throw HttpError(404, `Not found`);
  }
  res.status(200).json({ message: "contact deleted" });
};
// // 5
const getContactUpdate = async (req, res) => {
  const body = req.body;
  const { contactId } = req.params;
  const contactUpdate = await Contacts.findByIdAndUpdate(contactId, body);
  if (!contactUpdate) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json(contactUpdate);
};
// 6
const updateStatusContact = async (req, res) => {
  const body = req.body;
  const { contactId } = req.params;
  const contactUpdateStatus = await Contacts.findByIdAndUpdate(
    contactId,
    body,
    {
      new: true,
    }
  );
  if (!contactUpdateStatus) {
    throw HttpError(404, "Not found");
  }
  return res.status(200).json(contactUpdateStatus);
};
module.exports = {
  getContacts: wrapperCntrl(getContacts),
  getContactID: wrapperCntrl(getContactID),
  getContatAdd: wrapperCntrl(getContatAdd),
  getRemoveContact: wrapperCntrl(getRemoveContact),
  getContactUpdate: wrapperCntrl(getContactUpdate),
  updateStatusContact: wrapperCntrl(updateStatusContact),
};
