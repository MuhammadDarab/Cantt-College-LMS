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
    required: true,
  },
  subjects: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Subject",
  }],
  fatherCnic: {
    type: String,
    required: true,
  },
  fatherPhoneNo: {
    type: String,
    required: true,
  },
  previousBoard: {
    type: String,
    required: true,
  },
  previousAcademicType: {
    type: String,
    required: true,
  },
  previousAcademicMarks: {
    type: String,
    required: true,
  },
  chargeDetails: {
    admissionFee: {
      type: String,
      required: true,     // Only when a new user is created, then never again.
    },
    tuitonFee: {
      type: String,
      required: true,     // Updates on 1st of every month start.
    },
    annualCharges: {
      type: String,
      required: true,     // Updates on 1st of every year start.
    },
    fine: {
      type: String,
      required: true,     // Conditionally updates.
    },
  }
});

// Create a model using the schema
const Student = mongoose.model("Student", studentSchema);

module.exports = Student;
