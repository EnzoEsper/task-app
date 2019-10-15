// CRUD Create Read Update Delete
const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;
const ObjectID = mongodb.ObjectID;

const connectionURL = "mongodb://127.0.0.1:27017";
const databaseName = "task-manager";

// creating our own IDs (in this case it must be added as a field in each document)
// const id = new ObjectID();
// console.log(id);
// console.log(id.getTimestamp());

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

    db.collection("users")
      .deleteMany({ age: 28 })
      .then(result => {
        console.log(result);
      })
      .catch(error => {
        console.log(error);
      });

    db.collection("tasks")
      .deleteOne({ description: "Do yoga" })
      .then(result => {
        console.log(result);
      })
      .catch(error => {
        console.log(error);
      });
  }
);
