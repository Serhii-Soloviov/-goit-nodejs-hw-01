const fs = require("fs/promises");
const path = require("path");
const { v4 } = require("uuid");

const contactsPath = path.join(__dirname, "db/contacts.json");

async function listContacts() {
  const data = await fs.readFile(contactsPath);
  const list = JSON.parse(data);
  return list;
}

async function getContactById(contactId) {
  const list = await listContacts();
  const contact = list.find((item) => item.id === contactId);
  if (!contact) {
    return null;
  }
  return contact;
}

async function removeContact(contactId) {
  const list = await listContacts();
  const idx = list.findIndex((item) => item.id === contactId);
  if (idx === -1) {
    return null;
  }
  const newContact = list.filter((_, index) => index !== idx);
  await fs.writeFile(contactsPath, JSON.stringify(newContact));
  return list[idx];
}

async function addContact(name, email, phone) {
  const list = await listContacts();
  const newContact = { name, email, phone, id: v4() };
  list.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(list));
  return newContact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
