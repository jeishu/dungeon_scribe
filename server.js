require("dotenv").config();
const path = require("path");
const http = require("http");
const express = require("express");
const session = require("express-session");
const passport = require("./config/passport");
const socketio = require("socket.io");
const formatMessage = require("./public/utils/messages");
const formatRoll = require("./public/utils/rolls");
const {
  userJoin,
  getCurrentUser,
  userLeave,
  getRoomUsers,
} = require("./public/utils/users");
const die = require("./lib/die");

const PORT = process.env.PORT || 8080;
const db = require("./models");

const app = express();
const server = http.createServer(app);
const io = socketio(server);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
app.use(
  session({ secret: "angry goblin", resave: true, saveUninitialized: true })
);
app.use(passport.initialize());
app.use(passport.session());

require("./routes/api-routes.js")(app);
require("./routes/html-routes.js")(app);

app.use(express.static(path.join(__dirname, "public")));

const botName = "Court Scribe";

io.on("connection", (socket) => {
  socket.on("joinRoom", ({ username, room }) => {
    const user = userJoin(socket.id, username, room);

    socket.join(user.room);

    socket
      .to(user.room)
      .emit("message", formatMessage(botName, "Welcome to Dungeon Scribe."));

    socket.broadcast.emit(
      "message",
      formatMessage(botName, `${user.username} has joined the game.`)
    );

    io.to(user.room).emit("roomUsers", {
      room: user.room,
      users: getRoomUsers(user.room),
    });
  });

  socket.on("chatMessage", (msg) => {
    const user = getCurrentUser(socket.id);
    let chatObj = formatMessage(user.username, msg);
    let SessionId;
    let CharacterId;
    io.to(user.room).emit("message", chatObj);
    // let chatObj = formatMessage(user.username, msg);
    console.log(user.room);
    db.Session.findOne({
      where: {
        sessionName: user.room,
      },
    }).then(function ({id}) {
      SessionId = id;
      db.Character.findOne({
        where: {
          name: user.username
        }
      }).then(function ({id}) {
        CharacterId = id;
        console.log(SessionId);
        console.log(CharacterId);
        db.Chat.create({
          body: chatObj.text,
          time: chatObj.time,
          CharacterId,
          SessionId
        }).catch(function (err) {
          console.log(err);
        });
      });
    });
  });

  socket.on("roll", (roll) => {
    const user = getCurrentUser(socket.id);
    let SessionId;
    let CharacterId;
    let rollOutput = `rolled a ${die(
      parseInt(roll.dice),
      parseInt(roll.sides),
      parseInt(roll.mod)
    )}`;
    console.log(rollOutput);
    let rollChat = formatRoll(user.username, rollOutput);

    io.to(user.room).emit("message", rollChat);
    db.Session.findOne({
      where: {
        sessionName: user.room,
      },
    }).then(function ({id}) {
      SessionId = id;
      db.Character.findOne({
        where: {
          name: user.username
        }
      }).then(function ({id}) {
        CharacterId = id;
        console.log(SessionId);
        console.log(CharacterId);
        db.Chat.create({
          body: rollChat.text,
          time: rollChat.time,
          CharacterId,
          SessionId
        }).catch(function (err) {
          console.log(err);
        });
      });
    });
  });

  socket.on("disconnect", () => {
    const user = userLeave(socket.id);

    if (user) {
      io.to(user.room).emit(
        "message",
        formatMessage(botName, `${user.username} has left the game.`)
      );

      io.to(user.room).emit("roomUsers", {
        room: user.room,
        users: getRoomUsers(user.room),
      });
    }
  });
});

db.sequelize.sync({
  // force: true
}).then(function () {
  server.listen(PORT, function () {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});
