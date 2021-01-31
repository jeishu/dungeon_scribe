const sessionForm = document.getElementById("submitChat");
const chatName = document.getElementById("chatName");
const roomList = document.getElementById("room");

sessionForm.addEventListener("submit", (e) => {
  e.preventDefault();

  let room = chatName.value;

  room = room.trim();

  let roomValue = room.replace(/ /g, "-");

  if (!room) {
    return false;
  }

  let option = document.createElement("option");

  option.text = room;
  option.value = roomValue;

  console.log(roomList);

  let exists = false;
  let roomLength = roomList.length;

  while (roomLength--) {
    if (roomList.options[roomLength].value === roomValue) {
      console.log(roomList.options[roomLength].value);
      exists = true;
      break;
    }
  }

  if (exists === false) {
    roomList.add(option); // option contains new room at this point
  }
});

$(document).ready(function () {
  // figure out which user is logged in and update page
  $.get("/api/user_data").then(function (data) {
    $(".member-name").text(data.email);
  });
});
