const mongoose = require("mongoose");

// Define the schema for the User collection
const memberSchema = new mongoose.Schema({
  email: {
    type: String, 
    required: true,
  },
  role: {
    type: String, 
    required: true,
  }
});

// Create a model using the schema
const Member = mongoose.model("Member", memberSchema, "members");
module.exports = Member;