const mongoose = require("mongoose");

// Define the schema for the User collection
const facultySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  cnic: {
    type: String,
    required: true,
  },
  telephone: {
    type: String,
    required: true,
  },
  dateOfJoining: {
    type: String,
    default: null,
    required: true,
  },
  category: {  // Teaching / Non-Teaching
    type: String,
    required: true,
  },
  salary: {
    type: String,
    required: true,
  },
  contractType: {  // Permanent / Visiting
    type: String,
    required: true
  }
});

// Create a model using the schema
const Faculty = mongoose.model("Faculty", facultySchema, "faculties");

module.exports = Faculty;
