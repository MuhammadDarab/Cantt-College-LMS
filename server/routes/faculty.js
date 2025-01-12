const express = require("express");
const Faculty = require("../schemas/faculty");

const router = express.Router();

router.get("/get-complete-faculty", async (req, res) => {
  try {
    const facultyMembers = await Faculty.find({});
    res.send(facultyMembers);
  } catch (error) {
    res.send(error);
  }
});

router.post("/admit-faculty-member", (req, res) => {
  const {
    name,
    cnic,
    telephone,
    dateOfJoining,
    category,
    contractType,
    salary,
  } = req.body;
  if (
    !name ||
    !cnic ||
    !telephone ||
    !dateOfJoining ||
    !category ||
    !contractType ||
    !salary
  ) {
    res.send(400);
    return -1;
  }
  // Create a new Student document
  const newFacultyMember = new Faculty({
    name,
    cnic,
    telephone,
    dateOfJoining,
    category,
    contractType,
    salary,
  });

  // Save the new student to the database
  newFacultyMember
    .save()
    .then((member) => {
      console.log("New faculty member created");
      res.status(201).json(member);
    })
    .catch((error) => {
      console.error("Error creating faculty member:", error);
      res.status(500).json({ error: "Internal Server Error" });
    });
});

router.post("/update-faculty-member", async (req, res) => {
  try {
    const id = req.body.id;
    if (!id) {
      res.send(400);
      return -1;
    }

    const updatedFacultyMember = await Faculty.findOneAndUpdate(
      { _id: id },
      req.body.fields, // To only update the changed fields.
      { new: true } // Return the modified document rather than the original
    );

    if (!updatedFacultyMember) {
      res.status(404).send("Faculty member not found");
      return;
    }

    res.status(200).send(updatedFacultyMember);
  } catch (error) {
    res.send(error);
  }
});

router.post("/archive-faculty-member", async (req, res) => {
  try {
    const id = req.body.id;
    if (!id) {
      res.send(400);
      return -1;
    }
    const archivedFacultyMember = 
      await Faculty.findOneAndDelete({ _id: id });
    res.status(200).send(archivedFacultyMember);
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;
