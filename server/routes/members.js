const express = require("express");
const Member = require("../schemas/member");
const router = express.Router();

router.get("/get-all-members", async (req, res) => {
  try {
    const members = await Member.find();
    res.json(members);
  } catch (error) {
    res.json({ error: true });
  }
});

router.get("/get-member/:id", (req, res) => {
  try {
    res.json({});
  } catch (error) {
    res.json({ error: true });
  }
});

router.post("/authorize-user", async (req, res) => {
  try {
    const { email, role } = req.body;
    const allowedMember = await Member.create({ email, role });
    res.json(allowedMember);
  } catch (error) {
    res.json({ error: true });
  }
});

module.exports = router;
