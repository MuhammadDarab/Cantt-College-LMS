// Import required modules
const express = require('express');
const { connectWithDatabase } = require('./utils/database')
const cors = require('cors');
const students = require('./routes/students');

const app = express();
app.use(cors());
const port = process.env.PORT || 8000;
app.use(express.json());

app.use('/students', students);

// Start the server
app.listen(port, () => {
    connectWithDatabase();
    console.log(`Server is running on port ${port}`);
});