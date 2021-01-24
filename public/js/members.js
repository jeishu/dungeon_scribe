$(document).ready(function() { // figure out which user is logged in and update page
  $.get("/api/user_data").then(function(data) {
    $(".member-name").text(data.email);
  });
});
