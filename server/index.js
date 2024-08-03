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
// const auth = require("./routes/auth");
const { web: OAuthDetails } = require("./oauth.json");
const User = require("./schemas/user");
const Category = require("./schemas/category");
const { initializeJobs } = require("./jobs/billing_cycle");
require("dotenv").config();

// Passport configuration
passport.use(
  new GoogleStrategy(
    {
      clientID: OAuthDetails.client_id,
      clientSecret: OAuthDetails.client_secret,
      callbackURL: "/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      console.log("PROFILE DATA", profile);

      // Check if the user's email is allowed
      const parsedAllowedUsers = JSON.parse(
        process.env.AUTHORIZED_USERS || "[]"
      );
      const allowedUser = parsedAllowedUsers.find(
        (user) => user.email == profile.emails[0].value
      );
      if (!allowedUser) {
        return done(null, false, {
          message:
            "Unauthorized email address. Please contact your administrator.",
          redirectTo: process.env.CLIENT_APP_URL + "/not-authorized", // Redirect URL
        });
      }

      // Check if the user already exists in the database
      const existingUser = await User.findOne({ googleId: profile.id });
      if (!existingUser) {
        // If user doesn't exist, create a new user
        const user = {
          googleId: profile.id,
          name: profile.displayName,
          role: JSON.parse(process.env.AUTHORIZED_USERS || "[]").find(
            (user) => user.email == profile.emails[0].value
          ).role,
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
app.set("trust proxy", 1);

app.use(
  cors({
    origin: process.env.CLIENT_APP_URL,
    credentials: true,
  })
);

app.use(
  session({
    secret: process.env.SESSION_SECRET || "your_secret_here",
    resave: true,
    proxy: true,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: true,
      maxAge: 1000 * 60 * 60 * 48,
      sameSite: "none",
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
    failureRedirect: process.env.CLIENT_APP_URL + "/not-authorized",
  }),
  function (req, res) {
    // Successful authentication, redirect to client-side route
    res.redirect(process.env.CLIENT_APP_URL + "/dashboard");
  }
);

app.get("/api/user", (req, res) => {
  try {
    res.json(req.user);
  } catch (error) {
    res.json({});
  }
});

// Logout route
app.get("/logout", (req, res) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect(process.env.CLIENT_APP_URL);
  });
});

app.use("/students", students);
app.use("/subjects", subjects);
app.use("/faculty", faculty);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  connectWithDatabase();
  return true;
});

// initializeJobs();
