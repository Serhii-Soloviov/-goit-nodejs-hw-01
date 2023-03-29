const contactOperation = require("./contacts");
//--------------------Command----------------------------//
const { Command } = require("commander");
const program = new Command();

//---------------------Концпект/HW--------------------------//
// const argv = require("yargs").argv;

//-------------------Приклад з відео--------------------//
// const yargs = require("yargs");
// const { hideBin } = require("yargs/helpers");

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const contacts = await contactOperation.listContacts();
      console.table(contacts);
      break;

    case "get":
      const contact = await contactOperation.getContactById(id);
      if (!contact) {
        throw new Erorr(`Contatc not found with ${id}`);
      }
      console.log(contact);
      break;

    case "add":
      const newContact = await contactOperation.addContact(name, email, phone);
      console.log(newContact);
      break;

    case "remove":
      const removeContact = await contactOperation.removeContact(id);
      console.log(removeContact);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}
//--------------------Command----------------------------//

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);
const argv = program.opts();
invokeAction(argv);

//-------------------Приклад з відео--------------------//

// const arr = hideBin(process.argv);
// const { argv } = yargs(arr);
// // const {argv} = yargs(process.argv.slice(2));
// invokeAction(argv);
//---------------------Концпект/HW--------------------------//

// invokeAction(argv);
