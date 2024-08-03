const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  googleId: String, // Assuming you're using Google OAuth
  // Add other user properties as needed
  name: {
    type: String,
    required: true
  },
  role: {
    type: String, // Principal / Admin / Teacher
    required: true
  },
  email: {
    type: String, // Principal / Admin / Teacher
    required: true
  },
});
const User = mongoose.model("User", userSchema, "users");

module.exports = User;