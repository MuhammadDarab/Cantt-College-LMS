const mongoose = require("mongoose");

// Define the schema for the User collection
const categorySchema = new mongoose.Schema({
  title: {
    type: String, // G.Science, Medical, Humanities.
    required: true,
  },
  subjects: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subject",
    },
  ],
});

// Create a model using the schema
const Category = mongoose.model("Category", categorySchema, "categories");

module.exports = Category;
