$(document).ready(function () {
  // Getting references to our form and inputs
  var loginForm = $("form.login");
  var emailInput = $("input#email-input");
  var passwordInput = $("input#password-input");

  function loginUser(email, password) {
    $.post("/api/login", {
      email: email,
      password: password,
    })
      .then(function () {
        window.location.replace("/members");
      })
      .catch(function (err) {
        console.log(err);
      });
  }

  loginForm.on("submit", function (event) {
    event.preventDefault();
    var userData = {
      email: emailInput.val().trim(),
      password: passwordInput.val().trim(),
    };

    if (!userData.email || !userData.password) {
      return; // ensure all fields are filled out
    }

    loginUser(userData.email, userData.password);
    emailInput.val("");
    passwordInput.val("");
  });
});
