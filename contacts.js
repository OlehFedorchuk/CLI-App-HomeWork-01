
import fs from 'fs/promises';
import path from 'path';
import { nanoid } from 'nanoid';

const contactsPath = path.resolve("db","contacts.json") ;

  const updateMovies = allMovies => {
    fs.writeFile(contactsPath, JSON.stringify(allMovies, null, 2));
  }

export const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
 return JSON.parse(data);

  };
 
export const getContactById = async(id)=> {
  const movies = await listContacts();
  const result = movies.find(item => item.id === id);
  return result || null;
}

export const addContact = async ({name, email, phone}) => {
  const movies = await listContacts();
  const newMovie = {
    id: nanoid(),
    name,
    email,
    phone,
  }
  movies.push(newMovie);
  await fs.writeFile(contactsPath, JSON.stringify(movies, null, 2));
  return newMovie;
}
export const removeContact = async (id) => {
const allMovies = await listContacts();
const index = allMovies.findIndex(item => item.id === id);
if(index === -1){
  return null;
}
const [result] = allMovies.splice(index, 1);
updateMovies(allMovies);
return result;
}



