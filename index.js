import  * as contactsService  from "./contacts.js";
import { Command } from "commander";

const program = new Command();
program
  .option('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone');

program.parse(process.argv);

const argv = program.opts();

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case 'list':
        const contactsList = await contactsService.listContacts();
        return console.table(contactsList);

    case 'get':
      const oneContact = await contactsService.getContactById(id);
      return console.log(oneContact);

    case 'add':
      const newContact = await contactsService.addContact({name, email, phone});
      return console.log(newContact);
      
    case 'remove':
      const removedContact = await contactsService.removeContact(id);
      return console.log(removedContact);

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
}

invokeAction(argv);