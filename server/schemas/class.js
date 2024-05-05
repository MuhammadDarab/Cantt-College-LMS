const mongoose = require("mongoose");

// Define the schema for the User collection
const classSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  subjects: [
    {
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
        required: true,
      },
    },
  ],
});

// Create a model using the schema
const Class = mongoose.model("Class", classSchema);

module.exports = Class;
