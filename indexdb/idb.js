import { openDB } from 'idb';

async function useDB () {
   
openDB('db1', 1, {
    upgrade(db) {
      db.createObjectStore('store1');
      db.createObjectStore('store2');
    },
  });
  openDB('db2', 1, {
    upgrade(db) {
      db.createObjectStore('store3', { keyPath: 'id' });
      db.createObjectStore('store4', { autoIncrement: true });
    },
  });
  }
  
  useDB();

