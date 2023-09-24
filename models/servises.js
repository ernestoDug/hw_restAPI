// const fs = require("fs/promises");
// const path = require("path");
// const { nanoid } = require("nanoid");

// const contactsPath = path.join(__dirname, "/../models/contacts.json");
// // f запису
// const writeContacts = async (contacts) => {
//   return await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
// };
// // 1
// const listContacts = async () => {
//   const data = await fs.readFile(contactsPath);
//   return JSON.parse(data);
// };
// // 2
// const getContactById = async (contactId) => {
//   const contacts = await listContacts();
//   const findContact = contacts.find((contact) => contact.id === contactId);
//   return findContact || null;
// };
// // 3
// const addContact = async (body) => {
//   const contacts = await listContacts();
//   const contactNew = {
//     id: nanoid(),
//     ...body,
//   };
//   contacts.push(contactNew);
//   await writeContacts(contacts);
//   return contactNew;
// };
// // 4
// const removeContact = async (contactId) => {
//   const contacts = await listContacts();
//   const index = contacts.findIndex((cont) => cont.id === contactId);
//   const deletedcont = contacts[index];
//   if (index !== -1) {
//     contacts.splice(index, 1);
//     await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
//   }
//   return deletedcont || null;
// };
// // 5
// const updateContact = async (id, body) => {
//   const contacts = await listContacts();
//   const contactIndex = contacts.findIndex(
//     (contact) => contact.id === id
//   );
//   if (contactIndex !== -1) {
//     contacts[contactIndex] = { id, ...body };
//     await writeContacts(contacts);
//   }
//   return contacts[contactIndex] || null;
// };

// module.exports = {
//   listContacts,
//   getContactById,
//   removeContact,
//   addContact,
//   updateContact,
// };
