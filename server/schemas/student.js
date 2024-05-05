const mongoose = require("mongoose");

// Define the schema for the User collection
const studentSchema = new mongoose.Schema({
  studentName: {
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
    type: String,
    default: null,
    required: true,
  },
  enrolledIn: {
    type: String,
    required: true
  }
});

// Create a model using the schema
const Student = mongoose.model("Student", studentSchema);

module.exports = Student;
