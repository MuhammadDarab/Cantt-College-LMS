const express = require("express");
const Subject = require("../schemas/subject");

const router = express.Router();

router.get("/get-all-subjects", async (req, res) => {
  try {
    const students = await Subject.find({});
    res.send(students);
  } catch (error) {
    res.send(error);
  }
});

router.post("/get-subject-by-id", async (req, res) => {
  try {
    const studentId = req.body.studentId;
    if (!studentId) {
      res.send(400);
    }
    const students = await Student.findOne({ _id: studentId });
    res.send(students);
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;
