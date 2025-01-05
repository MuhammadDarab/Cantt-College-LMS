const mongoose = require("mongoose");

// Define the schema for the User collection
const activitySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create a model using the schema
const Activity = mongoose.model("Activity", activitySchema, "Activities");

module.exports = Activity;
