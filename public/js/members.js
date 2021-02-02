var slides = document.querySelectorAll(".slide");
var btns = document.querySelectorAll(".btn");
// let currentSlide = 1;

const sessionForm = document.getElementById("submitChat");
const chatName = document.getElementById("chatName");
const roomList = document.getElementById("room");
const characterForm = document.getElementById("submitChar");
const charName = document.getElementById("charName");
const charList = document.getElementById("char");
const charSelectList = document.getElementById("username");
// const userIdEl = document.querySelectorAll(".member-name");
const roomSelect = document.getElementById("room");

// how to change images manually
var manualNav = function (manual) {
  slides.forEach((slide) => {
    slide.classList.remove("active");

    btns.forEach((btn) => {
      btn.classList.remove("active");
    });
  });

  slides[manual].classList.add("active");
  slides[manual].classList.add("active");
};

btns.forEach((btn, i) => {
  btn.addEventListener("click", () => {
    manualNav(i);
    // currentSlide = i;
  });
});

// script for image to move automatically

// var repeat = function(activeClass){
var repeat = function () {
  let active = document.getElementsByClassName("active");
  let i = 1;

  var repeater = () => {
    setTimeout(function () {
      [...active].forEach((activeSlide) => {
        activeSlide.classList.remove("active");
      });

      slides[i].classList.add("active");
      btns[i].classList.add("active");
      i++;

      if (slides.length === i) {
        i = 0;
      }
      if (i >= slides.length) {
        return;
      }
      repeater();
    }, 10000);
  };
  repeater();
};

repeat();

function renderChars() {
  charList.innerHTML = "";
  charSelectList.innerHTML = "";
  // console.log(userIdEl);
  let userId = $(".member-name").attr("data-userId");
  console.log(userId);
  $.get(`/api/characters/${userId}`).then(function (data) {
    console.log(data[0]);
    data.forEach((char) => {
      let charEl1 = document.createElement("option");
      let charValue = char.name.replace(/ /g, "-");
      charEl1.setAttribute("value", charValue);
      charEl1.setAttribute("data-characterId", `${char.id}`);
      charEl1.innerText = `${char.name}`;
      charList.append(charEl1);

      let charEl2 = document.createElement("option");
      charEl2.setAttribute("value", charValue);
      charEl2.setAttribute("data-characterId", `${char.id}`);
      charEl2.innerText = `${char.name}`;
      charSelectList.append(charEl2);
    });
  });
}

function renderSessions() {
  roomSelect.innerHTML = "";
  let userId = $(".member-name").attr("data-userId");
  console.log(`roomSelect ${userId}`);
  $.get(`/api/sessions/${userId}`).then(function (data) {
    data.forEach(session => {
      let sessionEl = document.createElement("option");
      let sessionValue = session.sessionName.replace(/ /g, "-");
      sessionEL.setAttribute("value", sessionValue);
      sessionEl.setAttribute("data-sessionId", `${session.id}`);
      sessionEl.innerText = `${session.name}`;
      roomSelect.append(sessionEl);
    });
  });
}

characterForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let userId = $(".member-name").attr("data-userId");
  let char = charName.value; // grab the content of the input
  char = char.trim(); // clean up any extra spaces around input
  // let charValue = char.replace(/ /g, "-"); // reformat inputs to work as searchable values

  if (!char) {
    // verify the input was not empty
    return false;
  }

  // let option = document.createElement("option"); // create option tag
  // let option2 = document.createElement("option"); // create option tag

  // option.text = char; // add content and value to tag
  // option.value = charValue;
  // option2.text = char; // add content and value to tag
  // option2.value = charValue;

  // let exists = false; // for the verification that this is a unique name
  // let charLength = charList.length; // used to go through each item in the select tag

  // while (charLength--) { // checks each select option against new input
  //   if (charList.options[charLength].value === charValue) {
  //     console.log(charList.options[charLength].value);
  //     exists = true;
  //     break;
  //   }
  // }

  // if (exists === false) { // if unique then add the input to the drop down
  console.log(char, userId);
  $.post("/api/character", {
    name: char,
    UserId: userId,
  }).then(function (result){
    console.log("potato");
    console.log(result);
    renderChars();
  });

  // console.log(result);
  // charList.add(option); // option contains new character at this point ** DB **
  // charSelectList.add(option2);
  // }
});

sessionForm.addEventListener("submit", (e) => {
  e.preventDefault();

  let room = chatName.value; // grab the content of the input
  room = room.trim(); // clean up any extra spaces around input
  let roomValue = room.replace(/ /g, "-"); // reformat inputs to work as searchable values

  if (!room) {
    // verify the input was not empty
    return false;
  }

  let option = document.createElement("option"); // create option tag

  option.text = room; // add content and value to tag
  option.value = roomValue;

  let exists = false; // for the verification that this is a unique name
  let roomLength = roomList.length; // used to go through each item in the select tag

  while (roomLength--) {
    // checks each select option against new input
    if (roomList.options[roomLength].value === roomValue) {
      console.log(roomList.options[roomLength].value);
      exists = true;
      break;
    }
  }

  if (exists === false) {
    // if unique then add the input to the drop down
    $.post("/api/session", {
      sessionName: room,
    }).then((result) => result.json);
    roomList.add(option); // option contains new room at this point ** DB **
  }
});

$(document).ready(function () {
  // figure out which user is logged in and update page
  $.get("/api/user_data").then(function (data) {
    $(".member-name").text(data.email);
    console.log(data.id);
    $(".member-name").attr("data-userId", data.id);
    renderChars();
    renderSessions();
  });
});
