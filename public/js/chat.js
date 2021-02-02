const chatForm = document.getElementById("chat-form");
const chatMessages = document.querySelector(".chat-messages");
const roomName = document.getElementById("room-name");
const userList = document.getElementById("users");
const rollForm = document.getElementById("rollForm");
const modVal = document.querySelector(".chooseMod");

const { username, room } = Qs.parse(location.search, {
  ignoreQueryPrefix: true,
});

const socket = io();

socket.emit("joinRoom", { username, room });

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
  userList.innerHTML = "";
  users.forEach(user=>{
    let userClean = user.username.replace(/-/g, " ");
    const li = document.createElement("li");
    li.innerText = userClean;
    userList.appendChild(li);
  });
}

socket.on("roomUsers", ({ room, users }) => {
  outputRoomName(room);
  outputUsers(users);
});

socket.on("message", message => {
  // $.post("/api/chat", {
  //   body: message.text,
  //   time: message.time,
  // }).then((result) => result.json);

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