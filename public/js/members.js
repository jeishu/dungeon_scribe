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

// how to change images manually
var manualNav = function(manual){
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
var repeat = function(){
  let active = document.getElementsByClassName("active");
  let i = 1;

  var repeater = () => {
    setTimeout(function(){
      [...active].forEach((activeSlide) => {
        activeSlide.classList.remove("active");
      });

      slides[i].classList.add("active");
      btns[i].classList.add("active");
      i++;

      if(slides.length === i){
        i = 0;
      }
      if(i >= slides.length){
        return;
      }
      repeater();
    }, 10000);
  };
  repeater();
};

repeat();

characterForm.addEventListener("submit", (e) => {
  e.preventDefault();

  let char = charName.value; // grab the content of the input
  char = char.trim(); // clean up any extra spaces around input
  let charValue = char.replace(/ /g, "-"); // reformat inputs to work as searchable values

  if (!char) { // verify the input was not empty
    return false;
  }

  let option = document.createElement("option"); // create option tag
  let option2 = document.createElement("option"); // create option tag

  option.text = char; // add content and value to tag
  option.value = charValue;
  option2.text = char; // add content and value to tag
  option2.value = charValue;

  let exists = false; // for the verification that this is a unique name
  let charLength = charList.length; // used to go through each item in the select tag

  while (charLength--) { // checks each select option against new input
    if (charList.options[charLength].value === charValue) {
      console.log(charList.options[charLength].value);
      exists = true;
      break;
    }
  }

  if (exists === false) { // if unique then add the input to the drop down
    console.log(char); // char & charValue contains new character at this point ** DB **
    console.log(charValue);
    console.log(option);
    charSelectList.add(option2);
    charList.add(option);
  }
});

sessionForm.addEventListener("submit", (e) => {
  e.preventDefault();

  let room = chatName.value; // grab the content of the input
  room = room.trim(); // clean up any extra spaces around input
  let roomValue = room.replace(/ /g, "-"); // reformat inputs to work as searchable values

  if (!room) { // verify the input was not empty
    return false;
  }

  let option = document.createElement("option"); // create option tag

  option.text = room; // add content and value to tag
  option.value = roomValue;

  let exists = false; // for the verification that this is a unique name
  let roomLength = roomList.length; // used to go through each item in the select tag

  while (roomLength--) { // checks each select option against new input
    if (roomList.options[roomLength].value === roomValue) {
      console.log(roomList.options[roomLength].value);
      exists = true;
      break;
    }
  }

  if (exists === false) { // if unique then add the input to the drop down
    console.log(chat); // chat & chatValue contains new room at this point ** DB **
    console.log(chatValue);
    roomList.add(option);
  }
});

$(document).ready(function () {
  // figure out which user is logged in and update page
  $.get("/api/user_data").then(function (data) {
    $(".member-name").text(data.email);
  });
});
