// CRUD Create Read Update Delete
const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;
const ObjectID = mongodb.ObjectID;

const connectionURL = "mongodb://127.0.0.1:27017";
const databaseName = "task-manager";

// creating our own IDs (in this case it must be added as a field in each document)
const id = new ObjectID();
console.log(id);
console.log(id.getTimestamp());

MongoClient.connect(
  connectionURL,
  { useNewUrlParser: true },
  (error, client) => {
    if (error) {
      return console.log("Unable to connect to database");
    }

    // Gives back a database reference to manipulate it, there is no need to create
    // the database in the GUI or something... Simply by picking a name and accesing it
    // mongodb will create for us.
    const db = client.db(databaseName);

    // db.collection("users").insertOne(
    //   {
    //     name: "Oliver",
    //     age: 33
    //   },
    //   (error, result) => {
    //     if (error) {
    //       return console.log("Unable to insert user");
    //     }

    //     // ops contains all of the documents that were inserted (array of documents)
    //     console.log(result.ops);
    //   }
    // );

    // db.collection("users").insertMany(
    //   [
    //     {
    //       name: "Dada",
    //       age: 28
    //     },
    //     {
    //       name: "Life",
    //       age: 18
    //     }
    //   ],
    //   (error, result) => {
    //     if (error) {
    //       return console.log("Unable to insert documents");
    //     }

    //     console.log(result.ops);
    //   }
    // );

    // db.collection("tasks").insertMany(
    //   [
    //     {
    //       description: "Do yoga",
    //       completed: false
    //     },
    //     {
    //       description: "View tutorials",
    //       completed: true
    //     }
    //   ],
    //   (error, result) => {
    //     if (error) {
    //       return console.log("Unable to insert tasks");
    //     }

    //     console.log(result.ops);
    //   }
    // );
  }
);
