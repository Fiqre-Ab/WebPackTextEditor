import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) =>{
 // Open a connection to the database
  const jateDb = await openDB('jate', 1);
  //Start a new transaction and specify the store and data privileges
  const tx = jateDb.transaction('jate', 'readwrite');
  // Open up the desired object store
  const store = tx.objectStore('jate');
   // Use the .put() method to update an item in the store, or add it if it doesn't exist
  const request = store.put({ id: 1, content });
  // Confirm the request
  const result = await request;
  console.log('Data saved to the database', result);
};
// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => { // Open a connection to the database
  const jateDb = await openDB('jate', 1);
 // Start a new transaction and specify the store and data privileges
  const tx = jateDb.transaction('jate', 'readonly');
// Open up the desired object store
  const store = tx.objectStore('jate');

 // Use the .get() method to get an item from the store
  const request = store.get(1); // Assuming you are retrieving the item with id 1
  // Confirm the request
  const result = await request;
  console.log('Data retrieved from the database', result);
  return result?.content;
};
  
initdb();
