const express = require("express");
const Student = require("../schemas/student");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const students = await Student.find({});
    res.send(students);
  } catch (error) {
    res.send(error);
  }
});

router.post("/get-by-id", async (req, res) => {
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

router.post("/admit-student", (req, res) => {
  const { studentName, fatherName, rollNo, address, dateOfBirth, enrolledIn } =
    req.body;
  console.log({
    studentName,
    fatherName,
    rollNo,
    address,
    dateOfBirth,
    enrolledIn,
  });
  if (
    !studentName ||
    !fatherName ||
    !rollNo ||
    !address ||
    !dateOfBirth ||
    !enrolledIn
  ) {
    res.send(400);
    return -1;
  }
  // Create a new Student document
  const newStudent = new Student({
    studentName,
    fatherName,
    rollNo,
    address,
    dateOfBirth,
    enrolledIn,
  });

  // Save the new student to the database
  newStudent
    .save()
    .then((student) => {
      console.log("New student created:", student);
      res.status(201).json(student);
    })
    .catch((error) => {
      console.error("Error creating student:", error);
      res.status(500).json({ error: "Internal Server Error" });
    });
});

router.post("/update-student", async (req, res) => {
  try {
    const id = req.body.id;
    if (!id) {
      res.send(400);
      return -1;
    }

    const updatedStudent = await Student.findOneAndUpdate(
      { _id: id },
      req.body.fields, // To only update the changed fields.
      { new: true } // Return the modified document rather than the original
    );

    if (!updatedStudent) {
      res.status(404).send("Student not found");
      return;
    }

    res.status(200).send(updatedStudent);
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;
