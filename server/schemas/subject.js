const mongoose = require("mongoose");

// Define the schema for the User collection
const subjectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  totalMarks: {
    type: Number,
    required: true,
  },
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Teacher", // Reference to the Teacher schema
    // required: true,
  },
});

// Create a model using the schema
const Subject = mongoose.model("Subject", subjectSchema);

module.exports = Subject;
