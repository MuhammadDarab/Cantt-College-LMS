const mongoose = require("mongoose");

function connectWithDatabase() {
  // Connection URL
  const url =
    "mongodb+srv://Mongo2099:futureman2099@cluster0.inxix.mongodb.net";

  // Database Name
  const dbName = "cantt-college";

  // Connect to MongoDB
  mongoose
    .connect(`${url}/${dbName}`)
    .then(() => console.log("Connected successfully to MongoDB"))
    .catch((error) => console.error("Error occurred while connecting to MongoDB:", error));
}

module.exports = {
  connectWithDatabase
};