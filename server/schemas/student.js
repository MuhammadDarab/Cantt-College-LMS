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
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },
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
    bankName: String,             // Al-barka
    bankNo: String,               // 000912499124123123
    transactionHistory: [{
      month: String,              // April
      year: String,               // 2024
      admissionFee: String,       // 3000
      tuitonFee: String,          // 2000
      annualCharges: String,      // 1000
      totalPaid: String,          // 1000
      status: String,             // partial | pending | paid
      installments: [{
        datePaid: String,         // 12 April, 2024
        paidAmount: String,       // 1000
      }],
    }],
  },
});

// Create a model using the schema
const Student = mongoose.model("Student", studentSchema, "students");

module.exports = Student;
