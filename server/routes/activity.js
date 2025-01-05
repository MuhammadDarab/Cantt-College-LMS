const express = require("express");
const router = express.Router();
const passport = require("passport");
// Routes

router.get("/get-all-activity", (req, res) => {
  try {
    
  } catch (error) {
    res.json({ success: false, error: error });
  }
});

module.exports = router;
