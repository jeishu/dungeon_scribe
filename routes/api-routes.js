var db = require("../models");
var passport = require("../config/passport");

module.exports = function (app) {
  app.post("/api/login", passport.authenticate("local"), function (req, res) {
    res.json(req.user); // send user to login
  });

  app.post("/api/signup", function (req, res) {
    // signing up a new user
    db.User.create({
      // we can add to this to create a username and maybe ask for a full name
      email: req.body.email,
      password: req.body.password,
    })
      .then(function () {
        res.redirect(307, "/api/login");
      })
      .catch(function (err) {
        res.status(401).json(err);
      });
  });

  app.get("/logout", function (req, res) {
    req.logout(); // logout and send to homepage
    res.redirect("/");
  });

  app.get("/api/user_data", function (req, res) {
    // user data stored for use later
    if (!req.user) {
      res.json({});
    } else {
      res.json({
        // if more user data is collected it should be added here
        email: req.user.email, // dont put the password here
        id: req.user.id,
      });
    }
  });
};
