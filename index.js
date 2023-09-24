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
        const movieList = await contactsService.listContacts();
        return console.table(movieList);

    case 'get':
      const oneMovie = await contactsService.getContactById(id);
      return console.log(oneMovie);

    case 'add':
      const newMovie = await contactsService.addContact({name, email, phone});
      return console.log(newMovie);
      
    case 'remove':
      const removedMovie = await contactsService.removeContact(id);
      return console.log(removedMovie);

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
}

invokeAction(argv);