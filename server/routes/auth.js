const express = require("express");
const router = express.Router();
const passport = require("passport");

// Routes
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    // Successful authentication, redirect to client-side route
    res.redirect("http://localhost:5173/dashboard");
  }
);

router.get("/user", (req, res) => {
    try {
        const user = req.user;
        if(user) {
            res.json({...user, authorized: true});
        } else {
            res.json({authorized: false});
        }
    } catch (error) {
        res.json({error: true});
    }
});

module.exports = router;
