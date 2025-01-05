// Import required modules
const express = require("express");
const { connectWithDatabase } = require("./utils/database");
const cors = require("cors");

const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const session = require("express-session");

const students = require("./routes/students");
const subjects = require("./routes/subjects");
const faculty = require("./routes/faculty");
const activity = require("./routes/activity");
const members = require("./routes/members");

const User = require("./schemas/user");
const Member = require("./schemas/member");
const Category = require("./schemas/category");
const { initializeJobs } = require("./jobs/billing_cycle");
const { authMiddleWare } = require("./middlewares/auth");
const { recordActivity } = require("./utils/activity");
require("dotenv").config();

// Passport configuration
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: process.env.BACKEND_APP_URL + "/auth/google/callback"
    },
    async (accessToken, refreshToken, profile, done) => {
      // Check if the user's email is allowed
      const allowedUser = await Member.findOne({ email: profile.emails[0].value })
      if (!allowedUser) {
        return done(null, false, {
          message:
            "Unauthorized email address. Please contact your administrator.",
          redirectTo: process.env.FRONTEND_APP_URL + "/not-authorized", // Redirect URL
        });
      }

      // Check if the user already exists in the database
      const existingUser = await User.findOne({ googleId: profile.id });
      if (!existingUser) {
        // If user doesn't exist, create a new user
        const user = {
          googleId: profile.id,
          name: profile.displayName,
          role: allowedUser.role,
          email: profile.emails[0].value,
        };
        const newUser = new User(user);

        // Save the new user to the database
        const savedUser = await newUser.save();
        done(null, savedUser);
      }

      if (existingUser) {
        // If user already exists, return the existing user
        return done(null, existingUser);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

const app = express();
const port = process.env.PORT || 8000;
app.use(express.json());

app.use(
  cors({
    origin: process.env.FRONTEND_APP_URL,
    credentials: true,
  })
);

app.set('trust proxy', 1);
app.use(
  session({
    secret: "your_secret_here",
    cookie: {
      secure: process.env.ENVIRONMENT == 'production' ? true : false,
      maxAge: 8.64e+7,
      sameSite: process.env.ENVIRONMENT == 'production' ? "none" : false
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Routes
app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: process.env.FRONTEND_APP_URL + "/not-authorized",
  }),
  function (req, res) {
    // Successful authentication, redirect to client-side route
    res.redirect(process.env.FRONTEND_APP_URL + "/dashboard");
  }
);

app.get("/api/user", (req, res) => {
  try {
    if (req.user) {
      res.status(200).json({
        ...req.user,
        authorized: true,
        message: 'You have been authorized successfully'
      });
    } else {
      res.status(401).json({
        authorized: false,
        message: 'Un-authorized'
      })
    }
  } catch (error) {
    console.log('Auth Error: ', error);
    res.json({
      authorized: false,
      message: error
    });
  }
});

// Logout route
app.get("/logout", (req, res) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect(process.env.FRONTEND_APP_URL);
  });
});

app.use("/students", authMiddleWare, recordActivity, students);
app.use("/subjects", authMiddleWare, recordActivity, subjects);
app.use("/faculty", authMiddleWare, recordActivity, faculty);
app.use("/members", authMiddleWare, recordActivity, members);
app.use("/activity", authMiddleWare, activity);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  connectWithDatabase();
  // initializeJobs();
  return true;
});