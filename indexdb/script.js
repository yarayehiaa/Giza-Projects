// This works on all devices/browsers, and uses IndexedDBShim as a final fallback
const indexedDB =
  window.indexedDB ||
  window.mozIndexedDB ||
  window.webkitIndexedDB ||
  window.msIndexedDB ||
  window.shimIndexedDB;

// Open (or create) the database
const request = indexedDB.open("CarsDatabase", 1);

request.onerror = function (event) {
  console.error("An error occurred with IndexedDB");
  console.error(event);
};

// Create the schema on create and version upgrade
request.onupgradeneeded = function () {
  const db = request.result;
  const store = db.createObjectStore("cars", { keyPath: "id" }); //stores are known as tables in sql and collections in mongodb,keypath is primary key
  store.createIndex("cars_colour", ["colour"], { unique: false });
  store.createIndex("colour_and_make", ["colour", "make"], {
    unique: false,
  });//compound key for searching on multiple fields at once
};

request.onsuccess = function () {
  console.log("Database opened successfully");

  const db = request.result;
  const transaction = db.transaction("cars", "readwrite");

  const store = transaction.objectStore("cars");
  const colourIndex = store.index("cars_colour");//index lookups are faster than table scans
  const makeModelIndex = store.index("colour_and_make");

  // Add some data
  store.put({ id: 1, colour: "Red", make: "Toyota" }); //creating rows
  store.put({ id: 2, colour: "Red", make: "Kia" });
  store.put({ id: 3, colour: "Blue", make: "Honda" });
  store.put({ id: 4, colour: "Silver", make: "Seat" });

  // Query the data
  const idQuery = store.get(4);//lookup on the keypath by default
  const colourQuery = colourIndex.getAll(["Red"]);
  const colourMakeQuery = makeModelIndex.get(["Blue", "Honda"]);//only returns the first result bc we used get instead of getAll

  idQuery.onsuccess = function () {//every query has a success and error handler
    console.log("idQuery", idQuery.result);
  };

  colourQuery.onsuccess = function () {
    console.log("colourQuery", colourQuery.result);
  };

  colourMakeQuery.onsuccess = function () {
    console.log("colourMakeQuery", colourMakeQuery.result);
  };

  const deleteCar = store.delete(1); //minimize transactions to improve performance

  deleteCar.onsuccess = function () {
    console.log("Red Toyota has been removed");
  };
 



   const redCarKey = colourIndex.getKey(["Red"]);

  redCarKey.onsuccess = function () {
    const deleteCar = store.delete(redCarKey.result);

    deleteCar.onsuccess = function () {
      console.log("Red car has been removed");
    };
  };  





    const seat = store.get(4);

  seat.onsuccess = function () {
    seat.result.colour = "Green";
    store.put(seat.result);
  };  


  

  transaction.oncomplete = function () {
    db.close();// always close db connection, otherwise it will remain open and consume resources
  };
};