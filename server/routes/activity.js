const express = require("express");
const router = express.Router();
const passport = require("passport");
// Routes

router.get("/get-all-activity", (req, res) => {
  try {
    const items = [
      {
        title: "Muhammad Darab added a new student Haseeb Ali",
        createdAt: new Date(2024, 7, 1, 10, 0),
        severity: "LOW",
      },
      {
        title: "Ahmed Qureshi archived faculty member Mr. Farooq",
        createdAt: new Date(2024, 7, 3, 14, 15),
        severity: "MEDIUM",
      },
      {
        title: "Usman Tariq archived faculty member Mr. Yaseen",
        createdAt: new Date(2024, 7, 6, 16, 30),
        severity: "MEDIUM",
      },
      {
        title: "Hamza Khan added a new student Imran Ali",
        createdAt: new Date(2024, 7, 7, 17, 45),
        severity: "LOW",
      },
      {
        title: "Saad Ahmed uploaded results for 3rd year",
        createdAt: new Date(2024, 7, 8, 8, 30),
        severity: "MEDIUM",
      },
      {
        title: "Ali Hassan gave role 'principal' to Muhammad Darab",
        createdAt: new Date(2024, 7, 4, 9, 45),
        severity: "HIGH",
      },
      {
        title: "Ibrahim Shah archived faculty member Mr. Rashid",
        createdAt: new Date(2024, 7, 10, 15, 0),
        severity: "HIGH",
      },
      {
        title: "Muhammad Darab added a new student Haseeb Ali",
        createdAt: new Date(2024, 7, 1, 10, 0),
        severity: "LOW",
      },
    ].reverse();
    res.json(items);
  } catch (error) {
    res.json({ success: false, error: error });
  }
});

module.exports = router;
