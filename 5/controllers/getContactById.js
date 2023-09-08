const listContacts = require("./listContacts");

const getContactById = async (contactId) => {
    const contacts = await listContacts();
   const findContact = contacts.find((contact) => contact.id === contactId);
   return findContact || null;
};

module.exports = getContactById;

