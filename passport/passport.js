const passport = require("passport");
const User = require("../models/user");

var GoogleStrategy = require("passport-google-oauth20").Strategy;

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID:
        "902608766151-65r0ksltbc6cmgtia1mc0oiko5ru4nd1.apps.googleusercontent.com",
      clientSecret: "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",
      callbackURL: "http://localhost:4000/auth/google/callback",
    },
    (accessToken, refreshToken, profile, next) => {
      console.log("MY PROFILE", profile._json.email);
      User.findOne({ email: profile._json.email }).then((user) => {
        if (user) {
          console.log("User already exits in DB", user);
          next(null, user);
          cookietoken();
        } else {
          User.create({
            name: profile.displayName,
            googleId: profile.id,
            email: profile._json.email,
          })
            .then((user) => {
              console.log("New User", user);
              next(null, user);
              // cookietoken()
            })
            .catch((err) => console.log(err));
        }
      });

      next();
    }
  )
);
