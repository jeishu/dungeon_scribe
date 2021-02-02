$(document).ready(function () {
  var signUpForm = $("form.signup");
  var emailInput = $("input#email-input");
  var passwordInput = $("input#password-input");

  function handleLoginErr() {
    $("#alert .msg").text("Please enter a unique email and password");
    $("#alert").fadeIn(500);
  }

  function signUpUser(email, password) {
    $.post("/api/signup", {
      email: email,
      password: password,
    })
      .then(function () {
        window.location.replace("/members");
      })
      .catch(handleLoginErr);
  }

  signUpForm.on("submit", function (event) {
    event.preventDefault();
    var userData = {
      email: emailInput.val().trim(),
      password: passwordInput.val().trim(),
    };

    if (!userData.email || !userData.password) {
      return;
    }
    signUpUser(userData.email, userData.password);
    emailInput.val("");
    passwordInput.val("");
  });
});



