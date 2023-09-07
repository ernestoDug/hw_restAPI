const fs = require('fs/promises');
const path = require("path");
const { randomUUID } = require("crypto");


const contactsPath = path.join(__dirname, "/../models/contacts.json");

const writeUser = async (contacts) => {
  return await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
};


// 1
const listContacts = async () => {
    const data = await fs.readFile(contactsPath);
 return JSON.parse(data);
  
}
// 2
const getContactById = async (contactId) => {
     const contacts = await listContacts();
    const findContact = contacts.find((contact) => contact.id === contactId);
    // console.log(findContact || null);
    return findContact || null;
 };
// 3
const addContact = async (body) => {
  try {    
    const contacts = await listContacts();
    const contact = { id: randomUUID(), ...body };
    contacts.push(contact);
   await writeUser(contacts);
    console.log(contact);
   return contact;
  
  } catch (error) {
    console.log("cannot read id");
  }
  };
// 4
const removeContact = async (contactId) => {
  // const dateForDell = await listContacts();
  // const index = dateForDell.findIndex((cont) => cont.id === contactId);
  // const deletedcont = dateForDell[index];
  // if (index !== -1) {
  //   dateForDell.splice(index, 1);
  //   await fs.writeFile(contactsPath, JSON.stringify(dateForDell, null, 2));
  // }
  // console.log(deletedcont || null);
  // return deletedcont;
}


const updateContact = async (contactId, body) => {}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}