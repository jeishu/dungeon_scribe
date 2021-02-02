var db = require("../models");
var passport = require("../config/passport");
// let userInfo;

module.exports = function (app) {
  app.post("/api/login", passport.authenticate("local"), function (req, res) {
    // userInfo = req.user;

    res.json(req.user); // send user to login
    // console.log(userInfo);
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

  app.get("/api/user/:id", function (req, res) {
    db.User.findOne({
      where: {
        id: req.params.id,
      },
    }).then(function (dbUser) {
      res.json(dbUser);
    });
  });

  app.get("/api/user/:email", function (req, res) {
    db.User.findOne({
      where: {
        email: req.params.email,
      },
    }).then(function (dbUser) {
      res.json(dbUser);
    });
  });

  app.post("/api/character", function (req, res) {
    console.log(req.body.name, req.body.UserId);
    // create a new character
    db.Character.create({
      name: req.body.name,
      UserId: req.body.UserId,
    })
      .then(function (dbCharacter) {
        res.json(dbCharacter);
      })
      .catch(function (err) {
        res.status(401).json(err);
      });
  });

  app.get("/api/character/:id", function (req, res) {
    // Here we add an "include" property to our options in our findOne query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.Post
    db.Character.findOne({
      where: {
        id: req.params.id,
      },
      include: [db.Character],
    }).then(function (dbCharacter) {
      res.json(dbCharacter);
    });
  });

  app.get("/api/characters/:id", function (req, res) {
    // create a new favorite
    db.Character.findAll({
      where: {
        UserId: req.params.id,
      },
    }).then(function (result) {
      console.log(JSON.stringify(result));
      // let resultArray = result.map(x => {
      //   id: x.id,
      //   name: x.name
      // });

      let resultArr = [];
      for (let i = 0; i < result.length; i++) {
        resultArr.push({
          id: result[i].id,
          name: result[i].name
        });
      }
      res.json(resultArr);
    });
  });

  app.post("/api/favorite", function (req, res) {
    // create a new favorite
    db.Favorite.create({
      // eslint-disable-next-line camelcase
      moveName: req.body.body,
      // eslint-disable-next-line camelcase
      successMod: req.body.body,
      // eslint-disable-next-line camelcase
      numDmgDice: req.body.body,
      // eslint-disable-next-line camelcase
      sidesDmgDice: req.body.body,
      // eslint-disable-next-line camelcase
      dmgMod: req.body.body,
      // CharacterId: ,
    }).catch(function (err) {
      res.status(401).json(err);
    });
  });

  app.get("/api/favorite", function (req, res) {
    // create a new favorite
    db.Favorite.findAll({
      include: [db.Favorite],
    }).then(function (dbFavorite) {
      res.json(dbFavorite);
    });
  });

  app.post("/api/session", function (req, res) {
    // create a new favorite
    db.Session.create({
      // eslint-disable-next-line camelcase
      sessionName: req.body.body,
    }).catch(function (err) {
      res.status(401).json(err);
    });
  });

  // app.post("/api/chat", function (req, res) {
  //   db.Chat.create({
  //     body: req.body.body,
  //     time: req.body.time,
  //     CharacterId: ,
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
