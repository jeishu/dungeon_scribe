var db = require("../models");
var passport = require("../config/passport");
let userInfo;

module.exports = function (app) {
  app.post("/api/login", passport.authenticate("local"), function (req, res) {
    userInfo = req.user;
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

  app.post("/api/character", function (req, res) {
    // create a new character
    db.Character.create({
      name: req.body.body,
      UserId: userInfo.dataValues.id
    })
      .catch(function (err) {
        res.status(401).json(err);
      });
  });

  app.post("/api/favorite", function (req, res) {
    // create a new favorite
    db.Favorite.create({
      move: req.body.body,
      success_mod: req.body.body,
      dmg: req.body.body,
      dmg_mod: req.body.body,
      // CharacterId: 
    })
      .catch(function (err) {
        res.status(401).json(err);
      });
  });
  // app.post("/api/chat", function (req, res) {
    // signing up a new user
    // db.Chat.create({
      // we can add to this to create a username and maybe ask for a full name
  //     body: req.body.body,
  //     time: req.body.time,
  //   })
  //     .catch(function (err) {
  //       res.status(401).json(err);
  //     });
  // });

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
