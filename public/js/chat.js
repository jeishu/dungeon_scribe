const chatForm = document.getElementById("chat-form");
const chatMessages = document.querySelector(".chat-messages");
const roomName = document.getElementById("room-name");
const userList = document.getElementById("users");
<<<<<<< HEAD
const newRoom = document.getElementById("chatName");
const roomList = document.getElementById("room");
=======
const rollForm = document.getElementById("rollForm");
const modVal = document.querySelector(".chooseMod");
>>>>>>> cd8ab9125bb62780370e1c9ce79aaa8dcbf27bb5

const { username, room } = Qs.parse(location.search, {
  ignoreQueryPrefix: true,
});

const socket = io();

socket.emit("joinRoom", { username, room });

newRoom.addEventListener("submit", (e) => {
  e.preventDefault();

  console.log("good job");

  let room = newRoom.value;

  console.log(room);

  if (!room) {
    return false;
  }

  const rooms = `<option value="${room}">${room}</option>`;

  roomList.appendChild(rooms);
});

chatForm.addEventListener("submit", (e) => {
  e.preventDefault();

  let msg = e.target.elements.msg.value;

  msg = msg.trim();

  if (!msg) {
    return false;
  }

  socket.emit("chatMessage", msg);

  e.target.elements.msg.value = "";
  e.target.elements.msg.focus();
});

// CSS the Message bubbles
function outputMessage(message) {
  const div = document.createElement("div");
  div.classList.add("message");
  div.innerHTML = `<p class="meta">${message.username} <span>${message.time}</span></p>
  <p class="text">
    ${message.text}
  </p>`;
  document.querySelector(".chat-messages").appendChild(div);
}

function outputRoll(roll) {
  const div = document.createElement("div");
  div.classList.add("roll");
  div.innerHTML = `<p class="meta">${roll.username} <span>${roll.time}</span></p>
  <p class="text">
    ${roll.text}
  </p>`;
  document.querySelector(".chat-messages").appendChild(div);
}

function outputRoomName(room) {
  roomName.innerText = room;
}

// User names CSS
function outputUsers(users) {
  userList.innerHTML = `
    ${users.map((user) => `<li>${user.username}</li>`).join("")}
  `;
}

socket.on("roomUsers", ({ room, users }) => {
  outputRoomName(room);
  outputUsers(users);
});

<<<<<<< HEAD
socket.on("message", (message) => {
=======
socket.on("message", message => {
  // $.post("/api/chat", {
  //   body: message.text,
  //   time: message.time,
  // }).then((result) => result.json);

>>>>>>> cd8ab9125bb62780370e1c9ce79aaa8dcbf27bb5
  console.log(message);
  outputMessage(message);
  chatMessages.scrollTop = chatMessages.scrollHeight;
});

socket.on("roll", roll => {
  console.log(roll);
  outputRoll(roll);
  chatMessages.scrollTop = chatMessages.scrollHeight;
});

function getRadioVal (form, name) {
  var val;
  var radios = form.elements[name];

  for (var i = 0, length = radios.length; i < length; i++) {
    if (radios[i].checked) {
      val = radios[i].value;
      break;
    }
  }
  return val;
}


rollForm.addEventListener("submit", (e) => {
  e.preventDefault();
  var dieVal = getRadioVal(e.target, "choice");
  console.log(dieVal);
  var mod = modVal.value;
  console.log(mod);
  let roll = {
    dice: 1,
    sides: dieVal,
    mod
  };
  socket.emit("roll", roll);

  // e.target.elements.msg.value = "";
  // e.target.elements.msg.focus();
});