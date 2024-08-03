const mongoose = require("mongoose");

function connectWithDatabase(populate) {
  // Connection URL
  const url =
    "mongodb+srv://Mongo2099:futureman2099@cluster0.inxix.mongodb.net";

  // Database Name
  const dbName = "cantt-college";

  // Connect to MongoDB
  mongoose
    .connect(`${url}/${dbName}`)
    .then(() => {
      console.log("Connected successfully to MongoDB");
      if (populate) {
        console.log("Since this is the first run, am about to populate database!");
        populateDatabase()
      }
    })
    .catch((error) => console.error("Error occurred while connecting to MongoDB:", error));
}

function populateDatabase() {
  // populate initial database items
}

module.exports = {
    connectWithDatabase
};