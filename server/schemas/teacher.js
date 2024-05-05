const mongoose = require("mongoose");

// Define the schema for the User collection
const teacherSchema = new mongoose.Schema({
  teacherName: {
    type: String,
    required: true,
  },
  fatherName: {
    type: String,
    required: true,
  },
  rollNo: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  dateOfBirth: {
    type: Date,
    default: null,
    required: true,
  },
});

// Create a model using the schema
const Teacher = mongoose.model("Teacher", teacherSchema);

module.exports = Teacher;
